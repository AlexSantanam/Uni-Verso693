with open('src/pages/Blog.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

target = '''    case 'cta':
      return (
        <aside key={i} className="my-4 rounded-3xl border border-brand-500/30 bg-brand-500/10 p-7 space-y-5">
          <p className="text-lg font-semibold text-white leading-relaxed">{b.text}</p>
          <div className="flex flex-wrap gap-3">
            <CalendlyButton />
            <Link
              to="/contacto"
              className="group inline-flex items-center gap-2 rounded-full bg-brand-600 hover:bg-brand-700 px-6 py-3.5 text-sm font-bold text-white transition-colors"
            >
              {lang === 'es' ? 'Escríbenos' : 'Contact us'}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </aside>
      );'''

replacement = '''    case 'cta':
      return (
        <aside key={i} className="my-6 rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-cyan-950/40 via-slate-900/60 to-slate-950 p-7 sm:p-8 space-y-5 shadow-xl">
          <p className="text-lg font-bold text-white leading-relaxed">{b.text}</p>
          <div className="flex flex-wrap gap-3 items-center">
            <Link
              to="/paginas-web"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 px-6 py-3.5 text-sm font-extrabold text-white transition-all shadow-md shadow-cyan-600/20"
            >
              <span>Ver Planes Web ($150k - $285k)</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/impulsa-pyme"
              className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 hover:border-amber-400 bg-amber-500/10 hover:bg-amber-500/20 px-6 py-3.5 text-sm font-extrabold text-amber-200 transition-colors"
            >
              <span>O Arrienda desde $19.900/mes</span>
            </Link>
            <Link
              to="/contacto"
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 hover:border-white/40 px-5 py-3 text-sm font-bold text-slate-300 hover:text-white transition-colors"
            >
              {lang === 'es' ? 'Cotizar a Medida' : 'Contact us'}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </aside>
      );'''

target_norm = target.replace('\r\n', '\n')
text_norm = text.replace('\r\n', '\n')

if target_norm in text_norm:
    text_updated = text_norm.replace(target_norm, replacement, 1)
    with open('src/pages/Blog.tsx', 'w', encoding='utf-8') as f:
        f.write(text_updated)
    print("SUCCESS: CTA BLOCK UPDATED")
else:
    print("TARGET NOT FOUND")

