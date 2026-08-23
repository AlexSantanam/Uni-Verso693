import React, { useState } from 'react';
import { Language } from '../types';
import { Code, Copy, Check, Download, ExternalLink } from 'lucide-react';

interface HtmlExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const HtmlExportModal: React.FC<HtmlExportModalProps> = ({ isOpen, onClose, lang }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Standalone Single HTML Code template — dependency-free, no build step.
  // Kept in sync (services, pricing, copy) with src/data/content.ts by hand;
  // see the comment above the translations object below.
  const singleHtmlCode = `<!DOCTYPE html>
<html lang="es" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Uni-Verso693 | AI Agents, Apps, Video & Design Agency</title>
  <meta name="description" content="Uni-Verso693 is an AI agency building 24/7 autonomous AI agents, mobile apps, viral AI short videos, high-converting landing pages, and brand design for fast-growing businesses.">
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Lucide Icons -->
  <script src="https://unpkg.com/lucide@latest"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            brandDark: '#030008',
            brandPurple: '#9333ea',
            brandPurpleGlow: '#a855f7'
          }
        }
      }
    }
  </script>
  <style>
    body { background-color: #030008; color: #f3f4f6; font-family: system-ui, -apple-system, sans-serif; }
    .glow-purple { box-shadow: 0 0 40px -5px rgba(147, 51, 234, 0.35); }
    .text-gradient-purple {
      background: linear-gradient(135deg, #ffffff 0%, #c084fc 50%, #9333ea 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    }
    .bg-radial-purple {
      background: radial-gradient(circle at 50% 20%, rgba(147, 51, 234, 0.18) 0%, rgba(3, 0, 8, 0) 70%);
    }
  </style>
</head>
<body class="bg-brandDark text-zinc-100 min-h-screen">

  <!-- Sticky Navbar -->
  <header class="sticky top-0 z-50 backdrop-blur-xl bg-black/80 border-b border-purple-900/40">
    <div class="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
      <a href="#hero" class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-purple-900 flex items-center justify-center border border-purple-500/50">
          <i data-lucide="bot" class="w-6 h-6 text-purple-400"></i>
        </div>
        <span class="font-extrabold text-xl text-white">Uni-Verso<span class="text-purple-400">693</span></span>
      </a>
      <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
        <a href="#services" class="hover:text-purple-300" data-i18n="nav.services">Servicios</a>
        <a href="#portfolio" class="hover:text-purple-300" data-i18n="nav.portfolio">Portafolio</a>
        <a href="#pricing" class="hover:text-purple-300" data-i18n="nav.pricing">Precios</a>
        <a href="#contact" class="hover:text-purple-300" data-i18n="nav.contact">Contacto</a>
      </nav>
      <div class="flex items-center gap-4">
        <button onclick="toggleLang()" id="langBtn" class="px-3 py-1.5 rounded-lg bg-zinc-900 border border-purple-800/40 text-xs font-bold text-purple-300">
          EN 🇺🇸
        </button>
        <a href="#contact" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-purple-600/30" data-i18n="nav.cta">
          Contáctanos
        </a>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <section id="hero" class="py-20 bg-radial-purple text-center relative overflow-hidden">
    <div class="max-w-5xl mx-auto px-4 space-y-6">
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300 text-xs font-bold">
        <i data-lucide="sparkles" class="w-4 h-4 text-purple-400"></i>
        <span>UNI-VERSO693 AI AGENCY</span>
      </div>
      <h1 class="text-4xl sm:text-6xl font-black text-white tracking-tight" data-i18n="hero.title">
        Agentes de IA que Trabajan 24/7
      </h1>
      <p class="text-lg sm:text-xl text-zinc-300 max-w-2xl mx-auto" data-i18n="hero.subtitle">
        Construimos agentes de IA, videos cortos, landing pages, apps móviles y diseño de marca para empresas
      </p>
      <div class="pt-4 flex justify-center gap-4">
        <a href="#contact" class="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-base shadow-xl shadow-purple-600/30" data-i18n="hero.cta">
          Contáctanos
        </a>
      </div>
    </div>
  </section>

  <!-- Services Section -->
  <section id="services" class="py-20 bg-black">
    <div class="max-w-7xl mx-auto px-4">
      <h2 class="text-3xl font-extrabold text-center text-white mb-3" data-i18n="services.heading">Nuestros Servicios de Alto Impacto</h2>
      <p class="text-center text-zinc-400 max-w-2xl mx-auto mb-12" data-i18n="services.sub">Soluciones de ingeniería a la medida para escalar tus operaciones y contenidos sin aumentar personal.</p>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="p-6 rounded-2xl bg-zinc-950 border border-purple-900/40">
          <i data-lucide="video" class="w-7 h-7 text-purple-400 mb-3"></i>
          <h3 class="text-lg font-bold text-white mb-1.5" data-i18n="svc.videos.title">Estudio de Videos Cortos y Reels con IA</h3>
          <p class="text-zinc-400 text-sm" data-i18n="svc.videos.desc">Contenido en formato corto de alta conversión producido de principio a fin con avatares de IA, locución sintetizada y guiones virales.</p>
        </div>
        <div class="p-6 rounded-2xl bg-zinc-950 border border-purple-900/40">
          <i data-lucide="layout" class="w-7 h-7 text-purple-400 mb-3"></i>
          <h3 class="text-lg font-bold text-white mb-1.5" data-i18n="svc.landing.title">Diseño de Landing Pages Profesionales</h3>
          <p class="text-zinc-400 text-sm" data-i18n="svc.landing.desc">Landing pages a la medida enfocadas en conversión, adaptadas a tu industria y optimizadas para velocidad, SEO y dispositivos móviles.</p>
        </div>
        <div class="p-6 rounded-2xl bg-zinc-950 border border-purple-900/40">
          <i data-lucide="pen-tool" class="w-7 h-7 text-purple-400 mb-3"></i>
          <h3 class="text-lg font-bold text-white mb-1.5" data-i18n="svc.design.title">Logos, Flyers y Diseño Gráfico</h3>
          <p class="text-zinc-400 text-sm" data-i18n="svc.design.desc">Piezas visuales profesionales para tu marca: diseño de logos, flyers promocionales, gráficas para redes sociales y vectorización de imágenes.</p>
        </div>
        <div class="p-6 rounded-2xl bg-zinc-950 border border-purple-900/40">
          <i data-lucide="smartphone" class="w-7 h-7 text-purple-400 mb-3"></i>
          <h3 class="text-lg font-bold text-white mb-1.5" data-i18n="svc.apps.title">Creación de Aplicaciones Móviles</h3>
          <p class="text-zinc-400 text-sm" data-i18n="svc.apps.desc">Aplicaciones móviles nativas y multiplataforma para iOS y Android, diseñadas para llevar tus agentes de IA y servicios directamente al teléfono de tus clientes.</p>
        </div>
        <div class="p-6 rounded-2xl bg-zinc-950 border border-purple-900/40">
          <i data-lucide="bot" class="w-7 h-7 text-purple-400 mb-3"></i>
          <h3 class="text-lg font-bold text-white mb-1.5" data-i18n="svc.agents.title">Agentes de IA Autónomos 24/7</h3>
          <p class="text-zinc-400 text-sm" data-i18n="svc.agents.desc">Despliega empleados digitales inteligentes que gestionan prospectos, responden dudas complejas y ejecutan acciones en tu CRM sin descanso.</p>
        </div>
        <div class="p-6 rounded-2xl bg-zinc-950 border border-purple-900/40">
          <i data-lucide="zap" class="w-7 h-7 text-purple-400 mb-3"></i>
          <h3 class="text-lg font-bold text-white mb-1.5" data-i18n="svc.automation.title">Automatización y Flujos de Trabajo con IA</h3>
          <p class="text-zinc-400 text-sm" data-i18n="svc.automation.desc">Elimina el trabajo repetitivo conectando tus herramientas con webhooks autónomos, Make/n8n y microservicios con IA en Python.</p>
        </div>
        <div class="p-6 rounded-2xl bg-zinc-950 border border-purple-900/40 md:col-span-2 lg:col-span-1">
          <i data-lucide="cpu" class="w-7 h-7 text-purple-400 mb-3"></i>
          <h3 class="text-lg font-bold text-white mb-1.5" data-i18n="svc.consulting.title">Auditoría y Arquitectura Estratégica de IA</h3>
          <p class="text-zinc-400 text-sm" data-i18n="svc.consulting.desc">Plan de implementación directa de IA diseñado según tus cuellos de botella para maximizar ROI y reducir costos de adquisición.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Portfolio Section -->
  <section id="portfolio" class="py-20 bg-zinc-950 border-y border-purple-900/30">
    <div class="max-w-7xl mx-auto px-4">
      <h2 class="text-3xl font-extrabold text-center text-white mb-12" data-i18n="portfolio.heading">Portafolio de Videos Cortos e IA</h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div class="aspect-video bg-black rounded-xl overflow-hidden border border-purple-800">
          <iframe class="w-full h-full" src="https://www.youtube-nocookie.com/embed/L_LUpnjgPso" allowfullscreen></iframe>
        </div>
        <div class="aspect-video bg-black rounded-xl overflow-hidden border border-purple-800">
          <iframe class="w-full h-full" src="https://www.youtube-nocookie.com/embed/LXb3EKWsInQ" allowfullscreen></iframe>
        </div>
        <div class="aspect-video bg-black rounded-xl overflow-hidden border border-purple-800">
          <iframe class="w-full h-full" src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ" allowfullscreen></iframe>
        </div>
      </div>
    </div>
  </section>

  <!-- Pricing Section -->
  <section id="pricing" class="py-20 bg-black">
    <div class="max-w-7xl mx-auto px-4">
      <h2 class="text-3xl font-extrabold text-center text-white mb-12" data-i18n="pricing.heading">Inversión Clara y Transparente</h2>
      <div class="grid lg:grid-cols-3 gap-8 items-stretch">
        <div class="p-8 rounded-2xl bg-zinc-950 border border-purple-900/40 flex flex-col">
          <h3 class="text-xl font-bold text-white" data-i18n="plan.starter.name">Paquete Inicial IA</h3>
          <p class="text-zinc-400 text-xs mt-2 mb-4" data-i18n="plan.starter.desc">Ideal para pequeñas empresas que necesitan 1 agente de IA, un lote de videos cortos o una landing page profesional.</p>
          <p class="text-3xl font-black text-white mb-6">$990</p>
          <ul class="text-xs text-zinc-300 space-y-2 mb-6 flex-1" data-i18n="plan.starter.features">
            <li>• 1 Agente de IA para Ventas o Soporte</li>
            <li>• 10 Videos Cortos con IA</li>
            <li>• 1 Landing Page (hasta 5 secciones)</li>
            <li>• Entrega en 14 Días</li>
          </ul>
          <a href="#contact" class="block w-full py-3 rounded-xl bg-purple-950 text-purple-300 font-bold text-center text-sm" data-i18n="plan.starter.cta">Agendar Paquete Inicial</a>
        </div>
        <div class="p-8 rounded-2xl bg-zinc-950 border-2 border-purple-500 glow-purple flex flex-col">
          <h3 class="text-xl font-bold text-white" data-i18n="plan.growth.name">Sistema IA Crecimiento</h3>
          <p class="text-zinc-400 text-xs mt-2 mb-4" data-i18n="plan.growth.desc">Nuestro sistema estrella 24/7 con landing page profesional e identidad de marca incluidas.</p>
          <p class="text-3xl font-black text-white mb-6">$2,490</p>
          <ul class="text-xs text-zinc-300 space-y-2 mb-6 flex-1" data-i18n="plan.growth.features">
            <li>• 2 Agentes de IA Omnicanal 24/7</li>
            <li>• 25 Videos Cortos con IA / mes</li>
            <li>• Landing Page + Kit de Marca</li>
            <li>• Soporte Prioritario 24/7</li>
          </ul>
          <a href="#contact" class="block w-full py-3 rounded-xl bg-purple-600 text-white font-bold text-center text-sm" data-i18n="plan.growth.cta">Agendar Auditoría de Crecimiento</a>
        </div>
        <div class="p-8 rounded-2xl bg-zinc-950 border border-purple-900/40 flex flex-col">
          <h3 class="text-xl font-bold text-white" data-i18n="plan.enterprise.name">Ecosistema IA Enterprise</h3>
          <p class="text-zinc-400 text-xs mt-2 mb-4" data-i18n="plan.enterprise.desc">Stack empresarial completo con apps móviles a la medida y diseño ilimitado.</p>
          <p class="text-3xl font-black text-white mb-6">Custom</p>
          <ul class="text-xs text-zinc-300 space-y-2 mb-6 flex-1" data-i18n="plan.enterprise.features">
            <li>• Agentes y Flujos Ilimitados</li>
            <li>• App Móvil a la Medida (iOS y Android)</li>
            <li>• Landing Pages y Diseño Ilimitados</li>
            <li>• Especialista de IA Dedicado</li>
          </ul>
          <a href="#contact" class="block w-full py-3 rounded-xl bg-purple-950 text-purple-300 font-bold text-center text-sm" data-i18n="plan.enterprise.cta">Contactar para Enterprise</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact Form Section -->
  <section id="contact" class="py-20 bg-zinc-950">
    <div class="max-w-3xl mx-auto px-4 bg-black border border-purple-800/50 p-8 rounded-3xl">
      <h2 class="text-2xl font-bold text-white mb-2 text-center" data-i18n="contact.heading">Reserva tu Auditoría de IA</h2>
      <p class="text-zinc-400 text-xs text-center mb-6" data-i18n="contact.sub">Este formulario abre tu correo con la solicitud ya redactada — no requiere servidor.</p>
      <form id="contactForm" class="space-y-4">
        <input id="cf-name" type="text" data-i18n-placeholder="contact.name" placeholder="Nombre Completo" required class="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white" />
        <input id="cf-email" type="email" data-i18n-placeholder="contact.email" placeholder="Correo Electrónico" required class="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white" />
        <input id="cf-phone" type="tel" data-i18n-placeholder="contact.phone" placeholder="WhatsApp / Teléfono" required class="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white" />
        <input id="cf-company" type="text" data-i18n-placeholder="contact.company" placeholder="Empresa (opcional)" class="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white" />
        <textarea id="cf-notes" rows="3" data-i18n-placeholder="contact.notes" placeholder="Cuéntanos tu proyecto..." class="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white resize-none"></textarea>
        <button type="submit" class="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold" data-i18n="contact.submit">
          Enviar por Correo
        </button>
      </form>
    </div>
  </section>

  <footer class="py-8 bg-black text-center text-xs text-zinc-500 border-t border-zinc-900">
    <p data-i18n="footer.tagline">Uni-Verso693 AI Agency — Agentes de IA 24/7, video corto, landing pages, apps móviles y diseño de marca para empresas en crecimiento.</p>
  </footer>

  <script>
    lucide.createIcons();

    // Kept in sync by hand with src/data/content.ts's siteUiText/servicesData/pricingPlansData —
    // this file has no build step, so there's no shared source of truth to import from.
    const translations = {
      es: {
        'nav.services': 'Servicios', 'nav.portfolio': 'Portafolio', 'nav.pricing': 'Precios', 'nav.contact': 'Contacto', 'nav.cta': 'Contáctanos',
        'hero.title': 'Agentes de IA que Trabajan 24/7',
        'hero.subtitle': 'Construimos agentes de IA, videos cortos, landing pages, apps móviles y diseño de marca para empresas',
        'hero.cta': 'Contáctanos',
        'services.heading': 'Nuestros Servicios de Alto Impacto',
        'services.sub': 'Soluciones de ingeniería a la medida para escalar tus operaciones y contenidos sin aumentar personal.',
        'svc.videos.title': 'Estudio de Videos Cortos y Reels con IA',
        'svc.videos.desc': 'Contenido en formato corto de alta conversión producido de principio a fin con avatares de IA, locución sintetizada y guiones virales.',
        'svc.landing.title': 'Diseño de Landing Pages Profesionales',
        'svc.landing.desc': 'Landing pages a la medida enfocadas en conversión, adaptadas a tu industria y optimizadas para velocidad, SEO y dispositivos móviles.',
        'svc.design.title': 'Logos, Flyers y Diseño Gráfico',
        'svc.design.desc': 'Piezas visuales profesionales para tu marca: diseño de logos, flyers promocionales, gráficas para redes sociales y vectorización de imágenes.',
        'svc.apps.title': 'Creación de Aplicaciones Móviles',
        'svc.apps.desc': 'Aplicaciones móviles nativas y multiplataforma para iOS y Android, diseñadas para llevar tus agentes de IA y servicios directamente al teléfono de tus clientes.',
        'svc.agents.title': 'Agentes de IA Autónomos 24/7',
        'svc.agents.desc': 'Despliega empleados digitales inteligentes que gestionan prospectos, responden dudas complejas y ejecutan acciones en tu CRM sin descanso.',
        'svc.automation.title': 'Automatización y Flujos de Trabajo con IA',
        'svc.automation.desc': 'Elimina el trabajo repetitivo conectando tus herramientas con webhooks autónomos, Make/n8n y microservicios con IA en Python.',
        'svc.consulting.title': 'Auditoría y Arquitectura Estratégica de IA',
        'svc.consulting.desc': 'Plan de implementación directa de IA diseñado según tus cuellos de botella para maximizar ROI y reducir costos de adquisición.',
        'portfolio.heading': 'Portafolio de Videos Cortos e IA',
        'pricing.heading': 'Inversión Clara y Transparente',
        'plan.starter.name': 'Paquete Inicial IA', 'plan.starter.desc': 'Ideal para pequeñas empresas que necesitan 1 agente de IA, un lote de videos cortos o una landing page profesional.', 'plan.starter.cta': 'Agendar Paquete Inicial',
        'plan.growth.name': 'Sistema IA Crecimiento', 'plan.growth.desc': 'Nuestro sistema estrella 24/7 con landing page profesional e identidad de marca incluidas.', 'plan.growth.cta': 'Agendar Auditoría de Crecimiento',
        'plan.enterprise.name': 'Ecosistema IA Enterprise', 'plan.enterprise.desc': 'Stack empresarial completo con apps móviles a la medida y diseño ilimitado.', 'plan.enterprise.cta': 'Contactar para Enterprise',
        'contact.heading': 'Reserva tu Auditoría de IA',
        'contact.sub': 'Este formulario abre tu correo con la solicitud ya redactada — no requiere servidor.',
        'contact.name': 'Nombre Completo', 'contact.email': 'Correo Electrónico', 'contact.phone': 'WhatsApp / Teléfono', 'contact.company': 'Empresa (opcional)', 'contact.notes': 'Cuéntanos tu proyecto...',
        'contact.submit': 'Enviar por Correo',
        'footer.tagline': 'Uni-Verso693 AI Agency — Agentes de IA 24/7, video corto, landing pages, apps móviles y diseño de marca para empresas en crecimiento.'
      },
      en: {
        'nav.services': 'Services', 'nav.portfolio': 'Portfolio', 'nav.pricing': 'Pricing', 'nav.contact': 'Contact', 'nav.cta': 'Contact Us',
        'hero.title': 'AI Agents That Work 24/7',
        'hero.subtitle': 'We build AI agents, short videos, landing pages, mobile apps, and brand design for businesses',
        'hero.cta': 'Contact Us',
        'services.heading': 'Our High-Impact AI Services',
        'services.sub': 'Custom engineered solutions to scale your business operations and content production without increasing headcount.',
        'svc.videos.title': 'AI Short Videos & Reels Studio',
        'svc.videos.desc': 'High-converting short form video content generated end-to-end with AI avatars, voice synthesis, motion design, and viral scripting.',
        'svc.landing.title': 'Professional Landing Page Design',
        'svc.landing.desc': 'Custom-built, conversion-focused landing pages tailored to your industry, fully optimized for speed, SEO, and mobile devices.',
        'svc.design.title': 'Logos, Flyers & Graphic Design',
        'svc.design.desc': 'Professional visual assets for your brand — from logo design to promotional flyers, social media graphics, and image vectorization.',
        'svc.apps.title': 'Mobile App Development',
        'svc.apps.desc': "Native and cross-platform mobile apps for iOS and Android, built to bring your AI agents and services directly into your customers' pockets.",
        'svc.agents.title': '24/7 Autonomous AI Agents',
        'svc.agents.desc': 'Deploy intelligent digital employees that manage incoming sales leads, answer complex FAQs, and perform CRM actions round the clock.',
        'svc.automation.title': 'Custom AI Automation & Workflows',
        'svc.automation.desc': 'Eliminate manual repetitive work by connecting your tech stack with autonomous AI webhooks, Make/n8n, and custom Python microservices.',
        'svc.consulting.title': 'AI Strategy & Architecture Audit',
        'svc.consulting.desc': 'Direct 1-on-1 AI implementation plan tailored to your operational bottlenecks to maximize ROI and lower customer acquisition costs.',
        'portfolio.heading': 'AI Short Videos & Portfolio Showcase',
        'pricing.heading': 'Simple, Transparent Investment',
        'plan.starter.name': 'AI Starter Pack', 'plan.starter.desc': 'Perfect for small businesses wanting 1 custom AI agent, a batch of viral AI short videos, or a professional landing page.', 'plan.starter.cta': 'Book AI Starter Audit',
        'plan.growth.name': 'Growth AI System', 'plan.growth.desc': 'Our flagship 24/7 AI lead engine with a professional landing page and brand identity included.', 'plan.growth.cta': 'Book Growth Audit',
        'plan.enterprise.name': 'Enterprise AI Ecosystem', 'plan.enterprise.desc': 'Full enterprise stack with custom mobile apps and unlimited design.', 'plan.enterprise.cta': 'Contact for Enterprise',
        'contact.heading': 'Book Your AI Audit',
        'contact.sub': 'This form opens your email client with the request pre-written — no server required.',
        'contact.name': 'Full Name', 'contact.email': 'Email Address', 'contact.phone': 'WhatsApp / Phone', 'contact.company': 'Company (optional)', 'contact.notes': 'Tell us about your project...',
        'contact.submit': 'Send by Email',
        'footer.tagline': 'Uni-Verso693 AI Agency — 24/7 AI agents, short-form video, landing pages, mobile apps, and brand design for fast-growing companies.'
      }
    };

    let currentLang = 'es';
    function applyLang(lang) {
      document.querySelectorAll('[data-i18n]').forEach(function (el) {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) el.textContent = translations[lang][key];
      });
      document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) el.setAttribute('placeholder', translations[lang][key]);
      });
      document.documentElement.lang = lang;
      document.getElementById('langBtn').innerText = lang === 'es' ? 'EN 🇺🇸' : 'ES 🇲🇽';
    }
    function toggleLang() {
      currentLang = currentLang === 'es' ? 'en' : 'es';
      applyLang(currentLang);
    }

    // No backend in this standalone file — opens the visitor's own email client
    // with the request pre-filled, addressed to the agency, instead of faking
    // a server submission that would silently go nowhere.
    document.getElementById('contactForm').addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('cf-name').value;
      const email = document.getElementById('cf-email').value;
      const phone = document.getElementById('cf-phone').value;
      const company = document.getElementById('cf-company').value;
      const notes = document.getElementById('cf-notes').value;
      const subject = 'Solicitud de Auditoría de IA — ' + name;
      const body = 'Nombre: ' + name + '\\nEmail: ' + email + '\\nTeléfono: ' + phone + '\\nEmpresa: ' + company + '\\n\\nMensaje:\\n' + notes;
      window.location.href = 'mailto:contact@uni-verso693.ai?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
  </script>
</body>
</html>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(singleHtmlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([singleHtmlCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-zinc-950 border border-purple-800 rounded-3xl p-6 sm:p-8 max-w-3xl w-full shadow-2xl space-y-6 max-h-[90vh] flex flex-col justify-between">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-900/60 text-purple-300">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                {lang === 'en' ? 'Standalone 1-File Netlify HTML' : 'HTML de 1 Archivo Listo para Netlify'}
              </h3>
              <p className="text-xs text-zinc-400">
                {lang === 'en' ? 'Clean HTML + Tailwind CDN + Script for instant Netlify upload' : 'Código HTML limpio con Tailwind CDN y script para Netlify'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white font-bold p-1"
          >
            ✕
          </button>
        </div>

        {/* Code Box */}
        <div className="relative flex-1 min-h-[300px] overflow-hidden rounded-xl border border-zinc-800 bg-black p-4 font-mono text-xs text-zinc-300">
          <pre className="h-full overflow-auto whitespace-pre-wrap leading-relaxed select-all">
            {singleHtmlCode}
          </pre>
        </div>

        {/* Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-zinc-400 flex items-center gap-1.5">
            <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
            <span>{lang === 'en' ? 'Drag index.html into Netlify Drop!' : '¡Solo arrastra index.html a Netlify Drop!'}</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleCopy}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-purple-800/40 text-purple-300 text-xs font-bold transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? (lang === 'en' ? 'Copied!' : '¡Copiado!') : (lang === 'en' ? 'Copy Code' : 'Copiar Código')}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>{lang === 'en' ? 'Download index.html' : 'Descargar index.html'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
