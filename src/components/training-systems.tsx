"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { t, getLanguage } from "@/i18n";

const sistemasKeys = [
  { key: "windows", id: 501, logo: "/windows.svg", features: 7, precioNum: "6,550" },
  { key: "linux", id: 502, logo: "/linux.svg", features: 4, precioNum: "5,820" },
  { key: "macos", id: 503, logo: "/macos.svg", features: 4, precioNum: "3,640" },
  { key: "dolibarr", id: 504, logo: "/dolibarr.svg", features: 4, precioNum: "5,980" },
  { key: "sap", id: 505, logo: "/saps4hana.svg", features: 6, precioNum: "7,440" },
  { key: "administratool", id: 506, logo: "/administratool.svg", features: 4, precioNum: "2,600" },
];

export function TrainingSystems() {
  const router = useRouter();
  const [planSeleccionado, setPlanSeleccionado] = useState<number | null>(null);
  const [lang, setLang] = useState<string | null>(null);

  useEffect(() => {
    setLang(getLanguage());
    const handleLangChange = () => setLang(getLanguage());
    window.addEventListener("languagechange", handleLangChange);
    return () => window.removeEventListener("languagechange", handleLangChange);
  }, []);

  const handleSeleccionarPlan = (id: number, nombre: string, precio: string) => {
    setPlanSeleccionado(id);
    const carritoActual = JSON.parse(localStorage.getItem("klyro_carrito") || "[]");
    const existe = carritoActual.find((item: any) => item.id === id);
    if (existe) { existe.cantidad += 1; }
    else { carritoActual.push({ id, nombre, precio, tipo: "Capacitación - Sistemas Informáticos", cantidad: 1, fecha: new Date().toISOString() }); }
    localStorage.setItem("klyro_carrito", JSON.stringify(carritoActual));
    router.push("/carrito");
  };

  if (!lang) {
    return <section id="sistemas-informaticos" className="relative py-20 md:py-28"><div className="container-dm" /></section>;
  }

  const sistemas = sistemasKeys.map(s => ({
    id: s.id,
    nombre: t(`training_systems.${s.key}`),
    descripcion: t(`training_systems.${s.key}_desc`),
    precio: `${s.precioNum} MXN ${t("common.tax")}`,
    logo: s.logo,
    caracteristicas: Array.from({ length: s.features }, (_, i) => t(`training_systems.${s.key}_${i + 1}`)),
  }));

  return (
    <section id="sistemas-informaticos" className="relative py-20 md:py-28">
      <div className="container-dm">
        <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.25em] text-primary">{t("training_systems.badge")}</span>
        <h2 className="max-w-2xl font-display text-4xl font-bold leading-[1.05] text-white sm:text-5xl md:text-6xl">{t("training_systems.title")}</h2>
        <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">{t("training_systems.description")}</p>

        <div className="mt-14 flex flex-col gap-6">
          {sistemas.map((plan, index) => {
            const esPar = index % 2 === 0;
            return (
              <div key={plan.id} className="animate-fade-up group relative rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm transition-all duration-300 hover:border-primary/30 w-full md:w-[90%] mx-auto overflow-hidden" style={{ animationDelay: `${index * 100}ms` }}>
                <div className={`relative flex flex-col md:flex-row ${esPar ? "" : "md:flex-row-reverse"}`}>
                  <div className="p-8 md:w-[40%] flex flex-col justify-center">
                    <ul className="space-y-2">
                      {plan.caracteristicas.map((caract) => (
                        <li key={caract} className="flex items-start gap-2 text-sm"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span className="text-muted-foreground">{caract}</span></li>
                      ))}
                    </ul>
                  </div>
                  <div className={`relative p-8 md:w-[60%] flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/10 ${esPar ? "md:border-l" : "md:border-l-0 md:border-r"}`}>
                    <div className="absolute right-4 top-[30%] md:right-6 md:top-[30%] pointer-events-none select-none opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-500">
                      <Image src={plan.logo} alt="" width={160} height={160} className="h-32 w-32 md:h-40 md:w-40 object-contain rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-700" style={{ filter: "brightness(0) saturate(100%) invert(67%) sepia(72%) saturate(495%) hue-rotate(97deg) brightness(95%) contrast(88%)" }} />
                    </div>
                    <h3 className="font-display text-3xl font-bold text-white leading-tight sm:text-4xl relative z-10">{plan.nombre}</h3>
                    <p className="mt-2 text-base text-muted-foreground relative z-10">{plan.descripcion}</p>
                    <p className="mt-4 font-mono text-2xl font-bold text-primary relative z-10">{plan.precio}</p>
                    <button onClick={() => handleSeleccionarPlan(plan.id, plan.nombre, plan.precio)} className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-base font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:brightness-110 active:scale-95 w-fit relative z-10">
                      {planSeleccionado === plan.id ? <><CheckCircle2 className="h-5 w-5" />{t("training_systems.plan_selected")}</> : <>{t("training_systems.select_plan")}<ArrowRight className="h-5 w-5" /></>}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}