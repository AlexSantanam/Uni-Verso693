import { ServiceItem, VideoPortfolioItem, PricingPlan, FaqItem, LandingExampleItem, TrustedClientItem } from '../types';

export const trustedClientsData: TrustedClientItem[] = [
  { id: 'nimbus', name: 'NIMBUS TECH', styleClass: 'font-extrabold uppercase tracking-wider' },
  { id: 'vertex', name: 'Vertex & Co.', styleClass: 'font-serif italic' },
  { id: 'aurelia', name: 'AURELIA', styleClass: 'font-mono tracking-[0.2em]' },
  { id: 'orbital', name: 'Orbital Labs', styleClass: 'font-bold' },
  { id: 'prima', name: 'PRIMA GROUP', styleClass: 'font-black uppercase tracking-tight' },
  { id: 'halstead', name: 'Halstead & Reed', styleClass: 'font-serif' }
];

export const landingPageExamplesData: LandingExampleItem[] = [
  {
    id: 'ecommerce',
    categoryEn: 'E-COMMERCE',
    categoryEs: 'E-COMMERCE',
    titleEn: 'Aura Skincare — Online Store',
    titleEs: 'Aura Skincare — Tienda Online',
    descriptionEn: 'Vibrant, product-first design built to drive impulse purchases with bold sale banners and a frictionless checkout flow.',
    descriptionEs: 'Diseño vibrante centrado en el producto, pensado para impulsar compras con banners de oferta y un checkout sin fricción.',
    tagsEn: ['Product Grid', 'Cart & Checkout UX', 'Sale Countdown'],
    tagsEs: ['Cuadrícula de Productos', 'UX de Carrito y Pago', 'Contador de Oferta']
  },
  {
    id: 'saas',
    categoryEn: 'SAAS / STARTUP',
    categoryEs: 'SAAS / STARTUP',
    titleEn: 'Flowstack — Automation Platform',
    titleEs: 'Flowstack — Plataforma de Automatización',
    descriptionEn: 'Dark, modern tech aesthetic with gradient accents, feature highlights, and a clear free-trial conversion path.',
    descriptionEs: 'Estética tecnológica oscura y moderna con acentos degradados, funciones destacadas y un camino claro a la prueba gratis.',
    tagsEn: ['Gradient Hero', 'Feature Grid', 'Free Trial CTA'],
    tagsEs: ['Hero con Degradado', 'Cuadrícula de Funciones', 'CTA de Prueba Gratis']
  },
  {
    id: 'melsa',
    categoryEn: 'REAL ESTATE',
    categoryEs: 'BIENES RAÍCES',
    titleEn: 'MELSA — Timeless Luxury Living',
    titleEs: 'MELSA — Timeless Luxury Living',
    descriptionEn: 'Editorial layout in deep navy & gold with elegant serif typography, inspired by MELSA Real Estate\'s premium brand identity to convey trust and high-end craftsmanship.',
    descriptionEs: 'Diseño editorial en azul marino y dorado con tipografía serif elegante, inspirado en la identidad de marca premium de MELSA Gestión Inmobiliaria, transmitiendo confianza y exclusividad.',
    tagsEn: ['Navy & Gold Palette', 'Property Showcase', 'Advisory CTA'],
    tagsEs: ['Paleta Azul y Dorado', 'Vitrina de Propiedades', 'CTA de Asesoría']
  }
];

