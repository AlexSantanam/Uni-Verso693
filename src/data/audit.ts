import type { L } from '../lib/lang';

/**
 * Background content for /audit-693: shown as collapsed FAQs at the end of the page and
 * repeated in the FAQPage JSON-LD (Spanish), so search engines and AI assistants get the full
 * picture while visitors only see the questions. Keep in sync with api/audit.ts and api/pro.ts.
 */
export const auditFaqs: { q: L; a: L }[] = [
  {
    q: { es: '¿Qué es el Audit 693?', en: 'What is Audit 693?' },
    a: {
      es: 'Es un análisis con inteligencia artificial del sitio web de una empresa, creado por Uni-Verso693 (Universo693 SpA), empresa chilena de desarrollo de software e IA fundada en 2013. Lee el sitio, entiende qué vende el negocio y a quién, y detecta dónde la IA y la automatización pueden ahorrar tiempo o recuperar ventas. Tiene una versión gratuita y una versión pagada, el AUDIT 693 PRO.',
      en: 'It’s an AI analysis of a company’s website, built by Uni-Verso693 (Universo693 SpA), a Chilean software and AI company founded in 2013. It reads the site, understands what the business sells and to whom, and spots where AI and automation can save time or win back sales. There’s a free version and a paid one, AUDIT 693 PRO.',
    },
  },
  {
    q: { es: '¿Qué incluye la versión gratuita?', en: 'What does the free version include?' },
    a: {
      es: 'En unos 20 segundos muestra en pantalla un resumen del negocio y 3 oportunidades de IA, cada una con una frase sobre por qué importa. Analiza la portada del sitio. No genera PDF ni envía el informe por correo.',
      en: 'In about 20 seconds it shows on screen a summary of the business and 3 AI opportunities, each with one sentence on why it matters. It analyses the home page. It doesn’t produce a PDF or email the report.',
    },
  },
  {
    q: { es: '¿Qué incluye el AUDIT 693 PRO - Informe de Fugas de Dinero?', en: 'What does AUDIT 693 PRO (Money Leak Report) include?' },
    a: {
      es: 'Es un informe en PDF que revisa hasta 7 páginas del sitio (servicios, productos, precios, nosotros, contacto), evalúa el sitio como canal de venta (claridad de la propuesta, llamados a la acción, captura de contactos, atención, confianza, SEO básico), investiga en la web a los competidores directos del rubro y la zona, calcula el costo mensual y anual del trabajo manual con los datos que entrega el cliente y prioriza entre 8 y 10 oportunidades de IA y automatización por impacto y esfuerzo. Incluye victorias rápidas y las preguntas clave que conviene responder antes de implementar.',
      en: 'It’s a PDF report that reviews up to 7 pages of the site (services, products, pricing, about, contact), assesses the site as a sales channel (clarity of the offer, calls to action, lead capture, customer service, trust, basic SEO), researches direct competitors in the same industry and area on the web, calculates the monthly and yearly cost of manual work from the client’s own numbers, and prioritises 8 to 10 AI and automation opportunities by impact and effort. It includes quick wins and the key questions to answer before implementing.',
    },
  },
  {
    q: { es: '¿Cuánto cuesta el AUDIT 693 PRO y cómo se paga?', en: 'How much is AUDIT 693 PRO and how do I pay?' },
    a: {
      es: 'Cuesta $19.990 CLP en Chile, pagando con Mercado Pago (tarjetas de crédito, débito y otros medios disponibles en Mercado Pago). Fuera de Chile cuesta USD 21 y se paga con PayPal. Uni-Verso693 no ve ni guarda los datos de la tarjeta: el pago lo procesa directamente Mercado Pago o PayPal.',
      en: 'Outside Chile it costs USD 21, paid with PayPal. In Chile it costs CLP 19,990, paid with Mercado Pago (credit and debit cards and other methods Mercado Pago offers). Uni-Verso693 never sees or stores card details: payment is handled directly by PayPal or Mercado Pago.',
    },
  },
  {
    q: { es: '¿Cuánto tarda en llegar el informe?', en: 'How long does the report take?' },
    a: {
      es: 'Entre 2 y 4 minutos después de que el medio de pago confirma la compra. Se muestra en la misma página, llega al correo como PDF adjunto y queda disponible para descargar durante 90 días.',
      en: 'Between 2 and 4 minutes after the payment is confirmed. It appears on the same page, arrives by email as a PDF attachment and stays available to download for 90 days.',
    },
  },
  {
    q: { es: '¿Cómo se hace el análisis de competencia?', en: 'How is the competitor analysis done?' },
    a: {
      es: 'La IA busca en la web competidores directos del mismo rubro y, cuando aplica, de la misma ciudad o país, y suma los que el cliente indique en el formulario. De cada uno describe cómo se presenta, qué hace bien en lo digital (atención por chat o WhatsApp, reservas o compra en línea, contenido, precios visibles) y en qué le saca ventaja al cliente o en qué el cliente le gana. Solo usa información pública y nunca inventa competidores: si no encuentra competidores confiables, el informe lo dice.',
      en: 'The AI searches the web for direct competitors in the same industry and, where relevant, the same city or country, and adds any the client names in the form. For each one it describes how they present themselves, what they do well online (chat or WhatsApp support, online booking or checkout, content, visible pricing) and where they’re ahead of the client or behind. It only uses public information and never invents competitors: if it can’t find reliable ones, the report says so.',
    },
  },
  {
    q: { es: '¿Cómo se calcula el costo del trabajo manual?', en: 'How is the cost of manual work calculated?' },
    a: {
      es: 'Con los datos del propio cliente: horas a la semana dedicadas a tareas manuales o repetitivas, multiplicadas por el costo aproximado de una hora de trabajo y por 4,33 semanas al mes. El informe no usa porcentajes de ahorro inventados ni promedios de la industria.',
      en: 'With the client’s own numbers: weekly hours spent on manual or repetitive tasks, multiplied by the approximate cost of an hour of work and by 4.33 weeks per month. The report doesn’t use made-up savings percentages or industry averages.',
    },
  },
  {
    q: { es: '¿El informe explica cómo implementar las soluciones?', en: 'Does the report explain how to implement the solutions?' },
    a: {
      es: 'No. El AUDIT 693 PRO dice qué oportunidades hay, dónde se pierde tiempo o dinero y por qué importa. Cómo implementarlo, en qué orden y con qué retorno estimado se define en el diagnóstico EBS 693, una sesión de 45 minutos con el equipo de Uni-Verso693.',
      en: 'No. AUDIT 693 PRO shows which opportunities exist, where time or money is being lost and why it matters. How to implement it, in what order and with what estimated return is defined in the EBS 693 diagnosis, a 45-minute session with the Uni-Verso693 team.',
    },
  },
  {
    q: { es: '¿Qué diferencia hay entre el AUDIT 693 PRO y el diagnóstico EBS 693?', en: 'How is AUDIT 693 PRO different from the EBS 693 diagnosis?' },
    a: {
      es: 'Son servicios distintos que se complementan. El AUDIT 693 PRO es un informe automático con IA a partir del sitio web, la competencia y los datos que entrega el cliente ($19.990 CLP). El EBS 693 es una sesión de 45 minutos con el equipo sobre la operación real de la empresa que termina en una hoja de ruta priorizada con retorno estimado ($197.000 CLP). El valor del AUDIT 693 PRO no se descuenta del EBS 693.',
      en: 'They’re separate services that complement each other. AUDIT 693 PRO is an automatic AI report based on the website, competitors and the client’s own numbers (USD 21 / CLP 19,990). EBS 693 is a 45-minute session with the team about the company’s real operation that ends in a prioritised roadmap with estimated return (CLP 197,000). The AUDIT 693 PRO price isn’t credited to EBS 693.',
    },
  },
  {
    q: { es: '¿Qué datos se usan y son confidenciales?', en: 'What data is used, and is it confidential?' },
    a: {
      es: 'Se usa el contenido público del sitio web, información pública de la competencia y las respuestas del formulario. La información es confidencial y no se comparte con terceros. El sitio se lee de forma segura: solo páginas públicas, sin iniciar sesión ni enviar formularios.',
      en: 'The public content of the website, public information about competitors and the answers in the form. It’s confidential and isn’t shared with third parties. The site is read safely: public pages only, without logging in or submitting forms.',
    },
  },
  {
    q: { es: '¿Sirve para cualquier industria o tamaño de empresa?', en: 'Does it work for any industry or company size?' },
    a: {
      es: 'Sí. Funciona para pymes y empresas medianas o grandes de cualquier rubro: comercio, servicios profesionales, salud, educación, logística, inmobiliarias, industria y otros. Si el sitio tiene poco texto legible (por ejemplo, porque se genera con JavaScript), el informe trabaja con lo disponible y lo indica en sus limitaciones.',
      en: 'Yes. It works for small, mid-sized and large companies in any industry: retail, professional services, healthcare, education, logistics, real estate, manufacturing and more. If the site has little readable text (for example because it’s rendered with JavaScript), the report works with what’s available and says so in its limitations.',
    },
  },
];
