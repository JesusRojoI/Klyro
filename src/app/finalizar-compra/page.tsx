"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { 
  ArrowLeft, 
  Shield, 
  CreditCard, 
  Lock, 
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Tag
} from "lucide-react";
import { enviarConfirmacionCompra, notificarAdmin } from "@/lib/email";
import { t, getLanguage } from "@/i18n";

interface ProductoCarrito {
  id: number;
  nombre: string;
  precio: string;
  tipo: string;
  cantidad: number;
  fecha: string;
  cotizacionId?: string;
}

export default function FinalizarCompraPage() {
  const router = useRouter();
  const [carrito, setCarrito] = useState<ProductoCarrito[]>([]);
  const [loading, setLoading] = useState(false);
  const [cuponAbierto, setCuponAbierto] = useState(false);
  const [codigoCupon, setCodigoCupon] = useState("");
  const [cuponAplicado, setCuponAplicado] = useState(false);
  const [descuento, setDescuento] = useState(0);
  const [lang, setLang] = useState<string | null>(null);

  useEffect(() => {
    setLang(getLanguage());
    const handleLangChange = () => setLang(getLanguage());
    window.addEventListener("languagechange", handleLangChange);
    return () => window.removeEventListener("languagechange", handleLangChange);
  }, []);

  const [formData, setFormData] = useState({
    nombre: "", apellidos: "", pais: "México", direccion: "", apartamento: "",
    poblacion: "", region: "Ciudad de México", codigoPostal: "", telefono: "",
    email: "", notas: "", nombreTarjeta: "", numeroTarjeta: "", fechaExpiracion: "", cvv: "",
  });

  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem("klyro_carrito") || "[]");
    setCarrito(carritoGuardado);
    if (carritoGuardado.length === 0) router.push("/carrito");
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const extraerPrecio = (precio: string): number => {
    const match = precio.match(/[\d,]+/);
    if (match) return parseInt(match[0].replace(/,/g, "")) || 0;
    return 0;
  };

  const formatearPrecio = (cantidad: number): string => {
    return cantidad.toLocaleString("es-MX", { style: "currency", currency: "MXN", minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const calcularSubtotal = (): number => carrito.reduce((total, item) => total + extraerPrecio(item.precio) * item.cantidad, 0);
  const calcularIVA = (): number => calcularSubtotal() * 0.16;
  const calcularTotal = (): number => calcularSubtotal() + calcularIVA() - descuento;

  const aplicarCupon = () => {
    const cupones: { [key: string]: number } = { "KLYRO10": 0.10, "KLYRO20": 0.20, "BIENVENIDO": 0.15 };
    if (cupones[codigoCupon.toUpperCase()]) {
      setDescuento(calcularSubtotal() * cupones[codigoCupon.toUpperCase()]);
      setCuponAplicado(true);
    } else {
      alert(t("checkout.coupon_invalid"));
      setCuponAplicado(false);
      setDescuento(0);
    }
  };

  const generarIdOrden = () => `ORD-${Date.now().toString(36).toUpperCase()}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.apellidos || !formData.email) {
      alert(t("checkout.alert_fields"));
      return;
    }
    setLoading(true);
    const orderId = generarIdOrden();
    const nombreCompleto = `${formData.nombre} ${formData.apellidos}`;
    try {
      const response = await fetch('/api/create-payment', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: calcularTotal(), description: `Orden ${orderId} - Klyro`, customerName: nombreCompleto, customerEmail: formData.email, orderId, cardData: { numeroTarjeta: formData.numeroTarjeta, nombreTarjeta: formData.nombreTarjeta, fechaExpiracion: formData.fechaExpiracion, cvv: formData.cvv } }),
      });
      const result = await response.json();
      if (result.success) {
        await enviarConfirmacionCompra({ nombre: formData.nombre, email: formData.email, productos: carrito,idioma: lang || 'es', total: formatearPrecio(calcularTotal()) });
        await notificarAdmin({ nombre: nombreCompleto, email: formData.email,idioma: lang || 'es', total: formatearPrecio(calcularTotal()) }, "Compra");
        localStorage.setItem("klyro_ultima_orden", JSON.stringify({ orderId, nombre: nombreCompleto, email: formData.email, productos: carrito, subtotal: calcularSubtotal(), iva: calcularIVA(), descuento, total: calcularTotal(), fecha: new Date().toISOString() }));
        localStorage.removeItem("klyro_carrito");
        router.push("/compra-exitosa");
      } else {
        alert(t("checkout.alert_payment_error"));
      }
    } catch {
      alert(t("checkout.alert_connection_error"));
    } finally {
      setLoading(false);
    }
  };

  if (!lang) {
    return (<main className="relative min-h-screen bg-background"><Navbar /><section className="pt-32 pb-20"><div className="container-dm" /></section><Footer /></main>);
  }

  const paises = [t("checkout.country_mx"), t("checkout.country_us"), t("checkout.country_ca"), t("checkout.country_es"), t("checkout.country_ar"), t("checkout.country_co")];
  const regiones = [t("checkout.region_cdmx"), t("checkout.region_edomex"), t("checkout.region_jal"), t("checkout.region_nl"), t("checkout.region_pue"), t("checkout.region_qro")];

  return (
    <main className="relative min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-20">
        <div className="container-dm">
          <div className="mb-12">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <a href="/" className="hover:text-primary transition-colors">{t("checkout.breadcrumb_home")}</a>
              <span>/</span>
              <a href="/carrito" className="hover:text-primary transition-colors">{t("checkout.breadcrumb_cart")}</a>
              <span>/</span>
              <span className="text-white">{t("checkout.title")}</span>
            </div>
            <h1 className="mt-6 font-display text-4xl font-bold text-white sm:text-5xl">{t("checkout.title")}</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-8">
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm md:p-8">
                  <h2 className="font-display text-2xl font-bold text-white">{t("checkout.billing")}</h2>
                  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div><label className="mb-2 block text-sm font-medium text-white">{t("checkout.name")}</label><input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder={t("checkout.name_placeholder")} /></div>
                    <div><label className="mb-2 block text-sm font-medium text-white">{t("checkout.lastname")}</label><input type="text" name="apellidos" value={formData.apellidos} onChange={handleChange} required className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder={t("checkout.lastname_placeholder")} /></div>
                    <div className="sm:col-span-2"><label className="mb-2 block text-sm font-medium text-white">{t("checkout.country")}</label><select name="pais" value={formData.pais} onChange={handleChange} required className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">{paises.map(p => <option key={p} value={p}>{p}</option>)}</select></div>
                    <div className="sm:col-span-2"><label className="mb-2 block text-sm font-medium text-white">{t("checkout.address")}</label><input type="text" name="direccion" value={formData.direccion} onChange={handleChange} required className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder={t("checkout.address_placeholder")} /></div>
                    <div className="sm:col-span-2"><label className="mb-2 block text-sm font-medium text-muted-foreground">{t("checkout.apartment")}</label><input type="text" name="apartamento" value={formData.apartamento} onChange={handleChange} className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder={t("checkout.apartment_placeholder")} /></div>
                    <div><label className="mb-2 block text-sm font-medium text-white">{t("checkout.city")}</label><input type="text" name="poblacion" value={formData.poblacion} onChange={handleChange} required className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>
                    <div><label className="mb-2 block text-sm font-medium text-white">{t("checkout.region")}</label><select name="region" value={formData.region} onChange={handleChange} required className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">{regiones.map(r => <option key={r} value={r}>{r}</option>)}</select></div>
                    <div><label className="mb-2 block text-sm font-medium text-white">{t("checkout.zip")}</label><input type="text" name="codigoPostal" value={formData.codigoPostal} onChange={handleChange} required className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>
                    <div><label className="mb-2 block text-sm font-medium text-muted-foreground">{t("checkout.phone")}</label><input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder={t("checkout.phone_placeholder")} /></div>
                    <div className="sm:col-span-2"><label className="mb-2 block text-sm font-medium text-white">{t("checkout.email")}</label><input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder={t("checkout.email_placeholder")} /></div>
                    <div className="sm:col-span-2"><label className="mb-2 block text-sm font-medium text-muted-foreground">{t("checkout.notes")}</label><textarea name="notas" value={formData.notas} onChange={handleChange} rows={3} className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder={t("checkout.notes_placeholder")} /></div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm md:p-8">
                  <div className="flex items-center gap-3"><CreditCard className="h-6 w-6 text-primary" /><h2 className="font-display text-2xl font-bold text-white">{t("checkout.card_title")}</h2></div>
                  <p className="mt-3 text-sm text-muted-foreground">{t("checkout.card_description")}</p>
                  <div className="mt-6 space-y-4">
                    <div><label className="mb-2 block text-sm font-medium text-white">{t("checkout.card_name")}</label><input type="text" name="nombreTarjeta" value={formData.nombreTarjeta} onChange={handleChange} required className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder={t("checkout.card_name_placeholder")} /></div>
                    <div><label className="mb-2 block text-sm font-medium text-white">{t("checkout.card_number")}</label><div className="relative"><input type="text" name="numeroTarjeta" value={formData.numeroTarjeta} onChange={handleChange} required maxLength={19} className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="•••• •••• •••• ••••" /><Lock className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /></div></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div><label className="mb-2 block text-sm font-medium text-white">{t("checkout.card_expiry")}</label><input type="text" name="fechaExpiracion" value={formData.fechaExpiracion} onChange={handleChange} required maxLength={5} className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="MM / YY" /></div>
                      <div><label className="mb-2 block text-sm font-medium text-white">{t("checkout.card_cvv")}</label><input type="text" name="cvv" value={formData.cvv} onChange={handleChange} required maxLength={4} className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="•••" /></div>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground"><Shield className="h-4 w-4 text-primary" />{t("checkout.security")}</div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-28 rounded-2xl border border-primary/20 bg-white/[0.02] p-6 backdrop-blur-sm">
                  <h3 className="font-display text-xl font-bold text-white">{t("checkout.order")}</h3>
                  <div className="mt-6">
                    <div className="grid grid-cols-3 gap-2 border-b border-white/10 pb-3 text-xs font-medium text-muted-foreground"><span className="col-span-2">{t("checkout.product")}</span><span className="text-right">{t("checkout.subtotal")}</span></div>
                    {carrito.map((item) => (
                      <div key={item.id} className="grid grid-cols-3 gap-2 border-b border-white/5 py-3 text-sm"><span className="col-span-2 text-muted-foreground">{item.nombre} × {item.cantidad}</span><span className="text-right text-white">{item.precio === "A cotizar" ? t("cart.to_quote") : formatearPrecio(extraerPrecio(item.precio) * item.cantidad)}</span></div>
                    ))}
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">{t("checkout.subtotal")}</span><span className="text-white">{formatearPrecio(calcularSubtotal())}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">{t("checkout.iva")}</span><span className="text-white">{formatearPrecio(calcularIVA())}</span></div>
                    {cuponAplicado && <div className="flex justify-between text-sm"><span className="text-primary">{t("checkout.discount")}</span><span className="text-primary">-{formatearPrecio(descuento)}</span></div>}
                    <div className="flex justify-between border-t border-white/10 pt-2"><span className="font-semibold text-white">{t("checkout.total")}</span><span className="font-mono text-lg font-bold text-primary">{formatearPrecio(calcularTotal())}</span></div>
                  </div>
                  <div className="mt-6 border-t border-white/10 pt-4">
                    <button type="button" onClick={() => setCuponAbierto(!cuponAbierto)} className="flex w-full items-center justify-between text-sm text-muted-foreground transition-colors hover:text-white"><span className="flex items-center gap-2"><Tag className="h-4 w-4" />{t("checkout.coupon")}</span>{cuponAbierto ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}</button>
                    {cuponAbierto && (
                      <div className="mt-3 space-y-2">
                        <input type="text" value={codigoCupon} onChange={(e) => setCodigoCupon(e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder={t("checkout.coupon_placeholder")} />
                        <button type="button" onClick={aplicarCupon} className="w-full rounded-full border border-primary/30 px-4 py-2 text-sm text-primary transition-colors hover:bg-primary/10">{t("checkout.apply_coupon")}</button>
                        {cuponAplicado && <p className="flex items-center gap-1 text-xs text-primary"><CheckCircle2 className="h-3 w-3" />{t("checkout.coupon_applied")}</p>}
                      </div>
                    )}
                  </div>
                  <button type="submit" disabled={loading} className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-base font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:brightness-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
                    {loading ? t("checkout.processing") : <><Lock className="h-5 w-5" />{t("checkout.pay")} {formatearPrecio(calcularTotal())}</>}
                  </button>
                  <a href="/carrito" className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm text-muted-foreground transition-all hover:border-primary/30 hover:text-white"><ArrowLeft className="h-4 w-4" />{t("checkout.back_cart")}</a>
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-center gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-3">
                      <img src="/octano_logo.svg" alt="Octano" className="h-7 w-auto" style={{ filter: "brightness(0) invert(1)" }} />
                      <div className="h-6 w-px bg-white/10" />
                      <img src="/secure_logo.svg" alt="SSL" className="h-7 w-auto" style={{ filter: "brightness(0) invert(1)" }} />
                    </div>
                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground"><Shield className="h-3 w-3 text-primary" />{t("checkout.secure_ssl")}<span className="text-white/20">|</span><CreditCard className="h-3 w-3 text-primary" />Visa, Mastercard</div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </main>
  );
}