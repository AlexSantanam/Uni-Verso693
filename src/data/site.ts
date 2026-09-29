import type { L } from '../lib/lang';

export const CONTACT_EMAIL = 'contact@uni-verso693.ai';

export const navItems: { to: string; label: L }[] = [
  { to: '/servicios', label: { es: 'Servicios', en: 'Services' } },
  { to: '/casos', label: { es: 'Casos de éxito', en: 'Case studies' } },
  { to: '/nosotros', label: { es: 'Nosotros', en: 'About' } },
  { to: '/contacto', label: { es: 'Contacto', en: 'Contact' } },
];

export const stats: { value: string; label: L }[] = [
  { value: '5', label: { es: 'líneas de servicio de software', en: 'software service lines' } },
  { value: '24/7', label: { es: 'agentes de IA en operación', en: 'AI agents in operation' } },
  { value: '< 2 h', label: { es: 'respuesta a nuevas solicitudes', en: 'response to new requests' } },
  { value: 'ES · EN', label: { es: 'equipo y soporte bilingüe', en: 'bilingual team and support' } },
];

export interface Service {
  slug: string;
  icon: 'Code2' | 'Bot' | 'Smartphone' | 'Globe' | 'Compass';
  title: L;
  tagline: L;
  description: L;
  bullets: { es: string[]; en: string[] };
  deliverables: { es: string[]; en: string[] };
}

