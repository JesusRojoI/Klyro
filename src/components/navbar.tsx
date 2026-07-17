"use client";

import { useEffect, useState } from "react";
import { Menu, X, ChevronDown, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { t, setLanguage, getLanguage } from "@/i18n";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState("es");
  const [mounted, setMounted] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setLang(getLanguage());
    setMounted(true);
  }, []);

  // Escuchar cambios en el carrito
  useEffect(() => {
    const updateCartCount = () => {
      const carrito = JSON.parse(localStorage.getItem("klyro_carrito") || "[]");
      const total = carrito.reduce((sum: number, item: { cantidad: number }) => sum + (item.cantidad || 1), 0);
      setCartCount(total);
    };

    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);
    window.addEventListener("storage", updateCartCount);
    
    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const toggleLang = () => {
    const newLang = lang === "es" ? "en" : "es";
    setLanguage(newLang);
    setLang(newLang);
  };

  const developmentLinks = [
    { label: mounted ? t("nav.development_apps") : "Desarrollo de Aplicaciones", href: "/desarrollo-de-aplicaciones/" },
    { label: mounted ? t("nav.development_business") : "Desarrollo Empresarial", href: "/desarrollo-empresarial/" },
    { label: mounted ? t("nav.development_specialized") : "Desarrollo de Software Especializado", href: "/desarrollo-software-especializado/" },
    { label: mounted ? t("nav.development_inventory") : "Sistemas de Inventario y Logística", href: "/sistemas-inventario-logistica/" },
    { label: mounted ? t("nav.development_services") : "Servicios Complementarios", href: "/servicios-complementarios/" },
  ];

  const trainingLinks = [
    { label: mounted ? t("nav.training_systems") : "Sistemas Informáticos", href: "/#sistemas-informaticos" },
    { label: mounted ? t("nav.training_languages") : "Lenguajes de Programación", href: "/#lenguajes" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/5 bg-[#0e0e10]/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="container-dm flex h-[76px] items-center justify-between">
        <a href="/" className="flex shrink-0 items-center">
          <Image src="/logo.svg" alt="Klyro" width={44} height={44} className="h-11 w-auto" />
        </a>

        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={toggleLang}
            className="flex h-10 items-center gap-1.5 rounded-full border border-white/10 px-3 text-sm text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
            title={lang === "es" ? "Switch to English" : "Cambiar a Español"}
          >
            <span className="text-base">{lang === "es" ? "🇲🇽" : "🇺🇸"}</span>
            <span className="text-xs font-medium">{lang === "es" ? "ES" : "EN"}</span>
          </button>

          <a href="/carrito" className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white shadow-lg shadow-primary/30">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </a>

          <a href="/cotiza" className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_30px_-8px_rgba(31,218,113,0.7)] transition-transform hover:scale-[1.03] active:scale-95 sm:px-6">
            {mounted ? t("nav.quote") : "Cotiza"}
          </a>

          <button type="button" aria-label="Abrir menú" onClick={() => setOpen(true)} className="flex h-10 w-10 items-center justify-center rounded-md text-white transition hover:bg-white/10">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>

      <div className={`fixed inset-0 z-[60] transition ${open ? "visible" : "invisible"}`}>
        <div onClick={() => setOpen(false)} className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`} />
        <aside className={`fixed right-0 top-0 flex h-screen w-[86%] max-w-sm flex-col overflow-y-auto border-l border-white/10 bg-[#0f0f12] p-7 shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
          <div className="mb-10 flex items-center justify-between">
            <Image src="/logo.svg" alt="Klyro" width={40} height={40} className="h-10 w-auto" />
            <button type="button" aria-label="Cerrar menú" onClick={() => setOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-md text-white transition hover:bg-white/10">
              <X className="h-6 w-6" />
            </button>
          </div>

          <a href="/" onClick={() => setOpen(false)} className="border-b border-white/5 py-4 font-display text-2xl font-semibold text-white transition hover:text-primary">
            {mounted ? t("nav.home") : "Inicio"}
          </a>

          <MenuGroup title={mounted ? t("nav.development_plans") : "Planes de Desarrollo"} links={developmentLinks} onNavigate={() => setOpen(false)} />
          <MenuGroup title={mounted ? t("nav.training") : "Capacitaciones"} links={trainingLinks} onNavigate={() => setOpen(false)} />

          <a href="/cotiza" onClick={() => setOpen(false)} className="mt-8 rounded-full bg-primary py-3.5 text-center text-base font-semibold text-white transition hover:brightness-110">
            {mounted ? t("nav.quote") : "Cotiza"}
          </a>

          <div className="mt-auto pt-10 text-sm text-muted-foreground">
            <p>conecta@klyro.mx</p>
            <p className="mt-1">55 5553 4107</p>
          </div>
        </aside>
      </div>
    </header>
  );
}

function MenuGroup({ title, links, onNavigate }: { title: string; links: { label: string; href: string }[]; onNavigate: () => void }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="border-b border-white/5">
      <button type="button" onClick={() => setExpanded((v) => !v)} className="flex w-full items-center justify-between py-4 text-left font-display text-2xl font-semibold text-white transition hover:text-primary">
        {title}
        <ChevronDown className={`h-5 w-5 transition-transform ${expanded ? "rotate-180" : ""}`} />
      </button>
      <div className={`grid transition-all duration-300 ${expanded ? "grid-rows-[1fr] pb-3" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          {links.map((link) => (
            <a key={link.label} href={link.href} onClick={onNavigate} className="block py-2.5 pl-1 text-[15px] text-muted-foreground transition hover:text-white">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}