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

export const LangProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('es');

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

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