export const services: Service[] = [
  {
    slug: 'software-a-medida',
    icon: 'Code2',
    title: { es: 'Desarrollo de software a medida', en: 'Custom software development' },
    tagline: { es: 'Sistemas que encajan con tu operación', en: 'Systems that fit your operation' },
    description: {
      es: 'Diseñamos y construimos plataformas, sistemas internos y productos SaaS con arquitectura sólida, pensados para crecer contigo y para integrarse con las herramientas que ya usas.',
      en: 'We design and build platforms, internal systems and SaaS products on a solid architecture, made to grow with you and plug into the tools you already use.',
    },
    bullets: {
      es: ['Plataformas SaaS y sistemas internos', 'Backends, APIs e integraciones ERP/CRM', 'Pagos, autenticación y roles de usuario', 'Bases de datos seguras y escalables'],
      en: ['SaaS platforms and internal systems', 'Backends, APIs and ERP/CRM integrations', 'Payments, authentication and user roles', 'Secure, scalable databases'],
    },
    deliverables: {
      es: ['Código fuente y documentación', 'Infraestructura desplegada y monitoreada', 'Pruebas automatizadas', 'Traspaso técnico a tu equipo'],
      en: ['Source code and documentation', 'Deployed and monitored infrastructure', 'Automated tests', 'Technical handover to your team'],
    },
  },
  {
    slug: 'agentes-ia',
    icon: 'Bot',
    title: { es: 'Agentes de IA y automatización', en: 'AI agents and automation' },
    tagline: { es: 'Empleados digitales que no descansan', en: 'Digital employees that never clock out' },
    description: {
      es: 'Agentes conversacionales y flujos automáticos que atienden clientes, califican prospectos y ejecutan tareas en tu CRM, con respuestas basadas en tus propios documentos.',
      en: 'Conversational agents and automated workflows that serve customers, qualify leads and run tasks in your CRM, with answers grounded in your own documents.',
    },
    bullets: {
      es: ['WhatsApp, web, Instagram y correo', 'Bases de conocimiento con RAG para evitar alucinaciones', 'Traspaso fluido a una persona cuando hace falta', 'Automatización con webhooks, Make/n8n y microservicios'],
      en: ['WhatsApp, web, Instagram and email', 'RAG knowledge bases to avoid hallucinations', 'Smooth handover to a person when needed', 'Automation with webhooks, Make/n8n and microservices'],
    },
    deliverables: {
      es: ['Agente entrenado con tu información', 'Integración con tu CRM y calendario', 'Panel de métricas y ajuste continuo', 'Guías de seguridad y privacidad'],
      en: ['Agent trained on your information', 'CRM and calendar integration', 'Metrics dashboard and ongoing tuning', 'Security and privacy guidelines'],
    },
  },
  {
    slug: 'apps-moviles',
    icon: 'Smartphone',
    title: { es: 'Aplicaciones móviles', en: 'Mobile applications' },
    tagline: { es: 'iOS y Android desde una sola base de código', en: 'iOS and Android from one codebase' },
    description: {
      es: 'Apps nativas y multiplataforma listas para las tiendas, con notificaciones, pagos y sincronización en tiempo real con tu backend.',
      en: 'Native and cross-platform apps ready for the stores, with notifications, payments and real-time sync with your backend.',
    },
    bullets: {
      es: ['iOS y Android con una sola base de código', 'Notificaciones push y actualizaciones en tiempo real', 'Integración segura con APIs y CRM', 'Publicación en App Store y Google Play'],
      en: ['iOS and Android from a single codebase', 'Push notifications and real-time updates', 'Secure API and CRM integration', 'App Store and Google Play publishing'],
    },
    deliverables: {
      es: ['App publicada en las tiendas', 'Panel de administración', 'Analítica de uso', 'Plan de actualizaciones'],
      en: ['App published on the stores', 'Admin panel', 'Usage analytics', 'Update plan'],
    },
  },
  {
    slug: 'web-y-producto',
    icon: 'Globe',
    title: { es: 'Web, e-commerce y producto digital', en: 'Web, e-commerce and digital product' },
    tagline: { es: 'Diseño y conversión, de la marca al código', en: 'Design and conversion, from brand to code' },
    description: {
      es: 'Sitios corporativos, tiendas y portales con diseño UX/UI cuidado, velocidad, SEO y una identidad de marca coherente en todos los puntos de contacto.',
      en: 'Corporate sites, stores and portals with careful UX/UI design, speed, SEO and a coherent brand identity across every touchpoint.',
    },
    bullets: {
      es: ['Sitios corporativos y landing pages', 'E-commerce y portales de clientes', 'Diseño UX/UI e identidad de marca', 'Optimización de velocidad y SEO'],
      en: ['Corporate sites and landing pages', 'E-commerce and customer portals', 'UX/UI design and brand identity', 'Speed and SEO optimization'],
    },
    deliverables: {
      es: ['Diseño en alta fidelidad', 'Sitio desplegado y optimizado', 'Kit de marca (logo, piezas gráficas)', 'Capacitación para editar contenido'],
      en: ['High-fidelity design', 'Deployed, optimized site', 'Brand kit (logo, graphic assets)', 'Training to edit content'],
    },
  },
  {
    slug: 'consultoria',
    icon: 'Compass',
    title: { es: 'Consultoría y arquitectura tecnológica', en: 'Consulting and technology architecture' },
    tagline: { es: 'Decisiones técnicas con retorno medible', en: 'Technical decisions with measurable return' },
    description: {
      es: 'Auditamos tus procesos y tu stack, definimos una hoja de ruta con ROI estimado y te acompañamos en la adopción de IA y modernización de sistemas.',
      en: 'We audit your processes and stack, define a roadmap with estimated ROI and support you through AI adoption and systems modernization.',
    },
    bullets: {
      es: ['Auditoría de procesos y cuellos de botella', 'Hoja de ruta tecnológica y modelo de ROI', 'Seguridad, privacidad y cumplimiento', 'Capacitación de equipos'],
      en: ['Process and bottleneck audit', 'Technology roadmap and ROI model', 'Security, privacy and compliance', 'Team training'],
    },
    deliverables: {
      es: ['Informe de diagnóstico', 'Roadmap priorizado', 'Estimación de esfuerzo e inversión', 'Sesión de presentación ejecutiva'],
      en: ['Diagnostic report', 'Prioritized roadmap', 'Effort and investment estimate', 'Executive presentation session'],
    },
  },
];

export interface CaseStudy {
  slug: string;
  client: string;
  sector: L;
  title: L;
  challenge: L;
  solution: L;
  results: { es: string[]; en: string[] };
  tags: string[];
  url?: string;
  image?: 'memora' | 'melsa';
}

