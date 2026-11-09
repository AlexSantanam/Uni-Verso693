import { CONTACT_EMAIL, WHATSAPP_NUMBER, cases, ebs, faqs, services } from './data/site';
import { posts } from './data/blog';
import { company, companyFaqs } from './data/company';
import { ebsFaqs, ebsVideo } from './data/ebs';
import { auditFaqs } from './data/audit';
import { industries } from './data/industries';

export const SITE_URL = 'https://universo693.com';
const SITE_NAME = 'Uni-Verso693';
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;
const LOGO = `${SITE_URL}/icons/icon-512.png`;

export interface PageSeo {
  path: string;
  title: string;
  description: string;
  /** Pages that shouldn't be indexed (404). */
  noindex?: boolean;
  jsonLd: object[];
  /** Sitemap hints. */
  priority?: number;
}

/** Keep descriptions within what Google shows (~155 chars), cutting on a word. */
const clip = (text: string, max = 155) => {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
};

const url = (path: string) => (path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`);

const organization = {
  '@type': ['Organization', 'ProfessionalService'],
  '@id': `${SITE_URL}/#org`,
  name: SITE_NAME,
  legalName: company.legalName,
  alternateName: company.alternateNames,
  foundingDate: company.foundingYear,
  url: `${SITE_URL}/`,
  logo: LOGO,
  image: OG_IMAGE,
  description:
    'Empresa chilena de desarrollo de software e inteligencia artificial aplicada: soluciones ProPyme, plataformas a medida, agentes de IA para WhatsApp, campus virtuales SENCE y soberanía digital para empresas en crecimiento.',
  subOrganization: [
    { '@type': 'Organization', name: 'Sokify', url: 'https://sokify.app' },
    { '@type': 'Organization', name: 'YndiPet', url: 'https://yndipet.com' },
    { '@type': 'Organization', name: 'MEMORA', url: 'https://memora.lat' },
  ],
  ...(CONTACT_EMAIL && { email: CONTACT_EMAIL }),
  ...(WHATSAPP_NUMBER && { telephone: `+${WHATSAPP_NUMBER}` }),
  address: { '@type': 'PostalAddress', addressCountry: 'CL' },
  areaServed: [
    { '@type': 'Country', name: 'Chile' },
    { '@type': 'City', name: 'Santiago' },
    'Latinoamérica',
    'Estados Unidos',
    'Europa',
  ],
  knowsLanguage: ['es', 'en'],
  priceRange: '$$',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    availableLanguage: ['Spanish', 'English'],
    ...(CONTACT_EMAIL && { email: CONTACT_EMAIL }),
    ...(WHATSAPP_NUMBER && { telephone: `+${WHATSAPP_NUMBER}` }),
  },
  makesOffer: [
    {
      '@type': 'Offer',
      name: 'Sokify: Sistema Operativo Gastronómico Inteligente (Menú QR, KDS Cocina, POS, 0% Comisión)',
      description: 'Plataforma SaaS para restaurantes y cafeterías con menú interactivo QR, comanda KDS en tiempo real, pedidos por WhatsApp y 0% comisión por venta. 3 meses gratis.',
      price: '15900',
      priceCurrency: 'CLP',
      url: 'https://sokify.app',
    },
    {
      '@type': 'Offer',
      name: `${ebs.name}: diagnóstico estratégico de IA`,
      description: 'Sesión de 45 minutos que entrega una hoja de ruta priorizada con ROI estimado.',
      price: '197000',
      priceCurrency: 'CLP',
      url: `${SITE_URL}/diagnostico-ia`,
    },
    {
      '@type': 'Offer',
      name: 'Programa Impulsa ProPyme: arriendo y leasing de plataformas web para PyMEs',
      description: 'Desarrollo de sitios web de alto rendimiento, e-commerce, cartas QR y sistemas a medida desde $19.900 CLP/mes o leasing 24 meses.',
      price: '19900',
      priceCurrency: 'CLP',
      url: `${SITE_URL}/impulsa-pyme`,
    },
    {
      '@type': 'Offer',
      name: 'AUDIT 693 PRO: informe técnico de optimización y automatización',
      description: 'Auditoría integral web con estimación de costos manuales y 8-10 oportunidades de automatización con IA.',
      price: '19990',
      priceCurrency: 'CLP',
      url: `${SITE_URL}/audit-693`,
    },
  ],
};

