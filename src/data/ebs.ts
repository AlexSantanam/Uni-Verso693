import type { L } from '../lib/lang';

/** Content for the dedicated EBS 693 landing page (/diagnostico-ia). */
export const ebsIncludes: { es: string[]; en: string[] } = {
  es: [
    'Revisión de tus procesos, herramientas y cuellos de botella actuales',
    'Identificación de las oportunidades de IA y automatización con más retorno',
    'Priorización por impacto y esfuerzo: qué hacer primero y qué dejar para después',
    'Estimación de retorno (ROI) y del orden de magnitud de la inversión',
    'Recomendación de enfoque: software a medida, herramientas existentes o una combinación',
    'Hoja de ruta por etapas, escrita y concreta. No un PowerPoint',
  ],
  en: [
    'Review of your current processes, tools and bottlenecks',
    'The AI and automation opportunities with the highest return',
    'Prioritisation by impact and effort: what to do first and what can wait',
    'Estimated return (ROI) and the order of magnitude of the investment',
    'Recommended approach: custom software, existing tools or a mix',
    'A written, concrete roadmap in stages. Not a slide deck',
  ],
};

export const ebsForWho: { es: string[]; en: string[] } = {
  es: [
    'Empresas que quieren usar inteligencia artificial pero no saben por dónde partir',
    'Equipos que pierden horas en tareas manuales y repetitivas',
    'Negocios que evalúan si construir software a medida o seguir con herramientas de suscripción',
    'Gerencias que necesitan justificar una inversión en tecnología con números',
  ],
  en: [
    'Companies that want to use AI but don’t know where to start',
    'Teams losing hours to manual, repetitive work',
    'Businesses deciding between custom software and subscription tools',
    'Managers who need numbers to justify a technology investment',
  ],
};

export const ebsSteps: { title: L; text: L }[] = [
  {
    title: { es: 'Agendas', en: 'Book' },
    text: {
      es: 'Eliges un horario en el calendario. La sesión es por Google Meet, desde cualquier lugar.',
      en: 'Pick a slot in the calendar. The session runs on Google Meet, from anywhere.',
    },
  },
  {
    title: { es: 'Sesión de 45 minutos', en: '45-minute session' },
    text: {
      es: 'Conversamos sobre tu operación, tus metas y tus herramientas. Hablas directo con quienes diseñan y construyen.',
      en: 'We talk about your operation, goals and tools. You speak directly with the people who design and build.',
    },
  },
  {
    title: { es: 'Hoja de ruta', en: 'Roadmap' },
    text: {
      es: 'Recibes el plan priorizado con oportunidades, retorno estimado y próximos pasos.',
      en: 'You get a prioritised plan with opportunities, estimated return and next steps.',
    },
  },
  {
    title: { es: 'Si decides avanzar', en: 'If you move forward' },
    text: {
      es: 'Los $197.000 CLP se descuentan del proyecto que contrates con nosotros.',
      en: 'The CLP 197,000 fee is credited to the project you hire us for.',
    },
  },
];

