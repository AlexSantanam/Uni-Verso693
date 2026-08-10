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

  // Standalone Single HTML Code template ready for Netlify!
  const singleHtmlCode = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Uni-Verso693 - AI Agency | AI Agents & AI Short Videos</title>
  <meta name="description" content="Uni-Verso693 - AI Agents That Work 24/7. We build AI agents and AI short videos for businesses.">
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
        <div className="w-10 h-10 rounded-xl bg-purple-900 flex items-center justify-center border border-purple-500/50">
          <i data-lucide="bot" class="w-6 h-6 text-purple-400"></i>
        </div>
        <span class="font-extrabold text-xl text-white">Uni-Verso<span class="text-purple-400">693</span></span>
      </a>
      <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
        <a href="#services" class="hover:text-purple-300">Services</a>
        <a href="#portfolio" class="hover:text-purple-300">Portfolio</a>
        <a href="#pricing" class="hover:text-purple-300">Pricing</a>
        <a href="#faq" class="hover:text-purple-300">FAQ</a>
        <a href="#contact" class="hover:text-purple-300">Contact</a>
      </nav>
      <div class="flex items-center gap-4">
        <button onclick="toggleLang()" id="langBtn" class="px-3 py-1.5 rounded-lg bg-zinc-900 border border-purple-800/40 text-xs font-bold text-purple-300">
          EN / ES
        </button>
        <a href="#contact" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-purple-600/30">
          Contact Us
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
      <h1 class="text-4xl sm:text-6xl font-black text-white tracking-tight" id="heroTitle">
        AI Agents That Work 24/7
      </h1>
      <p class="text-lg sm:text-xl text-zinc-300 max-w-2xl mx-auto" id="heroSubtitle">
        We build AI agents and AI short videos for businesses
      </p>
      <div class="pt-4 flex justify-center gap-4">
        <a href="#contact" class="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-base shadow-xl shadow-purple-600/30" id="heroCta">
          Contact Us
        </a>
      </div>
    </div>
  </section>

  <!-- Services Section -->
  <section id="services" class="py-20 bg-black">
    <div class="max-w-7xl mx-auto px-4">
      <h2 class="text-3xl font-extrabold text-center text-white mb-12">Our High-Impact AI Services</h2>
      <div class="grid md:grid-cols-2 gap-8">
        <div class="p-8 rounded-2xl bg-zinc-950 border border-purple-900/40">
          <i data-lucide="bot" class="w-8 h-8 text-purple-400 mb-4"></i>
          <h3 class="text-xl font-bold text-white mb-2">24/7 Autonomous AI Agents</h3>
          <p class="text-zinc-400 text-sm">Deploy intelligent agents on WhatsApp, Web, and CRM that answer queries and close deals 24/7.</p>
        </div>
        <div class="p-8 rounded-2xl bg-zinc-950 border border-purple-900/40">
          <i data-lucide="video" class="w-8 h-8 text-purple-400 mb-4"></i>
          <h3 class="text-xl font-bold text-white mb-2">AI Short Videos & Reels</h3>
          <p class="text-zinc-400 text-sm">High-converting vertical videos generated with realistic AI avatars, voices, and dynamic captions.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Portfolio Section -->
  <section id="portfolio" class="py-20 bg-zinc-950 border-y border-purple-900/30">
    <div class="max-w-7xl mx-auto px-4">
      <h2 class="text-3xl font-extrabold text-center text-white mb-12">Portfolio - 3 Video Demos</h2>
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
      <h2 class="text-3xl font-extrabold text-center text-white mb-12">Pricing Packages</h2>
      <div class="grid lg:grid-cols-3 gap-8">
        <div class="p-8 rounded-2xl bg-zinc-950 border border-purple-900/40 text-center">
          <h3 class="text-xl font-bold text-white">Starter</h3>
          <p class="text-3xl font-black text-white my-4">$990</p>
          <a href="#contact" class="block w-full py-3 rounded-xl bg-purple-950 text-purple-300 font-bold">Book Starter</a>
        </div>
        <div class="p-8 rounded-2xl bg-zinc-950 border-2 border-purple-500 glow-purple text-center">
          <h3 class="text-xl font-bold text-white">Growth System</h3>
          <p class="text-3xl font-black text-white my-4">$2,490</p>
          <a href="#contact" class="block w-full py-3 rounded-xl bg-purple-600 text-white font-bold">Book Growth</a>
        </div>
        <div class="p-8 rounded-2xl bg-zinc-950 border border-purple-900/40 text-center">
          <h3 class="text-xl font-bold text-white">Enterprise</h3>
          <p class="text-3xl font-black text-white my-4">Custom</p>
          <a href="#contact" class="block w-full py-3 rounded-xl bg-purple-950 text-purple-300 font-bold">Contact Enterprise</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact Form Section -->
  <section id="contact" class="py-20 bg-zinc-950">
    <div class="max-w-3xl mx-auto px-4 bg-black border border-purple-800/50 p-8 rounded-3xl">
      <h2 class="text-2xl font-bold text-white mb-6 text-center">Book Your AI Audit</h2>
      <form onsubmit="alert('Audit request submitted!'); return false;" class="space-y-4">
        <input type="text" placeholder="Full Name" required class="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white" />
        <input type="email" placeholder="Business Email" required class="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white" />
        <input type="tel" placeholder="WhatsApp / Phone" required class="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white" />
        <button type="submit" class="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold">
          Contact Us
        </button>
      </form>
    </div>
  </section>

  <footer class="py-8 bg-black text-center text-xs text-zinc-500 border-t border-zinc-900">
    <p>© 2026 Uni-Verso693 AI Agency. Ready for Netlify deployment.</p>
  </footer>

  <script>
    lucide.createIcons();
    let currentLang = 'en';
    function toggleLang() {
      currentLang = currentLang === 'en' ? 'es' : 'en';
      if (currentLang === 'es') {
        document.getElementById('heroTitle').innerText = 'Agentes de IA que Trabajan 24/7';
        document.getElementById('heroSubtitle').innerText = 'Construimos agentes de IA y videos cortos con IA para empresas';
        document.getElementById('heroCta').innerText = 'Contáctanos';
        document.getElementById('langBtn').innerText = 'ES 🇲🇽';
      } else {
        document.getElementById('heroTitle').innerText = 'AI Agents That Work 24/7';
        document.getElementById('heroSubtitle').innerText = 'We build AI agents and AI short videos for businesses';
        document.getElementById('heroCta').innerText = 'Contact Us';
        document.getElementById('langBtn').innerText = 'EN 🇺🇸';
      }
    }
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