const website = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  inLanguage: 'es-CL',
  publisher: { '@id': `${SITE_URL}/#org` },
};

const breadcrumb = (items: { name: string; path: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [{ name: 'Inicio', path: '/' }, ...items].map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: url(it.path),
  })),
});

const graph = (...nodes: object[]) => [{ '@context': 'https://schema.org', '@graph': [organization, website, ...nodes] }];

/** Search-oriented titles per service (the on-page titles stay as they are). */
const serviceTitles: Record<string, string> = {
  'software-a-medida': 'Desarrollo de software a medida, intranets y portales B2B',
  'agentes-ia': 'Agentes de IA cognitivos y automatización con RAG',
  'campus-virtuales': 'Campus virtuales y plataformas educativas a medida',
  'integraciones-gob': 'Integraciones gubernamentales, SENCE y ClaveÚnica',
  'pasarelas-pago': 'Integración de pasarelas de pago Webpay y Mercado Pago',
  'seo-tecnico': 'Posicionamiento SEO técnico y crecimiento orgánico',
  'apps-moviles': 'Desarrollo de apps móviles y PWA instalables',
  'migracion-cloud': 'Migración a la nube y servidores VPS dedicados',
  consultoria: 'Diagnóstico tecnológico y hoja de ruta EBS 693',
};

const home: PageSeo = {
  path: '/',
  title: `Desarrollo de Software a Medida, IA & Soluciones ProPyme en Chile | ${SITE_NAME}`,
  description:
    'Empresa chilena de ingeniería de software e IA aplicada: plataformas a medida, agentes de IA para WhatsApp, programa Impulsa ProPyme y soberanía tecnológica sin vendor lock-in.',
  priority: 1,
  jsonLd: graph({
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q.es,
      acceptedAnswer: { '@type': 'Answer', text: f.a.es },
    })),
  }),
};


const paginasWebPage: PageSeo = {
  path: '/paginas-web',
  title: `Diseño y Desarrollo de Páginas Web en Chile | ${SITE_NAME}`,
  description: clip(
    'Páginas web profesionales y landing pages con código propio en Chile. Carga en 1 segundo, optimizadas para Google e IA, sin mensualidades cautivas. Entrega en 5 a 10 días.',
  ),
  priority: 0.95,
  jsonLd: graph(
    breadcrumb([{ name: 'Páginas Web', path: '/paginas-web' }]),
    {
      '@type': 'Service',
      name: 'Desarrollo de Páginas Web y Landing Pages de Alta Velocidad',
      serviceType: 'Diseño y desarrollo web profesional',
      description:
        'Desarrollo de páginas web y landing pages de alta velocidad con código limpio en Chile. Sin plantillas pesadas de WordPress, sin cobros mensuales forzosos, con optimización para Google e IA y botón directo a WhatsApp.',
      url: url('/paginas-web'),
      provider: { '@id': `${SITE_URL}/#org` },
      areaServed: [{ '@type': 'Country', name: 'Chile' }],
      offers: [
        {
          '@type': 'Offer',
          name: 'Plan Landing Express',
          price: '380000',
          priceCurrency: 'CLP',
          url: url('/paginas-web'),
        },
        {
          '@type': 'Offer',
          name: 'Plan Web Corporativa Pro',
          price: '580000',
          priceCurrency: 'CLP',
          url: url('/paginas-web'),
        },
        {
          '@type': 'Offer',
          name: 'Plan Catálogo Interactivo PWA',
          price: '680000',
          priceCurrency: 'CLP',
          url: url('/paginas-web'),
        },
      ],
    },
  ),
};