export const initialPortfolioVideos: VideoPortfolioItem[] = [
  {
    id: '1',
    youtubeId: 'L_LUpnjgPso', // Sample AI showcase video ID
    titleEn: '24/7 E-commerce AI Sales & Support Agent Demo',
    titleEs: 'Demostración de Agente de Ventas y Soporte IA 24/7 para E-commerce',
    categoryEn: 'AI Agents Showcase',
    categoryEs: 'Casos de Agentes de IA',
    descriptionEn: 'Automated agent handling customer queries, qualifying high-value leads, and processing orders directly into CRM.',
    descriptionEs: 'Agente automatizado que atiende clientes, califica prospectos de valor y procesa pedidos en tiempo real.',
    views: '18.4K views'
  },
  {
    id: '2',
    youtubeId: 'LXb3EKWsInQ', // Sample AI short video reel
    titleEn: 'Viral AI Short Video Campaign for SaaS Launch',
    titleEs: 'Campaña de Video Corto Viral con IA para Lanzamiento SaaS',
    categoryEn: 'AI Short Videos & Reels',
    categoryEs: 'Videos Cortos y Reels con IA',
    descriptionEn: 'Hyper-engaging AI avatars and automated dynamic subtitles generating 250k+ organic views across TikTok & Instagram Reels.',
    descriptionEs: 'Avatares de IA ultrarrealistas y subtítulos automáticos generando más de 250,000 reproducciones orgánicas.',
    views: '42.1K views'
  },
  {
    id: '3',
    youtubeId: 'dQw4w9WgXcQ', // Sample video ID customizable by user
    titleEn: 'Autonomous Real Estate Lead Qualification Agent',
    titleEs: 'Agente IA Autónomo de Calificación para Bienes Raíces',
    categoryEn: 'Custom AI Workflows',
    categoryEs: 'Flujos Personalizados de IA',
    descriptionEn: 'Instant WhatsApp & Email AI responder that schedules qualified site visits and sends customized property brochures.',
    descriptionEs: 'Respondedor automático de WhatsApp y Email que agenda visitas calificadas y envía dossiers personalizados.',
    views: '29.8K views'
  }
];

