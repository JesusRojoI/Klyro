"use client";

import { ArrowRight } from "lucide-react";
import { t, getLanguage } from "@/i18n";
import { useState, useEffect } from "react";

export function Services() {
  const [lang, setLang] = useState<string | null>(null);

  useEffect(() => {
    setLang(getLanguage());
    const handleLangChange = () => setLang(getLanguage());
    window.addEventListener("languagechange", handleLangChange);
    return () => window.removeEventListener("languagechange", handleLangChange);
  }, []);

  if (!lang) {
    return (
      <section id="servicios" className="relative py-20 md:py-28">
        <div className="container-dm" />
      </section>
    );
  }

  const services = [
    {
      title: t("services.app_dev"),
      description: t("services.app_dev_desc"),
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
      href: "/desarrollo-de-aplicaciones/",
    },
    {
      title: t("services.business_dev"),
      description: t("services.business_dev_desc"),
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      href: "/desarrollo-empresarial/",
    },
    {
      title: t("services.specialized_dev"),
      description: t("services.specialized_dev_desc"),
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
      href: "/desarrollo-software-especializado/",
    },
    {
      title: t("services.inventory_dev"),
      description: t("services.inventory_dev_desc"),
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop",
      href: "/sistemas-inventario-logistica/",
    },
    {
      title: t("services.complementary_dev"),
      description: t("services.complementary_dev_desc"),
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
      href: "/servicios-complementarios/",
    },
  ];

  return (
    <section id="servicios" className="relative py-20 md:py-28">
      <div className="container-dm">
        <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.25em] text-primary">
          {t("services.subtitle")}
        </span>
        <h2 className="max-w-2xl font-display text-4xl font-bold leading-[1.05] text-white sm:text-5xl md:text-6xl">
          {t("services.title")}
        </h2>
        <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
          {t("services.description")}
        </p>

        <div className="mt-14 divide-y divide-white/10 border-t border-white/10">
          {services.map((service) => (
            <article key={service.title} className="group grid grid-cols-1 items-center gap-6 py-9 md:grid-cols-2 md:gap-12">
              <div>
                <h3 className="font-display text-2xl font-semibold text-white md:text-[28px]">
                  {service.title}
                </h3>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <a href={service.href} className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03] active:scale-95">
                  {t("services.know_plans")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
              <div className="overflow-hidden rounded-2xl ring-1 ring-white/10">
                <img src={service.image} alt={service.title} loading="lazy" className="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-56" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}