const servicesPage: PageSeo = {
  path: '/servicios',
  title: `Servicios de software, IA y apps móviles | ${SITE_NAME}`,
  description: clip(
    'Desarrollo de software a medida, agentes de IA y automatización, apps móviles iOS y Android, web y e-commerce, y consultoría tecnológica para empresas en Chile y Latinoamérica.',
  ),
  priority: 0.9,
  jsonLd: graph(
    breadcrumb([{ name: 'Servicios', path: '/servicios' }]),
    {
      '@type': 'ItemList',
      itemListElement: services.map((s, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: s.title.es,
        url: url(`/servicios/${s.slug}`),
      })),
    },
  ),
};

const servicePages: PageSeo[] = services.map((s) => ({
  path: `/servicios/${s.slug}`,
  title: `${serviceTitles[s.slug] ?? s.title.es} | ${SITE_NAME}`,
  description: clip(`${s.description.es} ${s.tagline.es}.`),
  priority: 0.8,
  jsonLd: graph(
    breadcrumb([
      { name: 'Servicios', path: '/servicios' },
      { name: s.title.es, path: `/servicios/${s.slug}` },
    ]),
    {
      '@type': 'Service',
      name: s.title.es,
      serviceType: s.title.es,
      description: s.description.es,
      url: url(`/servicios/${s.slug}`),
      provider: { '@id': `${SITE_URL}/#org` },
      areaServed: [{ '@type': 'Country', name: 'Chile' }, 'Latinoamérica'],
    },
  ),
}));

const casesPage: PageSeo = {
  path: '/casos',
  title: `Casos de éxito y software en producción | ${SITE_NAME}`,
  description: clip(
    'Portafolio de sistemas a medida, plataformas interactivas y despliegues en la nube en producción para empresas e instituciones en Chile y Latinoamérica.',
  ),
  priority: 0.8,
  jsonLd: graph(
    breadcrumb([{ name: 'Casos de éxito', path: '/casos' }]),
    {
      '@type': 'ItemList',
      itemListElement: cases.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.title.es,
        url: url(`/casos/${c.slug}`),
      })),
    },
  ),
};

/** Short, search-oriented case titles (Bing flags titles over ~70 chars). */
const caseTitles: Record<string, string> = {
  yndipet: 'YndiPet: app de mascotas con inteligencia artificial',
  memora: 'MEMORA: plataforma de memoriales digitales',
  melsa: 'MELSA: plataforma inmobiliaria de lujo con simulador en UF',
};

const casePages: PageSeo[] = cases.map((c) => ({
  path: `/casos/${c.slug}`,
  title: `${caseTitles[c.slug] ?? c.client} | ${SITE_NAME}`,
  description: clip(c.solution.es),
  priority: 0.7,
  jsonLd: graph(
    breadcrumb([
      { name: 'Casos de éxito', path: '/casos' },
      { name: c.client, path: `/casos/${c.slug}` },
    ]),
    {
      '@type': 'CreativeWork',
      name: c.title.es,
      description: c.solution.es,
      url: url(`/casos/${c.slug}`),
      creator: { '@id': `${SITE_URL}/#org` },
      ...(c.url && { sameAs: c.url }),
      keywords: c.tags.join(', '),
    },
  ),
}));

const about: PageSeo = {
  path: '/nosotros',
  title: `Nosotros: equipo de software, producto e IA | ${SITE_NAME}`,
  description: clip(
    'Universo693 SpA, empresa chilena de software fundada en 2013: equipo de producto, desarrollo, datos, diseño e IA que trabaja remoto para Chile y el mundo.',
  ),
  priority: 0.6,
  jsonLd: graph(
    breadcrumb([{ name: 'Nosotros', path: '/nosotros' }]),
    {
      '@type': 'AboutPage',
      url: url('/nosotros'),
      about: { '@id': `${SITE_URL}/#org` },
    },
    {
      '@type': 'FAQPage',
      mainEntity: companyFaqs.map((f) => ({
        '@type': 'Question',
        name: f.q.es,
        acceptedAnswer: { '@type': 'Answer', text: f.a.es },
      })),
    },
  ),
};

