"use client";

import { useState, useEffect } from "react";
import { t, getLanguage } from "@/i18n";

export function WhyUs() {
  const [lang, setLang] = useState<string | null>(null);

  useEffect(() => {
    setLang(getLanguage());
    const handleLangChange = () => setLang(getLanguage());
    window.addEventListener("languagechange", handleLangChange);
    return () => window.removeEventListener("languagechange", handleLangChange);
  }, []);

  if (!lang) {
    return (
      <section className="relative py-20 md:py-28">
        <div className="container-dm" />
      </section>
    );
  }

  return (
    <section className="relative py-20 md:py-28">
      <div className="container-dm">
        <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.25em] text-primary">
          {t("why_us.badge")}
        </span>
        <h2 className="max-w-2xl font-display text-4xl font-bold leading-[1.05] text-white sm:text-5xl md:text-6xl">
          {t("why_us.title")}
        </h2>
        <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
          {t("why_us.description")}
        </p>
      </div>
    </section>
  );
}