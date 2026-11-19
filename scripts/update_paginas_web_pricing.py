import re

file_path = 'src/pages/PaginasWeb.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Update lucide-react imports if needed
import_target = "  ExternalLink,"
import_replacement = "  ExternalLink,\n  Users,\n  Laptop,\n  ShoppingBag,\n  CreditCard,"

if "Users," not in text and import_target in text:
    text = text.replace(import_target, import_replacement, 1)
    print("IMPORTS UPDATED")
else:
    print("IMPORTS ALREADY PRESENT OR TARGET NOT FOUND")

# 2. Replace pricing section
target_start = '{/* Pricing / Packages Section */}'
target_end = '{/* 3-Step Simple Process */}'

start_idx = text.find(target_start)
end_idx = text.find(target_end)

if start_idx == -1 or end_idx == -1:
    print("PRICING SECTION BOUNDARIES NOT FOUND")
    exit(1)

new_pricing_section = """{/* Pricing / Packages Section */}
      <section className="py-20 bg-slate-50 border-b border-slate-200" id="planes">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <span className="text-xs font-black text-cyan-700 uppercase tracking-widest bg-cyan-100/70 px-3.5 py-1 rounded-full border border-cyan-200">
              Precios Transparentes · Cero Letra Chica
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
              Planes Web Clave en Mano
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              Precios claros con IVA incluido, hosting y dominio .CL por 1 año, entrega rápida garantizada y factura formal chilena.
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-stretch">
            {/* PLAN 1: PLAN START */}
            <div className="bg-white rounded-3xl border-2 border-slate-200/90 hover:border-slate-300 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden">
              <div className="p-6 sm:p-7 space-y-5">
                <div className="text-center pb-2 border-b border-slate-100">
                  <h3 className="text-xl font-black text-slate-900">Plan Start</h3>
                  <div className="mt-3">
                    <div className="text-3xl sm:text-4xl font-black text-slate-950">$ 150.000</div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mt-1">IVA Incluido</div>
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <p className="text-xs font-bold text-slate-700">Página Web de hasta 4 Secciones de contenido.</p>
                  <div className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1 rounded-full">
                    <Clock className="w-3.5 h-3.5 text-cyan-600" />
                    <span>Plazo: 5 Días Hábiles</span>
                  </div>
                </div>

                <div className="space-y-3 pt-2 text-xs text-slate-700">
                  <div className="flex items-start gap-2.5">
                    <Users className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                    <span><strong>Optimizado para Convertir:</strong> Visitas en Clientes y ventas al instante.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Botón Directo a WhatsApp:</strong> con mensaje personalizado listo para chatear.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Laptop className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                    <span><strong>Autoadministrable:</strong> fácil y rápido de actualizar sin programar.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Globe className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                    <span><strong>Hosting y Dominio .CL:</strong> profesional incluido por 1 año completo.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                    <span><strong>Certificado SSL:</strong> candado de seguridad y velocidad de carga ultrarrápida.</span>
                  </div>
                </div>

                <div className="pt-4">
                  <a
                    href={whatsappLink('Hola UNIVERSO693, me interesa el Plan Start ($150.000 IVA Incluido) para mi página web.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-3 text-xs sm:text-sm shadow-md transition-all text-center"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>¿Conversemos?</span>
                  </a>
                </div>
              </div>

              {/* Webpay Footer Bar */}
              <div className="bg-[#FFF4ED] border-t border-[#FFD9C4] px-4 py-2.5 flex items-center justify-center gap-2 text-center text-[11px] font-extrabold text-[#C85A32]">
                <CreditCard className="w-3.5 h-3.5 shrink-0" />
                <span>Paga en 2 Transferencias o Cuotas con Webpay</span>
              </div>
            </div>

            {/* PLAN 2: PLAN PRO (MÁS ELEGIDO) */}
            <div className="bg-white rounded-3xl border-2 border-cyan-600 shadow-xl shadow-cyan-600/10 hover:shadow-2xl transition-all flex flex-col justify-between overflow-hidden relative">
              <div className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white text-[11px] font-black uppercase tracking-wider py-1.5 text-center">
                ★ Más Elegido por Empresas
              </div>

              <div className="p-6 sm:p-7 space-y-5">
                <div className="text-center pb-2 border-b border-slate-100">
                  <h3 className="text-xl font-black text-slate-900">Plan Pro</h3>
                  <div className="mt-3">
                    <div className="text-3xl sm:text-4xl font-black text-cyan-700">$ 200.000</div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mt-1">IVA Incluido</div>
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <p className="text-xs font-bold text-slate-700">Página Web de hasta 7 Secciones de contenido.</p>
                  <div className="inline-flex items-center gap-1.5 bg-cyan-50 text-cyan-800 text-xs font-bold px-3 py-1 rounded-full border border-cyan-200">
                    <Clock className="w-3.5 h-3.5 text-cyan-600" />
                    <span>Plazo: 7 Días Hábiles</span>
                  </div>
                </div>

                <div className="space-y-3 pt-2 text-xs text-slate-700">
                  <div className="flex items-start gap-2.5">
                    <Users className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                    <span><strong>Optimizado para Convertir:</strong> Visitas en Clientes y cotizaciones.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>SEO para Google e IA:</strong> optimizado para ChatGPT, Gemini y Google.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Laptop className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                    <span><strong>Correos Corporativos:</strong> configuración (ej: contacto@tuempresa.cl).</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Globe className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                    <span><strong>Hosting y Dominio .CL:</strong> profesional incluido por 1 año.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                    <span><strong>Garantía Técnica:</strong> 60 días de soporte y panel de estadísticas.</span>
                  </div>
                </div>

                <div className="pt-4">
                  <a
                    href={whatsappLink('Hola UNIVERSO693, me interesa el Plan Pro ($200.000 IVA Incluido) para mi negocio.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 text-white font-extrabold py-3.5 text-xs sm:text-sm shadow-lg shadow-cyan-600/25 transition-all text-center"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>¿Conversemos?</span>
                  </a>
                </div>
              </div>

              {/* Webpay Footer Bar */}
              <div className="bg-[#FFF4ED] border-t border-[#FFD9C4] px-4 py-2.5 flex items-center justify-center gap-2 text-center text-[11px] font-extrabold text-[#C85A32]">
                <CreditCard className="w-3.5 h-3.5 shrink-0" />
                <span>Paga en 2 Transferencias o Cuotas con Webpay</span>
              </div>
            </div>

            {/* PLAN 3: PLAN PLUS (CATÁLOGO & MENÚ INTERACTIVO) */}
            <div className="bg-white rounded-3xl border-2 border-slate-200/90 hover:border-slate-300 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden">
              <div className="p-6 sm:p-7 space-y-5">
                <div className="text-center pb-2 border-b border-slate-100">
                  <h3 className="text-xl font-black text-slate-900">Plan Plus</h3>
                  <div className="mt-3">
                    <div className="text-3xl sm:text-4xl font-black text-slate-950">$ 250.000</div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mt-1">IVA Incluido</div>
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <p className="text-xs font-bold text-slate-700">Página Web de hasta 10 Secciones o Catálogo.</p>
                  <div className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1 rounded-full">
                    <Clock className="w-3.5 h-3.5 text-cyan-600" />
                    <span>Plazo: 10 Días Hábiles</span>
                  </div>
                </div>

                <div className="space-y-3 pt-2 text-xs text-slate-700">
                  <div className="flex items-start gap-2.5">
                    <Users className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                    <span><strong>Optimizado para Convertir:</strong> Visitas en Clientes fidelizados.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Catálogo / Menú Interactivo:</strong> con filtros y código QR digital.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Laptop className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                    <span><strong>Armado de Pedidos:</strong> o presupuestos directo al WhatsApp del negocio.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Globe className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                    <span><strong>Hosting y Dominio .CL:</strong> profesional por 1 año completo.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                    <span><strong>Panel de Control:</strong> para actualizar precios, productos y fotos al día.</span>
                  </div>
                </div>

                <div className="pt-4">
                  <a
                    href={whatsappLink('Hola UNIVERSO693, me interesa el Plan Plus ($250.000 IVA Incluido) con catálogo para mi negocio.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-3 text-xs sm:text-sm shadow-md transition-all text-center"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>¿Conversemos?</span>
                  </a>
                </div>
              </div>

              {/* Webpay Footer Bar */}
              <div className="bg-[#FFF4ED] border-t border-[#FFD9C4] px-4 py-2.5 flex items-center justify-center gap-2 text-center text-[11px] font-extrabold text-[#C85A32]">
                <CreditCard className="w-3.5 h-3.5 shrink-0" />
                <span>Paga en 2 Transferencias o Cuotas con Webpay</span>
              </div>
            </div>

            {/* PLAN 4: PLAN STORE (TIENDA ONLINE E-COMMERCE CON WEBPAY) */}
            <div className="bg-white rounded-3xl border-2 border-slate-200/90 hover:border-slate-300 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden">
              <div className="p-6 sm:p-7 space-y-5">
                <div className="text-center pb-2 border-b border-slate-100">
                  <h3 className="text-xl font-black text-slate-900">Plan Store</h3>
                  <div className="mt-3">
                    <div className="text-3xl sm:text-4xl font-black text-slate-950">$ 285.000</div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mt-1">IVA Incluido</div>
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <p className="text-xs font-bold text-slate-700">Tienda Online de productos y pagos con Webpay Plus.</p>
                  <div className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1 rounded-full">
                    <Clock className="w-3.5 h-3.5 text-cyan-600" />
                    <span>Plazo: 10 Días Hábiles</span>
                  </div>
                </div>

                <div className="space-y-3 pt-2 text-xs text-slate-700">
                  <div className="flex items-start gap-2.5">
                    <ShoppingBag className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                    <span><strong>Tienda E-Commerce 24/7:</strong> carrito, cálculo de envíos y stock.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CreditCard className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Pagos con Webpay Plus:</strong> Débito, Crédito en cuotas y Prepago.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Laptop className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                    <span><strong>Autoadministrable:</strong> panel intuitivo para subir nuevos productos.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Globe className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                    <span><strong>Hosting y Dominio .CL:</strong> servidor de alta velocidad por 1 año.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                    <span><strong>Certificado SSL Bancario:</strong> seguridad para compras con tarjetas.</span>
                  </div>
                </div>

                <div className="pt-4">
                  <a
                    href={whatsappLink('Hola UNIVERSO693, me interesa el Plan Store ($285.000 IVA Incluido) con Webpay para mi tienda online.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-3 text-xs sm:text-sm shadow-md transition-all text-center"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>¿Conversemos?</span>
                  </a>
                </div>
              </div>

              {/* Webpay Footer Bar */}
              <div className="bg-[#FFF4ED] border-t border-[#FFD9C4] px-4 py-2.5 flex items-center justify-center gap-2 text-center text-[11px] font-extrabold text-[#C85A32]">
                <CreditCard className="w-3.5 h-3.5 shrink-0" />
                <span>Paga en 2 Transferencias o Cuotas con Webpay</span>
              </div>
            </div>
          </div>

          {/* Banner de Alternativas: Arriendo Impulsa ProPyme vs Proyectos de Software a Medida */}
          <div className="mt-14 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Alternativa 1: Arriendo mensual */}
            <div className="bg-gradient-to-br from-[#FAF6F0] to-[#F3E9D2] border-2 border-[#E6DEC8] rounded-3xl p-6 sm:p-7 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-[#E9C46A] text-[#1F1A17] px-2.5 py-0.5 rounded-full inline-block">
                  ¿Prefieres no pagar de golpe?
                </span>
                <h4 className="text-lg font-black text-[#1F1A17]">Programa Impulsa ProPyme</h4>
                <p className="text-xs sm:text-sm text-[#574C43] leading-relaxed">
                  Ten tu página web profesional o sistema con arriendo mensual desde <strong>$19.900/mes</strong>, incluyendo hosting, cambios ilimitados y soporte técnico continuo sin descapitalizarte.
                </p>
              </div>
              <div className="pt-4">
                <Link
                  to="/impulsa-pyme"
                  className="inline-flex items-center gap-1.5 text-xs font-black text-[#1B4D3E] hover:underline"
                >
                  Conocer planes de arriendo y derecho a compra →
                </Link>
              </div>
            </div>

            {/* Alternativa 2: Proyectos propios a medida */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border-2 border-slate-800 text-white rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-lg">
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-cyan-400 text-slate-950 px-2.5 py-0.5 rounded-full inline-block">
                  Ingeniería & Proyectos Propios
                </span>
                <h4 className="text-lg font-black text-white">Desarrollo de Software a Medida</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  ¿Necesitas un sistema ERP, cotizador industrial de m², campus virtual con firma o inteligencia artificial conectada a bases de datos? Desarrollamos plataformas a medida de alto impacto.
                </p>
              </div>
              <div className="pt-4">
                <Link
                  to="/contacto"
                  className="inline-flex items-center gap-1.5 text-xs font-black text-cyan-300 hover:text-cyan-200 hover:underline"
                >
                  Cotizar proyecto o software a medida →
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      """

text_updated = text[:start_idx] + new_pricing_section + text[end_idx:]

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(text_updated)

print("PAGINAS WEB PRICING UPDATED SUCCESSFULLY")
