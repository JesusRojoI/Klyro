"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  FileText,
  Layers,
  Zap
} from "lucide-react";

const planes = [
  {
    id: 1,
    nombre: "Software Básico",
    precio: "11,420 MXN + IVA",
    descripcion: "Funcionalidades limitadas, sin integración con otros sistemas, diseño estándar.",
    icono: FileText,
    caracteristicas: [
      "Funcionalidades esenciales",
      "Diseño estándar",
      "Reportes básicos",
      "Soporte por correo",
      "Actualizaciones menores",
      "Documentación básica",
    ],
    color: "from-emerald-500/20 to-green-500/20",
    borderColor: "border-emerald-500/30",
    badgeColor: "bg-emerald-500/20 text-emerald-400",
  },
  {
    id: 2,
    nombre: "Software Intermedio",
    precio: "26,730 MXN + IVA",
    descripcion: "Integración con otros sistemas, reportes personalizados, diseño más elaborado.",
    icono: Layers,
    caracteristicas: [
      "Integración con otros sistemas",
      "Reportes personalizados",
      "Diseño elaborado",
      "Panel de administración",
      "Soporte prioritario",
      "Capacitación incluida",
      "Actualizaciones por 1 año",
    ],
    color: "from-primary/30 to-primary/10",
    borderColor: "border-primary/30",
    badgeColor: "bg-primary/20 text-primary",
  },
  {
    id: 3,
    nombre: "Software Avanzado",
    precio: "53,210 MXN + IVA",
    descripcion: "Integración completa con otros sistemas, automatización de procesos, diseño personalizado y soporte técnico.",
    icono: Zap,
    caracteristicas: [
      "Integración completa",
      "Automatización de procesos",
      "Diseño personalizado",
      "Soporte técnico 24/7",
      "Módulos ilimitados",
      "API personalizada",
      "Capacitación avanzada",
      "Actualizaciones por 3 años",
      "Respaldo y recuperación",
    ],
    color: "from-violet-500/20 to-purple-500/20",
    borderColor: "border-violet-500/30",
    badgeColor: "bg-violet-500/20 text-violet-400",
  },
];

export default function DesarrolloSoftwareEspecializadoPage() {
  const router = useRouter();
  const [planSeleccionado, setPlanSeleccionado] = useState<number | null>(null);

  const handleSeleccionarPlan = (planId: number) => {
    setPlanSeleccionado(planId);
    const plan = planes.find(p => p.id === planId);
    if (plan) {
      const carritoActual = JSON.parse(localStorage.getItem("klyro_carrito") || "[]");
      const existe = carritoActual.find((item: any) => item.id === plan.id);
      
      if (!existe) {
        carritoActual.push({
          id: plan.id,
          nombre: plan.nombre,
          precio: plan.precio,
          tipo: "Desarrollo de Software Especializado",
          cantidad: 1,
          fecha: new Date().toISOString(),
        });
        localStorage.setItem("klyro_carrito", JSON.stringify(carritoActual));
      }
      
      router.push("/carrito");
    }
  };

  return (
    <main className="relative min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="pointer-events-none absolute -right-40 top-24 h-[520px] w-[520px] rounded-full bg-primary/15 blur-[130px]" />
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-[380px] w-[720px] -translate-x-1/2 bg-primary/8 blur-[120px]" />

        <div className="container-dm relative">
          <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
            <a href="/" className="hover:text-primary transition-colors">Inicio</a>
            <span>/</span>
            <a href="#servicios" className="hover:text-primary transition-colors">Planes de Desarrollo</a>
            <span>/</span>
            <span className="text-white">Desarrollo de Software Especializado</span>
          </div>

          <div className="text-center">
            <h1 className="font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Desarrollo de <span className="text-primary">Software Especializado</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Desarrollamos software a medida para la gestión financiera, contable y administrativa, con herramientas que agilizan y aseguran la operación.
            </p>
          </div>

          {/* Imagen decorativa */}
          <div className="mt-12 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/20 to-emerald-500/20 blur-3xl" />
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=300&fit=crop"
                alt="Software especializado Klyro"
                className="relative h-48 w-full max-w-[600px] rounded-3xl border border-white/10 object-cover backdrop-blur-sm sm:h-64"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Planes Section */}
      <section className="py-20">
        <div className="container-dm">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
              Conoce Nuestros Planes
            </h2>
            <p className="mt-4 text-muted-foreground">
              Elige el plan que mejor se adapte a tu negocio
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {planes.map((plan, index) => (
              <div
                key={plan.id}
                className="animate-fade-up group relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-2xl"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col h-full p-8">
                  <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${plan.badgeColor} text-sm font-bold`}>
                    0{plan.id}
                  </div>

                  <div className={`mt-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${plan.color} border ${plan.borderColor}`}>
                    <plan.icono className="h-8 w-8 text-primary" />
                  </div>

                  <h3 className="mt-6 font-display text-2xl font-bold text-white">
                    {plan.nombre}
                  </h3>

                  <p className="mt-3 font-mono text-lg font-bold text-primary">
                    {plan.precio}
                  </p>

                  <p className="mt-3 text-sm text-muted-foreground">
                    {plan.descripcion}
                  </p>

                  <ul className="mt-6 space-y-3 flex-1">
                    {plan.caracteristicas.map((caract) => (
                      <li key={caract} className="flex items-start gap-3 text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span className="text-muted-foreground">{caract}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleSeleccionarPlan(plan.id)}
                    className="mt-auto flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:brightness-110 active:scale-95"
                  >
                    {planSeleccionado === plan.id ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        Plan Seleccionado
                      </>
                    ) : (
                      <>
                        Seleccionar Plan
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20">
        <div className="container-dm">
          <div className="animate-fade-up relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-background to-emerald-500/10 backdrop-blur-sm">
            <div className="pointer-events-none absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-primary/15 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-[250px] w-[250px] rounded-full bg-emerald-500/10 blur-[100px]" />
            
            <div className="relative grid grid-cols-1 items-center gap-10 p-8 md:grid-cols-2 md:p-12 lg:p-16">
              <div className="z-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary">
                  <Sparkles className="h-4 w-4" />
                  ¿Listo para empezar?
                </div>
                
                <h2 className="mt-6 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                  ¡Solicita tu cotización <span className="text-primary">Personalizado!</span>
                </h2>
                
                <p className="mt-4 max-w-md text-muted-foreground">
                  Cuéntanos sobre tu proyecto y te enviaremos una propuesta a la medida. Sin compromisos.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Sin costo inicial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Respuesta en 24h</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Asesoría gratuita</span>
                  </div>
                </div>

                <a
                  href="/cotiza"
                  className="group mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:brightness-110 hover:shadow-xl hover:shadow-primary/40 active:scale-95"
                >
                  Solicitar Cotización
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>

              <div className="relative z-10 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/20 to-emerald-500/20 blur-3xl" />
                  <img
                    src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&h=300&fit=crop"
                    alt="Cotización personalizada Klyro"
                    className="relative h-auto w-full max-w-[300px] rounded-3xl object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}