with open('src/pages/ImpulsaPyme.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace lines 1000-1026 properly
broken_block = '''                <MultiDeviceMockup
                  demoUrl={currentBiz.demoUrl}
                  title={currentBiz.name}
                  tag={currentBiz.tag}
                  rubroId={currentBiz.id}
                />
              </div>

                {/* Barra inferior rápida de acción sobre la plantilla */}
                <div className="p-4 sm:p-5 bg-stone-50 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs sm:text-sm text-stone-700">
                    <span className="font-black text-slate-900">{currentBiz.name}:</span>{' '}
                    {currentBiz.subtitle} · Incluye carga inicial de tu catálogo y configuración lista para vender.
                  </div>
                  <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
                    <a
                      href={currentBiz.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl border-2 border-stone-300 bg-white hover:bg-stone-100 text-slate-900 font-black px-4 py-2.5 text-xs transition-all"
                    >
                      Abrir en Pestaña Nueva ↗
                    </a>
                    <button
                      type="button"
                      onClick={() => switchTab('simulador', selectedBiz)}
                      className="rounded-xl bg-[#15803d] hover:bg-[#166534] text-white font-black px-5 py-2.5 text-xs sm:text-sm shadow-sm cursor-pointer transition-all"
                    >
                      ¡Quiero un Sitio Así! Simular Cuota (Desde {fmtCLP(currentBiz.prices.arriendo.monthly)}/mes) →
                    </button>
                  </div>
                </div>
              </div>'''

fixed_block = '''                <MultiDeviceMockup
                  demoUrl={currentBiz.demoUrl}
                  title={currentBiz.name}
                  tag={currentBiz.tag}
                  rubroId={currentBiz.id}
                />

                {/* Barra inferior rápida de acción sobre la plantilla */}
                <div className="p-4 sm:p-5 bg-white rounded-2xl border-2 border-stone-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs sm:text-sm text-stone-700">
                    <span className="font-black text-slate-900">{currentBiz.name}:</span>{' '}
                    {currentBiz.subtitle} · Incluye carga inicial de tu catálogo y configuración lista para vender.
                  </div>
                  <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
                    <a
                      href={currentBiz.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl border-2 border-stone-300 bg-white hover:bg-stone-100 text-slate-900 font-black px-4 py-2.5 text-xs transition-all"
                    >
                      Abrir en Pestaña Nueva ↗
                    </a>
                    <button
                      type="button"
                      onClick={() => switchTab('simulador', selectedBiz)}
                      className="rounded-xl bg-[#15803d] hover:bg-[#166534] text-white font-black px-5 py-2.5 text-xs sm:text-sm shadow-sm cursor-pointer transition-all"
                    >
                      ¡Quiero un Sitio Así! Simular Cuota (Desde {fmtCLP(currentBiz.prices.arriendo.monthly)}/mes) →
                    </button>
                  </div>
                </div>
              </div>'''

broken_block_norm = broken_block.replace('\r\n', '\n')
text_norm = text.replace('\r\n', '\n')

if broken_block_norm in text_norm:
    text_fixed = text_norm.replace(broken_block_norm, fixed_block, 1)
    with open('src/pages/ImpulsaPyme.tsx', 'w', encoding='utf-8') as f:
        f.write(text_fixed)
    print("FIXED SUCCESSFULLY")
else:
    print("BLOCK NOT FOUND")

