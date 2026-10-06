import type { L } from '../lib/lang';

/** Content for the dedicated EBS 693 landing page (/diagnostico-ia). */
export const ebsIncludes: { es: string[]; en: string[] } = {
  es: [
    'Análisis de tu operación, tus herramientas y tus cuellos de botella, con tus propios números',
    'Fugas de dinero calculadas, con la confianza de cada número a la vista',
    'Oportunidades de IA y automatización priorizadas por impacto y esfuerzo, con plazo estimado',
    'Inversión, mantención mensual y retorno estimado de cada solución',
    'Recomendación de enfoque: software a medida, herramientas existentes o una combinación',
    'Espacio interactivo privado, simulador, PDF y video explicativo',
  ],
  en: [
    'Analysis of your operation, tools and bottlenecks, using your own numbers',
    'Calculated money leaks, with how much to trust each number in plain sight',
    'AI and automation opportunities prioritised by impact and effort, with an estimated timeline',
    'Investment, monthly upkeep and estimated return of each solution',
    'Recommended approach: custom software, existing tools or a mix',
    'Private interactive space, simulator, PDF and explainer video',
  ],
};

/** What the client receives: the hook of the landing page. */
export const ebsDelivers: { title: L; text: L }[] = [
  {
    title: { es: 'Un análisis con tus propios números', en: 'An analysis built on your own numbers' },
    text: {
      es: 'Calculamos dónde se te va la plata cada mes con los datos de tu negocio, no con promedios de internet.',
      en: 'We work out where your money leaks each month using your business data, not internet averages.',
    },
  },
  {
    title: { es: 'Hoja de ruta priorizada', en: 'A prioritised roadmap' },
    text: {
      es: 'Cada oportunidad con su impacto, su esfuerzo, su plazo estimado y su inversión, ordenadas en etapas.',
      en: 'Each opportunity with its impact, effort, estimated timeline and investment, laid out in stages.',
    },
  },
  {
    title: { es: 'Espacio interactivo privado', en: 'A private interactive space' },
    text: {
      es: 'Tu equipo activa cada solución y ve al instante cuánto recupera, cuánto cuesta, cuánto se mantiene y en cuánto se paga.',
      en: 'Your team switches each solution on and instantly sees what it recovers, what it costs, what it takes to run and how fast it pays back.',
    },
  },
  {
    title: { es: 'Simulador con tus números', en: 'A simulator with your numbers' },
    text: {
      es: 'Mueve tus cotizaciones, tu cierre o tu ticket y mira cómo cambia el resultado antes de decidir.',
      en: 'Move your quotes, close rate or ticket size and watch the result change before you decide.',
    },
  },
  {
    title: { es: 'Cómo funciona cada solución', en: 'How each solution works' },
    text: {
      es: 'Un "hoy y después" de cada una: qué pasa ahora en tu proceso y cómo quedaría con la solución.',
      en: 'A "today and after" for each one: what happens in your process now and how it would look with the solution.',
    },
  },
  {
    title: { es: 'PDF y video', en: 'PDF and video' },
    text: {
      es: 'Un documento para guardar y compartir con tus socios o tu contador, y un video que lo explica.',
      en: 'A document to keep and share with partners or your accountant, and a video that explains it.',
    },
  },
];