export const servicesData: ServiceItem[] = [
  {
    id: 'ai-short-videos',
    iconName: 'Video',
    badgeEn: 'VIRAL GROWTH',
    badgeEs: 'CRECIMIENTO VIRAL',
    titleEn: 'AI Short Videos & Reels Studio',
    titleEs: 'Estudio de Videos Cortos y Reels con IA',
    descriptionEn: 'High-converting short form video content generated end-to-end with AI avatars, voice synthesis, motion design, and viral scripting.',
    descriptionEs: 'Contenido en formato corto de alta conversión producido de principio a fin con avatares de IA, locución sintetizada y guiones virales.',
    bulletsEn: [
      'Scriptwriting optimized for retention Hooks',
      'Hyper-realistic AI Avatars & Voice clones',
      'Dynamic animated subtitles & sound effects',
      'Ready for TikTok, Shorts & Instagram Reels'
    ],
    bulletsEs: [
      'Guiones optimizados con ganchos de alta retención',
      'Avatares hyper-realistas y clonación de voz',
      'Subtítulos dinámicos animados y efectos de sonido',
      'Listos para TikTok, Shorts e Instagram Reels'
    ]
  },
  {
    id: 'landing-pages',
    iconName: 'Layout',
    badgeEn: 'HIGH-CONVERTING',
    badgeEs: 'ALTA CONVERSIÓN',
    titleEn: 'Professional Landing Page Design',
    titleEs: 'Diseño de Landing Pages Profesionales',
    descriptionEn: 'Custom-built, conversion-focused landing pages tailored to your industry, fully optimized for speed, SEO, and mobile devices.',
    descriptionEs: 'Landing pages a la medida enfocadas en conversión, adaptadas a tu industria y optimizadas para velocidad, SEO y dispositivos móviles.',
    bulletsEn: [
      'E-commerce & Product Launch Pages',
      'SaaS & Software Sign-up Pages',
      'Real Estate & Property Listings',
      'Events, Webinars & Personal Brand Pages'
    ],
    bulletsEs: [
      'Páginas para E-commerce y Lanzamiento de Productos',
      'Páginas de Registro para SaaS y Software',
      'Bienes Raíces y Listados de Propiedades',
      'Eventos, Webinars y Marca Personal'
    ]
  },
  {
    id: 'graphic-design',
    iconName: 'PenTool',
    badgeEn: 'BRAND ASSETS',
    badgeEs: 'IDENTIDAD DE MARCA',
    titleEn: 'Logos, Flyers & Graphic Design',
    titleEs: 'Logos, Flyers y Diseño Gráfico',
    descriptionEn: 'Professional visual assets for your brand — from logo design to promotional flyers, social media graphics, and image vectorization.',
    descriptionEs: 'Piezas visuales profesionales para tu marca: diseño de logos, flyers promocionales, gráficas para redes sociales y vectorización de imágenes.',
    bulletsEn: [
      'Custom Logo Design & Brand Identity',
      'Flyers, Banners & Social Media Graphics',
      'Image Vectorization (Raster to Vector)',
      'Print-Ready & Multi-Format File Delivery'
    ],
    bulletsEs: [
      'Diseño de Logo e Identidad de Marca',
      'Flyers, Banners y Gráficas para Redes Sociales',
      'Vectorización de Imágenes (Raster a Vector)',
      'Entrega en Múltiples Formatos Listos para Imprimir'
    ]
  },
  {
    id: 'ai-agents',
    iconName: 'Bot',
    badgeEn: 'CORE OFFERING',
    badgeEs: 'SERVICIO PRINCIPAL',
    titleEn: '24/7 Autonomous AI Agents',
    titleEs: 'Agentes de IA Autónomos 24/7',
    descriptionEn: 'Deploy intelligent digital employees that manage incoming sales leads, answer complex FAQs, and perform CRM actions round the clock.',
    descriptionEs: 'Despliega empleados digitales inteligentes que gestionan prospectos, responden dudas complejas y ejecutan acciones en tu CRM sin descanso.',
    bulletsEn: [
      'Multi-channel: WhatsApp, Web, Instagram DM & Email',
      'Instant response speed (< 2 seconds)',
      'Zero hallucination with custom RAG knowledge bases',
      'Seamless human handover when required'
    ],
    bulletsEs: [
      'Multicanal: WhatsApp, Web, Instagram DM y Correo',
      'Respuestas instantáneas en menos de 2 segundos',
      'Cero alucinaciones con bases de conocimiento RAG',
      'Transferencia fluida a asesores humanos cuando sea necesario'
    ]
  },
  {
    id: 'workflow-automation',
    iconName: 'Zap',
    badgeEn: 'EFFICIENCY',
    badgeEs: 'EFICIENCIA',
    titleEn: 'Custom AI Automation & Workflows',
    titleEs: 'Automatización y Flujos de Trabajo con IA',
    descriptionEn: 'Eliminate manual repetitive work by connecting your tech stack with autonomous AI webhooks, Make/n8n, and custom Python microservices.',
    descriptionEs: 'Elimina el trabajo repetitivo conectando tus herramientas con webhooks autónomos, Make/n8n y microservicios con IA en Python.',
    bulletsEn: [
      'HubSpot, GoHighLevel, Salesforce & Zapier integration',
      'Automated document extraction & summarization',
      'Instant voice & text meeting summaries to Slack',
      'Custom API webhooks & database triggers'
    ],
    bulletsEs: [
      'Integración con HubSpot, GoHighLevel, Salesforce y Zapier',
      'Extracción y resumen automático de documentos',
      'Resúmenes instantáneos de llamadas a Slack / Teams',
      'Webhooks personalizados y disparadores en base de datos'
    ]
  },
  {
    id: 'ai-consulting',
    iconName: 'Cpu',
    badgeEn: 'STRATEGY',
    badgeEs: 'ESTRATEGIA',
    titleEn: 'AI Strategy & Architecture Audit',
    titleEs: 'Auditoría y Arquitectura Estratégica de IA',
    descriptionEn: 'Direct 1-on-1 AI implementation plan tailored to your operational bottlenecks to maximize ROI and lower customer acquisition costs.',
    descriptionEs: 'Plan de implementación directa de IA diseñado según tus cuellos de botella para maximizar ROI y reducir costos de adquisición.',
    bulletsEn: [
      'Comprehensive business process audit',
      'Tech stack roadmap & ROI modeling',
      'Security, privacy & compliance guidelines',
      'Team training & ongoing agent monitoring'
    ],
    bulletsEs: [
      'Auditoría integral de procesos de negocio',
      'Hoja de ruta tecnológica y modelo de ROI',
      'Guías de seguridad, privacidad y cumplimiento',
      'Capacitación de equipo y monitoreo continuo'
    ]
  }
];

