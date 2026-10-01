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
    'Empresa chilena de desarrollo de software: plataformas a medida, agentes de IA, aplicaciones móviles y producto digital para empresas.',
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
  makesOffer: {
    '@type': 'Offer',
    name: `${ebs.name}: diagnóstico estratégico de IA`,
    description: 'Sesión de 45 minutos que entrega una hoja de ruta priorizada con ROI estimado.',
    price: '197000',
    priceCurrency: 'CLP',
    url: `${SITE_URL}/diagnostico-ia`,
  },
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
  'software-a-medida': 'Desarrollo de software a medida en Chile',
  'agentes-ia': 'Agentes de IA y chatbots para WhatsApp en 7 días',
  'apps-moviles': 'Desarrollo de apps móviles iOS y Android',
  'web-y-producto': 'Desarrollo web, e-commerce y diseño UX/UI',
  consultoria: 'Consultoría tecnológica y de IA para empresas',
};

const home: PageSeo = {
  path: '/',
  title: `Desarrollo de software a medida e IA en Chile | ${SITE_NAME}`,
  description:
    'Empresa chilena de desarrollo de software: plataformas a medida, agentes de IA para WhatsApp y web, apps móviles y producto digital. Casos reales en producción.',
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
  title: `Casos de éxito: YndiPet, MEMORA y MELSA | ${SITE_NAME}`,
  description: clip(
    'Casos reales en producción (YndiPet, MEMORA y MELSA) y soluciones de software e IA por industria: salud, retail, minería, seguros, banca, construcción y más.',
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
  melsa: 'MELSA: sitio inmobiliario con simulador de inversión',
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
    'Sesión de 45 minutos que entrega una hoja de ruta priorizada para aplicar inteligencia artificial y automatización en tu empresa, con ROI estimado. $197.000 CLP.',
  ),
  priority: 0.9,
  jsonLd: graph(
    breadcrumb([{ name: 'Diagnóstico de IA', path: '/diagnostico-ia' }]),
    {
      '@type': 'Service',
      name: 'EBS 693: diagnóstico de inteligencia artificial para empresas',
      serviceType: 'Consultoría de inteligencia artificial',
      description:
        'Sesión remota de 45 minutos que revisa procesos y herramientas, prioriza oportunidades de IA y automatización por impacto y esfuerzo, y entrega una hoja de ruta con retorno estimado.',
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

/** Internal workspace: prerendered (so the route exists) but never indexed or listed. */
const internoPage: PageSeo = {
  path: '/interno',
  title: `Interno | ${SITE_NAME}`,
  description: 'Espacio interno.',
  noindex: true,
  jsonLd: [],
};

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

export const allPages: PageSeo[] = [home, servicesPage, ...servicePages, casesPage, ...casePages, about, diagnosticoPage, auditPage, ...industryPages, blogPage, ...postPages, contact, internoPage];

export const getSeo = (pathname: string): PageSeo => {
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  return allPages.find((p) => p.path === clean) ?? notFoundSeo;
};

export const canonicalUrl = url;