export const cases: CaseStudy[] = [
  {
    slug: 'yndipet',
    client: 'YndiPet',
    sector: { es: 'App de mascotas · IA', en: 'Pet app · AI' },
    title: {
      es: 'YndiPet: la app de mascotas con inteligencia artificial',
      en: 'YndiPet: the pet app with artificial intelligence',
    },
    challenge: {
      es: 'Darle a los tutores de perros y gatos en Chile un solo lugar para cuidar a su mascota: su historial de salud, su identificación y ayuda confiable cuando la necesitan.',
      en: 'Give dog and cat owners in Chile a single place to look after their pet: health history, identification and reliable help when they need it.',
    },
    solution: {
      es: 'Desarrollamos la app completa: ficha médica digital con vacunas, desparasitaciones y peso, un asistente de IA que responde con el historial real de la mascota, alertas SOS de pérdida, identificación por QR y registro de microchip, además de un directorio de servicios para mascotas.',
      en: "We built the complete app: a digital medical record with vaccines, deworming and weight, an AI assistant that answers using the pet's real history, SOS loss alerts, QR identification and microchip registration, plus a directory of pet services.",
    },
    results: {
      es: ['Producto propio en producción', 'Asistente de IA conectado a la ficha de cada mascota', 'Alertas de pérdida y QR para veterinarios y collares'],
      en: ['In-house product in production', "AI assistant connected to each pet's record", 'Loss alerts and QR for vets and collars'],
    },
    tags: ['IA', 'App móvil', 'QR', 'Chile'],
    url: 'https://yndipet.com',
  },
  {
    slug: 'memora',
    client: 'MEMORA',
    sector: { es: 'SaaS · Memoriales digitales', en: 'SaaS · Digital memorials' },
    title: {
      es: 'Plataforma de memoriales digitales para personas y mascotas',
      en: 'Digital memorials platform for people and pets',
    },
    challenge: {
      es: 'Crear un producto emocional y confiable para el mercado chileno, capaz de cobrar de forma segura y de llegar también a los teléfonos de las familias.',
      en: 'Build an emotional, trustworthy product for the Chilean market that can charge securely and also reach families on their phones.',
    },
    solution: {
      es: 'Construimos la plataforma completa: aplicación web, base de datos Postgres con seguridad a nivel de fila, integración con varios medios de pago y una app Android publicada en Google Play.',
      en: 'We built the whole platform: web application, Postgres database with row-level security, multiple payment integrations and an Android app published on Google Play.',
    },
    results: {
      es: ['Producto SaaS en producción', 'Pagos reales con Flow, Mercado Pago y PayPal', 'App Android publicada en Google Play'],
      en: ['SaaS product in production', 'Real payments via Flow, Mercado Pago and PayPal', 'Android app published on Google Play'],
    },
    tags: ['Postgres + RLS', 'Flow · MP · PayPal', 'Android'],
    url: 'https://memora.lat',
    image: 'memora',
  },
  {
    slug: 'melsa',
    client: 'MELSA',
    sector: { es: 'Bienes raíces', en: 'Real estate' },
    title: {
      es: 'Sitio editorial para MELSA Gestión Inmobiliaria',
      en: 'Editorial website for MELSA Real Estate',
    },
    challenge: {
      es: 'Transmitir confianza y exclusividad en un mercado premium, y llevar a los interesados hacia una asesoría personalizada.',
      en: 'Convey trust and exclusivity in a premium market and guide prospects toward personalized advisory.',
    },
    solution: {
      es: 'Diseñamos un sitio editorial en azul marino y dorado con tipografía serif, vitrina de propiedades y llamados a la acción hacia asesoría, alineado con la identidad de marca de MELSA.',
      en: 'We designed an editorial site in navy and gold with serif typography, a property showcase and advisory calls to action, aligned with the MELSA brand identity.',
    },
    results: {
      es: ['Identidad visual coherente con la marca', 'Vitrina de propiedades y buscador', 'Ruta clara hacia la asesoría'],
      en: ['Visual identity consistent with the brand', 'Property showcase and search', 'Clear path to advisory'],
    },
    tags: ['UX/UI', 'Sitio corporativo', 'Real estate'],
    image: 'melsa',
  },
];

export const techStack = [
  'React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'Supabase', 'Vercel', 'AWS',
  'Flutter', 'Claude', 'OpenAI', 'n8n', 'Stripe', 'WhatsApp API',
];

