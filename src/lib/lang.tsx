import React, { createContext, useContext, useEffect, useState } from 'react';

export type Language = 'en' | 'es';

/** A bilingual string. */
export type L = { es: string; en: string };

interface LangContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  /** Pick the string for the current language. */
  tr: (value: L) => string;
  /** Pick the list for the current language. */
  trList: (value: { es: string[]; en: string[] }) => string[];
}

const LangContext = createContext<LangContextValue | null>(null);
const STORAGE_KEY = 'uniVerso693Lang';

/** The visitor's saved choice, else their browser language (Spanish unless the browser says otherwise). */
const initialLang = (): Language => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'es' || saved === 'en') return saved;
  } catch {
    /* storage blocked: fall back to the browser language */
  }
  const first = (navigator.languages?.[0] ?? navigator.language ?? 'es').toLowerCase();
  return first.startsWith('es') ? 'es' : 'en';
};

export const LangProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Always start in Spanish so the first render matches the prerendered HTML; switch after hydration.
  const [lang, setLangState] = useState<Language>('es');

  useEffect(() => {
    setLangState(initialLang());
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (next: Language) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* not persisted; the choice still applies to this visit */
    }
  };

  const value: LangContextValue = {
    lang,
    setLang,
    tr: (v) => v[lang],
    trList: (v) => v[lang],
  };

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
};

export const useLang = (): LangContextValue => {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used inside <LangProvider>');
  return ctx;
};
