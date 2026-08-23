import React, { useEffect, useState } from 'react';
import { Language } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustedBy } from './components/TrustedBy';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { AuditForm } from './components/AuditForm';
import { Footer } from './components/Footer';

export default function App() {
  const [lang, setLang] = useState<Language>('es');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleLanguageToggle = (newLang: Language) => {
    setLang(newLang);
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const handleSelectPlan = (planName: string) => {
    setSelectedPlan(planName);
  };

  return (
    <div className="min-h-screen bg-[#030008] text-zinc-100 font-sans selection:bg-purple-600 selection:text-white">
      {/* Sticky Header with Navigation and Language Switcher */}
      <Navbar
        lang={lang}
        onLanguageToggle={handleLanguageToggle}
      />

      <main>
        {/* 1. Hero Section */}
        <Hero lang={lang} />

        {/* 2. Trusted By / Client Logos Section */}
        <TrustedBy lang={lang} />

        {/* 3. Services Section */}
        <Services lang={lang} />

        {/* 4. Portfolio Section with 3 YouTube Videos */}
        <Portfolio lang={lang} />

        {/* 5. Pricing Section */}
        <Pricing lang={lang} onSelectPlan={handleSelectPlan} />

        {/* 6. FAQ Section */}
        <FAQ lang={lang} />

        {/* 7. Contact Form */}
        <AuditForm lang={lang} selectedPlan={selectedPlan} />
      </main>

      {/* Footer */}
      <Footer
        lang={lang}
        onLanguageToggle={handleLanguageToggle}
      />
    </div>
  );
}
