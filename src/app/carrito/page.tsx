"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { 
  Trash2, 
  ShoppingCart, 
  ArrowRight, 
  ArrowLeft, 
  Plus, 
  Minus,
  Package,
  CreditCard,
  Shield
} from "lucide-react";
import { t, getLanguage } from "@/i18n";

interface ProductoCarrito {
  id: number;
  nombre: string;
  precio: string;
  tipo: string;
  cantidad: number;
  fecha: string;
  cotizacionId?: string;
  modalidad?: string;
  email?: string;
}

export default function CarritoPage() {
  const [carrito, setCarrito] = useState<ProductoCarrito[]>([]);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState<string | null>(null);

  useEffect(() => {
    setLang(getLanguage());
    const handleLangChange = () => setLang(getLanguage());
    window.addEventListener("languagechange", handleLangChange);
    return () => window.removeEventListener("languagechange", handleLangChange);
  }, []);

  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem("klyro_carrito") || "[]");
    const carritoAgrupado = carritoGuardado.reduce((acc: ProductoCarrito[], item: ProductoCarrito) => {
      const existe = acc.find((p: ProductoCarrito) => p.id === item.id);
      if (existe) { existe.cantidad += item.cantidad || 1; }
      else { acc.push({ ...item, cantidad: item.cantidad || 1 }); }
      return acc;
    }, []);
    setCarrito(carritoAgrupado);
    localStorage.setItem("klyro_carrito", JSON.stringify(carritoAgrupado));
    setLoading(false);
  }, []);

  const guardarCarrito = (nuevoCarrito: ProductoCarrito[]) => {
    localStorage.setItem("klyro_carrito", JSON.stringify(nuevoCarrito));
    setCarrito(nuevoCarrito);
  };

  const actualizarCantidad = (id: number, delta: number) => {
    const nuevoCarrito = carrito.map(item => {
      if (item.id === id) {
        const nuevaCantidad = item.cantidad + delta;
        return nuevaCantidad > 0 ? { ...item, cantidad: nuevaCantidad } : item;
      }
      return item;
    });
    guardarCarrito(nuevoCarrito);
  };

  const eliminarProducto = (id: number) => {
    const nuevoCarrito = carrito.filter(item => item.id !== id);
    guardarCarrito(nuevoCarrito);
  };

  const vaciarCarrito = () => {
    if (confirm(lang ? t("cart.confirm_empty") : "¿Estás seguro de que deseas vaciar el carrito?")) {
      guardarCarrito([]);
    }
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
  const calcularTotal = (): number => calcularSubtotal() + calcularIVA();

  // Traducir nombres de productos guardados
  const traducirNombre = (nombre: string, tipo: string): string => {
    if (!lang) return nombre;

    const traducciones: { [key: string]: { [key: string]: string } } = {
      "Desarrollo de Aplicaciones": {
        "Aplicación Básica": t("app_dev.basic"),
        "Aplicación Intermedia": t("app_dev.intermediate"),
        "Aplicación Avanzada": t("app_dev.advanced"),
        "Advanced Application": t("app_dev.advanced"),
        "Basic Application": t("app_dev.basic"),
        "Intermediate Application": t("app_dev.intermediate"),
      },
      "Desarrollo Empresarial": {
        "ERP Básico": t("business_dev.erp_basic"),
        "Basic ERP": t("business_dev.erp_basic"),
        "CRM": "CRM",
        "SCM": "SCM",
      },
      "Capacitación - Sistemas Informáticos": {
        "Capacitación en Sistema Windows": t("training_systems.windows"),
        "Windows System Training": t("training_systems.windows"),
        "Capacitación en Sistema Linux": t("training_systems.linux"),
        "Linux System Training": t("training_systems.linux"),
        "Capacitación en Sistema macOS": t("training_systems.macos"),
        "macOS System Training": t("training_systems.macos"),
        "Capacitación en Sistema Dolibarr ERP/CRM": t("training_systems.dolibarr"),
        "Dolibarr ERP/CRM System Training": t("training_systems.dolibarr"),
        "Capacitación en Sistema SAP S/4HANA": t("training_systems.sap"),
        "SAP S/4HANA System Training": t("training_systems.sap"),
        "Capacitación en Sistema Administratool ERP": t("training_systems.administratool"),
        "Administratool ERP System Training": t("training_systems.administratool"),
      },
      "Capacitación - Lenguajes de Programación": {},
      "Cotización Personalizada": {},
      "Custom Quote": {},
    };

    // Nombres de lenguajes no necesitan traducción
    const lenguajes = ["JavaScript", "Python", "Java", "C#", "PHP", "SQL"];
    if (tipo.includes("Lenguajes") || tipo.includes("Programming")) {
      if (lenguajes.includes(nombre)) return nombre;
    }

    if (traducciones[tipo] && traducciones[tipo][nombre]) {
      return traducciones[tipo][nombre];
    }

    // Cotizaciones
    if (tipo === "Cotización Personalizada" || tipo === "Custom Quote") {
      return nombre.replace("Cotización:", t("cotiza.quote") + ":").replace("Quote:", t("cotiza.quote") + ":");
    }

    return nombre;
  };

  // Traducir tipo
  const traducirTipo = (tipo: string): string => {
    if (!lang) return tipo;
    const tipos: { [key: string]: string } = {
      "Desarrollo de Aplicaciones": t("app_dev.title"),
      "Application Development": t("app_dev.title"),
      "Desarrollo Empresarial": t("business_dev.title"),
      "Business Development": t("business_dev.title"),
      "Capacitación - Sistemas Informáticos": t("training_systems.badge") + " - " + t("nav.training_systems"),
      "Training - Computer Systems": t("training_systems.badge") + " - " + t("nav.training_systems"),
      "Capacitación - Lenguajes de Programación": t("training_languages.badge") + " - " + t("nav.training_languages"),
      "Training - Programming Languages": t("training_languages.badge") + " - " + t("nav.training_languages"),
      "Cotización Personalizada": t("cotiza.quote_type"),
      "Custom Quote": t("cotiza.quote_type"),
    };
    return tipos[tipo] || tipo;
  };

  if (loading || !lang) {
    return (
      <main className="relative min-h-screen bg-background">
        <Navbar />
        <section className="pt-32 pb-20">
          <div className="container-dm text-center">
            <div className="animate-pulse">
              <ShoppingCart className="mx-auto h-16 w-16 text-primary/50" />
              <p className="mt-4 text-muted-foreground">Cargando carrito...</p>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-20">
        <div className="container-dm">
          <div className="mb-12">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <a href="/" className="hover:text-primary transition-colors">{t("cart.breadcrumb_home")}</a>
              <span>/</span>
              <span className="text-white">{t("cart.title")}</span>
            </div>
            <h1 className="mt-6 font-display text-4xl font-bold text-white sm:text-5xl">{t("cart.heading")}</h1>
            <p className="mt-3 text-muted-foreground">
              {carrito.length === 0 ? t("cart.empty") : `${carrito.length} ${t("cart.products")}`}
            </p>
          </div>

          {carrito.length === 0 ? (
            <div className="text-center">
              <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-white/[0.02] p-12 backdrop-blur-sm">
                <ShoppingCart className="mx-auto h-20 w-20 text-muted-foreground/50" />
                <h2 className="mt-6 font-display text-2xl font-bold text-white">{t("cart.empty_title")}</h2>
                <p className="mt-3 text-muted-foreground">{t("cart.empty_description")}</p>
                <a href="/desarrollo-de-aplicaciones/" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:brightness-110 active:scale-95"><ArrowLeft className="h-5 w-5" />{t("cart.view_plans")}</a>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-4">
                {carrito.map((item) => (
                  <div key={item.id} className="animate-fade-up rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm transition-all hover:border-primary/30">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex-1">
                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10"><Package className="h-5 w-5 text-primary" /></div>
                          <div>
                            <h3 className="font-semibold text-white">{traducirNombre(item.nombre, item.tipo)}</h3>
                            <p className="mt-1 text-xs text-muted-foreground">{traducirTipo(item.tipo)}</p>
                            {item.cotizacionId && <p className="mt-1 text-xs text-primary/80">ID: {item.cotizacionId}</p>}
                            <p className="mt-1 text-xs text-muted-foreground/70">{t("cart.added_on")} {new Date(item.fecha).toLocaleDateString("es-MX")}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <button onClick={() => actualizarCantidad(item.id, -1)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"><Minus className="h-4 w-4" /></button>
                          <span className="w-8 text-center text-sm font-medium text-white">{item.cantidad}</span>
                          <button onClick={() => actualizarCantidad(item.id, 1)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"><Plus className="h-4 w-4" /></button>
                        </div>
                        <p className="min-w-[100px] text-right font-mono font-bold text-primary">{item.precio === "A cotizar" ? t("cart.to_quote") : formatearPrecio(extraerPrecio(item.precio) * item.cantidad)}</p>
                        <button onClick={() => eliminarProducto(item.id)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-500/20 text-red-400 transition-colors hover:border-red-500/50 hover:bg-red-500/10"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </div>
                  </div>
                ))}
                <button onClick={vaciarCarrito} className="text-sm text-muted-foreground transition-colors hover:text-red-400">{t("cart.empty_cart")}</button>
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-28 rounded-2xl border border-primary/20 bg-white/[0.02] p-6 backdrop-blur-sm">
                  <h3 className="font-display text-xl font-bold text-white">{t("cart.resume")}</h3>
                  <div className="mt-6 space-y-3">
                    {carrito.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{traducirNombre(item.nombre, item.tipo)} x{item.cantidad}</span>
                        <span className="text-white">{item.precio === "A cotizar" ? t("cart.to_quote") : formatearPrecio(extraerPrecio(item.precio) * item.cantidad)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 border-t border-white/10 pt-4 space-y-2">
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">{t("cart.subtotal")}</span><span className="text-white">{formatearPrecio(calcularSubtotal())}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">{t("cart.iva")}</span><span className="text-white">{formatearPrecio(calcularIVA())}</span></div>
                    <div className="flex justify-between border-t border-white/10 pt-2"><span className="font-semibold text-white">{t("cart.total")}</span><span className="font-mono font-bold text-primary text-lg">{formatearPrecio(calcularTotal())}</span></div>
                  </div>
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground"><Shield className="h-4 w-4 text-primary" />{t("cart.secure_payment")}</div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground"><CreditCard className="h-4 w-4 text-primary" />{t("cart.payment_methods")}</div>
                  </div>
                  <a href="/finalizar-compra" className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:brightness-110 active:scale-95">{t("cart.finalize")}<ArrowRight className="h-4 w-4" /></a>
                  <a href="/" className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm text-muted-foreground transition-all hover:border-primary/30 hover:text-white"><ArrowLeft className="h-4 w-4" />{t("cart.continue_adding")}</a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}