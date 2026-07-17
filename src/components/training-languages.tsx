"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { t, getLanguage } from "@/i18n";

export function TrainingLanguages() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
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
      <section id="lenguajes" className="relative py-20 md:py-28">
        <div className="container-dm" />
      </section>
    );
  }

  const lenguajes = [
  {
    id: 602,
    nombre: t("training_languages.python"),
    precio: `4,560 MXN ${t("common.tax")}`,
    descripcion: t("training_languages.python_desc"),
    logo: "/python.svg",
    caracteristicas: [
      t("training_languages.python_1"),
      t("training_languages.python_2"),
      t("training_languages.python_3"),
      t("training_languages.python_4"),
      t("training_languages.python_5"),
      t("training_languages.python_6"),
    ],
  },
  {
    id: 603,
    nombre: t("training_languages.java"),
    precio: `5,600 MXN ${t("common.tax")}`,
    descripcion: t("training_languages.java_desc"),
    logo: "/java.svg",
    caracteristicas: [
      t("training_languages.java_1"),
      t("training_languages.java_2"),
      t("training_languages.java_3"),
      t("training_languages.java_4"),
      t("training_languages.java_5"),
      t("training_languages.java_6"),
    ],
  },
  {
    id: 604,
    nombre: t("training_languages.csharp"),
    precio: `6,550 MXN ${t("common.tax")}`,
    descripcion: t("training_languages.csharp_desc"),
    logo: "/cpp.svg",
    caracteristicas: [
      t("training_languages.csharp_1"),
      t("training_languages.csharp_2"),
      t("training_languages.csharp_3"),
      t("training_languages.csharp_4"),
      t("training_languages.csharp_5"),
      t("training_languages.csharp_6"),
    ],
  },
  {
    id: 601,
    nombre: t("training_languages.javascript"),
    precio: `3,850 MXN ${t("common.tax")}`,
    descripcion: t("training_languages.javascript_desc"),
    logo: "/javascript.svg",
    caracteristicas: [
      t("training_languages.javascript_1"),
      t("training_languages.javascript_2"),
      t("training_languages.javascript_3"),
      t("training_languages.javascript_4"),
      t("training_languages.javascript_5"),
      t("training_languages.javascript_6"),
    ],
  },
  {
    id: 605,
    nombre: t("training_languages.php"),
    precio: `5,140 MXN ${t("common.tax")}`,
    descripcion: t("training_languages.php_desc"),
    logo: "/php.svg",
    caracteristicas: [
      t("training_languages.php_1"),
      t("training_languages.php_2"),
      t("training_languages.php_3"),
      t("training_languages.php_4"),
      t("training_languages.php_5"),
      t("training_languages.php_6"),
    ],
  },
  {
    id: 606,
    nombre: t("training_languages.sql"),
    precio: `3,900 MXN ${t("common.tax")}`,
    descripcion: t("training_languages.sql_desc"),
    logo: "/sql.svg",
    caracteristicas: [
      t("training_languages.sql_1"),
      t("training_languages.sql_2"),
      t("training_languages.sql_3"),
      t("training_languages.sql_4"),
      t("training_languages.sql_5"),
      t("training_languages.sql_6"),
    ],
  },
];

  const plan = lenguajes[activeTab];

  const handleSeleccionarPlan = (planId: number) => {
    setPlanSeleccionado(planId);
    const p = lenguajes.find(l => l.id === planId);
    if (p) {
      const carritoActual = JSON.parse(localStorage.getItem("klyro_carrito") || "[]");
      const existe = carritoActual.find((item: any) => item.id === p.id);
      
      if (existe) {
        existe.cantidad += 1;
      } else {
        carritoActual.push({
          id: p.id,
          nombre: p.nombre,
          precio: p.precio,
          tipo: "Capacitación - Lenguajes de Programación",
          cantidad: 1,
          fecha: new Date().toISOString(),
        });
      }
      
      localStorage.setItem("klyro_carrito", JSON.stringify(carritoActual));
      router.push("/carrito");
    }
  };

  return (
    <section id="lenguajes" className="relative py-20 md:py-28">
      <div className="container-dm">
        <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.25em] text-primary">
          {t("training_languages.badge")}
        </span>
        <h2 className="max-w-2xl font-display text-4xl font-bold leading-[1.05] text-white sm:text-5xl md:text-6xl">
          {t("training_languages.title")}
        </h2>
        <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
          {t("training_languages.description")}
        </p>

        <div className="mt-12 w-full md:w-[90%] mx-auto">
          <div className="flex flex-wrap gap-1 border-b border-white/10">
            {lenguajes.map((langItem, index) => (
              <button
                key={langItem.id}
                onClick={() => { setActiveTab(index); setPlanSeleccionado(null); }}
                className={`group relative flex items-center gap-2 px-5 py-3 text-sm font-medium transition-all duration-200 rounded-t-xl ${activeTab === index ? "bg-white/[0.03] text-white border border-white/10 border-b-transparent -mb-px" : "text-muted-foreground hover:text-white hover:bg-white/[0.02] border border-transparent"}`}
              >
                <Image src={langItem.logo} alt={langItem.nombre} width={20} height={20} className={`h-5 w-5 object-contain transition-all ${activeTab === index ? "opacity-100" : "opacity-50 group-hover:opacity-80"}`} style={{ filter: activeTab === index ? "brightness(0) saturate(100%) invert(67%) sepia(72%) saturate(495%) hue-rotate(97deg) brightness(95%) contrast(88%)" : "brightness(0) saturate(100%) invert(50%)" }} />
                <span className="hidden sm:inline">{langItem.nombre}</span>
                {activeTab === index && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />}
              </button>
            ))}
          </div>

          <div className="rounded-b-2xl border border-white/10 border-t-0 bg-white/[0.02] backdrop-blur-sm p-6 md:p-10">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-[45%] flex flex-col items-center justify-center text-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl animate-pulse" />
                  <Image src={plan.logo} alt={plan.nombre} width={100} height={100} className="relative h-24 w-24 object-contain transition-transform duration-700 hover:scale-110" style={{ filter: "brightness(0) saturate(100%) invert(67%) sepia(72%) saturate(495%) hue-rotate(97deg) brightness(95%) contrast(88%)" }} />
                </div>
                <h3 className="font-display text-3xl font-bold text-white sm:text-4xl">{plan.nombre}</h3>
                <p className="mt-2 text-lg text-muted-foreground">{plan.descripcion}</p>
                <p className="mt-4 font-mono text-3xl font-bold text-primary">{plan.precio}</p>
                <button onClick={() => handleSeleccionarPlan(plan.id)} className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-base font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:brightness-110 active:scale-95">
                  {planSeleccionado === plan.id ? <><CheckCircle2 className="h-5 w-5" />{t("training_languages.plan_selected")}</> : <>{t("training_languages.select_plan")}<ArrowRight className="h-5 w-5" /></>}
                </button>
              </div>
              <div className="md:w-[55%] flex flex-col justify-center">
                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">{t("training_languages.content")}</h4>
                <ul className="space-y-3">
                  {plan.caracteristicas.map((caract, i) => (
                    <li key={caract} className="flex items-start gap-3 animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">{i + 1}</div>
                      <span className="text-muted-foreground leading-relaxed">{caract}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}