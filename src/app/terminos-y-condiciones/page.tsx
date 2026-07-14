"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { t, getLanguage } from "@/i18n";

export default function TerminosCondicionesPage() {
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

  return (
    <main className="relative min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-20">
        <div className="container-dm max-w-3xl">
          <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
            <a href="/" className="hover:text-primary transition-colors">{t("footer.privacy").split(" ")[0]}</a>
            <span>/</span>
            <span className="text-white">{t("terms.title")}</span>
          </div>

          <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">
            {t("terms.title")}
          </h1>
          
          <p className="mt-4 text-sm text-muted-foreground">
            {t("terms.last_update")}: {new Date().toLocaleDateString(lang === "en" ? "en-US" : "es-MX")}
          </p>

          <div className="mt-10 space-y-8 text-muted-foreground leading-relaxed">
            {[1,2,3,4,5,6,7,8,9,10,11,12,13].map((num) => (
              <div key={num}>
                <h2 className="text-xl font-semibold text-white mb-3">{t(`terms.section${num}_title`)}</h2>
                <p>{t(`terms.section${num}_text`)}</p>
                {num === 13 && (
                  <p className="mt-2">
                    {t("terms.section13_text2")}{" "}
                    <a href="mailto:conecta@klyro.mx" className="text-primary hover:underline">conecta@klyro.mx</a>{" "}
                    {t("terms.section13_text3")}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}