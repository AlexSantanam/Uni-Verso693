/**
 * Industry landing pages (/ia-para/:slug). Not in the main menu: reached from the sitemap,
 * a footer link and search. English copy lives in industries.en.ts. No invented statistics: describe problems and
 * use cases qualitatively; numbers come from the visitor (calculator, Audit PRO).
 */
import { industriesEn } from './industries.en';

export interface Industry {
  slug: string;
  /** Short name used in lists: "Transporte y flotas". */
  name: string;
  /** Lowercase phrase after "IA para": "empresas de transporte y flotas". */
  audience: string;
  seoTitle: string;
  description: string;
  h1: string;
  intro: string;
  pains: string[];
  useCases: { title: string; text: string }[];
  care: string;
  faqs: { q: string; a: string }[];
}

export const industries: Industry[] = [
  {
    slug: 'transporte-y-flotas',
    name: 'Transporte y flotas',
    audience: 'empresas de transporte, logística y flotas',
    seoTitle: 'IA para empresas de transporte y flotas en Chile | Uni-Verso693',
    description:
      'Inteligencia artificial y software para transporte, logística y gestión de flotas: seguimiento, mantenciones, rutas, documentos y atención a clientes automatizada.',
    h1: 'Inteligencia artificial para empresas de transporte y flotas',
    intro:
      'En transporte el margen se va en detalles: un camión detenido por una mantención que nadie agendó, un despacho que el cliente persigue por teléfono, guías y facturas que se digitan a mano. La IA y el software a medida ordenan esa operación para que el equipo dedique su tiempo a mover carga, no papeles.',
    pains: [
      'Los clientes llaman o escriben por WhatsApp para saber dónde va su despacho',
      'Las mantenciones, revisiones técnicas y permisos se controlan en planillas',
      'Guías de despacho, facturas y comprobantes se revisan y digitan a mano',
      'La información de GPS, combustible y conductores está en sistemas que no conversan entre sí',
    ],
    useCases: [
      { title: 'Estado del despacho sin llamadas', text: 'Un agente de IA en WhatsApp responde el estado de cada envío consultando tu sistema o tu GPS, y deriva a una persona solo los casos que lo necesitan.' },
      { title: 'Mantenciones que se agendan solas', text: 'Alertas automáticas por kilometraje, horas de motor o fechas de vencimiento de revisión técnica, permisos y seguros de cada vehículo.' },
      { title: 'Lectura automática de documentos', text: 'La IA extrae datos de guías, facturas y comprobantes de entrega (incluso fotos) y los carga en tu sistema, marcando las diferencias para revisión.' },
      { title: 'Un tablero con toda la flota', text: 'Integración de GPS, combustible, conductores y costos en un solo panel, con reportes que se generan solos cada semana.' },
      { title: 'Cotizaciones más rápidas', text: 'Cotizaciones de fletes armadas a partir de tus tarifas, distancias y condiciones, listas para revisar y enviar en minutos.' },
    ],
    care:
      'Los datos de ubicación de conductores y vehículos son información sensible para tu empresa y tus clientes: la solución debe definir quién ve qué, dónde se guardan los datos y por cuánto tiempo.',
    faqs: [
      { q: '¿Necesito cambiar mi GPS o mi sistema actual?', a: 'No necesariamente. Lo habitual es integrarse con lo que ya usas (GPS, ERP, planillas) y agregar automatización e IA encima. Si alguna herramienta no permite integrarse, se evalúa en el diagnóstico.' },
      { q: '¿Sirve para una flota pequeña?', a: 'Sí. En flotas pequeñas el impacto suele notarse antes, porque las mismas personas que manejan la operación también atienden clientes y hacen administración.' },
      { q: '¿Por dónde conviene partir?', a: 'Normalmente por lo que más interrumpe al equipo: consultas de clientes por el estado del despacho o el control de mantenciones y vencimientos.' },
    ],
  },
  {
    slug: 'clinicas-y-salud',
    name: 'Clínicas y salud',
    audience: 'clínicas, centros médicos y consultas',
    seoTitle: 'IA para clínicas y centros médicos en Chile | Uni-Verso693',
    description:
      'Inteligencia artificial para clínicas, centros médicos y consultas: agenda y confirmaciones automáticas, atención por WhatsApp, recordatorios y reportes, con cuidado de los datos.',
    h1: 'Inteligencia artificial para clínicas y centros médicos',
    intro:
      'En salud, cada hora que no se ocupa y cada paciente que no llega se pierde. La recepción pasa el día confirmando horas, respondiendo las mismas preguntas y reagendando. La IA puede hacerse cargo de esa carga repetitiva, siempre con reglas claras sobre qué responde y qué deriva a una persona.',
    pains: [
      'La recepción confirma horas por teléfono o WhatsApp una por una',
      'Pacientes que no llegan y horas que quedan vacías',
      'Las mismas preguntas todos los días: valores, convenios, preparación de exámenes, ubicación',
      'Los reportes de ocupación y producción se arman a mano',
    ],
    useCases: [
      { title: 'Confirmación y reagendamiento automático', text: 'Mensajes que confirman, recuerdan y permiten reagendar sin intervención de recepción, liberando horas para la lista de espera.' },
      { title: 'Atención 24/7 por WhatsApp', text: 'Un agente que responde valores, convenios, horarios y preparación de exámenes con la información oficial del centro, y deriva a una persona lo clínico o lo delicado.' },
      { title: 'Agenda conectada', text: 'Reserva en línea integrada con la agenda de cada profesional, con reglas por especialidad, box y duración.' },
      { title: 'Reportes que se generan solos', text: 'Ocupación, ausentismo y producción por profesional en un panel actualizado, sin armar planillas.' },
      { title: 'Seguimiento después de la atención', text: 'Recordatorios de controles y encuestas de satisfacción automáticas que ayudan a que el paciente vuelva.' },
    ],
    care:
      'Los datos de salud son datos sensibles. Un agente de IA no debe dar indicaciones médicas y la solución tiene que cumplir la normativa chilena de datos personales (Ley 19.628 y la nueva Ley 21.719): acceso restringido, registro de quién consulta qué y derivación a un profesional cuando corresponde.',
    faqs: [
      { q: '¿El agente de IA puede responder consultas médicas?', a: 'No debe. Se configura para responder información administrativa (valores, horarios, convenios, preparación de exámenes) y derivar a un profesional cualquier consulta clínica.' },
      { q: '¿Se puede integrar con mi software de agenda?', a: 'En la mayoría de los casos sí, mediante su API o integraciones disponibles. Si no es posible, se evalúan alternativas en el diagnóstico.' },
      { q: '¿Cómo se protegen los datos de los pacientes?', a: 'Con acceso por roles, cifrado, registro de accesos y proveedores que cumplan la normativa. En el diagnóstico se define qué datos usa cada automatización y cuáles no debe tocar.' },
    ],
  },
  {
    slug: 'inmobiliarias',
    name: 'Inmobiliarias',
    audience: 'inmobiliarias y corredoras de propiedades',
    seoTitle: 'IA para inmobiliarias y corredoras en Chile | Uni-Verso693',
    description:
      'Inteligencia artificial para inmobiliarias y corredoras: respuesta inmediata a leads de portales, calificación de interesados, agenda de visitas, simuladores y seguimiento automático.',
    h1: 'Inteligencia artificial para inmobiliarias y corredoras',
    intro:
      'En el negocio inmobiliario el que responde primero suele quedarse con el cliente. Pero los leads llegan de portales, redes y WhatsApp a cualquier hora, y el equipo comercial no alcanza a atenderlos a todos ni a hacerles seguimiento. La IA responde al instante, califica y agenda, para que los ejecutivos hablen solo con interesados reales.',
    pains: [
      'Leads de portales y redes que se responden horas o días después',
      'Ejecutivos que pierden tiempo con consultas que no califican',
      'Seguimiento de interesados en planillas o en la memoria de cada vendedor',
      'Las mismas preguntas por cada proyecto: precio, dividendo, pie, entrega, ubicación',
    ],
    useCases: [
      { title: 'Respuesta inmediata a cada lead', text: 'Un agente de IA responde en segundos por WhatsApp o web con la información real de cada proyecto y propiedad.' },
      { title: 'Calificación automática', text: 'Preguntas clave (presupuesto, pie, plazo, financiamiento) antes de pasar el contacto a un ejecutivo, con el resumen listo.' },
      { title: 'Agenda de visitas', text: 'Visitas a sala de ventas o propiedades agendadas directamente en el calendario del ejecutivo, con recordatorios.' },
      { title: 'Simuladores en el sitio', text: 'Simulación de dividendo, pie y plusvalía que ayuda al cliente a decidir y entrega datos valiosos al equipo comercial.' },
      { title: 'Seguimiento que no se olvida', text: 'Secuencias automáticas para interesados que no avanzaron, y alertas al ejecutivo cuando un cliente vuelve a interactuar.' },
    ],
    care:
      'El agente debe responder solo con información vigente (precios, stock, condiciones) y dejar claro que las simulaciones son referenciales. Los datos de los interesados tienen que manejarse según la normativa de datos personales.',
    faqs: [
      { q: '¿Se integra con los portales inmobiliarios?', a: 'Los leads que llegan por correo o por integraciones de los portales se pueden capturar y responder automáticamente. El detalle depende de cada portal y se revisa en el diagnóstico.' },
      { q: '¿Reemplaza a los ejecutivos de venta?', a: 'No. Se encarga de la primera respuesta, la calificación y el seguimiento para que los ejecutivos dediquen su tiempo a visitas y cierres.' },
      { q: '¿Sirve para una corredora pequeña?', a: 'Sí. Para equipos pequeños es especialmente útil, porque permite responder fuera de horario sin contratar más personas.' },
    ],
  },
  {
    slug: 'retail-y-ecommerce',
    name: 'Retail y e-commerce',
    audience: 'tiendas, retail y comercio electrónico',
    seoTitle: 'IA para retail y e-commerce en Chile | Uni-Verso693',
    description:
      'Inteligencia artificial para tiendas y e-commerce: atención y ventas por WhatsApp, estado de pedidos, recomendaciones, control de stock y reportes automáticos.',
    h1: 'Inteligencia artificial para retail y e-commerce',
    intro:
      'En comercio las consultas no paran: stock, tallas, despachos, cambios y devoluciones. Cada pregunta sin respuesta rápida es una venta que se puede ir a la competencia. La IA atiende, recomienda y hace seguimiento de pedidos a cualquier hora, y el software a medida conecta tienda, inventario y despacho.',
    pains: [
      'Consultas de stock, tallas y despachos que se acumulan en WhatsApp e Instagram',
      'Clientes que preguntan una y otra vez por el estado de su pedido',
      'Carritos abandonados sin seguimiento',
      'Stock desalineado entre la tienda física, la web y los marketplaces',
    ],
    useCases: [
      { title: 'Vendedor 24/7 por WhatsApp', text: 'Un agente que responde con tu catálogo real, recomienda productos y envía el link de compra.' },
      { title: 'Estado del pedido automático', text: 'Respuestas sobre despacho y seguimiento consultando tu tienda y tu empresa de envíos, sin intervención del equipo.' },
      { title: 'Recuperación de carritos', text: 'Mensajes oportunos y personalizados para clientes que dejaron una compra a medias.' },
      { title: 'Stock sincronizado', text: 'Integración entre tienda web, punto de venta y marketplaces para no vender lo que no hay.' },
      { title: 'Reportes de venta sin planillas', text: 'Ventas, productos que rotan y productos detenidos en un panel que se actualiza solo.' },
    ],
    care:
      'Los mensajes automáticos deben respetar el consentimiento del cliente y la opción de dejar de recibirlos. El agente tiene que responder con precios y stock actualizados para no prometer lo que no hay.',
    faqs: [
      { q: '¿Funciona con mi plataforma de tienda?', a: 'Las plataformas más usadas (por ejemplo Shopify, WooCommerce o Jumpseller) permiten integraciones. Si tu tienda es a medida, se integra mediante su base de datos o API.' },
      { q: '¿El agente puede cerrar ventas?', a: 'Puede resolver dudas, recomendar productos y enviar el link de pago. El cobro ocurre en tu tienda o medio de pago habitual.' },
      { q: '¿Qué pasa con los cambios y devoluciones?', a: 'El agente explica la política y recoge los datos del caso; la aprobación puede quedar en manos de una persona si así lo defines.' },
    ],
  },
  {
    slug: 'estudios-profesionales',
    name: 'Estudios contables y jurídicos',
    audience: 'estudios contables, jurídicos y de servicios profesionales',
    seoTitle: 'IA para estudios contables y jurídicos en Chile | Uni-Verso693',
    description:
      'Inteligencia artificial para estudios contables, jurídicos y de servicios profesionales: lectura de documentos, recordatorios de plazos, atención a clientes y reportes automáticos.',
    h1: 'Inteligencia artificial para estudios contables y jurídicos',
    intro:
      'En los servicios profesionales el tiempo es el producto. Pero buena parte se va en pedir documentos, digitarlos, recordar plazos y responder "¿cómo va lo mío?". La IA se encarga de esa capa operativa para que el equipo dedique sus horas al trabajo que el cliente realmente paga.',
    pains: [
      'Se persigue a los clientes por correo para que envíen sus documentos',
      'Facturas, boletas, contratos y escritos se revisan y digitan a mano',
      'Plazos y vencimientos controlados en planillas o calendarios personales',
      'Los clientes preguntan por el estado de su trámite o causa',
    ],
    useCases: [
      { title: 'Lectura y clasificación de documentos', text: 'La IA extrae datos de facturas, boletas, contratos y resoluciones, los clasifica y los deja listos para revisión.' },
      { title: 'Recolección de documentos automática', text: 'Recordatorios a cada cliente con la lista exacta de lo que falta, y un portal o WhatsApp para enviarlo.' },
      { title: 'Control de plazos', text: 'Alertas de vencimientos tributarios, laborales o judiciales para cada cliente, sin depender de la memoria de nadie.' },
      { title: 'Estado del trámite sin llamadas', text: 'Respuestas automáticas sobre el avance de cada caso, con la información que el equipo ya registra.' },
      { title: 'Borradores y resúmenes', text: 'Primeros borradores de informes, cartas o resúmenes de documentos largos, siempre revisados por un profesional.' },
    ],
    care:
      'La información de los clientes es confidencial: la solución debe definir dónde se procesan los documentos, quién accede y qué proveedores se usan. Todo lo que genere la IA se revisa por un profesional antes de enviarse.',
    faqs: [
      { q: '¿Es seguro procesar documentos de clientes con IA?', a: 'Sí, si se diseña bien: proveedores que no usan tus datos para entrenar modelos, acceso por roles, registro de accesos y almacenamiento controlado. Eso se define desde el diagnóstico.' },
      { q: '¿Se integra con mi software contable o de gestión?', a: 'En general sí, mediante API, exportaciones o integraciones disponibles. Se evalúa caso a caso.' },
      { q: '¿La IA reemplaza el criterio profesional?', a: 'No. Acelera la parte operativa y prepara borradores; la revisión y la decisión siguen siendo del profesional.' },
    ],
  },
  {
    slug: 'educacion',
    name: 'Educación',
    audience: 'colegios, institutos, academias y centros de formación',
    seoTitle: 'IA para colegios, institutos y academias en Chile | Uni-Verso693',
    description:
      'Inteligencia artificial para instituciones educativas: admisión y matrícula, atención a apoderados y alumnos, comunicaciones, cobranza y reportes automáticos.',
    h1: 'Inteligencia artificial para colegios, institutos y academias',
    intro:
      'En educación los equipos administrativos se saturan en los mismos momentos del año: admisión, matrícula, inicio de clases, cobranza. La IA atiende las consultas repetidas, ordena los procesos y deja al equipo libre para lo que requiere trato humano.',
    pains: [
      'En admisión y matrícula las consultas superan la capacidad del equipo',
      'Las mismas preguntas de apoderados o alumnos por correo, teléfono y WhatsApp',
      'Cobranza y recordatorios de pago hechos a mano',
      'Información de alumnos repartida en planillas y sistemas distintos',
    ],
    useCases: [
      { title: 'Admisión que responde sola', text: 'Un agente que informa programas, requisitos, valores y fechas, y agenda entrevistas o visitas.' },
      { title: 'Atención a apoderados y alumnos', text: 'Respuestas a consultas frecuentes con la información oficial de la institución, a cualquier hora.' },
      { title: 'Cobranza amable y automática', text: 'Recordatorios de pago y seguimiento de cuotas, con derivación a una persona cuando hay un caso especial.' },
      { title: 'Comunicaciones ordenadas', text: 'Avisos segmentados por curso, nivel o programa, sin copiar y pegar listas.' },
      { title: 'Reportes para la dirección', text: 'Matrícula, retención y pagos en un panel actualizado, sin armar informes a mano.' },
    ],
    care:
      'Los datos de alumnos, y en especial de menores de edad, requieren un cuidado mayor: acceso restringido, consentimiento de apoderados cuando corresponde y cumplimiento de la normativa de datos personales.',
    faqs: [
      { q: '¿Sirve para academias o cursos online pequeños?', a: 'Sí. En equipos pequeños la automatización de consultas, inscripciones y pagos libera mucho tiempo desde el primer mes.' },
      { q: '¿Se integra con nuestra plataforma académica?', a: 'Depende de la plataforma y de si ofrece API o exportaciones. Se revisa en el diagnóstico y, si no es posible, se proponen alternativas.' },
      { q: '¿Cómo se cuidan los datos de los alumnos?', a: 'Con acceso por roles, proveedores que cumplan la normativa y reglas claras sobre qué datos usa cada automatización.' },
    ],
  },
];

export const industryBySlug = (slug: string) => industries.find((i) => i.slug === slug);

/** The page copy in the visitor's language (SEO and JSON-LD always use the Spanish). */
export const industryCopy = (i: Industry, lang: 'es' | 'en'): Industry => (lang === 'en' && industriesEn[i.slug] ? { ...i, ...industriesEn[i.slug] } : i);
