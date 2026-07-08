import es from './es.json';
import en from './en.json';

const translations: { [key: string]: any } = { es, en };

export function setLanguage(lang: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('klyro_lang', lang);
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
  let value = translations[lang];
  for (const k of keys) {
    value = value?.[k];
  }
  return value || key;
}