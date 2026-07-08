"use client";

import { ArrowRight } from "lucide-react";
import { t, getLanguage } from "@/i18n";
import { useState, useEffect } from "react";

export function QuoteCta() {
  const [lang, setLang] = useState<string | null>(null);

  useEffect(() => {
    setLang(getLanguage());
    const handleLangChange = () => setLang(getLanguage());
    window.addEventListener("languagechange", handleLangChange);
    return () => window.removeEventListener("languagechange", handleLangChange);
  }, []);

  if (!lang) {
    return (
      <section className="relative py-10 md:py-16">
        <div className="container-dm" />
      </section>
    );
  }

  return (
    <section className="relative py-10 md:py-16">
      <div className="container-dm">
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.02] px-7 pt-10 md:px-14 md:pt-16">
          <div className="pointer-events-none absolute -bottom-24 left-1/2 h-[360px] w-[720px] -translate-x-1/2 rounded-full bg-primary/25 blur-[130px]" />

          <div className="relative max-w-xl">
            <h2 className="font-display text-3xl font-bold leading-[1.1] text-white sm:text-4xl md:text-5xl">
              {t("quote_cta.title")}
            </h2>
            <a
              href="/cotiza"
              className="group mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-transform hover:scale-[1.03] active:scale-95"
            >
              {t("quote_cta.cta")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <div className="relative mt-10 flex justify-center">
            <img
              src="/laptop.png"
              alt="Klyro - Dashboard"
              loading="lazy"
              className="w-full max-w-[560px] translate-y-2 drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}