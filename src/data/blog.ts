import { postsEn } from './blog.en';

/**
 * Blog articles (Spanish; English copy in blog.en.ts). Blocks keep the content structured so the same
 * data renders the page, the prerendered HTML and the JSON-LD.
 */
export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'cta'; text: string };

export interface Post {
  slug: string;
  title: string;
  /** Shorter title for search results (<= ~65 chars). */
  seoTitle: string;
  /** Meta description / card summary (<= ~155 chars). */
  description: string;
  /** ISO date. */
  date: string;
  minutes: number;
  tags: string[];
  body: Block[];
}

export const posts: Post[] = [
  {
    slug: 'chatbot-whatsapp-empresas-chile',
    seoTitle: 'Chatbot de WhatsApp para empresas en Chile: requisitos y costos',
    title: 'Chatbot de WhatsApp para empresas en Chile: qué necesitas, cuánto tarda y de qué depende el costo',
    description:
      'Guía práctica para implementar un agente de IA en WhatsApp: requisitos de Meta, plazos reales, qué lo hace confiable y los factores que definen el costo.',
    date: '2026-09-30',
    minutes: 7,
    tags: ['WhatsApp', 'Agentes de IA', 'Atención al cliente'],
    body: [
      {
        type: 'p',
        text: 'En Chile, WhatsApp es el canal donde tus clientes ya están. Por eso cada vez más empresas quieren un agente que responda consultas, califique prospectos y agende citas a cualquier hora. La buena noticia es que hoy se puede hacer bien y en poco tiempo. La mala es que hay muchos "bots" que responden cualquier cosa y terminan espantando clientes. Esta guía explica qué necesitas para hacerlo de forma seria.',
      },
      { type: 'h2', text: 'Chatbot de reglas vs. agente de IA' },
      {
        type: 'p',
        text: 'Un chatbot tradicional funciona con menús y respuestas fijas: "escribe 1 para ventas, 2 para soporte". Sirve para casos muy simples, pero se rompe apenas el cliente escribe algo distinto. Un agente de IA entiende lenguaje natural, responde con la información de tu empresa y puede ejecutar acciones, como registrar un prospecto en tu CRM o reservar una hora en tu calendario.',
      },
      {
        type: 'p',
        text: 'La clave está en que el agente responda solo con información verificada. Eso se logra con una base de conocimiento propia (lo que en la industria se llama RAG): el agente consulta tus documentos, precios y políticas antes de contestar, y si no encuentra la respuesta, deriva la conversación a una persona en lugar de inventar.',
      },
      { type: 'h2', text: 'Qué necesitas para un WhatsApp con IA' },
      {
        type: 'ul',
        items: [
          'Una cuenta de Meta Business verificada con los datos de tu empresa.',
          'Un número de teléfono dedicado a la API de WhatsApp Business. No puede estar usándose al mismo tiempo en la app normal de WhatsApp.',
          'Plantillas de mensaje aprobadas por Meta, necesarias cuando es tu empresa la que escribe primero (por ejemplo, un recordatorio de cita).',
          'La información que el agente usará para responder: preguntas frecuentes, catálogo, precios, horarios y políticas.',
          'Una integración con tus herramientas: CRM, planilla, calendario o sistema de reservas.',
        ],
      },
      {
        type: 'p',
        text: 'Cuando el cliente es quien inicia la conversación, se abre una ventana de 24 horas en la que el agente puede responder libremente. Fuera de esa ventana, solo se pueden enviar plantillas aprobadas. Diseñar bien este flujo evita bloqueos y cobros innecesarios.',
      },
      { type: 'h2', text: '¿Cuánto tarda la implementación?' },
      {
        type: 'p',
        text: 'Un agente inicial, con una base de conocimiento acotada y una o dos integraciones, puede estar funcionando en alrededor de 7 días. El plazo real depende sobre todo de dos cosas que no son técnicas: qué tan rápido Meta verifica tu empresa y qué tan ordenada está la información que el agente debe aprender. Proyectos con varios canales, integraciones profundas o flujos complejos se planifican por etapas.',
      },
      { type: 'h2', text: 'De qué depende el costo' },
      {
        type: 'p',
        text: 'No existe un precio único, porque dos empresas pueden necesitar agentes muy distintos. Estos son los factores que realmente mueven el costo:',
      },
      {
        type: 'ul',
        items: [
          'Tarifas de Meta: WhatsApp cobra por los mensajes o conversaciones según su categoría (marketing, utilidad, autenticación o servicio) y el país. Conviene revisar la tarifa vigente en el sitio de Meta.',
          'Volumen de conversaciones: más mensajes implican más uso del modelo de IA y de la API.',
          'Integraciones: conectar un CRM, un ERP o un sistema de pagos toma más trabajo que usar una planilla.',
          'Tamaño y orden de la base de conocimiento: documentos dispersos requieren más preparación.',
          'Mantención: ajustes de respuestas, métricas y mejoras continuas después del lanzamiento.',
        ],
      },
      { type: 'h2', text: 'Cómo saber si un agente es confiable' },
      {
        type: 'ul',
        items: [
          'Responde solo con tu información y reconoce cuando no sabe algo.',
          'Traspasa la conversación a una persona de forma fluida cuando corresponde.',
          'Tiene métricas: cuántas consultas resuelve, cuántas deriva y en qué temas falla.',
          'Cuida los datos personales de tus clientes y cumple la normativa vigente.',
        ],
      },
      {
        type: 'cta',
        text: 'Si quieres saber exactamente qué automatizar primero y cuánto retorno esperar, el diagnóstico EBS 693 te entrega una hoja de ruta con ROI en una sesión de 45 minutos.',
      },
    ],
  },
  {
    slug: 'software-a-medida-vs-suscripcion',
    seoTitle: 'Software a medida vs. suscripción: cuándo conviene cada uno',
    title: 'Software a medida vs. software de suscripción: cuándo conviene cada uno',
    description:
      'Cómo decidir entre contratar un software SaaS o construir uno a medida: costos a largo plazo, control, integraciones y una alternativa intermedia.',
    date: '2026-09-30',
    minutes: 6,
    tags: ['Software a medida', 'SaaS', 'Estrategia'],
    body: [
      {
        type: 'p',
        text: 'Toda empresa que crece llega a la misma pregunta: ¿seguimos pagando herramientas de suscripción o construimos un sistema propio? No hay una respuesta universal. Depende de qué tan particular es tu operación, cuánto te cuesta adaptarte a la herramienta y hacia dónde quieres ir.',
      },
      { type: 'h2', text: 'Cuándo conviene el software de suscripción (SaaS)' },
      {
        type: 'ul',
        items: [
          'Tu proceso es estándar: contabilidad, correo, gestión de proyectos genérica.',
          'Necesitas partir hoy y no tienes tiempo para un desarrollo.',
          'El costo mensual es bajo en relación a lo que te ahorra.',
          'No necesitas integrarlo profundamente con otros sistemas.',
        ],
      },
      { type: 'h2', text: 'Cuándo conviene construir a medida' },
      {
        type: 'ul',
        items: [
          'Tu forma de operar es parte de tu ventaja competitiva y ninguna herramienta la refleja bien.',
          'Estás pagando varias suscripciones que no conversan entre sí y el equipo pierde horas moviendo datos a mano.',
          'Las licencias por usuario crecen más rápido que tu equipo y el costo anual ya es alto.',
          'Necesitas control sobre tus datos, tu seguridad o tus integraciones.',
          'Quieres ofrecer el sistema a tus propios clientes como un producto.',
        ],
      },
      { type: 'h2', text: 'El costo que no se ve' },
      {
        type: 'p',
        text: 'Al comparar, muchas empresas miran solo el precio de la suscripción frente al presupuesto del desarrollo. Falta sumar el tiempo que el equipo dedica a adaptarse a la herramienta, los errores de copiar datos entre sistemas y las oportunidades que se pierden por no poder hacer algo que la herramienta no permite. En operaciones particulares, ese costo invisible suele ser mayor que la suscripción.',
      },
      { type: 'h2', text: 'La alternativa intermedia' },
      {
        type: 'p',
        text: 'No siempre hay que elegir. Una estrategia frecuente es mantener las herramientas estándar que funcionan bien y construir solo la pieza que falta: una integración entre sistemas, un panel que reúna los datos importantes o un agente de IA que automatice una tarea repetitiva. Así se invierte donde realmente hay retorno.',
      },
      { type: 'h2', text: 'Preguntas para decidir' },
      {
        type: 'ul',
        items: [
          '¿Qué procesos hacemos a mano porque la herramienta actual no los resuelve?',
          '¿Cuánto pagamos al año en licencias y cuánto crecerá con el equipo?',
          '¿Qué pasaría si el proveedor sube precios o cierra?',
          '¿Qué datos necesitamos controlar nosotros?',
          '¿Esto nos diferencia de la competencia o es una tarea genérica?',
        ],
      },
      {
        type: 'p',
        text: 'Si construyes, asegúrate de que el código, la documentación y la infraestructura queden a nombre de tu empresa. Un software a medida debe ser un activo tuyo, no una dependencia de un proveedor.',
      },
      {
        type: 'cta',
        text: 'Si no tienes claro qué conviene en tu caso, el diagnóstico EBS 693 revisa tu operación y te entrega una recomendación con costos y retorno estimado.',
      },
    ],
  },
  {
    slug: 'inteligencia-artificial-en-tu-empresa-casos-practicos',
    seoTitle: 'IA en tu empresa: 5 casos prácticos sin perder el control',
    title: 'Cómo usar inteligencia artificial en tu empresa sin perder el control: 5 casos prácticos',
    description:
      'Cinco usos concretos de inteligencia artificial en empresas y las reglas para que ayude sin generar riesgos ni perder el control.',
    date: '2026-09-30',
    minutes: 7,
    tags: ['Inteligencia artificial', 'Automatización', 'Casos'],
    body: [
      {
        type: 'p',
        text: 'La inteligencia artificial dejó de ser un experimento. Hoy se puede integrar en procesos concretos y medir su impacto. El error más común no es técnico: es implementarla sin objetivo, sin datos confiables y sin una persona responsable de revisar lo que hace. Estos cinco casos muestran dónde aporta valor real.',
      },
      { type: 'h2', text: '1. Atención al cliente 24/7' },
      {
        type: 'p',
        text: 'Un agente de IA en WhatsApp o en tu sitio web responde las preguntas frecuentes a cualquier hora, con la información de tu empresa, y deriva a una persona los casos que lo requieren. El equipo deja de responder lo mismo cien veces y se concentra en los casos que necesitan criterio humano.',
      },
      { type: 'h2', text: '2. Asistentes dentro de tu producto' },
      {
        type: 'p',
        text: 'Un asistente integrado a tu propia plataforma o app puede usar los datos de cada usuario para responder con contexto: el historial de un cliente, el estado de un pedido o la ficha de un paciente. A diferencia de un chatbot genérico, sabe con quién está hablando y deriva a una persona cuando la consulta lo requiere.',
      },
      { type: 'h2', text: '3. Redacción asistida' },
      {
        type: 'p',
        text: 'La IA puede preparar un primer borrador a partir de datos o notas: propuestas comerciales, informes, respuestas a clientes o descripciones de productos. La persona revisa y mantiene el control del texto final; la IA ahorra el tiempo del borrador y el bloqueo de la página en blanco.',
      },
      { type: 'h2', text: '4. Automatización de tareas repetitivas' },
      {
        type: 'p',
        text: 'Extraer datos de documentos, clasificar correos, generar reportes o mover información entre sistemas son tareas donde la IA combinada con automatización (por ejemplo, con n8n o Make) libera horas cada semana. Aquí el retorno es fácil de medir: horas ahorradas y errores evitados.',
      },
      { type: 'h2', text: '5. Recomendaciones y ventas' },
      {
        type: 'p',
        text: 'Un asesor comercial con IA puede responder preguntas sobre precios y planes usando el catálogo real, y recomendar productos o servicios según lo que el cliente necesita. Cuando la consulta se vuelve compleja, ofrece el traspaso a un ejecutivo por WhatsApp.',
      },
      { type: 'h2', text: 'Reglas para no perder el control' },
      {
        type: 'ul',
        items: [
          'Define un objetivo medible antes de implementar: horas ahorradas, tiempo de respuesta, ventas.',
          'La IA debe responder con información verificada de tu empresa y reconocer cuando no sabe.',
          'Siempre debe haber una forma de llegar a una persona.',
          'Protege los datos personales: qué se guarda, dónde y por cuánto tiempo.',
          'Revisa métricas y conversaciones periódicamente para corregir errores.',
        ],
      },
      {
        type: 'cta',
        text: 'Si quieres identificar qué proceso de tu empresa tiene más potencial para la IA, agenda el diagnóstico EBS 693: 45 minutos y una hoja de ruta con ROI estimado.',
      },
    ],
  },
  {
    slug: 'inteligencia-artificial-por-industria-chile',
    seoTitle: 'IA y software por industria en Chile: finanzas, minería y más',
    title: 'Inteligencia artificial y software por industria en Chile: finanzas, minería, retail y más',
    description:
      'Casos de uso de IA y software a medida por sector en Chile: banca y finanzas, minería, retail, salud, inmobiliario, logística y educación.',
    date: '2026-09-30',
    minutes: 9,
    tags: ['Industrias', 'Inteligencia artificial', 'Chile'],
    body: [
      {
        type: 'p',
        text: 'Cada industria tiene sus propios cuellos de botella, regulaciones y oportunidades. Una solución de IA que funciona muy bien en retail puede ser inaceptable en un banco si no cumple las exigencias de seguridad. Esta guía resume dónde la inteligencia artificial y el software a medida aportan más valor en los principales sectores de Chile, y qué hay que cuidar en cada uno.',
      },
      {
        type: 'p',
        text: 'Un punto transversal: la Ley 21.719 moderniza la protección de datos personales en Chile y eleva las exigencias sobre cómo las empresas tratan la información de las personas. Cualquier proyecto con datos de clientes debe diseñarse considerando esa normativa desde el inicio.',
      },
      { type: 'h2', text: 'Banca y servicios financieros' },
      {
        type: 'ul',
        items: [
          'Agentes que responden consultas frecuentes sobre productos, requisitos y estados de solicitud.',
          'Automatización de revisión documental en procesos de evaluación y onboarding de clientes.',
          'Detección de patrones inusuales que apoyen la prevención de fraude.',
          'Paneles que consolidan información de distintos sistemas para la toma de decisiones.',
        ],
      },
      {
        type: 'p',
        text: 'Qué cuidar: es un sector regulado, supervisado por la CMF, y con iniciativas como la Ley Fintec que impulsan el intercambio de información financiera. La trazabilidad, el control de accesos y la supervisión humana de las decisiones automatizadas son requisitos, no opciones.',
      },
      { type: 'h2', text: 'Minería' },
      {
        type: 'ul',
        items: [
          'Mantenimiento predictivo a partir de datos de sensores de equipos, para anticipar fallas.',
          'Asistentes que permiten consultar manuales técnicos y procedimientos de seguridad en lenguaje natural.',
          'Automatización de reportes de turno, producción e indicadores de seguridad.',
          'Paneles de control para operaciones remotas y seguimiento en tiempo real.',
        ],
      },
      {
        type: 'p',
        text: 'Qué cuidar: la seguridad de las personas va primero, por lo que la IA debe apoyar decisiones, no reemplazar protocolos. Además, muchas faenas tienen conectividad limitada, lo que obliga a diseñar soluciones que funcionen con conexión intermitente.',
      },
      { type: 'h2', text: 'Retail y e-commerce' },
      {
        type: 'ul',
        items: [
          'Atención 24/7 por WhatsApp e Instagram con seguimiento de pedidos.',
          'Recomendaciones de productos según el historial y las preferencias del cliente.',
          'Generación de descripciones de productos y contenido para catálogos grandes.',
          'Análisis de ventas e inventario para anticipar quiebres de stock.',
        ],
      },
      { type: 'h2', text: 'Salud' },
      {
        type: 'ul',
        items: [
          'Agendamiento y confirmación de horas por WhatsApp, reduciendo inasistencias.',
          'Asistentes que responden preguntas administrativas: coberturas, requisitos y preparación de exámenes.',
          'Automatización de documentación y trámites internos.',
        ],
      },
      {
        type: 'p',
        text: 'Qué cuidar: los datos de salud son especialmente sensibles. La IA no debe diagnosticar ni reemplazar la evaluación de un profesional, y siempre debe derivar a una persona ante síntomas o urgencias.',
      },
      { type: 'h2', text: 'Inmobiliario' },
      {
        type: 'ul',
        items: [
          'Calificación de prospectos y agendamiento de visitas las 24 horas.',
          'Simuladores de crédito y plusvalía que ayudan al cliente a decidir antes de hablar con un ejecutivo.',
          'Seguimiento automático de interesados según la etapa del proyecto.',
        ],
      },
      { type: 'h2', text: 'Logística y transporte' },
      {
        type: 'ul',
        items: [
          'Notificaciones automáticas del estado de envíos por WhatsApp o correo.',
          'Optimización de rutas y asignación de entregas.',
          'Lectura automática de guías, facturas y documentos de despacho.',
        ],
      },
      { type: 'h2', text: 'Educación' },
      {
        type: 'ul',
        items: [
          'Asistentes que responden dudas sobre admisión, aranceles y procesos.',
          'Apoyo a docentes en la preparación de material y evaluaciones.',
          'Seguimiento de estudiantes para detectar a tiempo riesgos de deserción.',
        ],
      },
      { type: 'h2', text: 'Cómo partir en cualquier industria' },
      {
        type: 'ul',
        items: [
          'Elige un proceso concreto, repetitivo y medible.',
          'Revisa qué datos tienes y en qué estado están.',
          'Define desde el inicio las reglas de privacidad, seguridad y supervisión humana.',
          'Parte con un piloto acotado, mide resultados y luego escala.',
        ],
      },
      {
        type: 'cta',
        text: 'Cada sector tiene sus reglas. En el diagnóstico EBS 693 analizamos tu operación y regulación para priorizar qué automatizar primero y con qué retorno.',
      },
    ],
  },
];

/** The post in the visitor's language (SEO and JSON-LD always use the Spanish). */
export const postCopy = (p: Post, lang: 'es' | 'en'): Post => (lang === 'en' && postsEn[p.slug] ? { ...p, ...postsEn[p.slug] } : p);
