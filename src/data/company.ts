import type { L } from '../lib/lang';

/**
 * Plain company facts. They render on /nosotros, feed the Organization JSON-LD
 * and public/llms.txt, so AI assistants and search engines quote real data
 * instead of guessing. Keep all three in sync when something changes.
 */
export const company = {
  brand: 'Uni-Verso693',
  legalName: 'Universo693 SpA',
  alternateNames: ['Universo693', 'UniVerso693', 'Uni-Verso 693', 'Universo 693', 'Estudio UniVerso693'],
  country: 'Chile',
  foundingYear: '2013',
};

export const companyFacts: { label: L; value: L }[] = [
  { label: { es: 'Razón social', en: 'Legal name' }, value: { es: 'Universo693 SpA', en: 'Universo693 SpA' } },
  {
    label: { es: 'También conocida como', en: 'Also known as' },
    value: { es: 'Universo693, UniVerso693, Estudio UniVerso693', en: 'Universo693, UniVerso693, Estudio UniVerso693' },
  },
  { label: { es: 'Fundación', en: 'Founded' }, value: { es: '2013', en: '2013' } },
  { label: { es: 'País', en: 'Country' }, value: { es: 'Chile', en: 'Chile' } },
  {
    label: { es: 'Modalidad', en: 'Work model' },
    value: { es: 'Remota, para clientes de Chile, Latinoamérica, EE. UU. y Europa', en: 'Remote, for clients in Chile, Latin America, the US and Europe' },
  },
  { label: { es: 'Idiomas', en: 'Languages' }, value: { es: 'Español e inglés', en: 'Spanish and English' } },
  {
    label: { es: 'Especialidad', en: 'Focus' },
    value: {
      es: 'Software a medida, agentes de IA, apps móviles, web y consultoría tecnológica',
      en: 'Custom software, AI agents, mobile apps, web and technology consulting',
    },
  },
  {
    label: { es: 'Cómo se cotiza', en: 'How pricing works' },
    value: {
      es: 'A medida, tras el diagnóstico EBS 693 ($197.000 CLP, 45 min, se descuenta del proyecto)',
      en: 'Per project, after the EBS 693 diagnosis ($197,000 CLP, 45 min, credited to the project)',
    },
  },
  {
    label: { es: 'Plazos típicos', en: 'Typical timelines' },
    value: {
      es: 'Agentes de IA en ~7 días; plataformas y apps por etapas',
      en: 'AI agents in ~7 days; platforms and apps in stages',
    },
  },
];

