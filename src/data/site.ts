import type { L } from '../lib/lang';
import {
  type SimpleIcon,
  siReact, siNextdotjs, siTypescript, siTailwindcss, siFlutter, siNodedotjs, siPython, siFastapi,
  siPostgresql, siSupabase, siFirebase, siRedis, siGooglecloud, siVercel, siDocker, siGithubactions,
  siClaude, siGooglegemini, siLangchain, siN8n, siStripe, siMercadopago, siFigma,
} from 'simple-icons';

/** Public contact inbox. Empty hides it everywhere (set it once the mailbox exists). */
export const CONTACT_EMAIL = 'contacto@universo693.com';

/** EBS 693 diagnosis event (45 min, Google Meet). */
export const CALENDLY_URL = 'https://calendly.com/conectadoaia/ebs693';

/** WhatsApp number in international format without "+" or spaces. Empty hides every WhatsApp button. */
export const WHATSAPP_NUMBER = '56990387414';

export const whatsappLink = (text: string) =>
  WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}` : '';

/** Paid entry product: strategic diagnosis. */
export const ebs = {
  name: 'EBS 693',
  price: '$197.000 CLP',
};

export const navItems: { to: string; label: L }[] = [
  { to: '/servicios', label: { es: 'Servicios', en: 'Services' } },
  { to: '/diagnostico-ia', label: { es: 'Diagnóstico EBS', en: 'EBS diagnosis' } },
  { to: '/casos', label: { es: 'Casos de éxito', en: 'Case studies' } },
  { to: '/nosotros', label: { es: 'Nosotros', en: 'About' } },
  { to: '/blog', label: { es: 'Blog', en: 'Blog' } },
  { to: '/audit-693', label: { es: 'Audit gratis', en: 'Free audit' } },
  { to: '/contacto', label: { es: 'Contacto', en: 'Contact' } },
];

export const stats: { value: string; label: L }[] = [
  { value: '7 a 28 d', label: { es: 'de la idea a producción en la nube', en: 'from idea to cloud production' } },
  { value: '100%', label: { es: 'código propio y soberanía en tu Bóveda', en: 'proprietary code & sovereign custody' } },
  { value: '60 días', label: { es: 'garantía técnica post-lanzamiento', en: 'post-launch technical warranty' } },
  { value: '$0', label: { es: 'costo de licencias por alumno o usuario', en: 'license fees per student or user' } },
];

export interface Service {
  slug: string;
  icon: 'Code2' | 'Bot' | 'Smartphone' | 'Globe' | 'Compass' | 'GraduationCap' | 'Landmark' | 'CreditCard' | 'Search' | 'Cloud' | 'ShieldCheck';
  title: L;
  tagline: L;
  description: L;
  bullets: { es: string[]; en: string[] };
  deliverables: { es: string[]; en: string[] };
  /** Short promise shown as a badge on cards and the detail page. */
  badge?: L;
  /** Overrides the default "Get a quote" CTA on the detail page. */
  cta?: L;
}

export const services: Service[] = [
  {
    slug: 'agentes-ia',
    icon: 'Bot',
    badge: { es: 'Deploy en 7 días', en: 'Live in 7 days' },
    cta: { es: 'Cotizar mi agente de IA', en: 'Get an AI agent quote' },
    title: { es: 'Agentes de IA cognitivos y automatización', en: 'Cognitive AI agents and automation' },
    tagline: { es: 'Inteligencia entrenada con el conocimiento de tu empresa', en: 'Intelligence trained on your company knowledge' },
    description: {
      es: 'Diseñamos agentes autónomos con arquitectura RAG entrenados exclusivamente con tus manuales, documentos y normativas. Responden consultas complejas 24/7 sin alucinaciones, califican prospectos y ejecutan flujos en tu CRM.',
      en: 'We build autonomous agents with RAG architecture trained strictly on your manuals, documents and policies. They answer complex questions 24/7 with zero hallucinations, qualify leads and trigger CRM workflows.',
    },
    bullets: {
      es: [
        'Base de conocimiento propia (RAG) con citas exactas de fuentes',
        'Despliegue multicanal: WhatsApp oficial, web y plataformas internas',
        'Calificación inteligente de prospectos y derivación a ejecutivos',
        'Automatización de flujos con APIs, n8n y webhooks seguros',
      ],
      en: [
        'Proprietary knowledge base (RAG) with exact source citations',
        'Omnichannel deployment: Official WhatsApp, web and internal tools',
        'Intelligent lead qualification and human handover',
        'Workflow automation with APIs, n8n and secure webhooks',
      ],
    },
    deliverables: {
      es: ['Agente entrenado y calibrado con tu información', 'Integración con WhatsApp Business API o web', 'Panel de métricas y afinamiento continuo', 'Protocolos de privacidad y seguridad de datos'],
      en: ['Trained and calibrated agent with your data', 'WhatsApp Business API or web integration', 'Metrics dashboard and continuous fine-tuning', 'Data privacy and security protocols'],
    },
  },
  {
    slug: 'campus-virtuales',
    icon: 'GraduationCap',
    badge: { es: 'Aulas PWA', en: 'PWA Classrooms' },
    cta: { es: 'Cotizar campus virtual', en: 'Get a campus quote' },
    title: { es: 'Campus virtuales y plataformas educativas', en: 'Virtual campuses and learning platforms' },
    tagline: { es: 'Ecosistemas de aprendizaje a medida sin cobros por alumno', en: 'Tailored learning ecosystems with no per-student fees' },
    description: {
      es: 'Construimos campus virtuales e intranets de capacitación para academias, colegios, institutos y empresas. Portales separados para alumnos y profesores, aulas interactivas, banco de evaluaciones y certificados con verificación QR.',
      en: 'We build virtual campuses and training intranets for academies, schools, institutes and corporations. Separate portals for students and teachers, interactive classrooms, quizzing and QR-verified diplomas.',
    },
    bullets: {
      es: [
        'Portales independientes con accesos para Alumnos, Docentes y Admin',
        'Reproductor de video híbrido de alta velocidad y gestor documental',
        'Banco de preguntas, evaluaciones automáticas y entrega de tareas',
        'Certificados vectoriales en alta resolución con validación pública QR',
      ],
      en: [
        'Separate portals and access levels for Students, Teachers and Admins',
        'High-speed hybrid video player and document management',
        'Question banks, automated grading and assignment turn-in',
        'High-res vector certificates with public instant QR verification',
      ],
    },
    deliverables: {
      es: ['Campus virtual desplegado y 100% de propiedad del cliente', 'Portales operativos Alumno/Docente/Admin', 'Módulo de emisión de certificados con QR', 'Inducción operativa y material para docentes'],
      en: ['Deployed virtual campus 100% owned by the client', 'Active Student/Teacher/Admin portals', 'Certificate generator with QR validation', 'Operational training and guide for teachers'],
    },
  },
  {
    slug: 'integraciones-gob',
    icon: 'Landmark',
    badge: { es: 'Cumplimiento Normativo', en: 'Regulatory Compliance' },
    cta: { es: 'Consultar integración normativa', en: 'Consult regulatory integration' },
    title: { es: 'Integraciones gubernamentales y cumplimiento SENCE', en: 'Government integrations and SENCE compliance' },
    tagline: { es: 'Trazabilidad cronológica, ClaveÚnica y conexión con el Estado', en: 'Time tracking, ClaveUnica and state integrations' },
    description: {
      es: 'Desarrollamos conectores técnicos e integraciones regulatorias para OTECs e instituciones acreditadas: trazabilidad de asistencia bajo norma NCh 2728, webservices de SENCE, autenticación oficial vía ClaveÚnica y conexión con el SII.',
      en: 'We engineer technical connectors and regulatory integrations for certified training providers and accredited bodies: NCh 2728 time tracking, SENCE webservices, official ClaveUnica state authentication and tax authority APIs.',
    },
    bullets: {
      es: [
        'Temporizador cronológico estricto de conexión y bloqueo anti-fraude',
        'Reportes oficiales consolidados en Excel listos para auditorías SENCE',
        'Validación de identidad oficial de usuarios mediante ClaveÚnica',
        'Conexión segura con plataformas de fiscalización y emisión de DTEs',
      ],
      en: [
        'Strict chronological attendance timer and anti-cheat video lock',
        'Official consolidated Excel reports ready for SENCE audits',
        'Official citizen identity validation via state ClaveUnica',
        'Secure connection with regulatory oversight platforms and tax DTEs',
      ],
    },
    deliverables: {
      es: ['Motor de trazabilidad cronológica integrado', 'Módulo de exportación de planillas para fiscalizadores', 'Conexión validada con ClaveÚnica o SENCE', 'Documentación técnica para auditorías'],
      en: ['Integrated chronological tracking engine', 'Inspector-ready spreadsheet export module', 'Validated connection with ClaveUnica or SENCE', 'Technical audit documentation'],
    },
  },
  {
    slug: 'software-a-medida',
    icon: 'Code2',
    badge: { es: 'Sistemas a Medida', en: 'Custom Systems' },
    cta: { es: 'Cotizar desarrollo a medida', en: 'Get custom software quote' },
    title: { es: 'Plataformas web, intranets y portales B2B', en: 'Web platforms, intranets and B2B portals' },
    tagline: { es: 'Sistemas que reemplazan planillas y ordenan tu operación', en: 'Systems that replace spreadsheets and streamline your operation' },
    description: {
      es: 'Diseñamos y programamos plataformas web seguras, sistemas internos y portales para clientes con arquitectura moderna (React 19, TypeScript y Node.js). Control granular de roles, bases de datos cifradas y reportes en tiempo real.',
      en: 'We engineer secure web platforms, internal systems and customer portals with modern architecture (React 19, TypeScript, Node.js). Granular role permissions, encrypted databases and real-time reports.',
    },
    bullets: {
      es: [
        'Plataformas web y portales de autoservicio para clientes y proveedores',
        'Sustitución de planillas manuales por bases de datos PostgreSQL cifradas',
        'Control de permisos, roles de usuario y flujos operativos internos',
        'Dashboards interactivos con KPIs y métricas clave en tiempo real',
      ],
      en: [
        'Web platforms and self-service portals for customers and vendors',
        'Spreadsheet replacement with encrypted PostgreSQL databases',
        'Permission management, user roles and internal operational workflows',
        'Interactive dashboards with KPIs and real-time business metrics',
      ],
    },
    deliverables: {
      es: ['Código fuente propio sin dependencias cautivas', 'Infraestructura desplegada y monitoreada', 'Manual operativo de administración', 'Garantía técnica post-lanzamiento'],
      en: ['Proprietary source code with zero vendor lock-in', 'Deployed and monitored cloud infrastructure', 'Operational administration manual', 'Post-launch technical warranty'],
    },
  },
  {
    slug: 'pasarelas-pago',
    icon: 'CreditCard',
    badge: { es: 'Webpay & Mercado Pago', en: 'Webpay & Mercado Pago' },
    cta: { es: 'Cotizar integración de pagos', en: 'Get payment integration quote' },
    title: { es: 'Integración de pasarelas de pago online', en: 'Online payment gateways integration' },
    tagline: { es: 'Cobra con tarjetas de crédito y débito sin fricción', en: 'Collect credit and debit card payments smoothly' },
    description: {
      es: 'Conectamos pasarelas de pago chilenas e internacionales (Transbank Webpay Plus, Mercado Pago, Flow y Stripe) a tu sitio web, tienda o sistema interno, con confirmación instantánea por webhooks y emisión de comprobantes.',
      en: 'We connect local and global payment gateways (Transbank Webpay Plus, Mercado Pago, Flow, Stripe) to your site, store or custom platform, with instant webhook confirmation and automated receipts.',
    },
    bullets: {
      es: [
        'Integración oficial con Webpay Plus, Mercado Pago, Flow y Stripe',
        'Sincronización instantánea de estados de pago mediante Webhooks',
        'Conciliación automática y despacho de correos de confirmación',
        'Arquitectura segura bajo estándares PCI-DSS y prevención de fraudes',
      ],
      en: [
        'Official integration with Webpay Plus, Mercado Pago, Flow and Stripe',
        'Real-time payment status synchronization via Webhooks',
        'Automated reconciliation and customer confirmation emails',
        'Secure architecture adhering to PCI-DSS standards and fraud protection',
      ],
    },
    deliverables: {
      es: ['Pasarela conectada y probada en ambiente productivo', 'Módulo de confirmación y comprobantes de venta', 'Panel de historial de transacciones', 'Guía de administración de cobros'],
      en: ['Live payment gateway tested in production', 'Confirmation module and sales receipt generator', 'Transaction history dashboard', 'Payment administration guide'],
    },
  },
  {
    slug: 'seo-tecnico',
    icon: 'Search',
    badge: { es: 'Escala Orgánica', en: 'Organic Scale' },
    cta: { es: 'Auditar mi posicionamiento', en: 'Audit my search ranking' },
    title: { es: 'Posicionamiento SEO técnico y crecimiento orgánico', en: 'Technical SEO and organic growth' },
    tagline: { es: 'Visibilidad en Google con alcance nacional e internacional', en: 'Google visibility with national and international reach' },
    description: {
      es: 'Optimizamos la arquitectura de tu sitio web, datos estructurados (Schema.org) y Core Web Vitals para que Google te indexe en las primeras posiciones y conviertas visitas en prospectos calificados en Chile y el extranjero.',
      en: 'We optimize site architecture, structured data (Schema.org) and Core Web Vitals to rank at the top of Google and turn organic traffic into qualified leads in Chile and global markets.',
    },
    bullets: {
      es: [
        'SEO técnico profundo, sitemaps dinámicos y arquitectura semántica',
        'Optimización de velocidad de carga y rendimiento Core Web Vitals',
        'Estrategia de palabras clave de alta intención de compra',
        'Estructura multilingüe para posicionamiento nacional e internacional',
      ],
      en: [
        'Deep technical SEO, dynamic sitemaps and semantic architecture',
        'Page speed and Core Web Vitals performance optimization',
        'High commercial intent keyword positioning strategy',
        'Multilingual indexing architecture for domestic and global ranking',
      ],
    },
    deliverables: {
      es: ['Auditoría técnica de indexación y errores en Search Console', 'Implementación de metadatos estructurados Schema.org', 'Optimización de velocidad en móviles y escritorio', 'Informe ejecutivo de métricas y posiciones'],
      en: ['Technical audit and Search Console error resolution', 'Schema.org structured metadata implementation', 'Mobile and desktop speed optimization', 'Executive rankings and organic traffic report'],
    },
  },
  {
    slug: 'apps-moviles',
    icon: 'Smartphone',
    badge: { es: 'PWA & Nativas', en: 'PWA & Native' },
    cta: { es: 'Cotizar aplicación móvil', en: 'Get mobile app quote' },
    title: { es: 'Aplicaciones móviles y PWA instalables', en: 'Mobile applications and installable PWAs' },
    tagline: { es: 'Experiencia móvil de alta velocidad para iOS y Android', en: 'High-speed mobile experience for iOS and Android' },
    description: {
      es: 'Creamos aplicaciones web progresivas (PWA) instalables en un clic sin pagar comisiones a las tiendas, así como aplicaciones empaquetadas para Google Play y App Store con notificaciones push y sincronización en tiempo real.',
      en: 'We build 1-click installable Progressive Web Apps (PWAs) with no store commission cuts, alongside packaged mobile apps for Google Play and App Store with push alerts and real-time cloud sync.',
    },
    bullets: {
      es: [
        'PWA instalable directamente desde el navegador en iOS y Android',
        'Acceso directo en pantalla de inicio, modo offline y carga instantánea',
        'Apps compiladas para publicación en App Store y Google Play Store',
        'Notificaciones push y sincronización bidireccional con tu backend',
      ],
      en: [
        '1-click PWA direct browser installation on iOS and Android',
        'Home screen icon, offline capability and instant loading',
        'Packaged apps compiled for App Store and Google Play publishing',
        'Push notifications and bi-directional real-time backend sync',
      ],
    },
    deliverables: {
      es: ['Aplicación PWA configurada con Service Workers y manifiesto', 'Código fuente optimizado para pantallas táctiles', 'Panel de administración en la nube', 'Garantía técnica de funcionamiento'],
      en: ['PWA app configured with Service Workers and manifest', 'Touch-optimized source code', 'Cloud administration dashboard', 'Operational technical warranty'],
    },
  },
  {
    slug: 'migracion-cloud',
    icon: 'Cloud',
    badge: { es: 'Factura Local CLP', en: 'Local Invoicing' },
    cta: { es: 'Cotizar migración a la nube', en: 'Get cloud migration quote' },
    title: { es: 'Migración a la nube y continuidad operativa', en: 'Cloud migration and operational continuity' },
    tagline: { es: 'Traslado a servidores VPS de alto rendimiento sin caídas', en: 'Transition to high-performance VPS servers with zero downtime' },
    description: {
      es: 'Trasladamos tu sitio web, base de datos o sistema desde hostings convencionales lentos a servidores VPS dedicados en la nube (Hetzner / Vercel), con red global Cloudflare, certificados SSL, respaldos automáticos y soporte continuo.',
      en: 'We migrate your website, database or system from legacy shared hosting to dedicated high-performance cloud VPS instances (Hetzner / Vercel), with Cloudflare CDN, SSL, automated backups and ongoing support.',
    },
    bullets: {
      es: [
        'Migración segura con cero tiempo de inactividad de tu negocio',
        'Servidores VPS de alta velocidad con bases de datos PostgreSQL cifradas',
        'Configuración de seguridad Cloudflare (WAF, DNS y protección anti-DDoS)',
        'Asumimos y pagamos los servidores en el extranjero con una sola factura local en CLP',
      ],
      en: [
        'Safe migration with zero operational downtime for your business',
        'High-speed VPS instances with encrypted PostgreSQL databases',
        'Cloudflare security configuration (WAF, DNS and anti-DDoS defense)',
        'We handle and pay foreign cloud servers with a single local invoice',
      ],
    },
    deliverables: {
      es: ['Infraestructura cloud aprovisionada y configurada', 'Traspaso de bases de datos y archivos sin pérdida de información', 'Certificados SSL y monitoreo de salud 24/7', 'Consolidación de costos en una factura local'],
      en: ['Provisioned and hardened cloud infrastructure', 'Data and asset transfer with zero record loss', 'SSL certificates and 24/7 uptime monitoring', 'Cost consolidation into a single local invoice'],
    },
  },
  {
    slug: 'consultoria',
    icon: 'Compass',
    badge: { es: 'Diagnóstico 45 min', en: '45-min Diagnosis' },
    cta: { es: 'Agendar diagnóstico EBS 693', en: 'Book EBS 693 diagnosis' },
    title: { es: 'Diagnóstico tecnológico y hoja de ruta EBS 693', en: 'Technology diagnosis and EBS 693 roadmap' },
    tagline: { es: 'Decisiones de software e IA con retorno de inversión medible', en: 'Software and AI decisions with measurable ROI' },
    description: {
      es: 'Auditamos tus procesos y tu stack tecnológico para detectar cuellos de botella y fugas de dinero. Diseñamos una hoja de ruta priorizada con cálculo de ROI concreto para implementar automatizaciones y software que realmente rentabilicen tu empresa.',
      en: 'We audit your workflows and technology stack to detect operational bottlenecks and money leaks. We craft a prioritized roadmap with concrete ROI projections to implement software and AI that genuinely pay off.',
    },
    bullets: {
      es: [
        'Auditoría operativa de tareas manuales repetitivas y cuellos de botella',
        'Hoja de ruta priorizada con proyección de ahorro y retorno de inversión',
        'Selección de arquitectura agnóstica sin amarres forzosos a proveedores',
        'Sesión ejecutiva de presentación de hallazgos para gerencia o directorio',
      ],
      en: [
        'Operational audit of manual repetitive tasks and team bottlenecks',
        'Prioritized roadmap with savings projections and ROI modeling',
        'Agnostic architecture selection with zero vendor lock-in',
        'Executive presentation session for management or board members',
      ],
    },
    deliverables: {
      es: ['Informe de diagnóstico técnico y operativo', 'Hoja de ruta priorizada por impacto y costo', 'Modelo de retorno de inversión (ROI)', 'Acceso a la plataforma interactiva del diagnóstico'],
      en: ['Technical and operational diagnostic report', 'Roadmap prioritized by business impact vs cost', 'Financial ROI projection model', 'Access to the interactive diagnosis dashboard'],
    },
  },
];

export type CaseImage =
  | 'memora-home'
  | 'memora-mockup'
  | 'memora-family'
  | 'yndipet-services'
  | 'yndipet-games'
  | 'yndipet-game-home'
  | 'yndipet-game-trivia'
  | 'melsa-hero'
  | 'melsa-projects'
  | 'melsa-simulator';

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
  /** Extra links shown on the detail page (e.g. games). */
  links?: { label: L; url: string }[];
  /** Hero visual on cards and detail page. */
  visual: 'yndipet' | 'memora' | 'melsa';
  /** "What we built" grouped by area. */
  features?: { title: L; items: { es: string[]; en: string[] } }[];
  gallery?: { image: CaseImage; caption: L }[];
}

export const cases: CaseStudy[] = [
  {
    slug: 'yndipet',
    client: 'YndiPet',
    sector: { es: 'App de mascotas con IA', en: 'AI pet app' },
    title: {
      es: 'YndiPet: la app de mascotas con inteligencia artificial',
      en: 'YndiPet: the pet app with artificial intelligence',
    },
    challenge: {
      es: 'Los tutores de perros y gatos en Chile tenían la salud, la identificación y la comunidad de sus mascotas repartidas en papeles, chats y redes. Queríamos un hogar digital único para tutores, refugios y negocios del mundo mascota.',
      en: 'Dog and cat owners in Chile had their pets’ health, identification and community scattered across paper, chats and social apps. We wanted a single digital home for owners, shelters and pet businesses.',
    },
    solution: {
      es: 'Diseñamos y desarrollamos YndiPet de punta a punta: red social de mascotas, ficha clínica con alertas, QR de emergencia, alertas SOS geolocalizadas, adopción para refugios, mapa de servicios, asistentes de IA, planes pagados y una colección de juegos protagonizados por Yndi, la mascota de la app.',
      en: 'We designed and built YndiPet end to end: a pet social network, a clinical record with alerts, emergency QR tags, geolocated SOS alerts, adoption tools for shelters, a services map, AI assistants, paid plans and a collection of games starring Yndi, the app mascot.',
    },
    results: {
      es: [
        'App en producción con usuarios reales',
        'App Android con push nativo y web en yndipet.com',
        'Pagos con PayPal y Mercado Pago con activación automática',
        '6 juegos web gratuitos en yndipet.com/juegos',
      ],
      en: [
        'App in production with real users',
        'Android app with native push, plus the web at yndipet.com',
        'PayPal and Mercado Pago payments with automatic activation',
        '6 free web games at yndipet.com/juegos',
      ],
    },
    tags: ['IA', 'Android', 'Red social', 'Mapas', 'Pagos', 'Juegos'],
    url: 'https://yndipet.com',
    links: [
      { label: { es: 'Ver servicios de YndiPet', en: 'See YndiPet services' }, url: 'https://yndipet.com/servicios' },
      { label: { es: 'Jugar a los juegos de Yndi', en: 'Play the Yndi games' }, url: 'https://yndipet.com/juegos' },
    ],
    visual: 'yndipet',
    features: [
      {
        title: { es: 'Salud de la mascota', en: 'Pet health' },
        items: {
          es: ['Ficha clínica: vacunas, desparasitaciones, cirugías, medicación y alergias', 'Estado automático “al día / pendiente / atrasado” con alertas', 'PDF clínico exportable y carnet con QR', 'Registro de microchip alineado con la Ley Cholito'],
          en: ['Clinical record: vaccines, deworming, surgeries, medication and allergies', 'Automatic “up to date / pending / overdue” status with alerts', 'Exportable clinical PDF and ID card with QR', 'Microchip registration aligned with Chile’s Ley Cholito'],
        },
      },
      {
        title: { es: 'Comunidad y seguridad', en: 'Community and safety' },
        items: {
          es: ['Alertas SOS geolocalizadas de mascotas perdidas', 'Reporte de avistamientos con foto y chat de coordinación', 'Placa QR de emergencia que avisa al tutor al ser escaneada', 'Paseos y quedadas con chat grupal'],
          en: ['Geolocated SOS alerts for lost pets', 'Sighting reports with photo and a coordination chat', 'Emergency QR tag that notifies the owner when scanned', 'Walks and meetups with group chat'],
        },
      },
      {
        title: { es: 'Red social', en: 'Social network' },
        items: {
          es: ['Feed “Para ti” con publicaciones, reels y alertas', 'Historias de 24 h con filtros, música y etiquetas', 'Se siguen mascotas, no cuentas', 'Mensajería directa con edición y borrado'],
          en: ['“For you” feed mixing posts, reels and alerts', '24 h stories with filters, music and tags', 'You follow pets, not accounts', 'Direct messaging with edit and delete'],
        },
      },
      {
        title: { es: 'Refugios y adopción', en: 'Shelters and adoption' },
        items: {
          es: ['Vitrina pública de adopción por especie y comuna', 'Traspaso con ficha clínica incluida y confirmación por código', 'Seguimiento de salud de los animales adoptados', 'Ficha del refugio en el mapa'],
          en: ['Public adoption showcase by species and district', 'Transfer with clinical record included and code confirmation', 'Health follow-up of adopted animals', 'Shelter listing on the map'],
        },
      },
      {
        title: { es: 'Asistentes con IA', en: 'AI assistants' },
        items: {
          es: ['“Yndi”: orientación sobre alimentación, conducta y bienestar', 'Asesor comercial que responde con el catálogo real', 'Recomendación de negocios cercanos', 'Escalamiento a soporte humano por WhatsApp'],
          en: ['“Yndi”: guidance on feeding, behavior and wellbeing', 'Sales advisor answering from the real catalog', 'Nearby business recommendations', 'Escalation to human support via WhatsApp'],
        },
      },
      {
        title: { es: 'Negocios, mapa y monetización', en: 'Businesses, map and monetization' },
        items: {
          es: ['Mapa interactivo (Leaflet + OpenStreetMap) con directorio de servicios', 'Perfiles de negocio con reseñas y paseadores verificados', 'Plan Premium y planes de negocio', 'Notificaciones push (Firebase), correo y recordatorios locales'],
          en: ['Interactive map (Leaflet + OpenStreetMap) with a services directory', 'Business profiles with reviews and verified walkers', 'Premium plan and business plans', 'Push notifications (Firebase), email and local reminders'],
        },
      },
      {
        title: { es: 'Juegos de Yndi', en: 'Yndi games' },
        items: {
          es: ['YNDI: El Camino a Casa — plataformas de 10 etapas', 'Trivia de YNDI: El Gran Recorrido', 'Memoria, Baño Mágico, Atrapa Premios y Laberinto de Rescate', 'Gratis, directo en el navegador, sin descargas'],
          en: ['YNDI: The Way Home — a 10-stage platformer', 'YNDI Trivia: The Great Journey', 'Memory, Magic Bath, Catch the Treats and Rescue Maze', 'Free, straight in the browser, no downloads'],
        },
      },
    ],
    gallery: [
      { image: 'yndipet-services', caption: { es: 'yndipet.com/servicios', en: 'yndipet.com/servicios' } },
      { image: 'yndipet-games', caption: { es: 'yndipet.com/juegos', en: 'yndipet.com/juegos' } },
      { image: 'yndipet-game-home', caption: { es: 'YNDI: El Camino a Casa', en: 'YNDI: The Way Home' } },
      { image: 'yndipet-game-trivia', caption: { es: 'Trivia de YNDI: El Gran Recorrido', en: 'YNDI Trivia: The Great Journey' } },
    ],
  },
  {
    slug: 'memora',
    client: 'MEMORA',
    sector: { es: 'SaaS · Memoriales digitales', en: 'SaaS · Digital memorials' },
    title: {
      es: 'MEMORA: memoriales digitales y legados de vida',
      en: 'MEMORA: digital memorials and life legacies',
    },
    challenge: {
      es: 'Crear un producto emocional y confiable para el mercado chileno, que permita a las familias preservar la historia de sus seres queridos (personas y mascotas), cobrar de forma segura y llegar también al teléfono.',
      en: 'Build an emotional, trustworthy product for the Chilean market that lets families preserve the story of their loved ones (people and pets), charge securely and also reach their phones.',
    },
    solution: {
      es: 'Construimos la plataforma completa: memoriales web con fotos, homenajes y momentos, historia asistida con redacción editorial por IA, colaboración familiar guiada, memoriales para mascotas, un código QR único para ceremonias y lápidas, base de datos Postgres con seguridad a nivel de fila, varios medios de pago y una app Android.',
      en: 'We built the complete platform: web memorials with photos, tributes and moments, an assisted life story with AI editorial writing, guided family collaboration, pet memorials, a unique QR code for ceremonies and headstones, a Postgres database with row-level security, multiple payment methods and an Android app.',
    },
    results: {
      es: ['Producto SaaS en producción en memora.lat, con planes anuales', 'Historia asistida con IA y QR único para ceremonias y lápidas', 'Pagos reales con Flow, Mercado Pago y PayPal', 'App Android publicada en Google Play'],
      en: ['SaaS product in production at memora.lat, with yearly plans', 'AI-assisted life story and a unique QR for ceremonies and headstones', 'Real payments via Flow, Mercado Pago and PayPal', 'Android app published on Google Play'],
    },
    tags: ['IA', 'Postgres + RLS', 'Flow · MP · PayPal', 'Android', 'QR'],
    url: 'https://memora.lat',
    visual: 'memora',
    gallery: [
      { image: 'memora-home', caption: { es: 'memora.lat', en: 'memora.lat' } },
      { image: 'memora-mockup', caption: { es: 'Recuerdo imprimible con QR (demo)', en: 'Printable keepsake with QR (demo)' } },
      { image: 'memora-family', caption: { es: 'Historias que se comparten entre generaciones', en: 'Stories shared across generations' } },
    ],
  },
  {
    slug: 'melsa',
    client: 'MELSA',
    sector: { es: 'Bienes raíces · Sitio corporativo', en: 'Real estate · Corporate website' },
    title: {
      es: 'MELSA Gestión Inmobiliaria: sitio premium con simulador de inversión',
      en: 'MELSA Real Estate: premium website with an investment simulator',
    },
    challenge: {
      es: 'MELSA asesora la compra e inversión en proyectos y propiedades en Santiago, Las Condes y Zapallar. Necesitaba un sitio que transmitiera exclusividad y confianza, y que convirtiera visitas en asesorías agendadas.',
      en: 'MELSA advises on buying and investing in projects and properties in Santiago, Las Condes and Zapallar. It needed a site that conveyed exclusivity and trust and turned visits into booked advisory sessions.',
    },
    solution: {
      es: 'Diseñamos y desarrollamos un sitio editorial en azul marino y dorado con tipografía serif, alineado con su logo: buscador por tipo, ubicación y estado del proyecto, portafolio con fichas de detalle, simulador de crédito y plusvalía, cartera de propiedades con asesor asignado, y agenda de asesoría con WhatsApp.',
      en: 'We designed and built an editorial site in navy and gold with serif typography, aligned with its logo: search by type, location and project status, a portfolio with detail sheets, a mortgage and capital-gain simulator, a property portfolio with an assigned advisor, and advisory booking with WhatsApp.',
    },
    results: {
      es: ['Identidad visual coherente con la marca', 'Simulador de crédito y plusvalía interactivo', 'Ruta clara hacia la asesoría: agenda, formulario y WhatsApp'],
      en: ['Visual identity consistent with the brand', 'Interactive mortgage and capital-gain simulator', 'Clear path to advisory: booking, form and WhatsApp'],
    },
    tags: ['UX/UI', 'React', 'Simulador', 'Real estate'],
    url: 'https://melsa-psi.vercel.app',
    visual: 'melsa',
    features: [
      {
        title: { es: 'Proyectos', en: 'Projects' },
        items: {
          es: ['Buscador por tipo, ubicación y estado', 'Filtros: preventa/pozo, entrega inmediata e inversión', 'Ficha de detalle por proyecto con precio en USD y UF'],
          en: ['Search by type, location and status', 'Filters: pre-sale, ready to move in and investment', 'Detail sheet per project with USD and UF pricing'],
        },
      },
      {
        title: { es: 'Herramientas de inversión', en: 'Investment tools' },
        items: {
          es: ['Simulador de dividendo mensual según valor, pie, plazo y tasa', 'Proyección de plusvalía a 5 años', 'Solicitud de evaluación crediticia'],
          en: ['Monthly payment simulator by price, down payment, term and rate', '5-year capital-gain projection', 'Credit evaluation request'],
        },
      },
      {
        title: { es: 'Conversión', en: 'Conversion' },
        items: {
          es: ['Cartera de propiedades con asesor asignado', 'Agenda de asesoría en modal', 'Equipo, testimonios y widget de WhatsApp'],
          en: ['Property portfolio with an assigned advisor', 'Advisory booking in a modal', 'Team, testimonials and WhatsApp widget'],
        },
      },
    ],
    gallery: [
      { image: 'melsa-hero', caption: { es: 'Portada con buscador de proyectos', en: 'Home page with project search' } },
      { image: 'melsa-projects', caption: { es: 'Proyectos destacados con filtros', en: 'Featured projects with filters' } },
      { image: 'melsa-simulator', caption: { es: 'Simulador de crédito y plusvalía', en: 'Mortgage and capital-gain simulator' } },
    ],
  },
];

export interface Tech {
  name: string;
  /** Brand logo from Simple Icons; some brands (AWS, OpenAI, Power BI) aren't available and show as text. */
  icon?: SimpleIcon;
}

export const techStack: Tech[] = [
  { name: 'React', icon: siReact },
  { name: 'Next.js', icon: siNextdotjs },
  { name: 'TypeScript', icon: siTypescript },
  { name: 'Tailwind CSS', icon: siTailwindcss },
  { name: 'Flutter', icon: siFlutter },
  { name: 'Node.js', icon: siNodedotjs },
  { name: 'Python', icon: siPython },
  { name: 'FastAPI', icon: siFastapi },
  { name: 'PostgreSQL', icon: siPostgresql },
  { name: 'Supabase', icon: siSupabase },
  { name: 'Firebase', icon: siFirebase },
  { name: 'Redis', icon: siRedis },
  { name: 'AWS' },
  { name: 'Google Cloud', icon: siGooglecloud },
  { name: 'Vercel', icon: siVercel },
  { name: 'Docker', icon: siDocker },
  { name: 'GitHub Actions', icon: siGithubactions },
  { name: 'Claude', icon: siClaude },
  { name: 'OpenAI' },
  { name: 'Gemini', icon: siGooglegemini },
  { name: 'LangChain', icon: siLangchain },
  { name: 'n8n', icon: siN8n },
  { name: 'Stripe', icon: siStripe },
  { name: 'Mercado Pago', icon: siMercadopago },
  { name: 'Figma', icon: siFigma },
  { name: 'Power BI' },
];

export interface Capability {
  icon: 'Target' | 'Code2' | 'Brain' | 'BarChart3' | 'PenTool' | 'Clapperboard';
  title: L;
  text: L;
  tools: string[];
}

export const capabilities: Capability[] = [
  {
    icon: 'Target',
    title: { es: 'Producto y agilidad', en: 'Product and agile' },
    text: {
      es: 'Gestión de backlog, historias de usuario con criterios de aceptación y entregas iterativas con Scrum y Kanban. Traducimos objetivos de negocio en un producto priorizado.',
      en: 'Backlog management, user stories with acceptance criteria and iterative delivery with Scrum and Kanban. We turn business goals into a prioritized product.',
    },
    tools: ['Scrum', 'Kanban', 'Jira', 'Linear', 'Notion'],
  },
  {
    icon: 'Code2',
    title: { es: 'Desarrollo full-stack', en: 'Full-stack development' },
    text: {
      es: 'Aplicaciones web y móviles de punta a punta, con arquitectura de bases de datos y seguridad en producción como parte del diseño, no como un añadido.',
      en: 'End-to-end web and mobile applications, with database architecture and production security built into the design, not bolted on.',
    },
    tools: ['React', 'Next.js', 'TypeScript', 'React Native', 'Node.js', 'Python', 'PostgreSQL', 'AWS', 'Docker'],
  },
  {
    icon: 'Brain',
    title: { es: 'IA aplicada y automatización', en: 'Applied AI and automation' },
    text: {
      es: 'Agentes conversacionales, asistentes integrados a productos reales e ingeniería de prompts, más flujos automáticos que conectan tus herramientas.',
      en: 'Conversational agents, assistants built into real products and prompt engineering, plus automated flows that connect your tools.',
    },
    tools: ['Claude', 'OpenAI', 'Gemini', 'LangChain', 'n8n', 'Make'],
  },
  {
    icon: 'BarChart3',
    title: { es: 'Datos y análisis', en: 'Data and analytics' },
    text: {
      es: 'Análisis funcional y de negocio, tableros e indicadores para decidir con datos y medir el impacto de cada entrega.',
      en: 'Functional and business analysis, dashboards and KPIs to decide with data and measure the impact of every release.',
    },
    tools: ['Power BI', 'Looker Studio', 'BigQuery', 'Python'],
  },
  {
    icon: 'PenTool',
    title: { es: 'Diseño y colaboración', en: 'Design and collaboration' },
    text: {
      es: 'Prototipos, flujos de usuario e interfaces validadas contigo antes de construir, con comunicación directa y constante con los stakeholders.',
      en: 'Prototypes, user flows and interfaces validated with you before building, with direct, constant stakeholder communication.',
    },
    tools: ['Figma', 'FigJam', 'Miro', 'Slack'],
  },
  {
    icon: 'Clapperboard',
    title: { es: 'Contenido generativo', en: 'Generative media' },
    text: {
      es: 'Video e imagen generados con IA para productos y marcas, como la esfera de plasma y el logo neón de este sitio.',
      en: 'AI-generated video and imagery for products and brands, like the plasma sphere and neon logo on this site.',
    },
    tools: ['Veo 3', 'Runway', 'Midjourney', 'ElevenLabs'],
  },
];

export const credentials: L[] = [
  { es: 'Certificación Scrum Product Owner', en: 'Scrum Product Owner certification' },
  { es: 'Liderazgo de proyectos de software', en: 'Software project leadership' },
  { es: 'IA aplicada a la gestión de proyectos', en: 'AI applied to project management' },
  { es: 'Ingeniería de prompts', en: 'Prompt engineering' },
  { es: 'Formación avanzada en inteligencia artificial', en: 'Advanced training in artificial intelligence' },
  { es: 'Gestión de producto digital', en: 'Digital product management' },
  { es: 'Desarrollo full-stack', en: 'Full-stack development' },
  { es: 'Análisis de datos e inteligencia de negocios', en: 'Data analysis and business intelligence' },
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
      es: 'Depende del alcance. Un agente de IA inicial queda funcionando en alrededor de 7 días; una plataforma o app a medida se planifica por etapas tras el descubrimiento.',
      en: 'It depends on scope. An initial AI agent is up and running in about 7 days; a custom platform or app is planned in stages after discovery.',
    },
  },
  {
    q: { es: '¿Cómo se define el costo?', en: 'How is cost determined?' },
    a: {
      es: 'Los proyectos se cotizan a medida. Si quieres partir con claridad, el diagnóstico EBS 693 ($197.000 CLP) te entrega una hoja de ruta con ROI en una sesión de 45 minutos, y ese monto se descuenta del proyecto si decides avanzar.',
      en: 'Projects are quoted individually. To start with clarity, the EBS 693 diagnosis ($197,000 CLP) gives you an ROI roadmap in a 45-minute session, and that amount is credited to the project if you move forward.',
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
  { es: 'Diagnóstico EBS 693 ($197.000 CLP)', en: 'EBS 693 diagnosis ($197,000 CLP)' },
];