export const pricingPlansData: PricingPlan[] = [
  {
    id: 'starter',
    nameEn: 'AI Starter Pack',
    nameEs: 'Paquete Inicial IA',
    price: '$990',
    periodEn: 'one-time setup',
    periodEs: 'pago único de montaje',
    descriptionEn: 'Perfect for small businesses wanting 1 custom AI agent or a batch of viral AI short videos to boost engagement.',
    descriptionEs: 'Ideal para pequeñas empresas que necesitan 1 agente de IA o un lote de videos cortos para impulsar clientes.',
    featuresEn: [
      '1 Custom AI Sales or Support Agent',
      'WhatsApp or Website Widget integration',
      'Up to 1,000 automated conversations/mo',
      '10 AI Short Videos for Reels/TikTok',
      'Basic CRM Sync (Google Sheets / HubSpot)',
      '14-Day Delivery & 30-Day Guarantee'
    ],
    featuresEs: [
      '1 Agente de IA para Ventas o Soporte',
      'Integración en WhatsApp o Widget Web',
      'Hasta 1,000 conversaciones automatizadas/mes',
      '10 Videos Cortos con IA para Reels/TikTok',
      'Sincronización básica a CRM / Google Sheets',
      'Entrega en 14 Días y Garantía de 30 Días'
    ],
    ctaEn: 'Book AI Starter Audit',
    ctaEs: 'Agendar Paquete Inicial'
  },
  {
    id: 'growth',
    nameEn: 'Growth AI System',
    nameEs: 'Sistema IA Crecimiento',
    price: '$2,490',
    periodEn: 'setup + $290/mo maintenance',
    periodEs: 'montaje + $290/mes mantenimiento',
    popular: true,
    descriptionEn: 'Our flagship 24/7 AI lead engine designed to capture, qualify, and convert leads autonomously with short video growth.',
    descriptionEs: 'Nuestro sistema estrella 24/7 para capturar, calificar y convertir clientes de forma autónoma con crecimiento en video corto.',
    featuresEn: [
      '2 Omnichannel 24/7 AI Agents (WhatsApp, IG & Web)',
      'Up to 10,000 automated conversations/mo',
      '25 AI Short Videos / month (fully managed)',
      'Advanced RAG with company documents & DB',
      'Full CRM & Calendar Auto-Booking setup',
      'Weekly performance analytics & prompt tuning',
      'Priority 24/7 WhatsApp Tech Support'
    ],
    featuresEs: [
      '2 Agentes de IA Omnicanal 24/7 (WhatsApp, IG y Web)',
      'Hasta 10,000 conversaciones automatizadas/mes',
      '25 Videos Cortos con IA / mes (gestión total)',
      'RAG Avanzado con documentos de tu empresa',
      'Integración total con CRM y Agendamiento Automático',
      'Analíticas semanales y ajuste de promps',
      'Soporte Técnico Prioritario 24/7 por WhatsApp'
    ],
    ctaEn: 'Book Growth Audit',
    ctaEs: 'Agendar Auditoría de Crecimiento'
  },
  {
    id: 'enterprise',
    nameEn: 'Enterprise AI Ecosystem',
    nameEs: 'Ecosistema IA Enterprise',
    price: 'Custom',
    periodEn: 'tailored infrastructure',
    periodEs: 'infraestructura a la medida',
    descriptionEn: 'Full enterprise automation stack with fine-tuned dedicated LLMs, private cloud hosting, and unlimited short video production.',
    descriptionEs: 'Automatización empresarial completa con modelos LLM dedicados, servidor privado y producción de video sin límites.',
    featuresEn: [
      'Unlimited AI Agents & Custom Workflows',
      'Fine-tuned Private LLMs (Llama, Claude, GPT-4o)',
      'Unlimited AI Short Video Production pipeline',
      'Custom ERP/CRM/API Deep Integrations',
      'Dedicated Cloud Instance & Data Privacy SLA',
      'Dedicated AI Specialist & Engineer Assigned',
      'Custom SLA & On-premise deployment options'
    ],
    featuresEs: [
      'Agentes de IA y Flujos Personalizados Ilimitados',
      'Modelos LLM Privados Ajustados a la Medida',
      'Línea de producción de Videos Cortos sin límites',
      'Integraciones profundas ERP/CRM/API',
      'Instancia Cloud Dedicada y Acuerdo de Privacidad SLA',
      'Especialista e Ingeniero de IA Dedicado',
      'SLA personalizado y opción de despliegue local'
    ],
    ctaEn: 'Contact for Enterprise',
    ctaEs: 'Contactar para Enterprise'
  }
];