export const process: { title: L; text: L }[] = [
  {
    title: { es: 'Descubrimiento', en: 'Discovery' },
    text: { es: 'Entendemos tu negocio, tus usuarios y las metas que la tecnología debe cumplir.', en: 'We learn your business, your users and the goals technology has to meet.' },
  },
  {
    title: { es: 'Diseño', en: 'Design' },
    text: { es: 'Definimos arquitectura, flujos y diseño visual, y los validamos contigo antes de construir.', en: 'We define architecture, flows and visual design, and validate them with you before building.' },
  },
  {
    title: { es: 'Construcción', en: 'Build' },
    text: { es: 'Entregas por etapas con demostraciones frecuentes, pruebas y revisión de seguridad.', en: 'Staged deliveries with frequent demos, testing and security review.' },
  },
  {
    title: { es: 'Evolución', en: 'Evolve' },
    text: { es: 'Monitoreamos, medimos y mejoramos el producto una vez en producción.', en: 'We monitor, measure and improve the product once it is live.' },
  },
];

export const values: { title: L; text: L }[] = [
  {
    title: { es: 'Producto, no solo código', en: 'Product, not just code' },
    text: { es: 'Pensamos en usuarios y en negocio antes de escribir la primera línea.', en: 'We think about users and business before writing the first line.' },
  },
  {
    title: { es: 'Transparencia', en: 'Transparency' },
    text: { es: 'Alcances claros, avances visibles y comunicación directa con el equipo que construye.', en: 'Clear scope, visible progress and direct communication with the people building.' },
  },
  {
    title: { es: 'IA con criterio', en: 'AI with judgment' },
    text: { es: 'Usamos IA donde aporta valor real y con controles para que sea confiable.', en: 'We use AI where it adds real value, with controls that keep it reliable.' },
  },
  {
    title: { es: 'Seguridad desde el diseño', en: 'Security by design' },
    text: { es: 'Privacidad, control de acceso y buenas prácticas como parte del proyecto, no un añadido.', en: 'Privacy, access control and good practices are part of the project, not an add-on.' },
  },
];

export const faqs: { q: L; a: L }[] = [
  {
    q: { es: '¿Cuánto tarda un proyecto?', en: 'How long does a project take?' },
    a: {
      es: 'Depende del alcance. Un agente de IA inicial suele desplegarse en 5 a 10 días hábiles; una plataforma o app a medida se planifica por etapas tras el descubrimiento.',
      en: 'It depends on scope. An initial AI agent usually deploys in 5 to 10 business days; a custom platform or app is planned in stages after discovery.',
    },
  },
  {
    q: { es: '¿Cómo se define el costo?', en: 'How is cost determined?' },
    a: {
      es: 'Cotizamos a medida después de una sesión de descubrimiento, con alcance, plazos y estimación de inversión por escrito.',
      en: 'We quote per project after a discovery session, with scope, timeline and investment estimate in writing.',
    },
  },
  {
    q: { es: '¿El agente de IA puede inventar información?', en: 'Can the AI agent make things up?' },
    a: {
      es: 'Implementamos arquitecturas RAG con reglas de respaldo: el agente responde con información verificada de tus documentos y, si no la tiene, traspasa la conversación a una persona.',
      en: 'We implement RAG architectures with fallback rules: the agent answers from verified information in your documents and hands the conversation to a person when it does not know.',
    },
  },
  {
    q: { es: '¿Trabajan con sistemas que ya tenemos?', en: 'Do you work with our existing systems?' },
    a: {
      es: 'Sí. Integramos con CRM, ERP, pasarelas de pago, WhatsApp y otras APIs, o modernizamos gradualmente sistemas existentes.',
      en: 'Yes. We integrate with CRMs, ERPs, payment gateways, WhatsApp and other APIs, or gradually modernize existing systems.',
    },
  },
  {
    q: { es: '¿Quién es dueño del código?', en: 'Who owns the code?' },
    a: {
      es: 'Tú. Al finalizar entregamos el código fuente, la documentación y el traspaso técnico a tu equipo.',
      en: 'You do. On completion we hand over the source code, documentation and technical handover to your team.',
    },
  },
];

export const interestOptions: L[] = [
  { es: 'Desarrollo de software a medida', en: 'Custom software development' },
  { es: 'Agentes de IA y automatización', en: 'AI agents and automation' },
  { es: 'Aplicación móvil', en: 'Mobile application' },
  { es: 'Web, e-commerce o producto digital', en: 'Web, e-commerce or digital product' },
  { es: 'Consultoría y arquitectura', en: 'Consulting and architecture' },
  { es: 'Otro / no estoy seguro', en: 'Other / not sure yet' },
];
