"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getLanguage, setLanguage as setLang } from "./index";

interface LanguageContextType {
  lang: string;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "es",
  toggleLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLanguage] = useState("es");

  useEffect(() => {
    setLanguage(getLanguage());
  }, []);

  const toggleLang = () => {
    const newLang = lang === "es" ? "en" : "es";
    setLang(newLang);
    setLanguage(newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      <div key={lang} suppressHydrationWarning>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}