export const faqData: FaqItem[] = [
  {
    id: '1',
    questionEn: 'How fast can Uni-Verso693 deploy an AI Agent for my business?',
    questionEs: '¿Qué tan rápido puede Uni-Verso693 desplegar un Agente de IA para mi negocio?',
    answerEn: 'Most initial AI Agent deployments take between 5 to 10 business days. We start with a discovery call, ingest your knowledge base, build the conversational flow, run rigorous safety tests, and connect it to your WhatsApp or website.',
    answerEs: 'La mayoría de los agentes iniciales se despliegan entre 5 y 10 días hábiles. Comenzamos con la llamada inicial, ingerimos tu base de conocimientos, construimos el flujo, hacemos pruebas de seguridad e integramos con tu WhatsApp o web.'
  },
  {
    id: '2',
    questionEn: 'How do the AI Short Videos work?',
    questionEs: '¿Cómo funcionan los Videos Cortos con IA?',
    answerEn: 'We use cutting-edge generative AI models to convert topic ideas or long-form videos into high-retention vertical reels. We write viral hooks, render ultra-realistic AI voiceovers and avatars, add dynamic captions, and deliver publish-ready MP4 videos for TikTok, Instagram Reels, and YouTube Shorts.',
    answerEs: 'Utilizamos modelos generativos avanzados para transformar ideas o videos largos en reels verticales de alta retención. Generamos guiones con ganchos virales, avatares y locuciones hiperrealistas con IA, subtítulos dinámicos y entregamos archivos MP4 listos para publicar.'
  },
  {
    id: '3',
    questionEn: 'Will the AI Agent make up false information or hallucinate?',
    questionEs: '¿El Agente de IA inventará información falsa o alucinará?',
    answerEn: 'No. We implement strictly grounded RAG (Retrieval-Augmented Generation) architectures with fallback rules. The AI agent only provides answers directly verified in your company knowledge base or docs. If it encounters an unknown question, it gracefully passes the chat to a human team member.',
    answerEs: 'No. Implementamos arquitectura RAG con reglas de respaldo estrictas. El agente de IA solo responde con datos verificados de tus documentos. Si encuentra una consulta desconocida, transfiere la conversación de manera fluida a un integrante de tu equipo.'
  },
  {
    id: '4',
    questionEn: 'What happens during the AI Audit?',
    questionEs: '¿Qué sucede durante la Auditoría de IA?',
    answerEn: 'In our 30-minute 1-on-1 session, we audit your current lead flow, customer response bottlenecks, and content strategy. We demonstrate live working prototypes and present a customized roadmap showing exact potential ROI and automation time saved.',
    answerEs: 'En la llamada individual de 30 minutos, auditamos tu flujo de prospectos, cuellos de botella en atención al cliente y estrategia de contenidos. Te mostramos prototipos en vivo y una hoja de ruta con el ROI estimado y horas ahorradas.'
  },
  {
    id: '5',
    questionEn: 'Can I see examples of your work before hiring you?',
    questionEs: '¿Puedo ver ejemplos de su trabajo antes de contratarlos?',
    answerEn: 'Absolutely. Our Portfolio section features real AI agent and short video demos — fully customizable, just click "Edit YouTube Videos" to swap in your own — plus a showcase of landing page styles across e-commerce, SaaS, and real estate projects like MELSA.',
    answerEs: 'Claro que sí. Nuestra sección de Portafolio incluye demostraciones reales de agentes de IA y videos cortos —totalmente personalizables, solo haz clic en "Editar Videos de YouTube" para reemplazarlos— además de una muestra de estilos de landing pages en proyectos de e-commerce, SaaS y bienes raíces como MELSA.'
  },
  {
    id: '6',
    questionEn: 'Do you also design landing pages, logos, and graphic content?',
    questionEs: '¿También diseñan landing pages, logos y contenido gráfico?',
    answerEn: 'Yes. Beyond AI agents and short videos, we design custom, conversion-focused landing pages for e-commerce, SaaS, and real estate businesses, plus complete branding assets — logos, flyers, social media graphics, and image vectorization.',
    answerEs: 'Sí. Además de agentes de IA y videos cortos, diseñamos landing pages personalizadas enfocadas en conversión para negocios de e-commerce, SaaS y bienes raíces, además de piezas de marca completas: logos, flyers, gráficas para redes sociales y vectorización de imágenes.'
  }
];

