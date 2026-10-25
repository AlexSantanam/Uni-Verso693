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
    slug: 'soberania-tecnologica-boveda-digital-codigo-propio',
    seoTitle: 'Soberanía tecnológica: protege tu código y evita el secuestro digital',
    title: 'Soberanía tecnológica: por qué tu empresa debe ser dueña de su código y cómo evitar el secuestro digital',
    description:
      'Descubre cómo muchas agencias atrapan a las empresas reteniendo credenciales y repositorios, y cómo garantizar la custodia total de tu tecnología con una Bóveda Digital.',
    date: '2026-10-25',
    minutes: 6,
    tags: ['Soberanía Tecnológica', 'Seguridad Cloud', 'Bóveda Digital'],
    body: [
      {
        type: 'p',
        text: 'El mayor riesgo oculto al contratar desarrollo de software no es un bug ni un retraso en la entrega; es el secuestro tecnológico. Cientos de empresas en Chile y Latinoamérica descubren tarde que su agencia retuvo las contraseñas del servidor, los accesos a la base de datos o el repositorio en GitHub, cobrando sumas astronómicas por hacer cambios mínimos o impidiendo migrar a otro proveedor.',
      },
      { type: 'h2', text: 'Las tres formas clásicas de secuestro tecnológico' },
      {
        type: 'ul',
        items: [
          'Cuentas a nombre de terceros: La agencia contrata AWS, GCP o el dominio a su propio nombre. Si la relación comercial termina, la empresa pierde el control de su infraestructura.',
          'Código fuente retenido o inaccesible: Se entrega solo el ejecutable o el sitio publicado en un servidor privado, sin dar acceso al repositorio GitHub/GitLab con el historial de cambios.',
          'Llaves de API y credenciales dispersas: Pasarelas de pago, servicios de correos y cuentas de Meta quedan en correos personales de desarrolladores que luego dejan la agencia.',
        ],
      },
      { type: 'h2', text: '¿Qué significa tener Soberanía Tecnológica real?' },
      {
        type: 'p',
        text: 'Soberanía tecnológica significa que todo lo construido le pertenece legal y técnicamente a tu empresa desde el primer día. Si decides cambiar de equipo o contratar desarrolladores internos, la transición debe tomar 15 minutos, no una batalla legal.',
      },
      {
        type: 'ul',
        items: [
          'Repositorio en tu propia organización (GitHub / GitLab) con documentación de arquitectura completa.',
          'Infraestructura cloud (AWS, Google Cloud o servidores dedicados) facturada directamente al RUT de tu empresa.',
          'Dominio y certificados SSL a tu nombre, sin intermediarios.',
          'Cero dependencias de licencias propietarias cerradas que cobren por cada usuario o transacción.',
        ],
      },
      { type: 'h2', text: 'El concepto de Bóveda Digital ($0 bonificada)' },
      {
        type: 'p',
        text: 'En Uni-Verso693 implementamos la Bóveda Digital de Credenciales: un espacio seguro y encriptado donde cada cliente tiene acceso 24/7 a sus credenciales de base de datos, repositorios, accesos a paneles cloud, DNS y llaves de APIs. Es una garantía anti-secuestro que entregamos bonificada al 100% en todo proyecto.',
      },
      {
        type: 'cta',
        text: 'Protege el activo digital de tu empresa. Escríbenos para planificar tu proyecto con soberanía tecnológica total y entrega de llaves en tu Bóveda Digital.',
      },
    ],
  },
  {
    slug: 'campus-virtual-lms-sence-sin-licencias-por-alumno',
    seoTitle: 'Campus Virtuales y OTEC SENCE: LMS propio sin licencias por alumno',
    title: 'Campus Virtuales y OTEC SENCE: cómo implementar un LMS propio sin pagar licencias por alumno',
    description:
      'Guía para OTECs, academias y empresas que capacitan: requisitos técnicos SENCE, biometría, diplomas QR y ventajas de una plataforma propia frente a SaaS.',
    date: '2026-10-22',
    minutes: 8,
    tags: ['Campus Virtual', 'OTEC SENCE', 'Educación & LMS'],
    body: [
      {
        type: 'p',
        text: 'El modelo tradicional de e-learning tiene una trampa matemática: mientras más alumnos capacitas, más le pagas al proveedor de la plataforma. Para una OTEC o empresa de formación en Chile, los planes SaaS que cobran $2 a $5 USD mensuales por usuario activo terminan devorándose el margen operacional a medida que el negocio escala.',
      },
      { type: 'h2', text: 'SaaS cerrado vs. Campus Virtual propio' },
      {
        type: 'p',
        text: 'Las plataformas SaaS estándar no solo cobran por alumno; además imponen interfaces genéricas, dificultan la descarga de reportes para auditorías y ofrecen nula flexibilidad para personalizar evaluaciones complejas.',
      },
      {
        type: 'ul',
        items: [
          'Cero cobro por alumno o usuario: Tu servidor maneja 50 o 5.000 alumnos sin aumentar el costo de software.',
          'PWA instalable en móviles: Los estudiantes acceden desde Android e iOS sin pasar por las tiendas de apps y con bajísimo consumo de datos.',
          'Base de datos propia: Custodia total de historiales académicos, notas y datos personales bajo la ley chilena.',
        ],
      },
      { type: 'h2', text: 'Requisitos técnicos indispensables para certificar ante SENCE' },
      {
        type: 'p',
        text: 'Para que los cursos a distancia sean reconocidos con franquicia tributaria SENCE, la plataforma debe cumplir con estándares estrictos de trazabilidad y seguridad:',
      },
      {
        type: 'ul',
        items: [
          'Libro de Clases Digital sincronizado: Registro exacto de horas de conexión, módulos completados e intentos en evaluaciones.',
          'Validación de identidad: Integración con sistemas de verificación biométrica o autenticación con ClaveÚnica del Estado.',
          'Diplomas y certificados con validación QR: Cada certificado emitido debe contar con un código QR único que permita verificar su autenticidad en tiempo real por empleadores o fiscalizadores.',
          'Gestión B2B para clientes corporativos: Paneles donde las empresas clientes del OTEC pueden cargar nóminas masivas de trabajadores y monitorear su avance en tiempo real.',
        ],
      },
      { type: 'h2', text: 'Rendimiento y arquitectura moderna' },
      {
        type: 'p',
        text: 'Atrás quedaron los tiempos de servidores Moodle lentos que se caían apenas 50 alumnos rendían un examen simultáneamente. Una arquitectura moderna basada en React, Node.js y bases de datos optimizadas permite tiempos de carga inferiores a 800 milisegundos y concurrencia masiva con costos de servidor mínimos.',
      },
      {
        type: 'cta',
        text: '¿Diriges una OTEC o un instituto de capacitación? Diseñamos tu Campus Virtual propio cumpliendo con la normativa SENCE y sin licencias por alumno.',
      },
    ],
  },
  {
    slug: 'pasarelas-de-pago-chile-transbank-flow-mercadopago-stripe',
    seoTitle: 'Pasarelas de pago en Chile: Webpay, Flow, Mercado Pago o Stripe',
    title: 'Pasarelas de pago en Chile: Transbank Webpay, Flow, Mercado Pago o Stripe, ¿cuál elegir?',
    description:
      'Comparativa técnica y comercial de medios de pago en Chile: comisiones, abonos, webhooks y cómo prevenir caídas de ventas en tu checkout.',
    date: '2026-10-18',
    minutes: 7,
    tags: ['Pasarelas de Pago', 'E-commerce', 'Fintech Chile'],
    body: [
      {
        type: 'p',
        text: 'Elegir la pasarela de pago adecuada es una de las decisiones más críticas para cualquier comercio electrónico o plataforma de software en Chile. Una mala elección se traduce en altas tasas de abandono de carrito, comisiones excesivas que erosionan el margen o caídas del sistema en fechas clave como CyberDays.',
      },
      { type: 'h2', text: 'Transbank Webpay Plus vs. Agregadores de pago' },
      {
        type: 'p',
        text: 'La primera gran división en Chile es entre contratar directamente con adquirentes (como Transbank Webpay Plus) o utilizar agregadores de pago (como Flow, Mercado Pago o Stripe).',
      },
      {
        type: 'ul',
        items: [
          'Transbank Webpay Plus: Comisiones más bajas del mercado y abono directo en tu cuenta bancaria (generalmente al día hábil siguiente para débito). Requiere proceso de afiliación y certificación técnica formal.',
          'Flow: Excelente soporte local, activación rápida y múltiples medios de pago combinados (Webpay, Servipag, Mach, transferencias). Ideal para iniciar rápido sin trámites bancarios complejos.',
          'Mercado Pago: Gran penetración en usuarios que pagan con saldo en cuenta o cuotas de Mercado Pago. Comisiones ligeramente superiores, pero onboarding inmediato y herramientas anti-fraude integradas.',
          'Stripe: El estándar global de experiencia de usuario para cobros recurrentes en dólares (SaaS B2B internacional) y tarjetas internacionales, aunque con comisiones más altas para moneda local.',
        ],
      },
      { type: 'h2', text: 'La importancia de los Webhooks seguros y la conciliación automática' },
      {
        type: 'p',
        text: 'El error más común al integrar pagos es depender de que el usuario regrese a la pantalla de éxito en su navegador. Si el usuario cierra la pestaña antes de la redirección, la compra queda como "pendiente" aunque el banco haya descontado el dinero.',
      },
      {
        type: 'ul',
        items: [
          'Notificación asíncrona por Webhooks: El servidor de la pasarela avisa a tu sistema en segundo plano con firma criptográfica, confirmando la venta de forma 100% infalible.',
          'Idempotencia: Garantizar que una notificación duplicada de la pasarela no procese dos veces el mismo pedido ni genere dobles facturas.',
          'Emisión automática de boletas/facturas: Conexión inmediata de la confirmación de pago con el SII para emitir el DTE tributario al instante.',
        ],
      },
      {
        type: 'cta',
        text: 'Integra cobros con tarjeta, débito y transferencias en tu plataforma con conciliación automática y alta seguridad. Escríbenos para cotizar tu integración de pagos.',
      },
    ],
  },
  {
    slug: 'seo-tecnico-plataformas-web-react-posicionamiento',
    seoTitle: 'SEO técnico para plataformas web: cómo posicionar software en Google',
    title: 'SEO técnico para aplicaciones web: cómo lograr que Google indexe y posicione tu software',
    description:
      'Por qué una app en React puede ser invisible para Google y cómo la generación estática (SSG) y Core Web Vitals garantizan tráfico orgánico calificado.',
    date: '2026-10-14',
    minutes: 7,
    tags: ['SEO Técnico', 'React & Web', 'Rendimiento'],
    body: [
      {
        type: 'p',
        text: 'Muchos fundadores y directores de marketing invierten millones en desarrollar una plataforma moderna en React, solo para descubrir meses después que su sitio no aparece en Google, ni siquiera al buscar el nombre exacto de la empresa. El problema no es el contenido ni las palabras clave; es una falla de arquitectura conocida como la invisibilidad de las Single Page Applications (SPA).',
      },
      { type: 'h2', text: 'El problema del Client-Side Rendering con Googlebot' },
      {
        type: 'p',
        text: 'En una aplicación React clásica, el servidor entrega un archivo HTML prácticamente vacío y es el navegador del usuario el que descarga el JavaScript y renderiza la pantalla. Aunque Googlebot hoy es capaz de ejecutar JavaScript, lo hace con una cola diferida que puede tardar días o semanas en procesar, o descartar la página por superar el presupuesto de CPU.',
      },
      { type: 'h2', text: 'Prerenderizado estático (SSG) y Server-Side Rendering (SSR)' },
      {
        type: 'p',
        text: 'La solución moderna que aplicamos en Uni-Verso693 es prerenderizar cada página en tiempo de compilación. Cuando el robot de Google visita la web, recibe de inmediato el código HTML completo con sus textos, enlaces, títulos y metadatos, garantizando una indexación instantánea al 100%.',
      },
      { type: 'h2', text: 'Core Web Vitals: La velocidad como factor directo de ranking' },
      {
        type: 'ul',
        items: [
          'Largest Contentful Paint (LCP): El contenido principal debe cargar en menos de 1.2 segundos para recibir la máxima puntuación en los algoritmos de Google.',
          'Cumulative Layout Shift (CLS): Cero saltos inesperados de pantalla mientras cargan imágenes o tipografías.',
          'Interaction to Next Paint (INP): Respuesta inmediata a clics e interacciones de usuario.',
        ],
      },
      { type: 'h2', text: 'Datos estructurados JSON-LD: Hablándole directamente a la IA y a Google' },
      {
        type: 'p',
        text: 'Los buscadores ya no solo leen texto; interpretan entidades. Implementar microdatos JSON-LD (Organization, Product, Service, FAQPage, BreadcrumbList) permite que Google muestre resultados enriquecidos con preguntas frecuentes, calificaciones y extractos directos en los resúmenes de inteligencia artificial.',
      },
      {
        type: 'cta',
        text: '¿Tu web o plataforma no está recibiendo visitas orgánicas? Auditamos y optimizamos tu arquitectura con SEO técnico de alto impacto.',
      },
    ],
  },
  {
    slug: 'agentes-ia-cognitivos-rag-empresas',
    seoTitle: 'Agentes de IA con arquitectura RAG: inteligencia sin alucinaciones',
    title: 'Agentes de IA con arquitectura RAG: cómo entrenar modelos con tus manuales sin que inventen datos',
    description:
      'Guía técnica y de negocio sobre Retrieval-Augmented Generation (RAG): precisión documental, citas de fuentes y despliegue en WhatsApp y CRM.',
    date: '2026-10-10',
    minutes: 8,
    tags: ['Inteligencia Artificial', 'RAG Vectorial', 'Automatización'],
    body: [
      {
        type: 'p',
        text: 'La principal razón por la que las empresas temen implementar inteligencia artificial en su atención al cliente o procesos internos es la alucinación: el riesgo de que el modelo invente un precio, prometa una condición que la empresa no ofrece o entregue información desactualizada con total seguridad.',
      },
      { type: 'h2', text: '¿Qué es la arquitectura RAG y por qué resuelve las alucinaciones?' },
      {
        type: 'p',
        text: 'RAG significa Retrieval-Augmented Generation (Generación Aumentada por Recuperación). En lugar de pedirle a un modelo de IA que responda desde su memoria general, el sistema funciona en dos pasos estrictos:',
      },
      {
        type: 'ul',
        items: [
          'Paso 1: Búsqueda Semántica (Retrieval): Cuando el usuario hace una pregunta, el sistema busca en tu propia base de datos vectorial los párrafos exactos de tus manuales, fichas técnicas o normativas que contienen la respuesta.',
          'Paso 2: Generación Condicionada: El modelo recibe la pregunta junto con esos fragmentos oficiales y tiene una instrucción inquebrantable: «Responde únicamente utilizando la información adjunta. Si no está en el texto, di que no tienes esa información y deriva a un humano»',
        ],
      },
      { type: 'h2', text: 'De documentos PDF dispersos a una base de conocimiento viva' },
      {
        type: 'p',
        text: 'Para implementar RAG de forma exitosa en una empresa, no basta con subir un PDF. El proceso de ingeniería requiere fragmentar los documentos con solapamiento semántico (chunking), generar embeddings de alta dimensión y almacenar en bases de datos vectoriales optimizadas como PostgreSQL con pgvector o Redis.',
      },
      { type: 'h2', text: 'Integración en WhatsApp oficial y herramientas corporativas' },
      {
        type: 'p',
        text: 'Un agente de IA cognitivo no vive aislado en un chat de prueba. Debe operar donde están tus clientes: conectado a la API oficial de WhatsApp Business, con capacidad de agendar reuniones en calendarios, consultar disponibilidad de stock en tu ERP y calificar prospectos registrándolos directamente en tu CRM.',
      },
      {
        type: 'cta',
        text: '¿Quieres implementar un agente de IA entrenado con el conocimiento real de tu empresa? Contáctanos para diseñar un piloto funcional en 7 días.',
      },
    ],
  },
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
