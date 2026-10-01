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
    h1: 'Inteligencia artificial para retail y e‑commerce', // non-breaking hyphen: keeps "e-commerce" on one line
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
  {
    slug: 'mineria',
    name: 'Minería',
    audience: 'empresas mineras y proveedores de la minería',
    seoTitle: 'IA y software para minería en Chile | Uni-Verso693',
    description:
      'Inteligencia artificial y software para minería y sus proveedores: mantenimiento predictivo, reportes de turno automáticos, consulta de procedimientos y paneles de operación.',
    h1: 'Inteligencia artificial y software para minería',
    intro:
      'En minería cada hora de equipo detenido cuesta caro y la información vive repartida entre sensores, planillas de turno y manuales técnicos. La IA y el software a medida ayudan a anticipar fallas, ordenar los datos de la operación y poner el conocimiento técnico al alcance de quien lo necesita en terreno, siempre como apoyo a los protocolos de seguridad.',
    pains: [
      'Las fallas de equipos se detectan cuando ya ocurrieron',
      'Los reportes de turno, producción y seguridad se arman a mano',
      'Manuales y procedimientos difíciles de consultar en terreno',
      'Datos de sensores, mantención y producción en sistemas separados',
    ],
    useCases: [
      { title: 'Mantenimiento predictivo', text: 'Modelos que analizan datos de sensores y el historial de mantención para anticipar fallas y programar intervenciones.' },
      { title: 'Reportes de turno automáticos', text: 'Producción, detenciones e indicadores de seguridad consolidados al cierre de cada turno, sin digitar.' },
      { title: 'Asistente de procedimientos', text: 'Consulta en lenguaje natural de manuales técnicos y procedimientos, con la referencia al documento oficial.' },
      { title: 'Panel de operación', text: 'Indicadores de equipos, producción y mantención en un solo lugar, para operación en faena o remota.' },
      { title: 'Gestión documental de contratistas', text: 'Lectura y control automático de certificados, acreditaciones y vencimientos de proveedores y trabajadores.' },
    ],
    care:
      'La seguridad de las personas va primero: la IA apoya decisiones, no reemplaza protocolos. Muchas faenas tienen conectividad limitada, así que las soluciones deben funcionar con conexión intermitente.',
    faqs: [
      { q: '¿Sirve para proveedores de la minería y no solo para la faena?', a: 'Sí. Empresas de mantención, transporte, servicios y contratistas suelen tener mucho trabajo administrativo y documental que se puede automatizar.' },
      { q: '¿Funciona sin conexión permanente?', a: 'Se puede diseñar para trabajar con conexión intermitente, guardando datos localmente y sincronizando cuando hay señal.' },
      { q: '¿Necesitamos sensores nuevos para mantenimiento predictivo?', a: 'No siempre. Muchas veces se parte con los datos que ya generan los equipos y el historial de mantención; en el diagnóstico se evalúa qué hay disponible.' },
    ],
  },
  {
    slug: 'seguros',
    name: 'Seguros',
    audience: 'aseguradoras, corredoras y liquidadoras de seguros',
    seoTitle: 'IA para aseguradoras y corredoras de seguros en Chile | Uni-Verso693',
    description:
      'Inteligencia artificial para seguros: cotización y atención automática, lectura de documentos de siniestros, seguimiento de pólizas y renovaciones.',
    h1: 'Inteligencia artificial para aseguradoras y corredoras de seguros',
    intro:
      'En seguros, buena parte del trabajo es documental y repetitivo: cotizar, pedir antecedentes, revisar denuncias de siniestros, recordar renovaciones. La IA puede hacerse cargo de esa carga para que el equipo dedique su tiempo a asesorar y resolver los casos complejos.',
    pains: [
      'Cotizaciones que tardan porque hay que pedir y revisar datos a mano',
      'Documentos de siniestros que se revisan uno por uno',
      'Clientes que preguntan por el estado de su siniestro o su póliza',
      'Renovaciones que se pierden por falta de seguimiento',
    ],
    useCases: [
      { title: 'Cotización guiada', text: 'Un agente que pide los datos necesarios, valida la información y deja la cotización lista para revisión.' },
      { title: 'Lectura de documentos de siniestros', text: 'Extracción de datos de denuncias, facturas, informes y fotos, con alertas cuando falta algo o hay inconsistencias.' },
      { title: 'Estado del siniestro sin llamadas', text: 'Respuestas automáticas sobre el avance de cada caso, con la información que el equipo ya registra.' },
      { title: 'Renovaciones que no se olvidan', text: 'Recordatorios y seguimiento automático antes del vencimiento de cada póliza.' },
      { title: 'Asistente para ejecutivos', text: 'Consulta rápida de condiciones, coberturas y exclusiones de cada producto, con la referencia al documento.' },
    ],
    care:
      'Es un sector regulado y supervisado por la CMF. La información de clientes y siniestros es sensible: trazabilidad, control de accesos y revisión humana de las decisiones son requisitos, no opciones.',
    faqs: [
      { q: '¿La IA puede aprobar o rechazar un siniestro?', a: 'No debería decidir sola. Se usa para ordenar, validar y resumir la información; la decisión la toma una persona.' },
      { q: '¿Sirve para corredoras pequeñas?', a: 'Sí. En corredoras pequeñas automatizar cotizaciones, renovaciones y consultas libera mucho tiempo del equipo comercial.' },
      { q: '¿Se integra con nuestro sistema de pólizas?', a: 'Depende del sistema y de si ofrece API o exportaciones. Se revisa en el diagnóstico.' },
    ],
  },
  {
    slug: 'banca-y-finanzas',
    name: 'Banca y finanzas',
    audience: 'bancos, financieras, cooperativas y fintech',
    seoTitle: 'IA y software para banca, financieras y fintech en Chile | Uni-Verso693',
    description:
      'Inteligencia artificial y software para servicios financieros: atención automatizada, revisión documental en onboarding y créditos, alertas y paneles de gestión.',
    h1: 'Inteligencia artificial y software para servicios financieros',
    intro:
      'En servicios financieros la velocidad de respuesta compite con la exigencia de control. Evaluar un crédito, incorporar a un cliente o responder una consulta requiere revisar mucha información. La IA acelera esa revisión y el software a medida la deja trazable, sin perder el control que exige el regulador.',
    pains: [
      'Evaluaciones de crédito y onboarding lentos por revisión manual de documentos',
      'Consultas repetidas sobre productos, requisitos y estado de solicitudes',
      'Información de clientes repartida en distintos sistemas',
      'Reportes de gestión que se arman a mano',
    ],
    useCases: [
      { title: 'Revisión documental automática', text: 'Lectura y validación de liquidaciones, cédulas, balances y certificados en procesos de onboarding y crédito.' },
      { title: 'Atención 24/7', text: 'Un agente que responde consultas sobre productos, requisitos y estado de solicitudes con información oficial, y deriva lo sensible a una persona.' },
      { title: 'Alertas de patrones inusuales', text: 'Detección de transacciones o comportamientos fuera de lo normal como apoyo a la prevención de fraude.' },
      { title: 'Panel de gestión', text: 'Colocaciones, mora y cartera en un panel que se actualiza solo, a partir de los sistemas que ya existen.' },
      { title: 'Cobranza ordenada', text: 'Recordatorios y seguimiento de pagos por canal y etapa, con derivación a un ejecutivo cuando corresponde.' },
    ],
    care:
      'Es un sector regulado, supervisado por la CMF, con iniciativas como la Ley Fintec. Trazabilidad, control de accesos, seguridad de la información y supervisión humana de las decisiones automatizadas son requisitos desde el diseño.',
    faqs: [
      { q: '¿Puede la IA decidir si se aprueba un crédito?', a: 'Puede apoyar con análisis y alertas, pero la decisión y su justificación deben quedar bajo responsabilidad de una persona y del modelo de riesgo definido por la institución.' },
      { q: '¿Sirve para cooperativas o financieras pequeñas?', a: 'Sí. En equipos pequeños la automatización documental y de atención tiene un impacto rápido.' },
      { q: '¿Dónde se procesan los datos?', a: 'Se define en el diseño: proveedores que cumplan la normativa, cifrado y acceso por roles. En el diagnóstico se revisan los requisitos de cada institución.' },
    ],
  },
  {
    slug: 'alimentacion-y-restaurantes',
    name: 'Alimentación y restaurantes',
    audience: 'restaurantes, cadenas de comida y empresas de alimentos',
    seoTitle: 'IA para restaurantes y empresas de alimentos en Chile | Uni-Verso693',
    description:
      'Inteligencia artificial y software para restaurantes y alimentos: reservas y pedidos por WhatsApp, control de inventario y mermas, pedidos a proveedores y reportes de venta.',
    h1: 'Inteligencia artificial para restaurantes y empresas de alimentos',
    intro:
      'En alimentación los márgenes son estrechos y todo pasa rápido: reservas, pedidos, inventario que vence, proveedores que hay que llamar. La IA y la automatización ordenan esa operación para que el equipo se concentre en cocinar y atender.',
    pains: [
      'Reservas y pedidos que llegan por teléfono, WhatsApp y redes a la vez',
      'Mermas por productos que vencen sin que nadie lo note a tiempo',
      'Pedidos a proveedores hechos de memoria o en planillas',
      'Ventas y costos por local que se revisan a fin de mes',
    ],
    useCases: [
      { title: 'Reservas y pedidos por WhatsApp', text: 'Un agente que toma reservas y pedidos, confirma disponibilidad y envía el resumen a cocina o al local.' },
      { title: 'Control de inventario y mermas', text: 'Alertas de stock bajo y de productos próximos a vencer, a partir de las ventas y las compras registradas.' },
      { title: 'Pedidos a proveedores', text: 'Sugerencias de compra según ventas y stock, listas para aprobar y enviar.' },
      { title: 'Panel por local', text: 'Ventas, costos y productos más vendidos por local, actualizados cada día.' },
      { title: 'Fidelización', text: 'Mensajes y promociones segmentadas para clientes frecuentes, respetando su consentimiento.' },
    ],
    care:
      'La información de alérgenos, ingredientes y precios debe estar siempre al día: el agente responde solo con datos oficiales y deriva a una persona cualquier consulta sobre alergias o salud.',
    faqs: [
      { q: '¿Se integra con mi sistema de caja o plataforma de delivery?', a: 'Muchos sistemas de caja y plataformas permiten integraciones o exportaciones. Se revisa caso a caso en el diagnóstico.' },
      { q: '¿Sirve para un solo local?', a: 'Sí. Para un local independiente, automatizar reservas, pedidos y compras libera tiempo desde el primer mes.' },
      { q: '¿Puede el agente responder sobre alérgenos?', a: 'Puede informar lo que está en la ficha oficial de cada plato, pero ante cualquier duda de salud debe derivar a una persona del local.' },
    ],
  },
  {
    slug: 'turismo-y-hoteleria',
    name: 'Turismo y hotelería',
    audience: 'hoteles, agencias y operadores de turismo',
    seoTitle: 'IA para hoteles y turismo en Chile | Uni-Verso693',
    description:
      'Inteligencia artificial para hoteles, agencias y operadores turísticos: atención 24/7 en varios idiomas, reservas, comunicación con huéspedes y reportes de ocupación.',
    h1: 'Inteligencia artificial para hoteles y turismo',
    intro:
      'En turismo los clientes preguntan a cualquier hora y en distintos idiomas, y una respuesta lenta es una reserva que se va a otra parte. La IA atiende, informa y reserva todo el día, y el software a medida conecta reservas, pagos y operación.',
    pains: [
      'Consultas en varios idiomas que llegan de noche o en fin de semana',
      'Las mismas preguntas de siempre: disponibilidad, precios, traslados, horarios',
      'Comunicación con huéspedes antes y después de la estadía hecha a mano',
      'Información de reservas repartida entre canales y planillas',
    ],
    useCases: [
      { title: 'Atención 24/7 en varios idiomas', text: 'Un agente que responde en español, inglés y portugués con la información oficial del hotel u operador.' },
      { title: 'Reservas directas', text: 'Consulta de disponibilidad y reserva desde WhatsApp o el sitio, conectada al sistema de reservas.' },
      { title: 'Comunicación con huéspedes', text: 'Mensajes automáticos antes de la llegada, durante la estadía y después, con encuesta de satisfacción.' },
      { title: 'Panel de ocupación', text: 'Ocupación, tarifas y canales de venta en un panel actualizado.' },
      { title: 'Itinerarios y documentos', text: 'Confirmaciones, vouchers e itinerarios generados automáticamente para cada cliente.' },
    ],
    care:
      'Los datos de pasaportes y pagos de los huéspedes son sensibles: la solución debe definir qué se guarda, dónde y por cuánto tiempo, y el agente debe responder solo con precios y condiciones vigentes.',
    faqs: [
      { q: '¿Se integra con mi sistema de reservas o channel manager?', a: 'La mayoría de los sistemas permite integraciones. Se revisa cuál usas y qué ofrece en el diagnóstico.' },
      { q: '¿Responde en otros idiomas?', a: 'Sí. El agente puede atender en varios idiomas con la misma información oficial.' },
      { q: '¿Sirve para un hotel boutique o una agencia pequeña?', a: 'Sí. Es donde más se nota, porque permite atender fuera de horario sin sumar personal.' },
    ],
  },
  {
    slug: 'manufactura',
    name: 'Manufactura',
    audience: 'fábricas, plantas productivas e industria',
    seoTitle: 'IA y software para manufactura e industria en Chile | Uni-Verso693',
    description:
      'Inteligencia artificial y software para manufactura: control de producción, calidad con visión por computador, mantención, inventario de insumos y reportes de planta.',
    h1: 'Inteligencia artificial y software para manufactura',
    intro:
      'En una planta productiva los problemas cuestan tiempo y material: una detención no planificada, un lote con defectos, un insumo que se acabó. La IA y el software a medida ayudan a ver la producción en tiempo real y a detectar problemas antes de que escalen.',
    pains: [
      'Producción y detenciones registradas en papel o planillas',
      'Control de calidad manual y difícil de trazar',
      'Quiebres de stock de insumos que detienen la línea',
      'Reportes de planta que llegan tarde a la gerencia',
    ],
    useCases: [
      { title: 'Registro de producción digital', text: 'Captura simple de producción, detenciones y causas desde tablet o celular, con reportes automáticos.' },
      { title: 'Control de calidad con visión', text: 'Revisión de productos con cámaras e IA para detectar defectos y registrar cada lote.' },
      { title: 'Mantención programada', text: 'Alertas por horas de uso o fechas, con historial por máquina.' },
      { title: 'Inventario de insumos', text: 'Alertas de stock y sugerencias de compra según el plan de producción.' },
      { title: 'Panel de planta', text: 'Eficiencia, detenciones y producción por línea en tiempo real.' },
    ],
    care:
      'La IA apoya al equipo de planta, no reemplaza los controles de seguridad ni de calidad establecidos. Conviene partir con una línea o proceso piloto antes de escalar.',
    faqs: [
      { q: '¿Necesitamos cambiar nuestras máquinas?', a: 'No. Normalmente se parte registrando mejor lo que ya ocurre y conectando los datos disponibles.' },
      { q: '¿Sirve para una planta pequeña?', a: 'Sí. Digitalizar el registro de producción y calidad tiene impacto desde el inicio, sin importar el tamaño.' },
      { q: '¿Se integra con nuestro ERP?', a: 'En general sí, mediante API o exportaciones. Se evalúa en el diagnóstico.' },
    ],
  },
  {
    slug: 'agro',
    name: 'Agro',
    audience: 'empresas agrícolas, exportadoras y agroindustria',
    seoTitle: 'IA y software para el agro y la agroindustria en Chile | Uni-Verso693',
    description:
      'Inteligencia artificial y software para el agro: registro de labores en terreno, trazabilidad para exportación, control de cosecha y personal, y paneles por campo.',
    h1: 'Inteligencia artificial y software para el agro',
    intro:
      'En el agro la información nace en terreno y muchas veces se queda en un cuaderno: labores, aplicaciones, cosecha, personal por temporada. El software a medida y la IA la llevan a un sistema ordenado que sirve para decidir, cumplir y exportar.',
    pains: [
      'Labores y aplicaciones registradas en papel en el campo',
      'Trazabilidad para exportación armada a mano antes de cada envío',
      'Control de personal y cosecha por temporada en planillas',
      'Información de campos, bodegas y ventas que no se cruza',
    ],
    useCases: [
      { title: 'Registro de labores en terreno', text: 'App simple para registrar labores, aplicaciones y cosecha, incluso sin señal, que sincroniza al volver.' },
      { title: 'Trazabilidad por lote', text: 'Historial completo de cada lote, del campo al envío, listo para auditorías y exigencias de exportación.' },
      { title: 'Control de personal y cosecha', text: 'Registro de asistencia, rendimiento y pagos por temporada.' },
      { title: 'Lectura de documentos', text: 'Extracción automática de datos de guías, facturas y certificados.' },
      { title: 'Panel por campo', text: 'Avance de labores, cosecha y costos por campo o cuartel.' },
    ],
    care:
      'Muchos campos tienen mala conectividad: las soluciones deben funcionar sin conexión. Los datos del personal de temporada deben tratarse según la normativa de datos personales.',
    faqs: [
      { q: '¿Funciona sin señal en el campo?', a: 'Sí, se diseña para registrar sin conexión y sincronizar cuando hay señal.' },
      { q: '¿Sirve para productores medianos?', a: 'Sí. Ordenar el registro de labores y la trazabilidad tiene impacto en cualquier tamaño.' },
      { q: '¿Se puede conectar con el sistema contable?', a: 'En general sí, mediante exportaciones o API. Se revisa en el diagnóstico.' },
    ],
  },
  {
    slug: 'construccion',
    name: 'Construcción',
    audience: 'constructoras, contratistas y empresas de ingeniería',
    seoTitle: 'IA y software para constructoras en Chile | Uni-Verso693',
    description:
      'Inteligencia artificial y software para construcción: avance de obra digital, control documental de subcontratos, compras y bodega, y paneles por proyecto.',
    h1: 'Inteligencia artificial y software para construcción',
    intro:
      'En construcción cada obra genera una montaña de información: avances, fotos, subcontratos, compras, documentos de trabajadores. Cuando vive en planillas y chats, las desviaciones se descubren tarde. El software a medida y la IA ordenan esa información por obra y alertan a tiempo.',
    pains: [
      'Avance de obra reportado por chat, fotos sueltas y planillas',
      'Documentación de subcontratos y trabajadores difícil de controlar',
      'Compras y bodega sin visibilidad por proyecto',
      'Desviaciones de plazo y costo que se detectan tarde',
    ],
    useCases: [
      { title: 'Avance de obra digital', text: 'Registro de avance con fotos y ubicación desde el celular, con reportes automáticos por obra.' },
      { title: 'Control documental', text: 'Lectura y seguimiento automático de documentos de subcontratos y trabajadores, con alertas de vencimiento.' },
      { title: 'Compras y bodega', text: 'Solicitudes, órdenes de compra y stock por obra en un solo sistema.' },
      { title: 'Panel por proyecto', text: 'Plazo, costo y avance de cada obra comparados con lo planificado.' },
      { title: 'Asistente de especificaciones', text: 'Consulta en lenguaje natural de especificaciones técnicas y bases, con referencia al documento.' },
    ],
    care:
      'La seguridad en obra no se delega a una herramienta: la IA apoya el control documental y la gestión, pero los protocolos y las decisiones siguen en manos de los responsables.',
    faqs: [
      { q: '¿Sirve para una constructora mediana?', a: 'Sí. El control de avance y documental por obra tiene impacto rápido en empresas de cualquier tamaño.' },
      { q: '¿Funciona en obra sin buena señal?', a: 'Se puede diseñar para registrar sin conexión y sincronizar después.' },
      { q: '¿Se integra con nuestro sistema de gestión?', a: 'Depende del sistema; se revisa en el diagnóstico y, si no es posible, se proponen alternativas.' },
    ],
  },
];

export const industryBySlug = (slug: string) => industries.find((i) => i.slug === slug);

/** The page copy in the visitor's language (SEO and JSON-LD always use the Spanish). */
export const industryCopy = (i: Industry, lang: 'es' | 'en'): Industry => (lang === 'en' && industriesEn[i.slug] ? { ...i, ...industriesEn[i.slug] } : i);
