"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";

const sistemas = [
  {
    id: 501,
    nombre: "Capacitación en Sistema Windows",
    precio: "6,550 MXN + IVA",
    descripcion: "Online 10 horas",
    logo: "/windows.svg",
    caracteristicas: [
      "Instalación y configuración del sistema operativo",
      "Gestión de usuarios y permisos",
      "Mantenimiento y actualización del sistema",
      "Solución de problemas comunes",
      "Uso de la terminal y comandos esenciales",
      "Gestión de paquetes y actualizaciones",
      "Manejo de permisos y usuarios",
    ],
  },
  {
    id: 502,
    nombre: "Capacitación en Sistema Linux",
    precio: "5,820 MXN + IVA",
    descripcion: "Online 8 horas",
    logo: "/linux.svg",
    caracteristicas: [
      "Instalación y configuración básica",
      "Uso de la terminal y comandos esenciales",
      "Gestión de paquetes y actualizaciones",
      "Manejo de permisos y usuarios",
    ],
  },
  {
    id: 503,
    nombre: "Capacitación en Sistema macOS",
    precio: "3,640 MXN + IVA",
    descripcion: "Online 8 horas",
    logo: "/macos.svg",
    caracteristicas: [
      "Navegación y personalización del sistema",
      "Uso de aplicaciones nativas",
      "Mantenimiento y seguridad del sistema",
      "Solución de problemas comunes",
    ],
  },
  {
    id: 504,
    nombre: "Capacitación en Sistema Dolibarr ERP/CRM",
    precio: "5,980 MXN + IVA",
    descripcion: "Online 14 horas",
    logo: "/dolibarr.svg",
    caracteristicas: [
      "Instalación y configuración del sistema",
      "Gestión de clientes y proveedores",
      "Manejo de inventarios y pedidos",
      "Generación de facturas y reportes",
    ],
  },
  {
    id: 505,
    nombre: "Capacitación en Sistema SAP S/4HANA",
    precio: "7,440 MXN + IVA",
    descripcion: "Online 16 horas",
    logo: "/saps4hana.svg",
    caracteristicas: [
      "Introducción a SAP S/4HANA",
      "Configuración y personalización del sistema",
      "Gestión de módulos clave (finanzas, logística, RRHH)",
      "Generación de reportes y análisis de datos",
      "Gestión de inventarios y compras",
      "Manejo de ventas y facturación",
    ],
  },
  {
    id: 506,
    nombre: "Capacitación en Sistema Administratool ERP",
    precio: "2,600 MXN + IVA",
    descripcion: "Online 4 horas",
    logo: "/administratool.svg",
    caracteristicas: [
      "Configuración inicial del sistema",
      "Gestión de inventarios y compras",
      "Manejo de ventas y facturación",
      "Generación de reportes básicos",
    ],
  },
];

export function TrainingSystems() {
  const router = useRouter();
  const [planSeleccionado, setPlanSeleccionado] = useState<number | null>(null);

  const handleSeleccionarPlan = (planId: number) => {
    setPlanSeleccionado(planId);
    const plan = sistemas.find(p => p.id === planId);
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
          tipo: "Capacitación - Sistemas Informáticos",
          cantidad: 1,
          fecha: new Date().toISOString(),
        });
      }
      
      localStorage.setItem("klyro_carrito", JSON.stringify(carritoActual));
      router.push("/carrito");
    }
  };

  return (
    <section id="sistemas-informaticos" className="relative py-20 md:py-28">
      <div className="container-dm">
        <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.25em] text-primary">
          Capacitación
        </span>
        <h2 className="max-w-2xl font-display text-4xl font-bold leading-[1.05] text-white sm:text-5xl md:text-6xl">
          Domina sistemas, transforma negocios
        </h2>
        <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
          Klyro crece contigo y tu personal para asegurar tu futuro con capacitación efectiva.
        </p>

        <div className="mt-14 flex flex-col gap-6">
          {sistemas.map((plan, index) => {
            const esPar = index % 2 === 0;
            
            return (
              <div
                key={plan.id}
                className="animate-fade-up group relative rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm transition-all duration-300 hover:border-primary/30 w-full md:w-[90%] mx-auto overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`relative flex flex-col md:flex-row ${esPar ? "" : "md:flex-row-reverse"}`}>
                  
                  {/* Características - 40% */}
                  <div className="p-8 md:w-[40%] flex flex-col justify-center">
                    <ul className="space-y-2">
                      {plan.caracteristicas.map((caract) => (
                        <li key={caract} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span className="text-muted-foreground">{caract}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Título, logo, precio y botón - 60% */}
                  <div className={`relative p-8 md:w-[60%] flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/10 ${esPar ? "md:border-l" : "md:border-l-0 md:border-r"}`}>
                    
                    {/* Logo decorativo en la esquina - solo dentro de este div */}
<div className="absolute right-4 top-[30%] md:right-6 md:top-[30%] pointer-events-none select-none opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-500">                      <Image
                        src={plan.logo}
                        alt=""
                        width={160}
                        height={160}
                        className="h-32 w-32 md:h-40 md:w-40 object-contain rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-700"
                        style={{
                          filter: "brightness(0) saturate(100%) invert(67%) sepia(72%) saturate(495%) hue-rotate(97deg) brightness(95%) contrast(88%)",
                        }}
                      />
                    </div>

                    <h3 className="font-display text-3xl font-bold text-white leading-tight sm:text-4xl relative z-10">
                      {plan.nombre}
                    </h3>
                    
                    <p className="mt-2 text-base text-muted-foreground relative z-10">
                      {plan.descripcion}
                    </p>
                    
                    <p className="mt-4 font-mono text-2xl font-bold text-primary relative z-10">
                      {plan.precio}
                    </p>
                    
                    <button
                      onClick={() => handleSeleccionarPlan(plan.id)}
                      className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-base font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:brightness-110 active:scale-95 w-fit relative z-10"
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
                  
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}