export const siteUiText = {
  en: {
    navServices: 'Services',
    navPortfolio: 'Portfolio',
    navPricing: 'Pricing',
    navFaq: 'FAQ',
    navContact: 'Contact',
    btnBookAudit: 'Contact Us',
    heroBadge: '✨ NEXT-GEN AI AGENCY',
    heroTitle: 'AI Agents That Work 24/7',
    heroSubtitle: 'We build AI agents and AI short videos for businesses',
    heroCtaPrimary: 'Contact Us',
    heroCtaSecondary: 'View Portfolio',
    heroStatsTitle: 'Proven Agency Results',
    stat1Label: '24/7 Agent Uptime',
    stat1Val: '99.9%',
    stat2Label: 'Avg Response Time',
    stat2Val: '< 2 sec',
    stat3Label: 'AI Videos Produced',
    stat3Val: '500+',
    stat4Label: 'Client Hours Saved',
    stat4Val: '15,000+',
    demoCardTitle: 'Live AI Agent Agentic Terminal',
    demoCardStatus: 'ONLINE • RUNNING AGENTIC WORKFLOW',
    demoCardPrompt: 'Querying knowledge base... Customer requested pricing & demo for Real Estate AI Agent.',
    demoCardResponse: 'AI Agent: "Hello! I can schedule a live demonstration and send our brochure via WhatsApp in under 30 seconds. May I have your phone number?"',
    trustedBadge: 'CLIENT TRUST',
    trustedHeading: 'Brands That Trust Us',
    trustedSubheading: 'Businesses across industries rely on Uni-Verso693 to power their AI agents, content, and digital presence.',
    servicesHeading: 'Our High-Impact AI Services',
    servicesSubheading: 'Custom engineered solutions to scale your business operations and content production without increasing headcount.',
    portfolioHeading: 'AI Short Videos & Portfolio Showcase',
    portfolioSubheading: 'Explore our AI-generated short videos, automated avatars, and live agent demonstration showcases.',
    portfolioEditBtn: 'Edit YouTube Videos',
    portfolioModalTitle: 'Customize YouTube Portfolio Videos',
    portfolioModalDesc: 'Enter YouTube video IDs or full URLs to replace the portfolio embeds:',
    landingExamplesBadge: 'LANDING PAGE EXAMPLES',
    landingExamplesHeading: 'Professional Landing Page Styles',
    landingExamplesSubheading: 'A glimpse of the design range we deliver — from e-commerce storefronts to SaaS launches and luxury real estate.',
    landingExamplesBtn: 'View Style',
    pricingHeading: 'Simple, Transparent Investment',
    pricingSubheading: 'Select a plan to accelerate your business with 24/7 AI agents and viral short form video content.',
    faqHeading: 'Frequently Asked Questions',
    faqSubheading: 'Everything you need to know about partnering with Uni-Verso693 AI Agency.',
    formHeading: 'Book Your AI Audit',
    formSubheading: 'Get a 30-minute tailored AI roadmap, live agent demonstration, and process efficiency estimate.',
    formLabelName: 'Full Name *',
    formLabelEmail: 'Business Email *',
    formLabelPhone: 'Phone / WhatsApp *',
    formLabelCompany: 'Company / Website',
    formLabelInterest: 'Primary Interest *',
    formOption1: '24/7 AI Customer / Sales Agents',
    formOption2: 'AI Short Videos & Reels Studio',
    formOption3: 'Custom Workflow Automation',
    formOption4: 'All-in-One AI Agency Ecosystem',
    formOption5: 'Professional Landing Page Design',
    formOption6: 'Logos, Flyers & Graphic Design',
    formLabelBudget: 'Estimated Investment Budget',
    formLabelDate: 'Preferred Audit Date',
    formLabelNotes: 'Tell us about your business goals or current bottlenecks',
    formBtnSubmit: 'Contact Us',
    formSubmitting: 'Reserving Your Slot...',
    formSuccessTitle: 'Audit Request Confirmed! 🚀',
    formSuccessDesc: 'Thank you for reaching out to Uni-Verso693. An AI specialist from our engineering team will review your application and send meeting details within 2 hours.',
    formBtnNewRequest: 'Book Another Audit Session',
    exportHtmlBtn: 'Export Single HTML (Netlify)',
    netlifyBannerText: 'Ready to deploy on Netlify? Copy the clean 1-file HTML bundle below!',
    footerTagline: 'Uni-Verso693 AI Agency — Building the future of autonomous 24/7 AI agents and generative AI short video media for fast-growing companies.',
    footerRights: 'All rights reserved. Uni-Verso693 AI Agency.'
  },
  es: {
    navServices: 'Servicios',
    navPortfolio: 'Portafolio',
    navPricing: 'Precios',
    navFaq: 'FAQ',
    navContact: 'Contacto',
    btnBookAudit: 'Contáctanos',
    heroBadge: '✨ AGENCIA DE IA DE ÚLTIMA GENERACIÓN',
    heroTitle: 'Agentes de IA que Trabajan 24/7',
    heroSubtitle: 'Construimos agentes de IA y videos cortos con IA para empresas',
    heroCtaPrimary: 'Contáctanos',
    heroCtaSecondary: 'Ver Portafolio',
    heroStatsTitle: 'Resultados Comprobados',
    stat1Label: 'Tiempo Activo del Agente',
    stat1Val: '99.9%',
    stat2Label: 'Tiempo de Respuesta Promedio',
    stat2Val: '< 2 seg',
    stat3Label: 'Videos de IA Producidos',
    stat3Val: '500+',
    stat4Label: 'Horas Ahorradas a Clientes',
    stat4Val: '15,000+',
    demoCardTitle: 'Terminal de Agente de IA en Vivo',
    demoCardStatus: 'EN LÍNEA • EJECUTANDO FLUJO AUTÓNOMO',
    demoCardPrompt: 'Consultando base de conocimientos... El cliente solicitó precios y demostración para Agente de Bienes Raíces.',
    demoCardResponse: 'Agente IA: "¡Hola! Puedo agendar una demostración en vivo y enviarte nuestro dossier por WhatsApp en menos de 30 segundos. ¿Cuál es tu número de teléfono?"',
    trustedBadge: 'CONFIANZA DE CLIENTES',
    trustedHeading: 'Marcas Que Confiaron en Nosotros',
    trustedSubheading: 'Empresas de distintas industrias confían en Uni-Verso693 para impulsar sus agentes de IA, contenido y presencia digital.',
    servicesHeading: 'Nuestros Servicios de Alto Impacto',
    servicesSubheading: 'Soluciones de ingeniería a la medida para escalar tus operaciones y contenidos sin aumentar personal.',
    portfolioHeading: 'Portafolio de Videos Cortos e IA',
    portfolioSubheading: 'Explora nuestros videos cortos generados con IA, avatares automatizados y demostraciones de agentes.',
    portfolioEditBtn: 'Editar Videos de YouTube',
    portfolioModalTitle: 'Personalizar Videos de YouTube del Portafolio',
    portfolioModalDesc: 'Ingresa los IDs o URLs completas de YouTube para reemplazar los embeds:',
    landingExamplesBadge: 'EJEMPLOS DE LANDING PAGES',
    landingExamplesHeading: 'Estilos Profesionales de Landing Pages',
    landingExamplesSubheading: 'Un vistazo a la variedad de diseños que entregamos: desde tiendas e-commerce hasta lanzamientos SaaS y bienes raíces de lujo.',
    landingExamplesBtn: 'Ver Estilo',
    pricingHeading: 'Inversión Clara y Transparente',
    pricingSubheading: 'Selecciona un plan para acelerar tu empresa con agentes de IA 24/7 y contenido en video viral.',
    faqHeading: 'Preguntas Frecuentes',
    faqSubheading: 'Todo lo que necesitas saber antes de trabajar con la Agencia de IA Uni-Verso693.',
    formHeading: 'Reserva tu Auditoría de IA',
    formSubheading: 'Obtén una hoja de ruta de IA personalizada de 30 minutos, demostración en vivo y estimación de eficiencia.',
    formLabelName: 'Nombre Completo *',
    formLabelEmail: 'Correo Corporativo *',
    formLabelPhone: 'Teléfono / WhatsApp *',
    formLabelCompany: 'Empresa / Sitio Web',
    formLabelInterest: 'Interés Principal *',
    formOption1: 'Agentes de IA 24/7 para Ventas / Soporte',
    formOption2: 'Estudio de Videos Cortos y Reels con IA',
    formOption3: 'Automatización de Flujos Personalizados',
    formOption4: 'Ecosistema Integral de Agencia de IA',
    formOption5: 'Diseño de Landing Pages Profesionales',
    formOption6: 'Logos, Flyers y Diseño Gráfico',
    formLabelBudget: 'Presupuesto Estimado de Inversión',
    formLabelDate: 'Fecha Preferida de Auditoría',
    formLabelNotes: 'Cuéntanos sobre tus objetivos o cuellos de botella actuales',
    formBtnSubmit: 'Contáctanos',
    formSubmitting: 'Reservando tu Horario...',
    formSuccessTitle: '¡Solicitud de Auditoría Confirmada! 🚀',
    formSuccessDesc: 'Gracias por contactar a Uni-Verso693. Un especialista en ingeniería de IA revisará tu información y te enviará los datos de la reunión en menos de 2 horas.',
    formBtnNewRequest: 'Agendar Otra Sesión de Auditoría',
    exportHtmlBtn: 'Exportar HTML Único (Netlify)',
    netlifyBannerText: '¿Listo para subir a Netlify? ¡Copia el paquete HTML de 1 archivo a continuación!',
    footerTagline: 'Uni-Verso693 AI Agency — Construyendo el futuro de los agentes de IA autónomos 24/7 y la producción de video corto con IA para empresas en crecimiento.',
    footerRights: 'Todos los derechos reservados. Uni-Verso693 AI Agency.'
  }
};
