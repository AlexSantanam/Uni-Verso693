import os

file_path = 'src/pages/ImpulsaPyme.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    text = f.read()

import_target = "import { Container } from '../components/ui';"
import_replacement = "import { Container } from '../components/ui';\nimport { MultiDeviceMockup } from '../components/MultiDeviceMockup';"

if import_target in text:
    text = text.replace(import_target, import_replacement, 1)
    print("IMPORT REPLACED")
else:
    print("IMPORT NOT FOUND")

# Replace rubro mockup
rubro_target = '''                <div className="p-6 sm:p-9 pt-5">
                  <div className="rounded-2xl overflow-hidden border-2 border-stone-300 shadow-lg">
                    <div className="bg-stone-900 px-4 py-2.5 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                      <span className="ml-2 text-[11px] text-stone-400 font-mono">tunegocio.cl — captura real del sistema</span>
                    </div>
                    <div className="bg-stone-100">
                      <img
                        src={`/impulsa/${rubroPage}-software.png`}
                        alt={`Software real: ${BUSINESS_TYPES[rubroPage].name}`}
                        className="w-full h-auto block"
                      />
                    </div>
                  </div>
                </div>'''

rubro_replacement = '''                <div className="p-4 sm:p-8 pt-4">
                  <MultiDeviceMockup
                    demoUrl={BUSINESS_TYPES[rubroPage].demoUrl}
                    title={BUSINESS_TYPES[rubroPage].name}
                    tag={BUSINESS_TYPES[rubroPage].tag}
                    rubroId={rubroPage}
                  />
                </div>'''

if rubro_target in text:
    text = text.replace(rubro_target, rubro_replacement, 1)
    print("RUBRO MOCKUP REPLACED")
else:
    # try normalized line breaks
    text_crlf = text.replace('\r\n', '\n')
    rubro_target_norm = rubro_target.replace('\r\n', '\n')
    if rubro_target_norm in text_crlf:
        text = text_crlf.replace(rubro_target_norm, rubro_replacement, 1)
        print("RUBRO MOCKUP REPLACED (NORMALIZED)")
    else:
        print("RUBRO TARGET NOT FOUND")

# Also in the demos tab: let's replace the single full iframe with MultiDeviceMockup so both places enjoy it!
demo_target = '''              {/* VENTANA DE DEMO INTERACTIVA (SITIO COMPLETO EN VIVO + OPCIÓN PANTALLA COMPLETA) */}
              <div className="rounded-3xl border-2 border-stone-300 bg-white shadow-2xl overflow-hidden">
                {/* AVISO IMPORTANTE DE PERSONALIZACIÓN: PARA CLIENTES LITERALES */}
                <div className="bg-[#FEF3C7] border-b-2 border-[#F59E0B] px-4 sm:px-6 py-2.5 text-xs text-[#92400E] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 font-bold">
                    <span className="text-base">⚠️</span>
                    <span>
                      <strong>Nota para clientes:</strong> Esto es una <u>demo de referencia funcional</u>. Tu sitio final se personalizará al 100% con tu logo, tus colores, tu nombre real, tus propios productos/fotos y tus textos de marca.
                    </span>
                  </div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wide bg-[#F59E0B] text-black px-2 py-0.5 rounded shrink-0">
                    Chasis Base Demo
                  </span>
                </div>

                {/* Barra de navegador simulada con botón a Pantalla Completa */}
                <div className="bg-stone-900 text-stone-300 px-4 py-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                    <span className="ml-2 bg-stone-800 text-emerald-300 px-3 py-1 rounded-lg font-mono text-[11px]">
                      https://www.tunegocio.cl — Sitio Demo Real ({currentBiz.tag})
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href={currentBiz.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 bg-[#4ade80] hover:bg-[#22c55e] text-[#052e16] font-black text-xs px-4 py-1.5 rounded-lg shadow transition-all"
                    >
                      🌐 Abrir Sitio Demo a Pantalla Completa ↗
                    </a>
                  </div>
                </div>

                {/* Iframe del Sitio Completo en Vivo */}
                <div className="w-full h-[640px] bg-white border-b border-stone-200">
                  <iframe
                    key={currentBiz.demoUrl}
                    src={currentBiz.demoUrl}
                    title={currentBiz.name}
                    className="w-full h-full border-0"
                  />
                </div>'''

demo_replacement = '''              {/* VENTANA DE DEMO INTERACTIVA MULTI-DISPOSITIVO (SET 3D: PC + TABLET + CELULAR) */}
              <div className="space-y-4 mb-4">
                <div className="bg-[#FEF3C7] border-2 border-[#F59E0B] rounded-2xl px-4 sm:px-6 py-2.5 text-xs text-[#92400E] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 shadow-sm">
                  <div className="flex items-center gap-2 font-bold">
                    <span className="text-base">⚠️</span>
                    <span>
                      <strong>Nota para clientes:</strong> Esto es una <u>demo funcional en vivo</u>. Tu sitio final se personalizará al 100% con tu logo, tus colores, tu nombre real, tus propios productos/fotos y tus textos de marca.
                    </span>
                  </div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wide bg-[#F59E0B] text-black px-2 py-0.5 rounded shrink-0">
                    Chasis Base Demo
                  </span>
                </div>

                <MultiDeviceMockup
                  demoUrl={currentBiz.demoUrl}
                  title={currentBiz.name}
                  tag={currentBiz.tag}
                  rubroId={currentBiz.id}
                />
              </div>'''

demo_target_norm = demo_target.replace('\r\n', '\n')
text_crlf = text.replace('\r\n', '\n')
if demo_target_norm in text_crlf:
    text = text_crlf.replace(demo_target_norm, demo_replacement, 1)
    print("DEMOS TAB MOCKUP REPLACED")
else:
    print("DEMOS TAB TARGET NOT FOUND")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(text)
print("COMPLETED")

