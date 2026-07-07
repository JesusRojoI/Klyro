"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";

const lenguajes = [
  {
    id: 601,
    nombre: "JavaScript",
    precio: "3,850 MXN + IVA",
    descripcion: "Online 10 horas",
    logo: "/javascript.svg",
    color: "#F7DF1E",
    caracteristicas: [
      "Fundamentos de JavaScript y configuración del entorno",
      "Sintaxis básica y estructuras de control",
      "Manipulación del DOM y eventos",
      "Funciones y objetos",
      "Introducción a ES6 y promesas",
      "Uso de herramientas como Node.js y npm",
    ],
  },
  {
    id: 602,
    nombre: "Python",
    precio: "4,200 MXN + IVA",
    descripcion: "Online 12 horas",
    logo: "/python.svg",
    color: "#3776AB",
    caracteristicas: [
      "Fundamentos de Python y configuración del entorno",
      "Estructuras de datos y control de flujo",
      "Funciones, módulos y paquetes",
      "Manejo de archivos y excepciones",
      "Introducción a POO en Python",
      "Uso de librerías populares (NumPy, Pandas)",
    ],
  },
  {
    id: 603,
    nombre: "Java",
    precio: "4,500 MXN + IVA",
    descripcion: "Online 14 horas",
    logo: "/java.svg",
    color: "#ED8B00",
    caracteristicas: [
      "Fundamentos de Java y configuración del entorno",
      "Programación orientada a objetos",
      "Manejo de excepciones y colecciones",
      "Interfaces gráficas con JavaFX",
      "Conexión a bases de datos con JDBC",
      "Introducción a Spring Boot",
    ],
  },
  {
    id: 604,
    nombre: "C#",
    precio: "4,350 MXN + IVA",
    descripcion: "Online 12 horas",
    logo: "/cpp.svg",
    color: "#9B4F96",
    caracteristicas: [
      "Fundamentos de C# y .NET",
      "Programación orientada a objetos",
      "Manejo de excepciones y delegados",
      "LINQ y manejo de datos",
      "Desarrollo de aplicaciones Windows Forms",
      "Introducción a ASP.NET Core",
    ],
  },
  {
    id: 605,
    nombre: "PHP",
    precio: "3,200 MXN + IVA",
    descripcion: "Online 8 horas",
    logo: "/php.svg",
    color: "#777BB4",
    caracteristicas: [
      "Fundamentos de PHP y configuración del entorno",
      "Sintaxis básica y tipos de datos",
      "Manejo de formularios y sesiones",
      "Conexión a bases de datos MySQL",
      "Programación orientada a objetos en PHP",
      "Introducción a Laravel",
    ],
  },
  {
    id: 606,
    nombre: "SQL",
    precio: "2,800 MXN + IVA",
    descripcion: "Online 6 horas",
    logo: "/sql.svg",
    color: "#00758F",
    caracteristicas: [
      "Fundamentos de bases de datos relacionales",
      "Consultas SELECT avanzadas",
      "JOINs y subconsultas",
      "Funciones de agregación y agrupamiento",
      "Procedimientos almacenados y triggers",
      "Optimización y buenas prácticas",
    ],
  },
];

export function TrainingLanguages() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [planSeleccionado, setPlanSeleccionado] = useState<number | null>(null);

  const plan = lenguajes[activeTab];

  const handleSeleccionarPlan = (planId: number) => {
    setPlanSeleccionado(planId);
    const plan = lenguajes.find(p => p.id === planId);
    if (plan) {
      const carritoActual = JSON.parse(localStorage.getItem("klyro_carrito") || "[]");
      const existe = carritoActual.find((item: any) => item.id === plan.id);
      
      if (existe) {
        existe.cantidad += 1;
      } else {
        carritoActual.push({
          id: plan.id,
          nombre: plan.nombre,
          precio: plan.precio,
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
          Capacitación
        </span>
        <h2 className="max-w-2xl font-display text-4xl font-bold leading-[1.05] text-white sm:text-5xl md:text-6xl">
          Capacitación en Lenguajes de Programación
        </h2>
        <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
          Domina los lenguajes más demandados con instructores expertos y contenido actualizado.
        </p>

        {/* Contenedor de pestañas */}
        <div className="mt-12 w-full md:w-[90%] mx-auto">
          {/* Pestañas - tipo navegador */}
          <div className="flex flex-wrap gap-1 border-b border-white/10">
            {lenguajes.map((lang, index) => (
              <button
                key={lang.id}
                onClick={() => {
                  setActiveTab(index);
                  setPlanSeleccionado(null);
                }}
                className={`group relative flex items-center gap-2 px-5 py-3 text-sm font-medium transition-all duration-200 rounded-t-xl ${
                  activeTab === index
                    ? "bg-white/[0.03] text-white border border-white/10 border-b-transparent -mb-px"
                    : "text-muted-foreground hover:text-white hover:bg-white/[0.02] border border-transparent"
                }`}
              >
                <Image
                  src={lang.logo}
                  alt={lang.nombre}
                  width={20}
                  height={20}
                  className={`h-5 w-5 object-contain transition-all ${
                    activeTab === index ? "opacity-100" : "opacity-50 group-hover:opacity-80"
                  }`}
                  style={{
                    filter: activeTab === index
                      ? "brightness(0) saturate(100%) invert(67%) sepia(72%) saturate(495%) hue-rotate(97deg) brightness(95%) contrast(88%)"
                      : "brightness(0) saturate(100%) invert(50%)",
                  }}
                />
                <span className="hidden sm:inline">{lang.nombre}</span>
                {activeTab === index && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Contenido de la pestaña activa */}
          <div className="rounded-b-2xl border border-white/10 border-t-0 bg-white/[0.02] backdrop-blur-sm p-6 md:p-10">
            <div className="flex flex-col md:flex-row gap-8">
              
              {/* Logo y datos principales */}
              <div className="md:w-[45%] flex flex-col items-center justify-center text-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl animate-pulse" />
                  <Image
                    src={plan.logo}
                    alt={plan.nombre}
                    width={100}
                    height={100}
                    className="relative h-24 w-24 object-contain transition-transform duration-700 hover:scale-110"
                    style={{
                      filter: "brightness(0) saturate(100%) invert(67%) sepia(72%) saturate(495%) hue-rotate(97deg) brightness(95%) contrast(88%)",
                    }}
                  />
                </div>
                
                <h3 className="font-display text-3xl font-bold text-white sm:text-4xl">
                  {plan.nombre}
                </h3>
                
                <p className="mt-2 text-lg text-muted-foreground">
                  {plan.descripcion}
                </p>
                
                <p className="mt-4 font-mono text-3xl font-bold text-primary">
                  {plan.precio}
                </p>
                
                <button
                  onClick={() => handleSeleccionarPlan(plan.id)}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-base font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:brightness-110 active:scale-95"
                >
                  {planSeleccionado === plan.id ? (
                    <>
                      <CheckCircle2 className="h-5 w-5" />
                      Plan Seleccionado
                    </>
                  ) : (
                    <>
                      Seleccionar Plan
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </div>

              {/* Características */}
              <div className="md:w-[55%] flex flex-col justify-center">
                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
                  Contenido del curso
                </h4>
                <ul className="space-y-3">
                  {plan.caracteristicas.map((caract, i) => (
                    <li key={caract} className="flex items-start gap-3 animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                        {i + 1}
                      </div>
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