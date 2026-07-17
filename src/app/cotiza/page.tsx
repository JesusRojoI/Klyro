"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Send, CheckCircle, ShoppingCart } from "lucide-react";
import { enviarConfirmacionCotizacion, notificarAdmin } from "@/lib/email";
import { t, getLanguage } from "@/i18n";

export default function CotizaPage() {
  const router = useRouter();
  const [cotizacionId, setCotizacionId] = useState("");
  const [montoCotizacion, setMontoCotizacion] = useState("");
  const [errorMonto, setErrorMonto] = useState("");
  const [errorId, setErrorId] = useState("");
  const [lang, setLang] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

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
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validarId = (id: string): boolean => {
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

  const handleSubmitContacto = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);

    await enviarConfirmacionCotizacion({
  nombre: formData.nombre,
  email: formData.email,
  servicio: formData.areaInteres,
  cotizacionId: t("cotiza.pending"),
  monto: t("cotiza.to_define"),
  idioma: lang || "es",
});

    await notificarAdmin({
      nombre: formData.nombre,
      email: formData.email,
      servicio: formData.areaInteres,
      cotizacionId: "Pendiente",
      monto: "Por definir",
      idioma: lang || "es",
    }, "Cotización");

    setEnviando(false);
    setEnviado(true);
  };

  const handleAgregarAlCarrito = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validarId(cotizacionId)) return;
    if (!validarMonto(montoCotizacion)) return;

    const carritoActual = JSON.parse(localStorage.getItem("klyro_carrito") || "[]");
    carritoActual.push({
      id: Date.now(),
      nombre: `${t("cotiza.quote")}: ${formData.areaInteres}`,
      precio: montoCotizacion,
      tipo: t("cotiza.quote_type"),
      cantidad: parseInt(formData.participantes) || 1,
      fecha: new Date().toISOString(),
      cotizacionId,
      modalidad: formData.modalidad,
      email: formData.email,
    });
    localStorage.setItem("klyro_carrito", JSON.stringify(carritoActual));
    router.push("/carrito");
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

  const areasOptions = [
    t("cotiza.area_apps"), t("cotiza.area_business"), t("cotiza.area_specialized"),
    t("cotiza.area_inventory"), t("cotiza.area_complementary"),
  ];
  const modalidadOptions = [t("cotiza.mod_online"), t("cotiza.mod_presencial"), t("cotiza.mod_hybrid")];

  return (
    <main className="relative min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-20">
        <div className="container-dm">
          <div className="mx-auto max-w-4xl">
            
            {/* Paso 01 - Formulario de contacto */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">01</div>
                <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">{t("cotiza.step1_title")}</h2>
              </div>

              {enviado ? (
                <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-primary" />
                    <p className="text-white font-medium">{t("cotiza.sent_title")}</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitContacto} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm md:p-8">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div><label className="mb-2 block text-sm font-medium text-white">{t("cotiza.form_name")}</label><input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder={t("cotiza.form_name_placeholder")} /></div>
                    <div><label className="mb-2 block text-sm font-medium text-white">{t("cotiza.form_email")}</label><input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder={t("cotiza.form_email_placeholder")} /></div>
                    <div><label className="mb-2 block text-sm font-medium text-white">{t("cotiza.form_phone")}</label><input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} required className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="55 1234 5678" /></div>
                    <div><label className="mb-2 block text-sm font-medium text-white">{t("cotiza.form_area")}</label><select name="areaInteres" value={formData.areaInteres} onChange={handleChange} required className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"><option value="" disabled>{t("cotiza.form_area_placeholder")}</option>{areasOptions.map(a => <option key={a} value={a}>{a}</option>)}</select></div>
                    <div><label className="mb-2 block text-sm font-medium text-white">{t("cotiza.form_participants")}</label><input type="number" name="participantes" value={formData.participantes} onChange={handleChange} min="1" required className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>
                    <div><label className="mb-2 block text-sm font-medium text-white">{t("cotiza.form_modality")}</label><select name="modalidad" value={formData.modalidad} onChange={handleChange} required className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">{modalidadOptions.map(m => <option key={m} value={m}>{m}</option>)}</select></div>
                    <div className="sm:col-span-2"><label className="mb-2 block text-sm font-medium text-white">{t("cotiza.form_message")}</label><textarea name="mensaje" value={formData.mensaje} onChange={handleChange} rows={3} className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder={t("cotiza.form_message_placeholder")} /></div>
                  </div>
                  <button type="submit" disabled={enviando} className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:brightness-110 active:scale-95 disabled:opacity-50">
                    {enviando ? t("cotiza.sending") : <><Send className="h-5 w-5" />{t("cotiza.send")}</>}
                  </button>
                </form>
              )}
            </div>

            {/* Paso 02 - Informativo: Recibe una cotización a tu medida */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className={`flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold ${enviado ? "bg-primary/30 text-primary" : "bg-white/10 text-muted-foreground"}`}>02</div>
                <h2 className={`font-display text-2xl font-bold sm:text-3xl ${enviado ? "text-white" : "text-muted-foreground"}`}>{t("cotiza.step2_title")}</h2>
              </div>
              {enviado && (
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm">
                  <p className="text-muted-foreground">{t("cotiza.step2_desc")}</p>
                </div>
              )}
            </div>

            {/* Paso 03 - Informativo: Estrategia a tu medida */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className={`flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold ${enviado ? "bg-primary/30 text-primary" : "bg-white/10 text-muted-foreground"}`}>03</div>
                <h2 className={`font-display text-2xl font-bold sm:text-3xl ${enviado ? "text-white" : "text-muted-foreground"}`}>{t("cotiza.step3_title")}</h2>
              </div>
              {enviado && (
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm">
                  <p className="text-muted-foreground">{t("cotiza.step3_desc")}</p>
                </div>
              )}
            </div>

            {/* Paso 04 - ID + Monto + Agregar al carrito */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className={`flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold ${enviado ? "bg-primary text-white" : "bg-white/10 text-muted-foreground"}`}>04</div>
                <h2 className={`font-display text-2xl font-bold sm:text-3xl ${enviado ? "text-white" : "text-muted-foreground"}`}>{t("cotiza.step4_title")}</h2>
              </div>
              {enviado && (
                <form onSubmit={handleAgregarAlCarrito} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm md:p-8">
                  <p className="mb-6 text-sm text-muted-foreground">{t("cotiza.step4_desc")}</p>
                  <div className="space-y-5">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-white">{t("cotiza.id_label")} *</label>
                      <input type="text" value={cotizacionId} onChange={(e) => { setCotizacionId(e.target.value); validarId(e.target.value); }} required className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder={t("cotiza.id_placeholder")} />
                      {errorId && <p className="mt-1 text-xs text-red-400">{errorId}</p>}
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-white">{t("cotiza.monto_label")}</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <input type="number" value={montoCotizacion} onChange={(e) => { setMontoCotizacion(e.target.value); validarMonto(e.target.value); }} required min="1" max="999999" step="0.01" className="w-full rounded-xl border border-white/10 bg-white/[0.03] pl-8 pr-4 py-3 text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder={t("cotiza.monto_placeholder")} />
                      </div>
                      {errorMonto && <p className="mt-1 text-xs text-red-400">{errorMonto}</p>}
                      {!errorMonto && montoCotizacion && (
                        <p className="mt-1 text-xs text-muted-foreground">{t("common.tax")}</p>
                      )}
                    </div>
                  </div>
                  <button type="submit" className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:brightness-110 active:scale-95">
                    <ShoppingCart className="h-5 w-5" />{t("cotiza.add_cart")}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}