"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Send, CheckCircle, ArrowRight, Copy, ShoppingCart, RefreshCw, CreditCard } from "lucide-react";
import { enviarConfirmacionCotizacion, notificarAdmin } from "@/lib/email";
import { t, getLanguage } from "@/i18n";

export default function CotizaPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [cotizacionId, setCotizacionId] = useState("");
  const [modoId, setModoId] = useState<"auto" | "personalizado">("auto");
  const [idPersonalizado, setIdPersonalizado] = useState("");
  const [errorId, setErrorId] = useState("");
  const [montoCotizacion, setMontoCotizacion] = useState("");
  const [errorMonto, setErrorMonto] = useState("");
  const [lang, setLang] = useState<string | null>(null);

  useEffect(() => {
    setLang(getLanguage());
    const handleLangChange = () => setLang(getLanguage());
    window.addEventListener("languagechange", handleLangChange);
    return () => window.removeEventListener("languagechange", handleLangChange);
  }, []);

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    areaInteres: "",
    participantes: "1",
    modalidad: "En Línea",
    mensaje: "",
    idCotizacion: "",
    montoAsignado: "",
  });

  const generarIdCotizacion = () => {
    const fecha = new Date();
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const random = Math.floor(Math.random() * 9000) + 1000;
    return `KLY-${año}${mes}-${random}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validarIdPersonalizado = (id: string): boolean => {
    if (id.length < 3) { setErrorId(t("cotiza.error_id_short")); return false; }
    if (id.length > 50) { setErrorId(t("cotiza.error_id_long")); return false; }
    setErrorId(""); return true;
  };

  const validarMonto = (monto: string): boolean => {
    const m = parseFloat(monto);
    if (isNaN(m) || m <= 0) { setErrorMonto(t("cotiza.error_monto_invalid")); return false; }
    if (m > 999999) { setErrorMonto(t("cotiza.error_monto_max")); return false; }
    setErrorMonto(""); return true;
  };

  const handleSubmitContacto = (e: React.FormEvent) => {
    e.preventDefault();
    if (modoId === "auto") {
      const nuevoId = generarIdCotizacion();
      setCotizacionId(nuevoId);
      setFormData(f => ({ ...f, idCotizacion: nuevoId }));
      setStep(2);
    } else {
      if (!validarIdPersonalizado(idPersonalizado)) return;
      setCotizacionId(idPersonalizado);
      setFormData(f => ({ ...f, idCotizacion: idPersonalizado }));
      setStep(2);
    }
  };

  const regenerarId = () => {
    if (modoId === "auto") {
      const nuevoId = generarIdCotizacion();
      setCotizacionId(nuevoId);
      setFormData(f => ({ ...f, idCotizacion: nuevoId }));
    }
  };

  const copiarIdCotizacion = () => {
    navigator.clipboard.writeText(cotizacionId);
    alert(t("cotiza.id_copied"));
  };

  const handleAgregarAlCarrito = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validarMonto(montoCotizacion)) return;

    const carritoActual = JSON.parse(localStorage.getItem("klyro_carrito") || "[]");
    carritoActual.push({
      id: Date.now(),
      nombre: `${t("cotiza.quote")}: ${formData.areaInteres}`,
      precio: montoCotizacion,
      tipo: t("cotiza.quote_type"),
      cantidad: parseInt(formData.participantes) || 1,
      fecha: new Date().toISOString(),
      cotizacionId: cotizacionId,
      modalidad: formData.modalidad,
      email: formData.email,
    });
    localStorage.setItem("klyro_carrito", JSON.stringify(carritoActual));

    await enviarConfirmacionCotizacion({
      nombre: formData.nombre,
      email: formData.email,
      servicio: formData.areaInteres,
      cotizacionId: cotizacionId,
      monto: montoCotizacion,
      idioma: lang || 'es', 
    });

    await notificarAdmin({
      nombre: formData.nombre,
      email: formData.email,
      servicio: formData.areaInteres,
      cotizacionId: cotizacionId,
      monto: montoCotizacion,
      idioma: lang || 'es', 
    }, "Cotización");

    setStep(4);
  };

  if (!lang) {
    return (
      <main className="relative min-h-screen bg-background">
        <Navbar />
        <section className="pt-32 pb-20"><div className="container-dm" /></section>
        <Footer />
      </main>
    );
  }

  const steps = [
    { number: 1, subtitle: t("cotiza.step1_sub"), title: t("cotiza.step1_title") },
    { number: 2, subtitle: t("cotiza.step2_sub"), title: t("cotiza.step2_title") },
    { number: 3, subtitle: t("cotiza.step3_sub"), title: t("cotiza.step3_title") },
    { number: 4, subtitle: t("cotiza.step4_sub"), title: t("cotiza.step4_title") },
  ];

  const areasOptions = [
  t("cotiza.area_apps"),
  t("cotiza.area_business"),
  t("cotiza.area_specialized"),
  t("cotiza.area_inventory"),
  t("cotiza.area_complementary"),
];

const modalidadOptions = [
  t("cotiza.mod_online"),
  t("cotiza.mod_presencial"),
  t("cotiza.mod_hybrid"),
];

  return (
    <main className="relative min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-20">
        <div className="container-dm">
          <div className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.number} className={`relative rounded-2xl border p-6 transition-all ${step === s.number ? "border-primary bg-primary/10 shadow-lg shadow-primary/20" : step > s.number ? "border-primary/50 bg-primary/5" : "border-white/10 bg-white/[0.02]"}`}>
                <div className="flex items-center gap-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold ${step === s.number ? "bg-primary text-white" : step > s.number ? "bg-primary/30 text-primary" : "bg-white/10 text-muted-foreground"}`}>
                    {step > s.number ? <CheckCircle className="h-5 w-5" /> : `0${s.number}`}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{s.subtitle}</p>
                    <p className="text-xs text-muted-foreground">{s.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mx-auto max-w-3xl">
            {step === 1 && (
              <form onSubmit={handleSubmitContacto} className="space-y-6">
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-sm">
                  <h2 className="mb-6 font-display text-2xl font-bold text-white">{t("cotiza.form_title")}</h2>
                  <div className="space-y-5">
                    <div><label className="mb-2 block text-sm font-medium text-white">{t("cotiza.form_name")}</label><input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder={t("cotiza.form_name_placeholder")} /></div>
                    <div><label className="mb-2 block text-sm font-medium text-white">{t("cotiza.form_email")}</label><input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder={t("cotiza.form_email_placeholder")} /></div>
                    <div><label className="mb-2 block text-sm font-medium text-white">{t("cotiza.form_phone")}</label><input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} required className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="55 1234 5678" /></div>
                    <div><label className="mb-2 block text-sm font-medium text-white">{t("cotiza.form_area")}</label><select name="areaInteres" value={formData.areaInteres} onChange={handleChange} required className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"><option value="" disabled>{t("cotiza.form_area_placeholder")}</option>{areasOptions.map(a => <option key={a} value={a}>{a}</option>)}</select></div>
                    <div><label className="mb-2 block text-sm font-medium text-white">{t("cotiza.form_participants")}</label><input type="number" name="participantes" value={formData.participantes} onChange={handleChange} min="1" required className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>
                    <div><label className="mb-2 block text-sm font-medium text-white">{t("cotiza.form_modality")}</label><select name="modalidad" value={formData.modalidad} onChange={handleChange} required className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">{modalidadOptions.map(m => <option key={m} value={m}>{m}</option>)}</select></div>
                    <div><label className="mb-2 block text-sm font-medium text-white">{t("cotiza.form_message")}</label><textarea name="mensaje" value={formData.mensaje} onChange={handleChange} rows={4} className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder={t("cotiza.form_message_placeholder")} /></div>
                    <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
                      <p className="mb-3 text-sm font-medium text-white">{t("cotiza.id_question")}</p>
                      <div className="flex gap-3">
                        <button type="button" onClick={() => { setModoId("auto"); setErrorId(""); }} className={`flex-1 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${modoId === "auto" ? "border-primary bg-primary/20 text-white" : "border-white/10 text-muted-foreground hover:text-white"}`}>{t("cotiza.id_auto")}</button>
                        <button type="button" onClick={() => setModoId("personalizado")} className={`flex-1 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${modoId === "personalizado" ? "border-primary bg-primary/20 text-white" : "border-white/10 text-muted-foreground hover:text-white"}`}>{t("cotiza.id_custom")}</button>
                      </div>
                      {modoId === "auto" && <p className="mt-3 text-xs text-muted-foreground">{t("cotiza.id_auto_desc")} <span className="font-mono text-primary/80">KLY-202601-1234</span></p>}
                      {modoId === "personalizado" && (
                        <div className="mt-3">
                          <input type="text" value={idPersonalizado} onChange={(e) => { setIdPersonalizado(e.target.value); validarIdPersonalizado(e.target.value); }} placeholder={t("cotiza.id_custom_placeholder")} className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                          {errorId && <p className="mt-1 text-xs text-red-400">{errorId}</p>}
                          {!errorId && <p className="mt-1 text-xs text-muted-foreground">{t("cotiza.id_custom_desc")}</p>}
                        </div>
                      )}
                    </div>
                  </div>
                  <button type="submit" className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:brightness-110 active:scale-95"><Send className="h-5 w-5" />{t("cotiza.send")}</button>
                </div>
              </form>
            )}

            {step === 2 && (
              <div className="rounded-2xl border border-primary/30 bg-primary/5 p-8 backdrop-blur-sm">
                <div className="text-center"><CheckCircle className="mx-auto h-16 w-16 text-primary" /><h2 className="mt-4 font-display text-2xl font-bold text-white">{t("cotiza.received")}</h2><p className="mt-3 text-muted-foreground">{t("cotiza.received_text")}</p></div>
                <div className="mt-8 rounded-2xl border-2 border-primary/30 bg-black/30 p-6">
                  <p className="text-center text-sm font-medium text-muted-foreground">{t("cotiza.your_id")}</p>
                  <div className="mt-2 flex items-center justify-center gap-3">
                    <p className="font-mono text-3xl font-bold text-primary tracking-wider">{cotizacionId}</p>
                    <button type="button" onClick={copiarIdCotizacion} className="rounded-lg bg-primary/10 p-2 text-primary transition-colors hover:bg-primary/20"><Copy className="h-5 w-5" /></button>
                    {modoId === "auto" && <button type="button" onClick={regenerarId} className="rounded-lg bg-primary/10 p-2 text-primary transition-colors hover:bg-primary/20"><RefreshCw className="h-5 w-5" /></button>}
                  </div>
                  <p className="mt-3 text-center text-xs text-muted-foreground">{modoId === "auto" ? t("cotiza.copy_regen") : t("cotiza.copy_ref")}</p>
                </div>
                <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <h3 className="font-semibold text-white">{t("cotiza.summary")}</h3>
                  <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                    <p><span className="text-white/70">{t("cotiza.summary_service")}:</span> {formData.areaInteres}</p>
                    <p><span className="text-white/70">{t("cotiza.summary_modality")}:</span> {formData.modalidad}</p>
                    <p><span className="text-white/70">{t("cotiza.summary_participants")}:</span> {formData.participantes}</p>
                    <p><span className="text-white/70">{t("cotiza.summary_email")}:</span> {formData.email}</p>
                  </div>
                </div>
                <button onClick={() => setStep(3)} className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:brightness-110 active:scale-95">{t("cotiza.continue")}<ArrowRight className="h-5 w-5" /></button>
              </div>
            )}

            {step === 3 && (
              <form onSubmit={handleAgregarAlCarrito} className="space-y-6">
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-6"><CreditCard className="h-6 w-6 text-primary" /><h2 className="font-display text-2xl font-bold text-white">{t("cotiza.step3_title")}</h2></div>
                  <p className="mb-6 text-sm text-muted-foreground">{t("cotiza.monto_desc")}</p>
                  <div className="mb-6 rounded-xl border border-primary/20 bg-primary/5 p-4"><p className="text-xs text-muted-foreground">{t("cotiza.id_label")}:</p><p className="mt-1 font-mono text-lg font-bold text-primary">{cotizacionId}</p></div>
                  <div className="space-y-5">
                    <div><label className="mb-2 block text-sm font-medium text-white">{t("cotiza.monto_label")}</label><div className="relative"><span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span><input type="number" value={montoCotizacion} onChange={(e) => { setMontoCotizacion(e.target.value); validarMonto(e.target.value); }} required min="1" max="999999" step="0.01" className="w-full rounded-xl border border-white/10 bg-white/[0.03] pl-8 pr-4 py-3 text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="0.00" /></div>{errorMonto && <p className="mt-1 text-xs text-red-400">{errorMonto}</p>}{!errorMonto && montoCotizacion && <p className="mt-1 text-xs text-muted-foreground">{t("common.tax")} (16%): {parseFloat(montoCotizacion) > 0 ? (parseFloat(montoCotizacion) * 0.16).toLocaleString("es-MX", { style: "currency", currency: "MXN" }) : "$0.00"}</p>}</div>
                  </div>
                  <button type="submit" className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:brightness-110 active:scale-95"><ShoppingCart className="h-5 w-5" />{t("cotiza.add_cart")}</button>
                </div>
              </form>
            )}

            {step === 4 && (
              <div className="rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center backdrop-blur-sm">
                <ShoppingCart className="mx-auto h-16 w-16 text-primary" />
                <h2 className="mt-4 font-display text-2xl font-bold text-white">{t("cotiza.added")}</h2>
                <p className="mt-3 text-muted-foreground">{t("cotiza.added_text")} {formData.email}.</p>
                <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-left">
                  <p className="text-sm text-muted-foreground">{t("cotiza.id_label")}: <span className="font-mono text-primary">{cotizacionId}</span></p>
                  <p className="mt-1 text-sm text-muted-foreground">{t("cotiza.summary_service")}: {formData.areaInteres}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{t("cotiza.summary_amount")}: ${parseFloat(montoCotizacion).toLocaleString("es-MX", { minimumFractionDigits: 2 })}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{t("cotiza.summary_email")}: {formData.email}</p>
                </div>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <a href="/carrito" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 font-semibold text-white transition-all hover:brightness-110 active:scale-95"><ShoppingCart className="h-5 w-5" />{t("cotiza.view_cart")}</a>
                  <a href="/" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-8 py-3 font-semibold text-muted-foreground transition-all hover:border-primary/30 hover:text-white">{t("cotiza.back_home")}</a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}