const contact: PageSeo = {
  path: '/contacto',
  title: `Contacto y diagnóstico EBS 693 | ${SITE_NAME}`,
  description: clip(
    'Cuéntanos tu proyecto de software o IA. Respondemos en menos de 2 horas. Agenda el diagnóstico EBS 693: 45 minutos y una hoja de ruta con ROI.',
  ),
  priority: 0.7,
  jsonLd: graph(breadcrumb([{ name: 'Contacto', path: '/contacto' }]), {
    '@type': 'ContactPage',
    url: url('/contacto'),
    about: { '@id': `${SITE_URL}/#org` },
  }),
};

const diagnosticoPage: PageSeo = {
  path: '/diagnostico-ia',
  title: 'Diagnóstico de IA para empresas en Chile | EBS 693',
  description: clip(
    'Diagnóstico de IA con tus propios números: fugas calculadas, hoja de ruta priorizada y un espacio interactivo privado con simulador de retorno. Sesión de 45 minutos. $197.000 CLP.',
  ),
  priority: 0.9,
  jsonLd: graph(
    breadcrumb([{ name: 'Diagnóstico de IA', path: '/diagnostico-ia' }]),
    {
      '@type': 'Service',
      name: 'EBS 693: diagnóstico de inteligencia artificial para empresas',
      serviceType: 'Consultoría de inteligencia artificial',
      description:
        'Diagnóstico remoto que parte de una sesión de 45 minutos, calcula las fugas de dinero con los números del cliente, prioriza oportunidades de IA y automatización por impacto y esfuerzo, y entrega una hoja de ruta con retorno estimado, un espacio interactivo privado con simulador, un PDF y un video.',
      url: url('/diagnostico-ia'),
      provider: { '@id': `${SITE_URL}/#org` },
      areaServed: [{ '@type': 'Country', name: 'Chile' }, 'Latinoamérica'],
      offers: {
        '@type': 'Offer',
        price: '197000',
        priceCurrency: 'CLP',
        availability: 'https://schema.org/InStock',
        url: url('/diagnostico-ia'),
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: ebsFaqs.map((f) => ({ '@type': 'Question', name: f.q.es, acceptedAnswer: { '@type': 'Answer', text: f.a.es } })),
    },
    // only once the 45-second explainer video exists (src/data/ebs.ts)
    ...(ebsVideo
      ? [
          {
            '@type': 'VideoObject',
            name: 'Qué es el diagnóstico EBS 693',
            description: 'Explicación en 45 segundos del diagnóstico de inteligencia artificial EBS 693 de Uni-Verso693.',
            thumbnailUrl: new URL(ebsVideo.poster, SITE_URL).toString(),
            contentUrl: new URL(ebsVideo.src, SITE_URL).toString(),
            uploadDate: ebsVideo.uploadDate,
            duration: ebsVideo.duration,
          },
        ]
      : []),
  ),
};

const auditPage: PageSeo = {
  path: '/audit-693',
  title: 'Audit 693: oportunidades de IA gratis e informe PRO',
  description: clip(
    'Gratis: 3 oportunidades de IA para tu empresa en menos de un minuto. AUDIT 693 PRO: informe PDF de fugas de dinero con análisis de competencia por $19.990 CLP.',
  ),
  priority: 0.8,
  jsonLd: graph(
    breadcrumb([{ name: 'Audit 693', path: '/audit-693' }]),
    {
      '@type': 'Service',
      '@id': `${SITE_URL}/audit-693#pro`,
      name: 'AUDIT 693 PRO - Informe de Fugas de Dinero',
      serviceType: 'Auditoría de IA y automatización para empresas',
      description:
        'Informe PDF generado con IA: revisa hasta 7 páginas del sitio web, evalúa el sitio como canal de venta, analiza a los competidores directos, calcula el costo del trabajo manual con los datos del cliente y prioriza 8 a 10 oportunidades de IA y automatización. Se entrega entre 2 y 4 minutos después del pago.',
      url: url('/audit-693'),
      provider: { '@id': `${SITE_URL}/#org` },
      areaServed: [{ '@type': 'Country', name: 'Chile' }, 'Latinoamérica', 'Estados Unidos', 'Europa'],
      offers: [
        { '@type': 'Offer', price: '19990', priceCurrency: 'CLP', url: url('/audit-693'), availability: 'https://schema.org/InStock' },
        { '@type': 'Offer', price: '21.00', priceCurrency: 'USD', url: url('/audit-693'), availability: 'https://schema.org/InStock' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: auditFaqs.map((f) => ({ '@type': 'Question', name: f.q.es, acceptedAnswer: { '@type': 'Answer', text: f.a.es } })),
    },
    {
    '@type': 'WebApplication',
    name: 'Audit 693',
    url: url('/audit-693'),
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description:
      'Análisis con IA del sitio web de una empresa. Versión gratuita con 3 oportunidades de automatización; AUDIT 693 PRO con informe PDF, análisis de competencia y costo del trabajo manual.',
    offers: [
      { '@type': 'Offer', name: 'Audit 693 gratis', price: '0', priceCurrency: 'CLP' },
      { '@type': 'Offer', name: 'AUDIT 693 PRO - Informe de Fugas de Dinero', price: '19990', priceCurrency: 'CLP', availability: 'https://schema.org/InStock' },
    ],
    provider: { '@id': `${SITE_URL}/#org` },
    },
  ),
};

const blogPage: PageSeo = {
  path: '/blog',
  title: `Blog: software e inteligencia artificial para empresas | ${SITE_NAME}`,
  description: clip(
    'Guías prácticas sobre software a medida, agentes de IA, chatbots de WhatsApp y automatización para empresas en Chile y Latinoamérica.',
  ),
  priority: 0.7,
  jsonLd: graph(breadcrumb([{ name: 'Blog', path: '/blog' }]), {
    '@type': 'Blog',
    url: url('/blog'),
    name: `Blog ${SITE_NAME}`,
    publisher: { '@id': `${SITE_URL}/#org` },
    blogPost: posts.map((p) => ({ '@type': 'BlogPosting', headline: p.title, url: url(`/blog/${p.slug}`), datePublished: p.date })),
  }),
};

const postPages: PageSeo[] = posts.map((p) => ({
  path: `/blog/${p.slug}`,
  title: p.seoTitle,
  description: clip(p.description),
  priority: 0.6,
  jsonLd: graph(
    breadcrumb([
      { name: 'Blog', path: '/blog' },
      { name: p.title, path: `/blog/${p.slug}` },
    ]),
    {
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.description,
      url: url(`/blog/${p.slug}`),
      mainEntityOfPage: url(`/blog/${p.slug}`),
      datePublished: p.date,
      dateModified: p.date,
      inLanguage: 'es-CL',
      keywords: p.tags.join(', '),
      image: OG_IMAGE,
      author: { '@id': `${SITE_URL}/#org` },
      publisher: { '@id': `${SITE_URL}/#org` },
    },
  ),
}));

export const notFoundSeo: PageSeo = {
  path: '/404',
  title: `Página no encontrada | ${SITE_NAME}`,
  description: 'La página que buscas no existe. Vuelve al inicio de Uni-Verso693.',
  noindex: true,
  jsonLd: [],
};

const bovedaPage: PageSeo = {
  path: '/boveda',
  title: `Bóveda Digital de Credenciales y Soberanía Tecnológica | ${SITE_NAME}`,
  description: clip(
    'Acceso seguro para clientes de Uni-Verso693 a sus credenciales de infraestructura, bases de datos, repositorios y llaves de API. Garantía de soberanía tecnológica.',
  ),
  priority: 0.8,
  jsonLd: graph(
    breadcrumb([{ name: 'Bóveda Cliente', path: '/boveda' }]),
    {
      '@type': 'WebPage',
      name: 'Bóveda Digital de Credenciales & Soberanía Tecnológica',
      description: 'Custodia soberana de código, llaves de API y credenciales cloud para clientes.',
      url: url('/boveda'),
    },
  ),
};

/** Internal workspace: prerendered (so the route exists) but never indexed or listed. */
const internoPage: PageSeo = {
  path: '/interno',
  title: `Interno | ${SITE_NAME}`,
  description: 'Espacio interno.',
  noindex: true,
  jsonLd: [],
};

/** Shell for the private interactive EBS (/ebs/<token>): Vercel rewrites every token to this prerendered page. */

const auditoriaPage: PageSeo = {
  path: '/auditoria',
  title: `Auditoría Web Técnica y Comercial | ${SITE_NAME}`,
  description: 'Auditoría completa de rendimiento, seguridad HTTP, SEO en Google y presencia en motores de IA.',
  noindex: true,
  jsonLd: [],
};

const ebsViewPage: PageSeo = {
  path: '/ebs/_',
  title: `Tu hoja de ruta EBS 693 interactiva | ${SITE_NAME}`,
  description: 'Hoja de ruta interactiva de tu diagnóstico EBS 693.',
  noindex: true,
  jsonLd: [],
};

/** Catálogo de rubros Impulsa ProPyme: debe reflejar las keys y precios de BUSINESS_TYPES en src/pages/ImpulsaPyme.tsx. */
const impulsaRubros: { slug: string; name: string; tag: string; description: string; fromPrice: number }[] = [
  { slug: 'restaurante', name: 'Restaurante, Fuente de Soda, Sushi o Gastrobar', tag: 'Carta QR en Mesa + Delivery', description: 'Tus clientes escanean el QR en su mesa o piden por Delivery directo a cocina y WhatsApp.', fromPrice: 24900 },
  { slug: 'almacen', name: 'Almacén de Barrio, Minimarket o Cafetería', tag: 'Catálogo & Pedidos WhatsApp', description: 'Vitrina digital de ofertas donde tus vecinos arman su pedido y te llega listo al WhatsApp.', fromPrice: 19900 },
  { slug: 'comercio', name: 'Tienda Online, Pastelería, Boutique o Ferretería', tag: 'E-Commerce & Webpay', description: 'Vende 24/7 en todo Chile con carrito, control de stock y pago con tarjetas.', fromPrice: 35900 },
  { slug: 'profesional', name: 'Estudio de Arquitectura, Contadores o Abogados', tag: 'Portafolio & Cotizador m²', description: 'Presencia de alto estándar con galería de proyectos y pre-cotizador interactivo.', fromPrice: 29900 },
  { slug: 'servicios', name: 'Centro de Salud, Estética, Barbería o Veterinaria', tag: 'Agenda Online & Abonos', description: 'Reserva de horas 24/7 con abono previo para eliminar las horas perdidas.', fromPrice: 22500 },
  { slug: 'academia', name: 'Academia, OTEC, Escuela de Oficios o Capacitación', tag: 'Aula Virtual & Diplomas', description: 'Tu propio campus virtual para vender cursos con pruebas y diplomas PDF.', fromPrice: 45000 },
  { slug: 'gestion', name: 'Taller Mecánico, Servicio Técnico o Contratista', tag: 'Órdenes & Seguimiento Patente', description: 'Tus clientes consultan el estado de su vehículo/equipo en vivo y tú ordenas tu taller.', fromPrice: 37500 },
];

const impulsaPymePage: PageSeo = {
  path: '/impulsa-pyme',
  title: `Impulsa ProPyme: Sitios Web y Sistemas para PyMEs desde $19.900/mes | ${SITE_NAME}`,
  description: clip(
    'Programa Impulsa ProPyme en Chile: desarrollo de páginas web ultrarrápidas, e-commerce, cartas QR y sistemas a medida bajo arriendo mensual o leasing con derecho a compra en 24 cuotas (100% código propio). Demos en vivo para restaurantes, almacenes, tiendas, profesionales y talleres.',
  ),
  priority: 0.95,
  jsonLd: graph(breadcrumb([{ name: 'Impulsa ProPyme', path: '/impulsa-pyme' }]), {
    '@type': 'Service',
    name: 'Programa Impulsa ProPyme',
    serviceType: 'Desarrollo de sitios web, e-commerce y sistemas a medida para PyMEs',
    description: 'Programa de UNIVERSO693 SpA para digitalizar negocios chilenos con páginas web de alto rendimiento, sistemas a medida y agentes de IA, financiados en modalidad de arriendo mensual todo incluido o leasing con derecho a compra en 24 cuotas (100% soberanía tecnológica).',
    url: url('/impulsa-pyme'),
    provider: { '@id': `${SITE_URL}/#org` },
    areaServed: [{ '@type': 'Country', name: 'Chile' }],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Catálogo de Soluciones Impulsa ProPyme',
      itemListElement: impulsaRubros.map((r) => ({
        '@type': 'Offer',
        name: `${r.tag} — ${r.name}`,
        description: r.description,
        price: String(r.fromPrice),
        priceCurrency: 'CLP',
        url: url(`/impulsa-pyme/${r.slug}`),
        availability: 'https://schema.org/InStock',
      })),
    },
  }),
};

const impulsaRubroPages: PageSeo[] = impulsaRubros.map((r) => ({
  path: `/impulsa-pyme/${r.slug}`,
  title: `${r.name}: ${r.tag} desde $${r.fromPrice.toLocaleString('es-CL')}/mes | Impulsa ProPyme`,
  description: clip(`${r.description} Precio base desde $${r.fromPrice.toLocaleString('es-CL')}/mes, 100% personalizable. Un programa de ${SITE_NAME}.`),
  priority: 0.85,
  jsonLd: graph(
    breadcrumb([
      { name: 'Impulsa ProPyme', path: '/impulsa-pyme' },
      { name: r.name, path: `/impulsa-pyme/${r.slug}` },
    ]),
    {
      '@type': 'Service',
      name: `${r.tag} — ${r.name}`,
      serviceType: 'Desarrollo de sitios web y sistemas a medida para PyMEs',
      description: r.description,
      url: url(`/impulsa-pyme/${r.slug}`),
      provider: { '@id': `${SITE_URL}/#org` },
      areaServed: [{ '@type': 'Country', name: 'Chile' }],
      offers: { '@type': 'Offer', price: String(r.fromPrice), priceCurrency: 'CLP', url: url(`/impulsa-pyme/${r.slug}`), availability: 'https://schema.org/InStock' },
    },
  ),
}));

/** Every page to prerender, in sitemap order (noindex pages are left out of the sitemap). */
const industryPages: PageSeo[] = industries.map((i) => ({
  path: `/ia-para/${i.slug}`,
  title: i.seoTitle,
  description: clip(i.description),
  priority: 0.7,
  jsonLd: graph(
    breadcrumb([{ name: `IA para ${i.name.toLowerCase()}`, path: `/ia-para/${i.slug}` }]),
    {
      '@type': 'Service',
      name: i.h1,
      serviceType: 'Inteligencia artificial y automatización',
      description: `${i.intro} ${i.useCases.map((u) => u.title).join('; ')}.`,
      url: url(`/ia-para/${i.slug}`),
      provider: { '@id': `${SITE_URL}/#org` },
      audience: { '@type': 'BusinessAudience', audienceType: i.audience },
      areaServed: [{ '@type': 'Country', name: 'Chile' }, 'Latinoamérica'],
    },
    {
      '@type': 'FAQPage',
      mainEntity: i.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ),
}));

const pagoPage: PageSeo = {
  path: '/pago',
  title: 'Portal de Pagos y Facturación | Uni-Verso693 & Sokify',
  description: clip('Paga tus planes de Sokify y servicios de Uni-Verso693 con Mercado Pago (tarjetas de crédito, débito, Webpay) o transferencia bancaria.'),
  priority: 0.6,
  jsonLd: graph(breadcrumb([{ name: 'Portal de Pagos', path: '/pago' }])),
};

export const allPages: PageSeo[] = [home, paginasWebPage, servicesPage, ...servicePages, casesPage, ...casePages, about, bovedaPage, diagnosticoPage, auditPage, impulsaPymePage, ...impulsaRubroPages, ...industryPages, blogPage, ...postPages, contact, pagoPage, internoPage, ebsViewPage, auditoriaPage];

export const getSeo = (pathname: string): PageSeo => {
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  return allPages.find((p) => p.path === clean) ?? notFoundSeo;
};

export const canonicalUrl = url;