/** The technology and method behind the diagnosis. */
export const ebsTech: { title: L; text: L }[] = [
  {
    title: { es: 'Un método por industria', en: 'A method for each industry' },
    text: {
      es: 'Tenemos preguntas y fórmulas de pérdida propias para 16 enfoques: transporte, salud, automotriz, comercio, educación, construcción y más. No partimos de una hoja en blanco contigo.',
      en: 'We have our own questions and loss formulas for 16 approaches: transport, health, automotive, retail, education, construction and more. We never start from a blank page with you.',
    },
  },
  {
    title: { es: 'Fugas calculadas, no opinadas', en: 'Leaks calculated, not guessed' },
    text: {
      es: 'Cada pérdida sale de una fórmula con tus números. Y cada número queda marcado como dato real, estimado por ti o supuesto a validar, para que sepas cuánto confiar en él.',
      en: 'Every loss comes from a formula fed with your numbers. Each number is tagged as real data, your own estimate or an assumption to validate, so you know how far to trust it.',
    },
  },
  {
    title: { es: 'IA que lee tu negocio, con revisión humana', en: 'AI that reads your business, with human review' },
    text: {
      es: 'La inteligencia artificial analiza tu sitio y lo que conversamos, y redacta la propuesta. Después una persona de nuestro equipo la revisa y la afina antes de que la veas.',
      en: 'Artificial intelligence analyses your website and our conversation and drafts the proposal. Then a person on our team reviews and refines it before you see it.',
    },
  },
  {
    title: { es: 'Cálculo en vivo', en: 'Live calculation' },
    text: {
      es: 'Activas una solución o mueves un número y el ahorro, la inversión y el retorno se recalculan en tu pantalla. Sin esperar otro documento.',
      en: 'Switch a solution on or move a number and the savings, investment and return recalculate on your screen. No waiting for another document.',
    },
  },
  {
    title: { es: 'Costos sin letra chica', en: 'Costs with no fine print' },
    text: {
      es: 'La mantención mensual se arma con los servicios que de verdad hay que pagar (WhatsApp, nube, dominio y más) y se ajusta a tu proyecto.',
      en: 'Monthly upkeep is built from the services you actually have to pay for (WhatsApp, cloud, domain and more) and is tuned to your project.',
    },
  },
  {
    title: { es: 'Tu espacio, con tu marca y privado', en: 'Your space, with your brand, and private' },
    text: {
      es: 'El espacio toma el logo y los colores de tu empresa. Tiene un enlace propio que vence a los 30 días y que los buscadores no indexan.',
      en: 'The space picks up your company logo and colours. It has its own link that expires after 30 days and that search engines do not index.',
    },
  },
];

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
    title: { es: 'Tu espacio interactivo', en: 'Your interactive space' },
    text: {
      es: 'Preparamos tu diagnóstico, lo revisamos y recibes tu espacio interactivo, el PDF y un video. Tú y tu equipo deciden qué activar.',
      en: 'We prepare your diagnosis, review it, and you receive your interactive space, the PDF and a video. You and your team decide what to switch on.',
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
    q: { es: '¿Qué es el espacio interactivo?', en: 'What is the interactive space?' },
    a: {
      es: 'Es una página privada con tu diagnóstico. Cada solución aparece como una tarjeta que tu equipo puede activar o desactivar, y al hacerlo se recalculan en pantalla el ahorro, la inversión, la mantención mensual y el retorno. También incluye un simulador con tus números, un cronograma estimado y el "antes y después" de cada solución.',
      en: 'It is a private page with your diagnosis. Each solution appears as a card your team can switch on or off, and doing so recalculates the savings, investment, monthly upkeep and return on screen. It also includes a simulator with your numbers, an estimated timeline and a "before and after" for each solution.',
    },
  },
  {
    q: { es: '¿Quién puede ver mi información?', en: 'Who can see my information?' },
    a: {
      es: 'Solo quien tenga tu enlace privado. El enlace es único, vence a los 30 días y no aparece en buscadores. Lo que compartes se usa para preparar tu diagnóstico.',
      en: 'Only people who have your private link. The link is unique, expires after 30 days and does not appear in search engines. What you share is used to prepare your diagnosis.',
    },
  },
  {
    q: { es: '¿La inteligencia artificial decide por mí?', en: 'Does the artificial intelligence decide for me?' },
    a: {
      es: 'No. La IA ayuda a analizar y a redactar, pero una persona de nuestro equipo revisa y ajusta cada diagnóstico antes de entregártelo. Las cifras que no se conocen quedan marcadas como estimadas o supuestas, nunca como hechos.',
      en: 'No. AI helps analyse and draft, but a person on our team reviews and adjusts every diagnosis before it reaches you. Figures that are not known are marked as estimates or assumptions, never as facts.',
    },
  },
  {
    q: { es: '¿Qué pasa con los datos que no tengo?', en: 'What about the data I do not have?' },
    a: {
      es: 'Es normal no tener todos los números. El diagnóstico los marca como "por medir" y los incluye como parte del plan: a veces ver los números es la primera mejora.',
      en: 'It is normal not to have every number. The diagnosis marks them as "to be measured" and includes that in the plan: sometimes seeing the numbers is the first improvement.',
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
 * What each symptom means in money and what to do about it for free. Same order as `ebsSymptoms`.
 * kind: hours = hours per week × hourly cost; money = the visitor's own monthly estimate; none = no figure, only the tip.
 */
export const ebsSymptomMeta: { kind: 'hours' | 'money' | 'none'; ask?: L; solution: L; tip: L }[][] = [
  [
    {
      kind: 'hours',
      ask: { es: 'Horas a la semana copiando datos', en: 'Hours per week copying data' },
      solution: { es: 'Conectar tus planillas y sistemas para que los datos pasen solos', en: 'Connect your spreadsheets and systems so data moves on its own' },
      tip: { es: 'Anota una semana qué dato copias, de dónde a dónde y cuántas veces. Esa lista es el plano de la automatización.', en: 'For one week, write down which data you copy, from where to where and how many times. That list is the blueprint for automating it.' },
    },
    {
      kind: 'hours',
      ask: { es: 'Horas a la semana armando reportes', en: 'Hours per week building reports' },
      solution: { es: 'Un tablero que se actualiza solo con tus datos', en: 'A dashboard that updates itself from your data' },
      tip: { es: 'Elige los 3 números que de verdad miras en ese reporte. El resto, probablemente, no se usa.', en: 'Pick the 3 numbers you really look at in that report. The rest is probably unused.' },
    },
    {
      kind: 'none',
      solution: { es: 'Recordatorios y tareas que se disparan solas', en: 'Reminders and tasks that trigger themselves' },
      tip: { es: 'Escribe quién recuerda qué y cuándo. Lo que hoy vive en la cabeza de una persona es el primer riesgo.', en: 'Write down who remembers what, and when. What lives in one person’s head today is your first risk.' },
    },
    {
      kind: 'hours',
      ask: { es: 'Horas a la semana revisando documentos', en: 'Hours per week checking documents' },
      solution: { es: 'Lectura automática de documentos, con revisión humana solo en las excepciones', en: 'Automatic document reading, with human review only on exceptions' },
      tip: { es: 'Cuenta cuántos documentos llegan con errores. Si son pocos, revisar solo las excepciones ahorra casi todo el tiempo.', en: 'Count how many documents arrive with errors. If it is few, reviewing only the exceptions saves almost all the time.' },
    },
  ],
  [
    {
      kind: 'money',
      ask: { es: 'Ventas que estimas perder al mes por esto (CLP)', en: 'Sales you estimate you lose per month because of this' },
      solution: { es: 'Seguimiento automático a cada prospecto por WhatsApp o correo', en: 'Automatic follow-up with every lead by WhatsApp or email' },
      tip: { es: 'Esta semana, escribe a mano a los prospectos de hace 7 a 14 días que nunca respondieron. Mide cuántos contestan.', en: 'This week, message by hand the leads from 7 to 14 days ago who never replied. Measure how many answer.' },
    },
    {
      kind: 'none',
      solution: { es: 'Registrar el origen de cada cliente desde el primer contacto', en: 'Record where each customer comes from at first contact' },
      tip: { es: 'Desde hoy, pregunta “¿cómo nos conociste?” a cada cliente nuevo y anótalo. En un mes ya tienes datos.', en: 'From today, ask every new customer “how did you find us?” and write it down. In a month you have data.' },
    },
    {
      kind: 'hours',
      ask: { es: 'Horas a la semana armando cotizaciones', en: 'Hours per week writing quotes' },
      solution: { es: 'Un cotizador con plantillas que se arma en minutos', en: 'A quote builder with templates that takes minutes' },
      tip: { es: 'Junta tus últimas 5 cotizaciones y marca lo que se repite. Eso ya es tu plantilla.', en: 'Gather your last 5 quotes and mark what repeats. That is already your template.' },
    },
    {
      kind: 'hours',
      ask: { es: 'Horas a la semana buscando datos de clientes', en: 'Hours per week looking for customer data' },
      solution: { es: 'Un solo lugar con todos los datos de cada cliente', en: 'One place with all the data for each customer' },
      tip: { es: 'Elige un solo lugar (una planilla basta) y desde hoy todo cliente nuevo se anota ahí, sin excepción.', en: 'Choose one place (a spreadsheet is enough) and from today every new customer goes there, no exceptions.' },
    },
  ],
  [
    {
      kind: 'hours',
      ask: { es: 'Horas a la semana respondiendo lo mismo', en: 'Hours per week answering the same things' },
      solution: { es: 'Un asistente que responde las preguntas frecuentes y te pasa lo complejo', en: 'An assistant that answers frequent questions and hands over the complex ones' },
      tip: { es: 'Lista las 10 preguntas que más te hacen y escribe la mejor respuesta de cada una. Ya tienes gran parte del asistente.', en: 'List the 10 questions you get most and write the best answer to each. That is much of the assistant already.' },
    },
    {
      kind: 'money',
      ask: { es: 'Ventas que estimas perder al mes por no responder a tiempo (CLP)', en: 'Sales you estimate you lose per month by not replying in time' },
      solution: { es: 'Respuesta inmediata fuera de horario, con traspaso al equipo al día siguiente', en: 'Instant after-hours reply, handed to the team the next day' },
      tip: { es: 'Deja un mensaje automático fuera de horario que diga cuándo respondes. WhatsApp Business lo trae y ya tranquiliza al cliente.', en: 'Set an automatic after-hours message saying when you will reply. WhatsApp Business has it and it already reassures the customer.' },
    },
    {
      kind: 'hours',
      ask: { es: 'Horas a la semana respondiendo por el estado de pedidos', en: 'Hours per week answering about order status' },
      solution: { es: 'Avisos automáticos del estado de cada pedido o solicitud', en: 'Automatic status updates for each order or request' },
      tip: { es: 'Define 3 estados claros (recibido, en proceso, listo) y avisa al cliente en cada cambio, aunque sea a mano al principio.', en: 'Define 3 clear states (received, in progress, ready) and tell the customer at each change, even by hand at first.' },
    },
    {
      kind: 'none',
      solution: { es: 'Filtrar y derivar las consultas para repartir mejor la carga', en: 'Filter and route enquiries to spread the load' },
      tip: { es: 'Mide a qué horas se junta el trabajo durante dos semanas. Muchas veces se arregla moviendo turnos, antes de comprar nada.', en: 'Track at what hours the work piles up for two weeks. Often moving shifts fixes it before buying anything.' },
    },
  ],
];

/**
 * Optional 45-second video explaining the diagnosis. Set it once recorded and the
 * page shows it (with VideoObject JSON-LD). Leave null to hide the block.
 */
export const ebsVideo: null | { src: string; poster: string; uploadDate: string; duration: string } = null;
