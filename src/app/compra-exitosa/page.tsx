"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CheckCircle2, ShoppingBag, ArrowRight } from "lucide-react";
import { t, getLanguage } from "@/i18n";

interface Orden {
  orderId: string;
  nombre: string;
  email: string;
  productos: { nombre: string; precio: string; cantidad: number }[];
  subtotal: number;
  iva: number;
  descuento: number;
  total: number;
  fecha: string;
}

export default function CompraExitosaPage() {
  const [orden, setOrden] = useState<Orden | null>(null);
  const [lang, setLang] = useState<string | null>(null);

  useEffect(() => {
    setLang(getLanguage());
    const handleLangChange = () => setLang(getLanguage());
    window.addEventListener("languagechange", handleLangChange);
    return () => window.removeEventListener("languagechange", handleLangChange);
  }, []);

  useEffect(() => {
    const ordenGuardada = JSON.parse(localStorage.getItem("klyro_ultima_orden") || "null");
    setOrden(ordenGuardada);
  }, []);

  if (!lang) {
    return (
      <main className="relative min-h-screen bg-background">
        <Navbar />
        <section className="pt-32 pb-20"><div className="container-dm" /></section>
        <Footer />
      </main>
    );
  }

  if (!orden) {
    return (
      <main className="relative min-h-screen bg-background">
        <Navbar />
        <section className="pt-32 pb-20 text-center">
          <p className="text-muted-foreground">{t("success.not_found")}</p>
          <a href="/" className="mt-4 inline-block text-primary hover:underline">{t("success.back_home")}</a>
        </section>
        <Footer />
      </main>
    );
  }

  const formatearPrecio = (cantidad: number): string => {
    return cantidad.toLocaleString("es-MX", { style: "currency", currency: "MXN", minimumFractionDigits: 2 });
  };

  return (
    <main className="relative min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-20">
        <div className="container-dm max-w-2xl">
          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
            <h1 className="mt-6 font-display text-4xl font-bold text-white sm:text-5xl">
              {t("success.title")}
            </h1>
            <p className="mt-4 text-muted-foreground">
              {t("success.message")}, {orden.nombre}. {t("success.email_sent")} <span className="text-primary">{orden.email}</span>.
            </p>
          </div>

          <div className="mt-12 rounded-2xl border border-primary/30 bg-primary/5 p-6 backdrop-blur-sm md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-bold text-white">{t("success.order_details")}</h2>
              <span className="rounded-full bg-primary/10 px-3 py-1 font-mono text-xs text-primary">{orden.orderId}</span>
            </div>

            <div className="space-y-3 border-b border-white/10 pb-4">
              {orden.productos.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.nombre} × {item.cantidad}</span>
                  <span className="text-white">{item.precio}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">{t("success.subtotal")}</span><span className="text-white">{formatearPrecio(orden.subtotal)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">{t("success.iva")}</span><span className="text-white">{formatearPrecio(orden.iva)}</span></div>
              {orden.descuento > 0 && <div className="flex justify-between text-sm"><span className="text-primary">{t("success.discount")}</span><span className="text-primary">-{formatearPrecio(orden.descuento)}</span></div>}
              <div className="flex justify-between border-t border-white/10 pt-2"><span className="font-semibold text-white">{t("success.total")}</span><span className="font-mono font-bold text-primary text-lg">{formatearPrecio(orden.total)}</span></div>
            </div>

            <div className="mt-4 text-sm text-muted-foreground">
<p>{t("success.date")}: {new Date(orden.fecha).toLocaleDateString(lang === "en" ? "en-US" : "es-MX", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}</p>            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a href="/" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:brightness-110 active:scale-95">
              <ShoppingBag className="h-5 w-5" />
              {t("success.continue_shopping")}
            </a>
            <a href="/carrito" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-8 py-3 font-semibold text-muted-foreground transition-all hover:border-primary/30 hover:text-white">
              <ArrowRight className="h-5 w-5" />
              {t("success.view_cart")}
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}