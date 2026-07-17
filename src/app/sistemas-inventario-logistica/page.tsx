"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Package,
  Layers,
  Zap
} from "lucide-react";
import { t, getLanguage } from "@/i18n";

export default function SistemasInventarioLogisticaPage() {
  const router = useRouter();
  const [planSeleccionado, setPlanSeleccionado] = useState<number | null>(null);
  const [lang, setLang] = useState<string | null>(null);

  useEffect(() => {
    setLang(getLanguage());
    const handleLangChange = () => setLang(getLanguage());
    window.addEventListener("languagechange", handleLangChange);
    return () => window.removeEventListener("languagechange", handleLangChange);
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

  const planes = [
    {
      id: 401,
      nombre: t("inventory.basic"),
      precio: `6,540 MXN ${t("common.tax")}`,
      descripcion: t("inventory.basic_desc"),
      icono: Package,
      caracteristicas: [t("inventory.basic_1"), t("inventory.basic_2"), t("inventory.basic_3"), t("inventory.basic_4"), t("inventory.basic_5"), t("inventory.basic_6")],
      color: "from-emerald-500/20 to-green-500/20", borderColor: "border-emerald-500/30", badgeColor: "bg-emerald-500/20 text-emerald-400",
    },
    {
      id: 402,
      nombre: t("inventory.intermediate"),
      precio: `14,920 MXN ${t("common.tax")}`,
      descripcion: t("inventory.intermediate_desc"),
      icono: Layers,
      caracteristicas: [t("inventory.intermediate_1"), t("inventory.intermediate_2"), t("inventory.intermediate_3"), t("inventory.intermediate_4"), t("inventory.intermediate_5"), t("inventory.intermediate_6"), t("inventory.intermediate_7")],
      color: "from-primary/30 to-primary/10", borderColor: "border-primary/30", badgeColor: "bg-primary/20 text-primary",
    },
    {
      id: 403,
      nombre: t("inventory.advanced"),
      precio: `28,310 MXN ${t("common.tax")}`,
      descripcion: t("inventory.advanced_desc"),
      icono: Zap,
      caracteristicas: [t("inventory.advanced_1"), t("inventory.advanced_2"), t("inventory.advanced_3"), t("inventory.advanced_4"), t("inventory.advanced_5"), t("inventory.advanced_6"), t("inventory.advanced_7"), t("inventory.advanced_8"), t("inventory.advanced_9")],
      color: "from-violet-500/20 to-purple-500/20", borderColor: "border-violet-500/30", badgeColor: "bg-violet-500/20 text-violet-400",
    },
  ];

  const handleSeleccionarPlan = (planId: number) => {
    setPlanSeleccionado(planId);
    const plan = planes.find(p => p.id === planId);
    if (plan) {
      const carritoActual = JSON.parse(localStorage.getItem("klyro_carrito") || "[]");
      const existe = carritoActual.find((item: any) => item.id === plan.id);
      if (!existe) {
        carritoActual.push({ id: plan.id, nombre: plan.nombre, precio: plan.precio, tipo: "Sistemas de Inventario y Logística", cantidad: 1, fecha: new Date().toISOString() });
        localStorage.setItem("klyro_carrito", JSON.stringify(carritoActual));
      }
      router.push("/carrito");
    }
  };

  return (
    <main className="relative min-h-screen bg-background">
      <Navbar />
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="pointer-events-none absolute -right-40 top-24 h-[520px] w-[520px] rounded-full bg-primary/15 blur-[130px]" />
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-[380px] w-[720px] -translate-x-1/2 bg-primary/8 blur-[120px]" />
        <div className="container-dm relative">
          <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
            <a href="/" className="hover:text-primary transition-colors">{t("inventory.breadcrumb_home")}</a>
            <span>/</span>
            <a href="/#servicios" className="hover:text-primary transition-colors">{t("inventory.breadcrumb_plans")}</a>
            <span>/</span>
            <span className="text-white">{t("inventory.title")}</span>
          </div>
          <div className="text-center">
            <h1 className="font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl">{t("inventory.heading")}</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">{t("inventory.description")}</p>
          </div>
          <div className="mt-12 flex justify-center">
            
            
            <div className="relative"><div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/20 to-emerald-500/20 blur-3xl" /><img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=300&fit=crop" alt={t("inventory.image_alt")} className="relative h-48 w-full max-w-[600px] rounded-3xl border border-white/10 object-cover backdrop-blur-sm sm:h-64" /></div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-dm">
          <div className="text-center"><h2 className="font-display text-3xl font-bold text-white sm:text-4xl">{t("inventory.plans_title")}</h2><p className="mt-4 text-muted-foreground">{t("inventory.plans_subtitle")}</p></div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {planes.map((plan, index) => (
              <div key={plan.id} className="animate-fade-up group relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-2xl" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex flex-col h-full p-8">
                  <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${plan.badgeColor} text-sm font-bold`}>0{index + 1}</div>
                  <div className={`mt-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${plan.color} border ${plan.borderColor}`}><plan.icono className="h-8 w-8 text-primary" /></div>
                  <h3 className="mt-6 font-display text-2xl font-bold text-white">{plan.nombre}</h3>
                  <p className="mt-3 font-mono text-lg font-bold text-primary">{plan.precio}</p>
                  <p className="mt-3 text-sm text-muted-foreground">{plan.descripcion}</p>
                  <ul className="mt-6 space-y-3 flex-1">{plan.caracteristicas.map((caract) => (<li key={caract} className="flex items-start gap-3 text-sm"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span className="text-muted-foreground">{caract}</span></li>))}</ul>
                  <button onClick={() => handleSeleccionarPlan(plan.id)} className="mt-auto flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:brightness-110 active:scale-95">
                    {planSeleccionado === plan.id ? <><CheckCircle2 className="h-4 w-4" />{t("inventory.plan_selected")}</> : <>{t("inventory.select_plan")}<ArrowRight className="h-4 w-4" /></>}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-dm">
          <div className="animate-fade-up relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-background to-emerald-500/10 backdrop-blur-sm">
            <div className="pointer-events-none absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-primary/15 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-[250px] w-[250px] rounded-full bg-emerald-500/10 blur-[100px]" />
            <div className="relative grid grid-cols-1 items-center gap-10 p-8 md:grid-cols-2 md:p-12 lg:p-16">
              <div className="z-10"><div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary"><Sparkles className="h-4 w-4" />{t("inventory.cta_badge")}</div><h2 className="mt-6 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{t("inventory.cta_title")}</h2><p className="mt-4 max-w-md text-muted-foreground">{t("inventory.cta_description")}</p><div className="mt-6 flex flex-wrap items-center gap-4"><div className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-primary" /><span className="text-sm text-muted-foreground">{t("inventory.cta_free")}</span></div><div className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-primary" /><span className="text-sm text-muted-foreground">{t("inventory.cta_response")}</span></div><div className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-primary" /><span className="text-sm text-muted-foreground">{t("inventory.cta_advice")}</span></div></div><a href="/cotiza" className="group mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:brightness-110 hover:shadow-xl hover:shadow-primary/40 active:scale-95">{t("inventory.cta_button")}<ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" /></a></div>
              <div className="relative z-10 flex justify-center"><div className="relative"><div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/20 to-emerald-500/20 blur-3xl" /><img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=300&fit=crop" alt={t("inventory.cta_image_alt")} className="relative h-auto w-full max-w-[300px] rounded-3xl object-cover" /></div></div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}