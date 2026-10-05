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
/**
 * Calendly event for the free "Reunión de inicio y validación de supuestos" (30 min) offered after a client
 * presses "Quiero avanzar" in the interactive EBS. Empty until that event exists: the page falls back to WhatsApp.
 * (Not the EBS 693 event above: that one is the paid diagnosis.)
 */
export const KICKOFF_URL = '';

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
  /** Short promise shown as a badge on cards and the detail page. */
  badge?: L;
  /** Overrides the default "Get a quote" CTA on the detail page. */
  cta?: L;
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
    badge: { es: 'Deploy en 7 días', en: 'Live in 7 days' },
    cta: { es: 'Quiero mi empleado de IA en 7 días', en: 'I want my AI employee in 7 days' },
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