export const ebsFaqs: { q: L; a: L }[] = [
  {
    q: {
      es: '¿Qué diferencia hay entre el diagnóstico EBS 693 y el Audit 693 gratuito?',
      en: 'What’s the difference between the EBS 693 diagnosis and the free Audit 693?',
    },
    a: {
      es: 'El Audit 693 es un análisis automático con IA a partir de tu sitio web: sirve para ver ideas en un minuto. El EBS 693 es una sesión con nuestro equipo sobre tu operación real, tus procesos y tus datos, y termina en una hoja de ruta priorizada con retorno estimado.',
      en: 'Audit 693 is an automatic AI analysis of your website: a quick way to see ideas in a minute. EBS 693 is a session with our team about your real operation, processes and data, and it ends with a prioritised roadmap with estimated return.',
    },
  },
  {
    q: { es: '¿Cuánto cuesta y qué pasa si después contrato un proyecto?', en: 'How much is it, and what happens if I then hire a project?' },
    a: {
      es: 'Cuesta $197.000 CLP. Si decides avanzar con un proyecto con Uni-Verso693, ese monto se descuenta del valor del proyecto.',
      en: 'It costs CLP 197,000. If you move forward with a project with Uni-Verso693, that amount is credited to the project.',
    },
  },
  {
    q: { es: '¿Necesito preparar algo antes de la sesión?', en: 'Do I need to prepare anything?' },
    a: {
      es: 'No es obligatorio, pero ayuda llegar con una lista de los procesos que más tiempo consumen, las herramientas que usan hoy y lo que te gustaría lograr en los próximos meses.',
      en: 'It’s not required, but it helps to bring a list of the processes that take the most time, the tools you use today and what you’d like to achieve in the coming months.',
    },
  },
  {
    q: { es: '¿La sesión es presencial?', en: 'Is the session in person?' },
    a: {
      es: 'Es remota, por Google Meet, así que puedes hacerla desde cualquier ciudad de Chile o del extranjero.',
      en: 'It’s remote, on Google Meet, so you can join from anywhere in Chile or abroad.',
    },
  },
  {
    q: { es: '¿Sirve si ya tenemos sistemas y software funcionando?', en: 'Is it useful if we already have systems in place?' },
    a: {
      es: 'Sí. Buena parte del diagnóstico consiste en aprovechar lo que ya tienes: integrar sistemas, automatizar tareas entre ellos o agregar IA donde aporta, antes de construir algo nuevo.',
      en: 'Yes. Much of the diagnosis is about making the most of what you have: connecting systems, automating tasks between them or adding AI where it helps, before building anything new.',
    },
  },
  {
    q: { es: '¿Para qué tamaño de empresa es?', en: 'What size of company is it for?' },
    a: {
      es: 'Para pymes y empresas medianas o grandes que quieran decidir con claridad dónde invertir en tecnología. Lo que cambia es el alcance de la hoja de ruta, no la sesión.',
      en: 'For small, mid-sized and large companies that want a clear view of where to invest in technology. What changes is the scope of the roadmap, not the session.',
    },
  },
];

/** Symptom checklist on /diagnostico-ia: the visitor ticks what happens in their company. */
export const ebsSymptoms: { area: L; items: L[] }[] = [
  {
    area: { es: 'Operaciones', en: 'Operations' },
    items: [
      { es: 'Copiamos datos a mano entre planillas y sistemas', en: 'We copy data by hand between spreadsheets and systems' },
      { es: 'Los reportes se arman a mano cada semana o cada mes', en: 'Reports are put together by hand every week or month' },
      { es: 'Hay tareas que dependen de que una sola persona se acuerde', en: 'Some tasks depend on one person remembering them' },
      { es: 'Revisamos documentos, facturas o formularios uno por uno', en: 'We check documents, invoices or forms one by one' },
    ],
  },
  {
    area: { es: 'Ventas', en: 'Sales' },
    items: [
      { es: 'Los prospectos se pierden porque nadie les hace seguimiento a tiempo', en: 'Leads go cold because nobody follows up in time' },
      { es: 'No sabemos con claridad de dónde vienen nuestros clientes', en: 'We don’t clearly know where our customers come from' },
      { es: 'Las cotizaciones o propuestas se hacen desde cero cada vez', en: 'Quotes and proposals are written from scratch every time' },
      { es: 'Los datos de clientes están repartidos en correos, WhatsApp y planillas', en: 'Customer data is scattered across email, WhatsApp and spreadsheets' },
    ],
  },
  {
    area: { es: 'Atención al cliente', en: 'Customer service' },
    items: [
      { es: 'Respondemos las mismas preguntas todos los días', en: 'We answer the same questions every day' },
      { es: 'Las consultas fuera de horario quedan sin respuesta hasta el día siguiente', en: 'After-hours enquiries wait until the next day' },
      { es: 'Los clientes tienen que preguntar por el estado de su pedido o solicitud', en: 'Customers have to ask about the status of their order or request' },
      { es: 'El equipo se satura en las horas punta', en: 'The team gets swamped at peak times' },
    ],
  },
];

/**
 * Optional 45-second video explaining the diagnosis. Set it once recorded and the
 * page shows it (with VideoObject JSON-LD). Leave null to hide the block.
 */
export const ebsVideo: null | { src: string; poster: string; uploadDate: string; duration: string } = null;
