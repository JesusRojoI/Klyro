import es from './es.json';
import en from './en.json';

const translations: Record<string, unknown> = { es, en };

let currentLang = 'es';

export function setLanguage(lang: string) {
  currentLang = lang;
  if (typeof window !== 'undefined') {
    localStorage.setItem('klyro_lang', lang);
    document.cookie = `klyro_lang=${lang}; path=/; max-age=31536000`;
    window.dispatchEvent(new Event('languagechange'));
  }
}

export function getLanguage(): string {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('klyro_lang') || 'es';
  }
  return 'es';
}

export function t(key: string): string {
  const lang = getLanguage();
  const keys = key.split('.');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let value: any = translations[lang];
  for (const k of keys) {
    value = value?.[k];
  }
  return value || key;
}