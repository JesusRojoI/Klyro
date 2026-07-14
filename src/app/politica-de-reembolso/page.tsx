"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { t, getLanguage } from "@/i18n";

export default function PoliticaReembolsoPage() {
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
            <span className="text-white">{t("refund.title")}</span>
          </div>

          <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">
            {t("refund.title")}
          </h1>
          
          <p className="mt-4 text-sm text-muted-foreground">
            {t("refund.last_update")}: {new Date().toLocaleDateString(lang === "en" ? "en-US" : "es-MX")}
          </p>

          <div className="mt-10 space-y-8 text-muted-foreground leading-relaxed">
            <div>
              <h2 className="text-xl font-semibold text-white mb-3">{t("refund.section1_title")}</h2>
              <p>{t("refund.section1_text")}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">{t("refund.section2_title")}</h2>
              <p>{t("refund.section2_text")}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">{t("refund.section3_title")}</h2>
              <p>{t("refund.section3_text")}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">{t("refund.section4_title")}</h2>
              <p>{t("refund.section4_text")}</p>
              <ul className="mt-2 list-disc pl-6 space-y-1">
                <li>{t("refund.section4_option1")}</li>
                <li>{t("refund.section4_option2")}</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">{t("refund.section5_title")}</h2>
              <p>{t("refund.section5_text")}</p>
              <ul className="mt-2 list-disc pl-6 space-y-1">
                {[1,2,3,4].map((i) => (
                  <li key={i}>{t(`refund.section5_list.${i-1}`)}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">{t("refund.section6_title")}</h2>
              <p>{t("refund.section6_text")}</p>
              <ul className="mt-2 list-disc pl-6 space-y-1">
                {[1,2,3,4].map((i) => (
                  <li key={i}>{t(`refund.section6_list.${i-1}`)}</li>
                ))}
              </ul>
              <p className="mt-3">{t("refund.section6_response")}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">{t("refund.section7_title")}</h2>
              <p>{t("refund.section7_text")}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">{t("refund.section8_title")}</h2>
              <p>
                {t("refund.section8_text")}{" "}
                <a href="mailto:conecta@klyro.mx" className="text-primary hover:underline">conecta@klyro.mx</a>{" "}
                {t("refund.section8_text2")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}