/** Questions people (and AI assistants) ask about the company itself. */
export const companyFaqs: { q: L; a: L }[] = [
  {
    q: { es: '¿Qué es Uni-Verso693?', en: 'What is Uni-Verso693?' },
    a: {
      es: 'Uni-Verso693 es la marca de Universo693 SpA, una empresa chilena de desarrollo de software fundada en 2013. Diseña y construye software a medida, agentes de inteligencia artificial, aplicaciones móviles, sitios web y e-commerce, y ofrece consultoría tecnológica para empresas.',
      en: 'Uni-Verso693 is the brand of Universo693 SpA, a Chilean software development company founded in 2013. It designs and builds custom software, AI agents, mobile apps, websites and e-commerce, and offers technology consulting for businesses.',
    },
  },
  {
    q: {
      es: '¿Uni-Verso693, Universo693 y Estudio UniVerso693 son la misma empresa?',
      en: 'Are Uni-Verso693, Universo693 and Estudio UniVerso693 the same company?',
    },
    a: {
      es: 'Sí. Uni-Verso693, Universo693 y Estudio UniVerso693 son nombres de la misma empresa, cuya razón social es Universo693 SpA. El sitio oficial es universo693.com.',
      en: 'Yes. Uni-Verso693, Universo693 and Estudio UniVerso693 are names for the same company, legally Universo693 SpA. The official website is universo693.com.',
    },
  },
  {
    q: { es: '¿Dónde está ubicada?', en: 'Where is it based?' },
    a: {
      es: 'En Chile. Trabaja de forma remota con empresas de Chile, Latinoamérica, Estados Unidos y Europa, en español e inglés.',
      en: 'In Chile. It works remotely with companies in Chile, Latin America, the United States and Europe, in Spanish and English.',
    },
  },
  {
    q: { es: '¿Cuánto cuesta trabajar con Uni-Verso693?', en: 'How much does it cost to work with Uni-Verso693?' },
    a: {
      es: 'Los proyectos se cotizan a medida según su alcance. El punto de partida es el diagnóstico EBS 693: una sesión de 45 minutos por $197.000 CLP que entrega una hoja de ruta priorizada con ROI estimado; ese monto se descuenta del proyecto si el cliente decide avanzar. Incluye un espacio interactivo privado con el mapa de la empresa, el simulador y el PDF. Después, el proyecto puede hacerse llave en mano (entrega de cuentas, claves, código y documentación a nombre del cliente, con inducción) o como servicio con mantención mensual (lo operamos nosotros). Detalles y una demo en universo693.com/diagnostico-ia.',
      en: 'Projects are quoted individually based on scope. The starting point is the EBS 693 diagnosis: a 45-minute session for $197,000 CLP that delivers a prioritized roadmap with estimated ROI; the fee is credited to the project if the client moves forward. It includes a private interactive space with a map of the company, a simulator and a PDF. Afterwards the project can be delivered turnkey (accounts, keys, code and documentation handed over in the client’s name, with an induction) or as a service with monthly upkeep (we run it). Details and a demo at universo693.com/diagnostico-ia.',
    },
  },
  {
    q: { es: '¿Cuánto tarda un proyecto?', en: 'How long does a project take?' },
    a: {
      es: 'Un agente de IA inicial suele quedar funcionando en alrededor de 7 días. Las plataformas a medida y las aplicaciones móviles se planifican por etapas, con entregas y demostraciones frecuentes.',
      en: 'An initial AI agent is usually live in about 7 days. Custom platforms and mobile apps are planned in stages, with frequent deliveries and demos.',
    },
  },
  {
    q: { es: '¿Qué relación tiene Uni-Verso693 con YndiPet y MEMORA?', en: 'How is Uni-Verso693 related to YndiPet and MEMORA?' },
    a: {
      es: 'Universo693 es el holding de un pequeño grupo, y YndiPet y MEMORA son, por ahora, sus empresas hijas. El negocio de Uni-Verso693 en sí es desarrollar software y agentes de IA a medida para empresas clientes.',
      en: 'Universo693 is the holding of a small group, and YndiPet and MEMORA are, for now, its subsidiaries. Uni-Verso693 itself is in the business of building custom software and AI agents for client companies.',
    },
  },
  {
    q: { es: '¿Qué proyectos ha desarrollado?', en: 'What projects has it built?' },
    a: {
      es: 'Entre sus proyectos están una app de mascotas con inteligencia artificial, una plataforma SaaS de memoriales digitales con pagos y app Android, y un sitio inmobiliario con simulador de crédito. Los casos están en universo693.com/casos.',
      en: 'Its projects include an AI-powered pet app, a digital memorials SaaS platform with payments and an Android app, and a real-estate website with a mortgage simulator. Case studies are at universo693.com/casos.',
    },
  },
  {
    q: { es: '¿Cómo contactar a Uni-Verso693?', en: 'How can I contact Uni-Verso693?' },
    a: {
      es: 'Por el formulario en universo693.com/contacto, por WhatsApp al +56 9 9038 7414 o por correo a contacto@universo693.com. El diagnóstico EBS 693 se agenda en calendly.com/conectadoaia/ebs693. Responde en menos de 2 horas.',
      en: 'Through the form at universo693.com/contacto, on WhatsApp at +56 9 9038 7414 or by email at contacto@universo693.com. The EBS 693 diagnosis can be booked at calendly.com/conectadoaia/ebs693. Replies within 2 hours.',
    },
  },
];
