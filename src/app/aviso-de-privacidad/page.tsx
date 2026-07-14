"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { t, getLanguage } from "@/i18n";

export default function AvisoPrivacidadPage() {
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
            <a href="/" className="hover:text-primary transition-colors">{t("footer.privacy")}</a>
          </div>

          <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">
            {t("privacy.title")}
          </h1>
          
          <p className="mt-4 text-sm text-muted-foreground">
            {t("privacy.last_update")}: {new Date().toLocaleDateString(lang === "en" ? "en-US" : "es-MX")}
          </p>

          <div className="mt-10 space-y-8 text-muted-foreground leading-relaxed">
            <div>
              <h2 className="text-xl font-semibold text-white mb-3">{t("privacy.section1_title")}</h2>
              <p>{t("privacy.section1_text")}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">{t("privacy.section2_title")}</h2>
              <p>{t("privacy.section2_text")}</p>
              <ul className="mt-2 list-disc pl-6 space-y-1">
                {[1,2,3,4].map((i) => (
                  <li key={i}>{t(`privacy.section2_list.${i-1}`)}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">{t("privacy.section3_title")}</h2>
              <p>{t("privacy.section3_text")}</p>
              <ul className="mt-2 list-disc pl-6 space-y-1">
                {[1,2,3,4].map((i) => (
                  <li key={i}>{t(`privacy.section3_primary.${i-1}`)}</li>
                ))}
              </ul>
              <p className="mt-3">{t("privacy.section3_secondary_text")}</p>
              <ul className="mt-2 list-disc pl-6 space-y-1">
                {[1,2,3].map((i) => (
                  <li key={i}>{t(`privacy.section3_secondary.${i-1}`)}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">{t("privacy.section4_title")}</h2>
              <p>{t("privacy.section4_text")}</p>
              <ul className="mt-2 list-disc pl-6 space-y-1">
                {[1,2,3].map((i) => (
                  <li key={i}>{t(`privacy.section4_list.${i-1}`)}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">{t("privacy.section5_title")}</h2>
              <p>{t("privacy.section5_text")}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">{t("privacy.section6_title")}</h2>
              <p>{t("privacy.section6_text")}</p>
              <ul className="mt-2 list-disc pl-6 space-y-1">
                {[1,2,3,4].map((i) => (
                  <li key={i}>{t(`privacy.section6_list.${i-1}`)}</li>
                ))}
              </ul>
              <p className="mt-3">{t("privacy.section6_response")}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">{t("privacy.section7_title")}</h2>
              <p>{t("privacy.section7_text")}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">{t("privacy.section8_title")}</h2>
              <p>{t("privacy.section8_text")}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">{t("privacy.section9_title")}</h2>
              <p>{t("privacy.section9_text")}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">{t("privacy.section10_title")}</h2>
              <p>
                {t("privacy.section10_text")}{" "}
                <a href="mailto:conecta@klyro.mx" className="text-primary hover:underline">conecta@klyro.mx</a>{" "}
                {t("privacy.section10_text2")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}