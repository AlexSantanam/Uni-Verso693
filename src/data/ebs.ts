/** Content for the dedicated EBS 693 landing page (/diagnostico-ia). Spanish only. */
export const ebsIncludes = [
  'Revisión de tus procesos, herramientas y cuellos de botella actuales',
  'Identificación de las oportunidades de IA y automatización con más retorno',
  'Priorización por impacto y esfuerzo: qué hacer primero y qué dejar para después',
  'Estimación de retorno (ROI) y del orden de magnitud de la inversión',
  'Recomendación de enfoque: software a medida, herramientas existentes o una combinación',
  'Hoja de ruta por etapas, escrita y concreta. No un PowerPoint',
];

export const ebsForWho = [
  'Empresas que quieren usar inteligencia artificial pero no saben por dónde partir',
  'Equipos que pierden horas en tareas manuales y repetitivas',
  'Negocios que evalúan si construir software a medida o seguir con herramientas de suscripción',
  'Gerencias que necesitan justificar una inversión en tecnología con números',
];

export const ebsSteps = [
  { title: 'Agendas', text: 'Eliges un horario en el calendario. La sesión es por Google Meet, desde cualquier lugar.' },
  { title: 'Sesión de 45 minutos', text: 'Conversamos sobre tu operación, tus metas y tus herramientas. Hablas directo con quienes diseñan y construyen.' },
  { title: 'Hoja de ruta', text: 'Recibes el plan priorizado con oportunidades, retorno estimado y próximos pasos.' },
  { title: 'Si decides avanzar', text: 'Los $197.000 CLP se descuentan del proyecto que contrates con nosotros.' },
];

export const ebsFaqs = [
  {
    q: '¿Qué diferencia hay entre el diagnóstico EBS 693 y el Audit 693 gratuito?',
    a: 'El Audit 693 es un análisis automático con IA a partir de tu sitio web: sirve para ver ideas en un minuto. El EBS 693 es una sesión con nuestro equipo sobre tu operación real, tus procesos y tus datos, y termina en una hoja de ruta priorizada con retorno estimado.',
  },
  {
    q: '¿Cuánto cuesta y qué pasa si después contrato un proyecto?',
    a: 'Cuesta $197.000 CLP. Si decides avanzar con un proyecto con Uni-Verso693, ese monto se descuenta del valor del proyecto.',
  },
  {
    q: '¿Necesito preparar algo antes de la sesión?',
    a: 'No es obligatorio, pero ayuda llegar con una lista de los procesos que más tiempo consumen, las herramientas que usan hoy y lo que te gustaría lograr en los próximos meses.',
  },
  {
    q: '¿La sesión es presencial?',
    a: 'Es remota, por Google Meet, así que puedes hacerla desde cualquier ciudad de Chile o del extranjero.',
  },
  {
    q: '¿Sirve si ya tenemos sistemas y software funcionando?',
    a: 'Sí. Buena parte del diagnóstico consiste en aprovechar lo que ya tienes: integrar sistemas, automatizar tareas entre ellos o agregar IA donde aporta, antes de construir algo nuevo.',
  },
  {
    q: '¿Para qué tamaño de empresa es?',
    a: 'Para pymes y empresas medianas o grandes que quieran decidir con claridad dónde invertir en tecnología. Lo que cambia es el alcance de la hoja de ruta, no la sesión.',
  },
];

/** Symptom checklist on /diagnostico-ia: the visitor ticks what happens in their company. */
export const ebsSymptoms: { area: string; items: string[] }[] = [
  {
    area: 'Operaciones',
    items: [
      'Copiamos datos a mano entre planillas y sistemas',
      'Los reportes se arman a mano cada semana o cada mes',
      'Hay tareas que dependen de que una sola persona se acuerde',
      'Revisamos documentos, facturas o formularios uno por uno',
    ],
  },
  {
    area: 'Ventas',
    items: [
      'Los prospectos se pierden porque nadie les hace seguimiento a tiempo',
      'No sabemos con claridad de dónde vienen nuestros clientes',
      'Las cotizaciones o propuestas se hacen desde cero cada vez',
      'Los datos de clientes están repartidos en correos, WhatsApp y planillas',
    ],
  },
  {
    area: 'Atención al cliente',
    items: [
      'Respondemos las mismas preguntas todos los días',
      'Las consultas fuera de horario quedan sin respuesta hasta el día siguiente',
      'Los clientes tienen que preguntar por el estado de su pedido o solicitud',
      'El equipo se satura en las horas punta',
    ],
  },
];

/**
 * Optional 45-second video explaining the diagnosis. Set it once recorded and the
 * page shows it (with VideoObject JSON-LD). Leave null to hide the block.
 */
export const ebsVideo: null | { src: string; poster: string; uploadDate: string; duration: string } = null;
