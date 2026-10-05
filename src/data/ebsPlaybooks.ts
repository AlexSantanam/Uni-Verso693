/**
 * EBS 693 "enfoques": one playbook per industry (slugs match src/data/industries.ts) plus a general one.
 * Each has plain-language questions (with a fallback for clients who don't know their numbers),
 * the metrics that matter in that business, how its money leaks are calculated from those metrics,
 * and the documents to request after the session. Used by the EBS editor in /interno; the editor
 * sends the computed leaks with each save, so the server and the PDF don't need this file.
 */

export type MetricUnit = 'n' | 'clp' | 'pct' | 'h' | 'dias';
export type Confidence = 'real' | 'estimado' | 'supuesto';

export interface Metric {
  key: string;
  label: string;
  unit: MetricUnit;
  /** Assumptions start marked as such (e.g. a percentage the consultant proposes). */
  assumption?: boolean;
}

export interface Question {
  q: string;
  /** What to ask instead if the client doesn't know or doesn't understand. */
  fallback?: string;
  /** Metrics this question fills (shown as inputs next to it). */
  metrics?: string[];
}

export interface Block {
  title: string;
  minutes: number;
  questions: Question[];
}

/** 'perdida' adds to the monthly leak; 'caja' is money trapped (not lost); 'contexto' is shown, not summed. */
export type LeakKind = 'perdida' | 'caja' | 'contexto';

export interface LeakDef {
  key: string;
  label: string;
  kind: LeakKind;
  /** Plain-language formula, printed under the amount. */
  explain: string;
  uses: string[];
  calc: (m: (k: string) => number) => number;
}

export interface Playbook {
  id: string;
  name: string;
  /** For the AI: where money usually leaks in this business and what to look at first. */
  focus: string;
  blocks: Block[];
  metrics: Metric[];
  leaks: LeakDef[];
  documents: string[];
}

// ---------- shared by every playbook ----------
const COMMON_METRICS: Metric[] = [
  { key: 'ingresosAhora', label: 'Ventas del último mes', unit: 'clp' },
  { key: 'ingresosAntes', label: 'Ventas del mismo mes, hace un año', unit: 'clp' },
  { key: 'sueldosMes', label: 'Sueldos del mes (total)', unit: 'clp' },
  { key: 'horasOficina', label: 'Horas a la semana en papeleo y tareas repetitivas', unit: 'h' },
  { key: 'costoHoraOficina', label: 'Costo de una hora de esa persona', unit: 'clp' },
];

const opening = (who: string): Block => ({
  title: 'La empresa y el dolor',
  minutes: 8,
  questions: [
    { q: `Cuénteme de la empresa: ¿qué hacen y para quién?`, fallback: '¿Quiénes son sus 3 clientes más importantes?' },
    { q: `¿Cuántas personas trabajan con usted?`, fallback: `¿Cuántas personas recibieron sueldo el mes pasado?` },
    { q: `¿Qué es lo que más le preocupa hoy del negocio?`, fallback: `Si pudiera arreglar una sola cosa mañana, ¿cuál sería?` },
    { q: `¿Desde cuándo nota que la cosa cambió?`, fallback: `¿Hace un año le alcanzaba más a fin de mes que ahora?` },
    { q: `¿Cómo sabe hoy si ${who}?`, fallback: '¿Dónde anota lo importante? ¿Cuaderno, Excel, WhatsApp, el contador?' },
  ],
});

const office: Block = {
  title: 'La oficina',
  minutes: 5,
  questions: [
    {
      q: '¿Quién hace el papeleo (facturas, cobranza, sueldos, planillas)? ¿Cuánto tiempo le toma?',
      fallback: '¿Hay alguien que pasa el día entero en eso? ¿Medio día?',
      metrics: ['horasOficina', 'costoHoraOficina'],
    },
    { q: '¿Qué tarea de oficina le parece una pérdida de tiempo?', fallback: '¿Qué le pide siempre a la misma persona, todas las semanas?' },
  ],
};

const numbers: Block = {
  title: 'Los números (si los tiene a mano)',
  minutes: 5,
  questions: [
    {
      q: '¿Cuánto vendió el mes pasado? ¿Y el mismo mes del año pasado?',
      fallback: 'No se preocupe: su contador lo saca del SII. Se lo pido por correo después.',
      metrics: ['ingresosAhora', 'ingresosAntes'],
    },
    { q: '¿Cuánto paga en sueldos al mes?', fallback: 'Lo tiene el contador en el libro de remuneraciones.', metrics: ['sueldosMes'] },
  ],
};

const closing: Block = {
  title: 'Cierre',
  minutes: 4,
  questions: [
    { q: 'Le resumo lo que entendí… ¿me faltó algo importante?' },
    { q: '¿Quién más decide si invierten en esto?', fallback: '¿Lo conversa con algún socio o con su contador?' },
    { q: 'Le enviaré un PDF y un video explicándolo. ¿A qué correo?' },
    { q: 'Para afinar los números, le pediré algunos documentos a usted o a su contador. ¿Le parece?' },
  ],
};

const COMMON_LEAKS: LeakDef[] = [
  {
    key: 'oficina',
    label: 'Papeleo y tareas repetitivas',
    kind: 'perdida',
    explain: 'horas a la semana × costo por hora × 4,33 semanas',
    uses: ['horasOficina', 'costoHoraOficina'],
    calc: (m) => m('horasOficina') * m('costoHoraOficina') * 4.33,
  },
  {
    key: 'caidaIngresos',
    label: 'Caída de ventas frente al año pasado',
    kind: 'contexto',
    explain: 'ventas del mismo mes hace un año − ventas del último mes',
    uses: ['ingresosAntes', 'ingresosAhora'],
    calc: (m) => Math.max(0, m('ingresosAntes') - m('ingresosAhora')),
  },
];

const COMMON_DOCS = [
  'Ventas mes a mes de los últimos 24 meses (su contador las saca del SII: Registro de Compras y Ventas)',
  'Libro de remuneraciones del último mes',
];

const make = (p: Omit<Playbook, 'blocks' | 'metrics' | 'leaks' | 'documents'> & { who: string; specific: Block[]; metrics: Metric[]; leaks: LeakDef[]; documents: string[] }): Playbook => ({
  id: p.id,
  name: p.name,
  focus: p.focus,
  blocks: [opening(p.who), ...p.specific, office, numbers, closing],
  metrics: [...p.metrics, ...COMMON_METRICS],
  leaks: [...p.leaks, ...COMMON_LEAKS],
  documents: [...COMMON_DOCS, ...p.documents],
});

// ---------- playbooks ----------
export const PLAYBOOKS: Playbook[] = [
  make({
    id: 'transporte-y-flotas',
    name: 'Transporte y flotas',
    who: 'un camión le da plata o le cuesta',
    focus:
      'En transporte la plata se pierde en camiones parados, retornos vacíos, esperas en carga y descarga, petróleo y clientes que pagan tarde. Muchos dueños no tienen visibilidad por camión: si faltan datos, la etapa 1 debe ser ver los números (viajes, ingresos y costos por camión) antes de automatizar.',
    specific: [
      {
        title: 'Los camiones',
        minutes: 12,
        questions: [
          { q: '¿Cuántos camiones tiene en total?', metrics: ['camiones'] },
          { q: '¿Cuántos están parados hoy? ¿Por qué? (mantención, sin chofer, sin carga)', fallback: '¿Y la semana pasada, cuántos no salieron?', metrics: ['camionesParados'] },
          { q: '¿Cuántos viajes hace un camión al mes?', fallback: '¿Cuántos viajes hizo el camión más ocupado el mes pasado? ¿Y el más flojo?', metrics: ['viajesCamionMes'] },
          { q: '¿Cuánto le pagan por un viaje normal?', fallback: '¿Cuál fue el último viaje que facturó y por cuánto?', metrics: ['valorViaje'] },
          { q: '¿Los camiones vuelven cargados o vacíos?', fallback: 'De 10 viajes, ¿cuántos vuelven vacíos?', metrics: ['retornosVaciosPct'] },
          { q: '¿Cuánto espera un camión para cargar o descargar?', fallback: '¿Pierden la mañana esperando en bodega?', metrics: ['horasEspera', 'costoHoraCamion'] },
        ],
      },
      {
        title: 'Costos y cobranza',
        minutes: 6,
        questions: [
          { q: '¿Cuánto gasta en petróleo al mes? ¿Subió?', fallback: 'Viene en las facturas; se lo pido al contador.', metrics: ['petroleoMes'] },
          { q: '¿Cuánto se demoran sus clientes en pagarle?', fallback: '¿Hay facturas de hace 2 meses sin pagar?', metrics: ['diasPago'] },
        ],
      },
    ],
    metrics: [
      { key: 'camiones', label: 'Camiones en total', unit: 'n' },
      { key: 'camionesParados', label: 'Camiones parados', unit: 'n' },
      { key: 'viajesCamionMes', label: 'Viajes por camión al mes', unit: 'n' },
      { key: 'valorViaje', label: 'Valor de un viaje', unit: 'clp' },
      { key: 'retornosVaciosPct', label: 'Retornos vacíos (de cada 100 viajes)', unit: 'pct' },
      { key: 'valorRetornoPct', label: 'Valor de una carga de retorno (% de un viaje)', unit: 'pct', assumption: true },
      { key: 'horasEspera', label: 'Horas de espera por viaje', unit: 'h' },
      { key: 'costoHoraCamion', label: 'Costo de una hora de camión con chofer', unit: 'clp' },
      { key: 'petroleoMes', label: 'Petróleo al mes', unit: 'clp' },
      { key: 'diasPago', label: 'Días que tardan en pagarle', unit: 'dias' },
    ],
    leaks: [
      {
        key: 'parados',
        label: 'Camiones parados',
        kind: 'perdida',
        explain: 'camiones parados × viajes al mes × valor del viaje',
        uses: ['camionesParados', 'viajesCamionMes', 'valorViaje'],
        calc: (m) => m('camionesParados') * m('viajesCamionMes') * m('valorViaje'),
      },
      {
        key: 'retornos',
        label: 'Retornos vacíos',
        kind: 'perdida',
        explain: 'viajes al mes × % que vuelve vacío × valor de una carga de retorno',
        uses: ['camiones', 'camionesParados', 'viajesCamionMes', 'retornosVaciosPct', 'valorViaje', 'valorRetornoPct'],
        calc: (m) =>
          Math.max(0, m('camiones') - m('camionesParados')) * m('viajesCamionMes') * (m('retornosVaciosPct') / 100) * m('valorViaje') * (m('valorRetornoPct') / 100),
      },
      {
        key: 'espera',
        label: 'Esperas en carga y descarga',
        kind: 'perdida',
        explain: 'horas de espera × viajes al mes × costo por hora de camión con chofer',
        uses: ['horasEspera', 'camiones', 'camionesParados', 'viajesCamionMes', 'costoHoraCamion'],
        calc: (m) => m('horasEspera') * Math.max(0, m('camiones') - m('camionesParados')) * m('viajesCamionMes') * m('costoHoraCamion'),
      },
      {
        key: 'cobranza',
        label: 'Plata atrapada en clientes que pagan tarde',
        kind: 'caja',
        explain: 'ventas del mes × días de atraso sobre 30 ÷ 30 (no es pérdida: es plata que financia a sus clientes)',
        uses: ['ingresosAhora', 'diasPago'],
        calc: (m) => (m('ingresosAhora') * Math.max(0, m('diasPago') - 30)) / 30,
      },
    ],
    documents: [
      'Gastos de petróleo y mantención por camión (facturas o planilla)',
      'Lista de clientes con su plazo de pago real',
      'Cualquier registro de viajes (cuaderno, planilla, guías de despacho)',
    ],
  }),

  make({
    id: 'clinicas-y-salud',
    name: 'Clínicas y salud',
    who: 'la agenda está llena o tiene horas vacías',
    focus:
      'En salud la plata se pierde en horas de agenda vacías, pacientes que no llegan, presupuestos de tratamientos que no se concretan y recepción saturada respondiendo lo mismo. Nunca automatizar indicaciones clínicas; respetar la Ley 19.628 y la 21.719.',
    specific: [
      {
        title: 'La agenda',
        minutes: 10,
        questions: [
          { q: '¿Cuántas horas de atención tienen disponibles al mes, sumando a todos los profesionales?', fallback: '¿Cuántos profesionales atienden y cuántas horas a la semana cada uno?', metrics: ['horasAgendaMes'] },
          { q: '¿Qué tan llena está la agenda?', fallback: 'De 10 horas disponibles, ¿cuántas se ocupan?', metrics: ['ocupacionPct'] },
          { q: '¿Cuánto cobra en promedio por una hora de atención?', fallback: '¿Cuánto cuesta la consulta más común?', metrics: ['valorAtencion'] },
          { q: '¿Cuántos pacientes no llegan a su hora al mes?', fallback: '¿Cuántos faltaron la semana pasada?', metrics: ['inasistenciasMes'] },
        ],
      },
      {
        title: 'Presupuestos y recepción',
        minutes: 8,
        questions: [
          { q: '¿Cuántos presupuestos de tratamiento entregan al mes y de cuánto en promedio?', fallback: '¿Cuál fue el último presupuesto grande que entregaron?', metrics: ['presupuestosMes', 'valorPresupuesto'] },
          { q: '¿Cuántos de esos presupuestos se concretan?', fallback: 'De 10 presupuestos, ¿cuántos vuelven a tratarse?', metrics: ['cierrePresupuestoPct'] },
          { q: '¿Cuántos mensajes y llamadas reciben al día? ¿Cuánto toma cada uno?', fallback: '¿Recepción alcanza a almorzar tranquila?', metrics: ['consultasDia', 'minutosConsulta'] },
        ],
      },
    ],
    metrics: [
      { key: 'horasAgendaMes', label: 'Horas de atención disponibles al mes', unit: 'h' },
      { key: 'ocupacionPct', label: 'Ocupación de la agenda', unit: 'pct' },
      { key: 'valorAtencion', label: 'Valor de una hora de atención', unit: 'clp' },
      { key: 'inasistenciasMes', label: 'Pacientes que no llegan al mes', unit: 'n' },
      { key: 'presupuestosMes', label: 'Presupuestos entregados al mes', unit: 'n' },
      { key: 'valorPresupuesto', label: 'Valor promedio de un presupuesto', unit: 'clp' },
      { key: 'cierrePresupuestoPct', label: 'Presupuestos que se concretan', unit: 'pct' },
      { key: 'consultasDia', label: 'Mensajes y llamadas al día', unit: 'n' },
      { key: 'minutosConsulta', label: 'Minutos por mensaje o llamada', unit: 'n' },
    ],
    leaks: [
      {
        key: 'agendaVacia',
        label: 'Horas de agenda vacías',
        kind: 'perdida',
        explain: 'horas disponibles × % sin ocupar × valor de una hora',
        uses: ['horasAgendaMes', 'ocupacionPct', 'valorAtencion'],
        calc: (m) => m('horasAgendaMes') * (Math.max(0, 100 - m('ocupacionPct')) / 100) * m('valorAtencion'),
      },
      {
        key: 'inasistencias',
        label: 'Pacientes que no llegan',
        kind: 'perdida',
        explain: 'inasistencias al mes × valor de una atención',
        uses: ['inasistenciasMes', 'valorAtencion'],
        calc: (m) => m('inasistenciasMes') * m('valorAtencion'),
      },
      {
        key: 'presupuestos',
        label: 'Presupuestos que no se concretan',
        kind: 'perdida',
        explain: 'presupuestos al mes × valor × % que no vuelve',
        uses: ['presupuestosMes', 'valorPresupuesto', 'cierrePresupuestoPct'],
        calc: (m) => m('presupuestosMes') * m('valorPresupuesto') * (Math.max(0, 100 - m('cierrePresupuestoPct')) / 100),
      },
      {
        key: 'recepcion',
        label: 'Recepción respondiendo lo mismo',
        kind: 'perdida',
        explain: 'mensajes al día × minutos ÷ 60 × 22 días × costo por hora',
        uses: ['consultasDia', 'minutosConsulta', 'costoHoraOficina'],
        calc: (m) => ((m('consultasDia') * m('minutosConsulta')) / 60) * 22 * m('costoHoraOficina'),
      },
    ],
    documents: ['Reporte de agenda del último mes (ocupación e inasistencias) desde su software', 'Lista de presupuestos entregados en los últimos 3 meses y cuáles se concretaron'],
  }),

  make({
    id: 'inmobiliarias',
    name: 'Inmobiliarias y corredoras',
    who: 'un interesado termina comprando o se pierde',
    focus:
      'En inmobiliario la plata se pierde en leads que se responden tarde o nunca, seguimiento olvidado y visitas que no se concretan. El que responde primero suele quedarse con el cliente.',
    specific: [
      {
        title: 'Los interesados',
        minutes: 12,
        questions: [
          { q: '¿Cuántos interesados le llegan al mes (portales, redes, WhatsApp)?', fallback: '¿Cuántos mensajes de interesados recibió la semana pasada?', metrics: ['leadsMes'] },
          { q: '¿Cuánto se demora en responderle a un interesado?', fallback: 'Si llega un mensaje un sábado en la noche, ¿cuándo se responde?' },
          { q: '¿Cuántos interesados se quedan sin respuesta o sin seguimiento?', fallback: 'De 10 interesados, ¿a cuántos se les vuelve a escribir?', metrics: ['leadsPerdidosPct'] },
          { q: '¿De cada 100 interesados, cuántos terminan comprando o arrendando?', fallback: '¿Cuántas ventas cerró el mes pasado y cuántos interesados tuvo?', metrics: ['conversionPct'] },
          { q: '¿Cuánto gana usted por una venta o arriendo cerrado?', fallback: '¿Cuál fue su última comisión?', metrics: ['ingresoPorCierre'] },
        ],
      },
    ],
    metrics: [
      { key: 'leadsMes', label: 'Interesados al mes', unit: 'n' },
      { key: 'leadsPerdidosPct', label: 'Interesados sin respuesta o seguimiento', unit: 'pct' },
      { key: 'conversionPct', label: 'Interesados que terminan cerrando', unit: 'pct' },
      { key: 'ingresoPorCierre', label: 'Ingreso por venta o arriendo cerrado', unit: 'clp' },
    ],
    leaks: [
      {
        key: 'leadsPerdidos',
        label: 'Interesados que se pierden sin respuesta',
        kind: 'perdida',
        explain: 'interesados al mes × % sin seguimiento × % que habría cerrado × ingreso por cierre',
        uses: ['leadsMes', 'leadsPerdidosPct', 'conversionPct', 'ingresoPorCierre'],
        calc: (m) => m('leadsMes') * (m('leadsPerdidosPct') / 100) * (m('conversionPct') / 100) * m('ingresoPorCierre'),
      },
    ],
    documents: ['Exportación de leads de los portales de los últimos 3 meses', 'Lista de cierres del último año con su origen'],
  }),

  make({
    id: 'retail-y-ecommerce',
    name: 'Retail y e-commerce',
    who: 'un producto se vende o se queda en bodega',
    focus:
      'En comercio la plata se pierde en consultas sin respuesta rápida, carritos abandonados, productos sin stock y stock desalineado entre canales.',
    specific: [
      {
        title: 'Ventas y clientes',
        minutes: 12,
        questions: [
          { q: '¿Cuántas personas dejan una compra a medias en la web al mes? ¿De cuánto?', fallback: '¿Su plataforma le muestra "carritos abandonados"?', metrics: ['carritosMes', 'valorCarrito'] },
          { q: '¿Cuántos mensajes de clientes reciben al día (WhatsApp, Instagram)? ¿Cuánto toma cada uno?', fallback: '¿Alguien pasa el día respondiendo stock y tallas?', metrics: ['consultasDia', 'minutosConsulta'] },
          { q: '¿Cuánto calcula que deja de vender al mes por no tener stock?', fallback: '¿Cuántas veces a la semana tiene que decir "no queda"?', metrics: ['ventaPerdidaStock'] },
        ],
      },
    ],
    metrics: [
      { key: 'carritosMes', label: 'Compras abandonadas al mes', unit: 'n' },
      { key: 'valorCarrito', label: 'Valor promedio de una compra', unit: 'clp' },
      { key: 'recuperablePct', label: 'Compras abandonadas que se pueden recuperar', unit: 'pct', assumption: true },
      { key: 'consultasDia', label: 'Mensajes de clientes al día', unit: 'n' },
      { key: 'minutosConsulta', label: 'Minutos por mensaje', unit: 'n' },
      { key: 'ventaPerdidaStock', label: 'Ventas perdidas por falta de stock al mes', unit: 'clp' },
    ],
    leaks: [
      {
        key: 'carritos',
        label: 'Compras que quedan a medias',
        kind: 'perdida',
        explain: 'compras abandonadas × valor × % recuperable',
        uses: ['carritosMes', 'valorCarrito', 'recuperablePct'],
        calc: (m) => m('carritosMes') * m('valorCarrito') * (m('recuperablePct') / 100),
      },
      {
        key: 'stock',
        label: 'Ventas perdidas por falta de stock',
        kind: 'perdida',
        explain: 'estimación del cliente',
        uses: ['ventaPerdidaStock'],
        calc: (m) => m('ventaPerdidaStock'),
      },
      {
        key: 'atencion',
        label: 'Tiempo respondiendo mensajes repetidos',
        kind: 'perdida',
        explain: 'mensajes al día × minutos ÷ 60 × 26 días × costo por hora',
        uses: ['consultasDia', 'minutosConsulta', 'costoHoraOficina'],
        calc: (m) => ((m('consultasDia') * m('minutosConsulta')) / 60) * 26 * m('costoHoraOficina'),
      },
    ],
    documents: ['Reporte de ventas y carritos abandonados de su plataforma (últimos 3 meses)', 'Inventario actual por canal (tienda, web, marketplaces)'],
  }),

  make({
    id: 'estudios-profesionales',
    name: 'Estudios contables y jurídicos',
    who: 'el tiempo de su equipo se está cobrando',
    focus:
      'En servicios profesionales la plata se pierde en horas que no se facturan (pedir documentos, digitar, recordar plazos), clientes que pagan tarde y multas por plazos vencidos. La revisión profesional nunca se automatiza.',
    specific: [
      {
        title: 'El tiempo del equipo',
        minutes: 12,
        questions: [
          { q: '¿Cuántas horas a la semana se van en pedir documentos, digitar y ordenar?', fallback: '¿Cuánto del día de un analista es "perseguir papeles"?', metrics: ['horasNoFacturadas'] },
          { q: '¿Cuánto vale una hora de su equipo para el cliente?', fallback: '¿Cuánto cobra por una asesoría de una hora?', metrics: ['valorHoraProfesional'] },
          { q: '¿Han tenido multas o recargos por plazos vencidos? ¿Cuánto al mes?', fallback: '¿Recuerda la última vez que se les pasó un plazo?', metrics: ['multasMes'] },
          { q: '¿Cuánto se demoran sus clientes en pagarle?', fallback: '¿Cuánto le deben hoy en facturas vencidas?', metrics: ['diasPago'] },
        ],
      },
    ],
    metrics: [
      { key: 'horasNoFacturadas', label: 'Horas a la semana que no se cobran', unit: 'h' },
      { key: 'valorHoraProfesional', label: 'Valor de una hora profesional', unit: 'clp' },
      { key: 'multasMes', label: 'Multas o recargos por plazos al mes', unit: 'clp' },
      { key: 'diasPago', label: 'Días que tardan en pagarle', unit: 'dias' },
    ],
    leaks: [
      {
        key: 'horasNoFacturadas',
        label: 'Horas profesionales que no se cobran',
        kind: 'perdida',
        explain: 'horas a la semana × valor de la hora × 4,33',
        uses: ['horasNoFacturadas', 'valorHoraProfesional'],
        calc: (m) => m('horasNoFacturadas') * m('valorHoraProfesional') * 4.33,
      },
      { key: 'multas', label: 'Multas por plazos vencidos', kind: 'perdida', explain: 'estimación del cliente', uses: ['multasMes'], calc: (m) => m('multasMes') },
      {
        key: 'cobranza',
        label: 'Plata atrapada en clientes que pagan tarde',
        kind: 'caja',
        explain: 'ventas del mes × días de atraso sobre 30 ÷ 30',
        uses: ['ingresosAhora', 'diasPago'],
        calc: (m) => (m('ingresosAhora') * Math.max(0, m('diasPago') - 30)) / 30,
      },
    ],
    documents: ['Lista de clientes activos con sus servicios y plazos', 'Facturas emitidas e impagas de los últimos 6 meses'],
  }),

  make({
    id: 'educacion',
    name: 'Educación',
    who: 'un postulante termina matriculándose',
    focus:
      'En educación la plata se pierde en postulantes que no se matriculan por falta de respuesta o seguimiento, morosidad y equipos administrativos saturados en admisión y cobranza. Cuidar datos de menores.',
    specific: [
      {
        title: 'Admisión y cobranza',
        minutes: 12,
        questions: [
          { q: '¿Cuántas personas consultan o postulan al mes en temporada?', fallback: '¿Cuántas consultas recibieron la semana pasada?', metrics: ['postulantesMes'] },
          { q: '¿Cuántas terminan matriculándose?', fallback: 'De 10 que consultan, ¿cuántos se matriculan?', metrics: ['matriculaPct'] },
          { q: '¿Cuánto es el arancel o mensualidad?', metrics: ['arancel'] },
          { q: '¿Cuántos alumnos tienen y qué porcentaje paga atrasado?', fallback: '¿Cuántos apoderados deben más de un mes?', metrics: ['alumnos', 'morosidadPct'] },
        ],
      },
    ],
    metrics: [
      { key: 'postulantesMes', label: 'Postulantes o consultas al mes', unit: 'n' },
      { key: 'matriculaPct', label: 'Postulantes que se matriculan', unit: 'pct' },
      { key: 'recuperablePct', label: 'Postulantes no matriculados que se podrían recuperar', unit: 'pct', assumption: true },
      { key: 'arancel', label: 'Arancel mensual', unit: 'clp' },
      { key: 'alumnos', label: 'Alumnos activos', unit: 'n' },
      { key: 'morosidadPct', label: 'Alumnos con pagos atrasados', unit: 'pct' },
    ],
    leaks: [
      {
        key: 'postulantes',
        label: 'Postulantes que no se matriculan',
        kind: 'perdida',
        explain: 'postulantes no matriculados × % recuperable × arancel mensual',
        uses: ['postulantesMes', 'matriculaPct', 'recuperablePct', 'arancel'],
        calc: (m) => m('postulantesMes') * (Math.max(0, 100 - m('matriculaPct')) / 100) * (m('recuperablePct') / 100) * m('arancel'),
      },
      {
        key: 'morosidad',
        label: 'Mensualidades atrasadas',
        kind: 'caja',
        explain: 'alumnos × % con atraso × arancel',
        uses: ['alumnos', 'morosidadPct', 'arancel'],
        calc: (m) => m('alumnos') * (m('morosidadPct') / 100) * m('arancel'),
      },
    ],
    documents: ['Postulantes y matriculados del último proceso de admisión', 'Informe de morosidad actual'],
  }),

  make({
    id: 'mineria',
    name: 'Minería y proveedores',
    who: 'un equipo está produciendo o detenido',
    focus:
      'En minería y sus proveedores la plata se pierde en detenciones no planificadas, reportes de turno armados a mano y control documental de contratistas. La seguridad va primero: la IA apoya, no reemplaza protocolos.',
    specific: [
      {
        title: 'Equipos y reportes',
        minutes: 12,
        questions: [
          { q: '¿Cuántas horas al mes se detienen los equipos sin estar planificado?', fallback: '¿Cuándo fue la última falla que paró la operación y cuánto duró?', metrics: ['horasDetencion'] },
          { q: '¿Cuánto cuesta una hora de equipo detenido?', fallback: '¿Cuánto deja de producir o facturar en una hora parado?', metrics: ['costoHoraDetencion'] },
          { q: '¿Cuántas horas a la semana se van en reportes de turno y control de contratistas?', fallback: '¿Quién arma los reportes y cuánto se demora?', metrics: ['horasReportes'] },
        ],
      },
    ],
    metrics: [
      { key: 'horasDetencion', label: 'Horas de detención no planificada al mes', unit: 'h' },
      { key: 'costoHoraDetencion', label: 'Costo de una hora detenido', unit: 'clp' },
      { key: 'horasReportes', label: 'Horas a la semana en reportes y documentos', unit: 'h' },
    ],
    leaks: [
      {
        key: 'detenciones',
        label: 'Detenciones no planificadas',
        kind: 'perdida',
        explain: 'horas detenido al mes × costo por hora',
        uses: ['horasDetencion', 'costoHoraDetencion'],
        calc: (m) => m('horasDetencion') * m('costoHoraDetencion'),
      },
      {
        key: 'reportes',
        label: 'Reportes y documentos a mano',
        kind: 'perdida',
        explain: 'horas a la semana × costo por hora × 4,33',
        uses: ['horasReportes', 'costoHoraOficina'],
        calc: (m) => m('horasReportes') * m('costoHoraOficina') * 4.33,
      },
    ],
    documents: ['Registro de detenciones de los últimos 6 meses', 'Ejemplo de reporte de turno actual'],
  }),

  make({
    id: 'seguros',
    name: 'Seguros',
    who: 'una póliza se renueva o se pierde',
    focus:
      'En seguros la plata se pierde en renovaciones que se escapan por falta de seguimiento, cotizaciones lentas y siniestros revisados a mano. Las decisiones sobre siniestros siempre las toma una persona.',
    specific: [
      {
        title: 'Pólizas y siniestros',
        minutes: 12,
        questions: [
          { q: '¿Cuántas pólizas vencen al mes?', fallback: '¿Cuántas renovaciones gestionó el mes pasado?', metrics: ['renovacionesMes'] },
          { q: '¿Cuántas no se renuevan?', fallback: 'De 10 que vencen, ¿cuántas se pierden?', metrics: ['renovacionesPerdidasPct'] },
          { q: '¿Cuánto gana por póliza al año?', fallback: '¿Cuál es la comisión de una póliza típica?', metrics: ['comisionPoliza'] },
          { q: '¿Cuántos siniestros gestionan al mes y cuántas horas toma cada uno?', fallback: '¿Cuánto se demoró el último siniestro?', metrics: ['siniestrosMes', 'horasSiniestro'] },
        ],
      },
    ],
    metrics: [
      { key: 'renovacionesMes', label: 'Pólizas que vencen al mes', unit: 'n' },
      { key: 'renovacionesPerdidasPct', label: 'Pólizas que no se renuevan', unit: 'pct' },
      { key: 'comisionPoliza', label: 'Ingreso anual por póliza', unit: 'clp' },
      { key: 'siniestrosMes', label: 'Siniestros al mes', unit: 'n' },
      { key: 'horasSiniestro', label: 'Horas por siniestro', unit: 'h' },
    ],
    leaks: [
      {
        key: 'renovaciones',
        label: 'Renovaciones que se pierden',
        kind: 'perdida',
        explain: 'pólizas que vencen × % no renovado × ingreso anual ÷ 12',
        uses: ['renovacionesMes', 'renovacionesPerdidasPct', 'comisionPoliza'],
        calc: (m) => m('renovacionesMes') * (m('renovacionesPerdidasPct') / 100) * (m('comisionPoliza') / 12),
      },
      {
        key: 'siniestros',
        label: 'Tiempo revisando siniestros a mano',
        kind: 'perdida',
        explain: 'siniestros × horas × costo por hora',
        uses: ['siniestrosMes', 'horasSiniestro', 'costoHoraOficina'],
        calc: (m) => m('siniestrosMes') * m('horasSiniestro') * m('costoHoraOficina'),
      },
    ],
    documents: ['Cartera de pólizas con fecha de vencimiento', 'Siniestros del último semestre con tiempos de gestión'],
  }),

  make({
    id: 'banca-y-finanzas',
    name: 'Banca y finanzas',
    who: 'una solicitud se concreta o se abandona',
    focus:
      'En servicios financieros la plata se pierde en solicitudes que se abandonan por evaluaciones lentas, revisión documental manual y cartera morosa. Trazabilidad y supervisión humana son obligatorias (CMF).',
    specific: [
      {
        title: 'Solicitudes y cartera',
        minutes: 12,
        questions: [
          { q: '¿Cuántas solicitudes reciben al mes?', metrics: ['solicitudesMes'] },
          { q: '¿Cuántas se abandonan antes de aprobarse?', fallback: 'De 10 solicitudes, ¿cuántas desaparecen a mitad de camino?', metrics: ['abandonoPct'] },
          { q: '¿Cuánto gana por cada crédito o producto colocado?', metrics: ['margenPorColocacion'] },
          { q: '¿Cuántas horas toma revisar los documentos de una solicitud?', metrics: ['horasRevision'] },
          { q: '¿Cuánto hay hoy en cartera morosa?', metrics: ['carteraMora'] },
        ],
      },
    ],
    metrics: [
      { key: 'solicitudesMes', label: 'Solicitudes al mes', unit: 'n' },
      { key: 'abandonoPct', label: 'Solicitudes abandonadas', unit: 'pct' },
      { key: 'margenPorColocacion', label: 'Ingreso por colocación', unit: 'clp' },
      { key: 'horasRevision', label: 'Horas de revisión por solicitud', unit: 'h' },
      { key: 'carteraMora', label: 'Cartera morosa', unit: 'clp' },
    ],
    leaks: [
      {
        key: 'abandono',
        label: 'Solicitudes que se abandonan',
        kind: 'perdida',
        explain: 'solicitudes × % abandonado × ingreso por colocación',
        uses: ['solicitudesMes', 'abandonoPct', 'margenPorColocacion'],
        calc: (m) => m('solicitudesMes') * (m('abandonoPct') / 100) * m('margenPorColocacion'),
      },
      {
        key: 'revision',
        label: 'Revisión documental manual',
        kind: 'perdida',
        explain: 'solicitudes × horas de revisión × costo por hora',
        uses: ['solicitudesMes', 'horasRevision', 'costoHoraOficina'],
        calc: (m) => m('solicitudesMes') * m('horasRevision') * m('costoHoraOficina'),
      },
      { key: 'mora', label: 'Cartera morosa', kind: 'caja', explain: 'monto informado', uses: ['carteraMora'], calc: (m) => m('carteraMora') },
    ],
    documents: ['Embudo de solicitudes de los últimos 6 meses', 'Informe de cartera y morosidad'],
  }),

  make({
    id: 'alimentacion-y-restaurantes',
    name: 'Alimentación y restaurantes',
    who: 'un plato o producto deja plata',
    focus:
      'En alimentación la plata se pierde en mermas, reservas que no llegan, pedidos que no se alcanzan a tomar y compras a proveedores hechas de memoria. Información de alérgenos siempre oficial.',
    specific: [
      {
        title: 'Ventas, reservas y mermas',
        minutes: 12,
        questions: [
          { q: '¿Cuánto compra en insumos al mes?', fallback: '¿Cuánto le pagó a sus proveedores el mes pasado?', metrics: ['comprasMes'] },
          { q: '¿Cuánto se bota o se pierde?', fallback: 'De cada 100 pesos que compra, ¿cuántos terminan en la basura?', metrics: ['mermaPct'] },
          { q: '¿Cuántas reservas no llegan al mes y cuánto gasta una mesa?', fallback: '¿Cuántas mesas quedaron vacías el último fin de semana por reservas que no llegaron?', metrics: ['noShowMes', 'ticketMesa'] },
          { q: '¿Cuántos pedidos por WhatsApp o teléfono se pierden porque nadie alcanza a contestar?', fallback: '¿En la hora punta, cuántos mensajes quedan sin respuesta?', metrics: ['pedidosPerdidosSemana', 'ticketPedido'] },
        ],
      },
    ],
    metrics: [
      { key: 'comprasMes', label: 'Compras de insumos al mes', unit: 'clp' },
      { key: 'mermaPct', label: 'Merma', unit: 'pct' },
      { key: 'noShowMes', label: 'Reservas que no llegan al mes', unit: 'n' },
      { key: 'ticketMesa', label: 'Gasto promedio por mesa', unit: 'clp' },
      { key: 'pedidosPerdidosSemana', label: 'Pedidos sin respuesta a la semana', unit: 'n' },
      { key: 'ticketPedido', label: 'Valor promedio de un pedido', unit: 'clp' },
    ],
    leaks: [
      { key: 'merma', label: 'Mermas', kind: 'perdida', explain: 'compras × % de merma', uses: ['comprasMes', 'mermaPct'], calc: (m) => m('comprasMes') * (m('mermaPct') / 100) },
      { key: 'noShow', label: 'Reservas que no llegan', kind: 'perdida', explain: 'reservas no llegadas × gasto por mesa', uses: ['noShowMes', 'ticketMesa'], calc: (m) => m('noShowMes') * m('ticketMesa') },
      {
        key: 'pedidos',
        label: 'Pedidos que no se alcanzan a tomar',
        kind: 'perdida',
        explain: 'pedidos perdidos a la semana × 4,33 × valor del pedido',
        uses: ['pedidosPerdidosSemana', 'ticketPedido'],
        calc: (m) => m('pedidosPerdidosSemana') * 4.33 * m('ticketPedido'),
      },
    ],
    documents: ['Ventas por día del último mes desde la caja', 'Facturas de proveedores del último mes'],
  }),

  make({
    id: 'turismo-y-hoteleria',
    name: 'Turismo y hotelería',
    who: 'una habitación o un tour se está vendiendo',
    focus:
      'En turismo la plata se pierde en habitaciones o cupos vacíos, consultas en otros idiomas que no se responden a tiempo y comisiones altas de agencias en línea que se podrían bajar con reservas directas.',
    specific: [
      {
        title: 'Ocupación y reservas',
        minutes: 12,
        questions: [
          { q: '¿Cuántas habitaciones o cupos tiene y qué tan llenos están?', fallback: '¿Cuántas noches del mes pasado tuvo habitaciones vacías?', metrics: ['habitaciones', 'ocupacionPct'] },
          { q: '¿Cuánto cobra por noche en promedio?', metrics: ['tarifa'] },
          { q: '¿Cuánto vende al mes por Booking, Airbnb u otras agencias? ¿Qué comisión le cobran?', fallback: '¿Cuánto le descontaron en comisiones el mes pasado?', metrics: ['ventasOTA', 'comisionOTAPct'] },
          { q: '¿Cuántas consultas quedan sin respuesta rápida al mes?', fallback: '¿Qué pasa con los mensajes que llegan de noche?', metrics: ['consultasPerdidas', 'valorReserva'] },
        ],
      },
    ],
    metrics: [
      { key: 'habitaciones', label: 'Habitaciones o cupos', unit: 'n' },
      { key: 'ocupacionPct', label: 'Ocupación', unit: 'pct' },
      { key: 'tarifa', label: 'Tarifa promedio por noche', unit: 'clp' },
      { key: 'ventasOTA', label: 'Ventas por agencias en línea al mes', unit: 'clp' },
      { key: 'comisionOTAPct', label: 'Comisión de las agencias', unit: 'pct' },
      { key: 'directaPct', label: 'Ventas de agencias que podrían pasar a directas', unit: 'pct', assumption: true },
      { key: 'consultasPerdidas', label: 'Consultas sin respuesta al mes', unit: 'n' },
      { key: 'valorReserva', label: 'Valor promedio de una reserva', unit: 'clp' },
      { key: 'conversionPct', label: 'Consultas que reservan', unit: 'pct' },
    ],
    leaks: [
      {
        key: 'comisiones',
        label: 'Comisiones que se podrían evitar',
        kind: 'perdida',
        explain: 'ventas por agencias × comisión × % que podría ser reserva directa',
        uses: ['ventasOTA', 'comisionOTAPct', 'directaPct'],
        calc: (m) => m('ventasOTA') * (m('comisionOTAPct') / 100) * (m('directaPct') / 100),
      },
      {
        key: 'consultas',
        label: 'Consultas que no se responden a tiempo',
        kind: 'perdida',
        explain: 'consultas sin respuesta × % que reserva × valor de la reserva',
        uses: ['consultasPerdidas', 'conversionPct', 'valorReserva'],
        calc: (m) => m('consultasPerdidas') * (m('conversionPct') / 100) * m('valorReserva'),
      },
      {
        key: 'vacias',
        label: 'Habitaciones vacías',
        kind: 'contexto',
        explain: 'habitaciones × 30 noches × % vacío × tarifa (no todo es recuperable)',
        uses: ['habitaciones', 'ocupacionPct', 'tarifa'],
        calc: (m) => m('habitaciones') * 30 * (Math.max(0, 100 - m('ocupacionPct')) / 100) * m('tarifa'),
      },
    ],
    documents: ['Reporte de ocupación y canales de venta de los últimos 12 meses', 'Liquidaciones de comisiones de agencias'],
  }),

  make({
    id: 'manufactura',
    name: 'Manufactura',
    who: 'la planta está produciendo bien',
    focus:
      'En manufactura la plata se pierde en detenciones no planificadas, productos defectuosos, quiebres de insumos que paran la línea y registros de producción en papel que llegan tarde a la gerencia.',
    specific: [
      {
        title: 'Producción',
        minutes: 12,
        questions: [
          { q: '¿Cuántas horas al mes se detiene la línea sin estar planificado?', fallback: '¿Cuándo fue la última detención y cuánto duró?', metrics: ['horasDetencion', 'costoHoraLinea'] },
          { q: '¿Qué porcentaje de lo que producen sale con defectos?', fallback: 'De 100 unidades, ¿cuántas se reprocesan o se botan?', metrics: ['rechazoPct'] },
          { q: '¿Cuánto cuesta producir al mes?', fallback: '¿Cuánto gasta en materias primas y producción?', metrics: ['costoProduccion'] },
          { q: '¿Cuántas horas a la semana se van en registrar producción a mano?', metrics: ['horasRegistro'] },
        ],
      },
    ],
    metrics: [
      { key: 'horasDetencion', label: 'Horas de detención no planificada al mes', unit: 'h' },
      { key: 'costoHoraLinea', label: 'Costo de una hora de línea detenida', unit: 'clp' },
      { key: 'rechazoPct', label: 'Productos con defectos', unit: 'pct' },
      { key: 'costoProduccion', label: 'Costo de producción al mes', unit: 'clp' },
      { key: 'horasRegistro', label: 'Horas a la semana registrando producción', unit: 'h' },
    ],
    leaks: [
      { key: 'detenciones', label: 'Detenciones no planificadas', kind: 'perdida', explain: 'horas detenido × costo por hora', uses: ['horasDetencion', 'costoHoraLinea'], calc: (m) => m('horasDetencion') * m('costoHoraLinea') },
      { key: 'rechazo', label: 'Productos defectuosos', kind: 'perdida', explain: 'costo de producción × % de defectos', uses: ['costoProduccion', 'rechazoPct'], calc: (m) => m('costoProduccion') * (m('rechazoPct') / 100) },
      {
        key: 'registro',
        label: 'Registro de producción a mano',
        kind: 'perdida',
        explain: 'horas a la semana × costo por hora × 4,33',
        uses: ['horasRegistro', 'costoHoraOficina'],
        calc: (m) => m('horasRegistro') * m('costoHoraOficina') * 4.33,
      },
    ],
    documents: ['Registro de producción y detenciones del último mes', 'Costos de producción mensuales del último año'],
  }),

  make({
    id: 'agro',
    name: 'Agro y agroindustria',
    who: 'cada campo o cuartel está rindiendo',
    focus:
      'En el agro la plata se pierde en mermas de cosecha, rechazos en exportación por falta de trazabilidad y horas de registro en papel. Las soluciones deben funcionar sin señal en el campo.',
    specific: [
      {
        title: 'Cosecha y trazabilidad',
        minutes: 12,
        questions: [
          { q: '¿Cuánto vale la cosecha de una temporada?', fallback: '¿Cuánto facturó la temporada pasada?', metrics: ['valorTemporada'] },
          { q: '¿Qué porcentaje se pierde entre el campo y la venta?', fallback: 'De 100 cajas, ¿cuántas no llegan a venderse?', metrics: ['mermaPct'] },
          { q: '¿Ha tenido rechazos o descuentos por documentación o trazabilidad? ¿Cuánto al año?', metrics: ['rechazosAnio'] },
          { q: '¿Cuántas horas a la semana se van en registrar labores, cosecha y personal?', metrics: ['horasRegistro'] },
        ],
      },
    ],
    metrics: [
      { key: 'valorTemporada', label: 'Valor de la cosecha por temporada', unit: 'clp' },
      { key: 'mermaPct', label: 'Merma entre campo y venta', unit: 'pct' },
      { key: 'rechazosAnio', label: 'Rechazos o descuentos al año', unit: 'clp' },
      { key: 'horasRegistro', label: 'Horas a la semana registrando en papel', unit: 'h' },
    ],
    leaks: [
      { key: 'merma', label: 'Merma de cosecha', kind: 'perdida', explain: 'valor de la temporada × % de merma ÷ 12', uses: ['valorTemporada', 'mermaPct'], calc: (m) => (m('valorTemporada') * (m('mermaPct') / 100)) / 12 },
      { key: 'rechazos', label: 'Rechazos por trazabilidad', kind: 'perdida', explain: 'rechazos al año ÷ 12', uses: ['rechazosAnio'], calc: (m) => m('rechazosAnio') / 12 },
      {
        key: 'registro',
        label: 'Registro en papel',
        kind: 'perdida',
        explain: 'horas a la semana × costo por hora × 4,33',
        uses: ['horasRegistro', 'costoHoraOficina'],
        calc: (m) => m('horasRegistro') * m('costoHoraOficina') * 4.33,
      },
    ],
    documents: ['Resultados de la última temporada por campo', 'Rechazos o descuentos de exportación del último año'],
  }),

  make({
    id: 'construccion',
    name: 'Construcción',
    who: 'una obra va en plazo y en presupuesto',
    focus:
      'En construcción la plata se pierde en atrasos (gastos generales que corren), sobrecostos que se detectan tarde, multas y control documental de subcontratos. La seguridad en obra no se delega.',
    specific: [
      {
        title: 'Obras',
        minutes: 12,
        questions: [
          { q: '¿Cuántas obras tiene en marcha?', metrics: ['obras'] },
          { q: '¿Cuántos días de atraso suman al mes entre todas las obras?', fallback: '¿La última obra terminó a tiempo? ¿Con cuántos días de atraso?', metrics: ['diasAtrasoMes'] },
          { q: '¿Cuánto le cuesta un día de obra (gastos generales, arriendos, supervisión)?', metrics: ['costoDiaObra'] },
          { q: '¿En cuánto se pasan del presupuesto, en porcentaje?', fallback: 'En la última obra, ¿cuánto gastó de más?', metrics: ['sobrecostoPct', 'ejecucionMes'] },
          { q: '¿Cuántas horas a la semana se van en documentos de subcontratos y trabajadores?', metrics: ['horasDocumental'] },
        ],
      },
    ],
    metrics: [
      { key: 'obras', label: 'Obras en marcha', unit: 'n' },
      { key: 'diasAtrasoMes', label: 'Días de atraso al mes (todas las obras)', unit: 'dias' },
      { key: 'costoDiaObra', label: 'Costo de un día de obra', unit: 'clp' },
      { key: 'sobrecostoPct', label: 'Sobrecosto sobre presupuesto', unit: 'pct' },
      { key: 'ejecucionMes', label: 'Monto ejecutado al mes', unit: 'clp' },
      { key: 'horasDocumental', label: 'Horas a la semana en documentos', unit: 'h' },
    ],
    leaks: [
      { key: 'atrasos', label: 'Atrasos de obra', kind: 'perdida', explain: 'días de atraso al mes × costo de un día de obra', uses: ['diasAtrasoMes', 'costoDiaObra'], calc: (m) => m('diasAtrasoMes') * m('costoDiaObra') },
      { key: 'sobrecosto', label: 'Sobrecostos', kind: 'perdida', explain: 'monto ejecutado al mes × % de sobrecosto', uses: ['ejecucionMes', 'sobrecostoPct'], calc: (m) => m('ejecucionMes') * (m('sobrecostoPct') / 100) },
      {
        key: 'documental',
        label: 'Control documental a mano',
        kind: 'perdida',
        explain: 'horas a la semana × costo por hora × 4,33',
        uses: ['horasDocumental', 'costoHoraOficina'],
        calc: (m) => m('horasDocumental') * m('costoHoraOficina') * 4.33,
      },
    ],
    documents: ['Avance y presupuesto vs. real de las obras en curso', 'Lista de subcontratos con sus documentos vigentes'],
  }),

  make({
    id: 'automotriz',
    name: 'Automotriz (venta y taller)',
    who: 'un cliente compra un auto o vuelve al taller',
    focus:
      'En una automotora la plata se pierde en cotizaciones de vehículos que nadie retoma, clientes que compran el auto y nunca vuelven al taller (la postventa suele ser lo más rentable), citas de taller que no llegan, autos usados parados en el patio y cobranza lenta a flotas y financieras. Cuidar los datos de clientes y patentes (Ley 21.719).',
    specific: [
      {
        title: 'Ventas de vehículos',
        minutes: 12,
        questions: [
          { q: '¿Cuántas cotizaciones o consultas por vehículos le llegan al mes (portales, redes, WhatsApp, sala de ventas)?', fallback: '¿Cuántas consultas recibió la semana pasada?', metrics: ['cotizacionesMes'] },
          { q: '¿Cuánto se demora un vendedor en responder una cotización nueva?', fallback: 'Si llega un mensaje un sábado en la noche, ¿cuándo se responde?' },
          { q: '¿Cuántas cotizaciones se quedan sin segundo contacto o sin seguimiento?', fallback: 'De 10 cotizaciones, ¿a cuántas se les vuelve a escribir?', metrics: ['cotizSinSeguimientoPct'] },
          { q: '¿De cada 100 cotizaciones, cuántas terminan en venta?', fallback: '¿Cuántos autos vendió el mes pasado y cuántas cotizaciones tuvo?', metrics: ['cierrePct'] },
          { q: '¿Cuánto gana la automotora por cada vehículo que vende?', fallback: '¿Cuál fue el margen del último auto que vendió?', metrics: ['margenPorVenta'] },
        ],
      },
      {
        title: 'Taller y postventa',
        minutes: 12,
        questions: [
          { q: '¿Cuántos clientes pasan por el taller al mes?', fallback: '¿Cuántas órdenes de trabajo abrieron la semana pasada?', metrics: ['clientesTallerMes'] },
          { q: '¿Cuántos no vuelven después de la primera mantención?', fallback: 'De 10 autos que vendió el año pasado, ¿cuántos vuelven a mantención con ustedes?', metrics: ['noVuelvenTallerPct'] },
          { q: '¿Cuánto deja en promedio una visita al taller (repuestos y mano de obra)?', fallback: '¿De cuánto fue la última boleta o factura del taller?', metrics: ['ticketTaller'] },
          { q: '¿Cuántas citas de taller se pierden al mes porque el cliente no llega?', fallback: '¿Cuántas horas de taller quedaron vacías la semana pasada?', metrics: ['citasNoLlegan'] },
        ],
      },
      {
        title: 'Usados y cobranza',
        minutes: 6,
        questions: [
          { q: '¿Cuántos autos usados llevan más de 90 días en el patio?', fallback: '¿Cuáles son los que nadie pregunta?', metrics: ['usadosInmovilizados'] },
          { q: '¿Cuánto cuesta mantener un auto parado al mes (financiamiento, patio, seguro)?', fallback: '¿Cuánto paga de interés por el stock?', metrics: ['costoUsadoParadoMes'] },
          { q: '¿Cuánto se demoran las empresas y financieras en pagarle?', fallback: '¿Hay facturas de flotas de hace 2 meses sin pagar?', metrics: ['diasPago'] },
        ],
      },
    ],
    metrics: [
      { key: 'cotizacionesMes', label: 'Cotizaciones de vehículos al mes', unit: 'n' },
      { key: 'cotizSinSeguimientoPct', label: 'Cotizaciones sin segundo contacto', unit: 'pct' },
      { key: 'cierrePct', label: 'Cotizaciones que terminan en venta', unit: 'pct' },
      { key: 'margenPorVenta', label: 'Margen por vehículo vendido', unit: 'clp' },
      { key: 'clientesTallerMes', label: 'Clientes que pasan por el taller al mes', unit: 'n' },
      { key: 'noVuelvenTallerPct', label: 'Clientes que no vuelven al taller', unit: 'pct' },
      { key: 'ticketTaller', label: 'Valor de una visita al taller', unit: 'clp' },
      { key: 'citasNoLlegan', label: 'Citas de taller que no llegan al mes', unit: 'n' },
      { key: 'usadosInmovilizados', label: 'Usados con más de 90 días en el patio', unit: 'n' },
      { key: 'costoUsadoParadoMes', label: 'Costo mensual de un auto parado', unit: 'clp' },
      { key: 'diasPago', label: 'Días que tardan en pagarle', unit: 'dias' },
    ],
    leaks: [
      {
        key: 'cotizaciones',
        label: 'Cotizaciones de vehículos sin seguimiento',
        kind: 'perdida',
        explain: 'cotizaciones al mes × % sin seguimiento × % que habría cerrado × margen por vehículo',
        uses: ['cotizacionesMes', 'cotizSinSeguimientoPct', 'cierrePct', 'margenPorVenta'],
        calc: (m) => m('cotizacionesMes') * (m('cotizSinSeguimientoPct') / 100) * (m('cierrePct') / 100) * m('margenPorVenta'),
      },
      {
        key: 'tallerNoVuelve',
        label: 'Clientes que no vuelven al taller',
        kind: 'perdida',
        explain: 'clientes del taller al mes × % que no vuelve × valor de una visita',
        uses: ['clientesTallerMes', 'noVuelvenTallerPct', 'ticketTaller'],
        calc: (m) => m('clientesTallerMes') * (m('noVuelvenTallerPct') / 100) * m('ticketTaller'),
      },
      {
        key: 'citasTaller',
        label: 'Citas de taller que no llegan',
        kind: 'perdida',
        explain: 'citas perdidas al mes × valor de una visita',
        uses: ['citasNoLlegan', 'ticketTaller'],
        calc: (m) => m('citasNoLlegan') * m('ticketTaller'),
      },
      {
        key: 'usadosParados',
        label: 'Autos usados parados en el patio',
        kind: 'perdida',
        explain: 'autos con más de 90 días × costo mensual de mantener un auto parado',
        uses: ['usadosInmovilizados', 'costoUsadoParadoMes'],
        calc: (m) => m('usadosInmovilizados') * m('costoUsadoParadoMes'),
      },
      {
        key: 'cobranza',
        label: 'Plata atrapada en flotas y financieras que pagan tarde',
        kind: 'caja',
        explain: 'ventas del mes × días de atraso sobre 30 ÷ 30 (no es pérdida: es plata que financia a sus clientes)',
        uses: ['ingresosAhora', 'diasPago'],
        calc: (m) => (m('ingresosAhora') * Math.max(0, m('diasPago') - 30)) / 30,
      },
    ],
    documents: [
      'Cotizaciones y consultas por vehículos de los últimos 3 meses (portales, WhatsApp, sala de ventas) con su resultado',
      'Historial de órdenes de trabajo del taller del último año (fecha, patente, monto)',
      'Stock de usados con fecha de ingreso y precio',
      'Facturas pendientes de cobro de empresas, flotas y financieras',
    ],
  }),

  make({
    id: 'general',
    name: 'General (otro rubro)',
    who: 'el negocio está ganando plata',
    focus:
      'Rubro sin enfoque específico: busca dónde se pierde tiempo (tareas repetitivas), clientes (sin respuesta o sin seguimiento) y caja (cobranza). Si el cliente no tiene datos, la etapa 1 es medir.',
    specific: [
      {
        title: 'Clientes',
        minutes: 12,
        questions: [
          { q: '¿Hay clientes que antes le compraban y ahora no? ¿Cuántos al mes?', fallback: '¿Piensa en alguno en particular? ¿Por qué cree que se fue?', metrics: ['clientesPerdidosMes'] },
          { q: '¿Cuánto le paga en promedio un cliente al mes?', fallback: '¿Cuál fue la última venta y por cuánto?', metrics: ['valorCliente'] },
          { q: '¿Cuánto se demoran sus clientes en pagarle?', fallback: '¿Hay facturas de hace 2 meses sin pagar?', metrics: ['diasPago'] },
        ],
      },
    ],
    metrics: [
      { key: 'clientesPerdidosMes', label: 'Clientes que dejan de comprar al mes', unit: 'n' },
      { key: 'valorCliente', label: 'Lo que paga un cliente al mes', unit: 'clp' },
      { key: 'diasPago', label: 'Días que tardan en pagarle', unit: 'dias' },
    ],
    leaks: [
      { key: 'clientes', label: 'Clientes que se van', kind: 'perdida', explain: 'clientes perdidos al mes × lo que paga un cliente', uses: ['clientesPerdidosMes', 'valorCliente'], calc: (m) => m('clientesPerdidosMes') * m('valorCliente') },
      {
        key: 'cobranza',
        label: 'Plata atrapada en clientes que pagan tarde',
        kind: 'caja',
        explain: 'ventas del mes × días de atraso sobre 30 ÷ 30',
        uses: ['ingresosAhora', 'diasPago'],
        calc: (m) => (m('ingresosAhora') * Math.max(0, m('diasPago') - 30)) / 30,
      },
    ],
    documents: ['Lista de clientes del último año con lo que compraron'],
  }),
];

export const playbookById = (id: string | undefined) => PLAYBOOKS.find((p) => p.id === id) ?? PLAYBOOKS.find((p) => p.id === 'general')!;

export interface MetricValue {
  v: number;
  c: Confidence;
}

export interface ComputedLeak {
  key: string;
  label: string;
  kind: LeakKind;
  monthly: number;
  explain: string;
  /** Lowest confidence among the metrics it uses. */
  confidence: Confidence;
  /** Metrics still empty: the leak can't be calculated yet. */
  missing: string[];
}

const RANK: Record<Confidence, number> = { real: 3, estimado: 2, supuesto: 1 };

/** Evaluate a playbook's leaks with the metrics captured in the session. */
export const computeLeaks = (pb: Playbook, metrics: Record<string, MetricValue>): ComputedLeak[] =>
  pb.leaks.map((l) => {
    const missing = l.uses.filter((k) => !(metrics[k]?.v > 0));
    const confs = l.uses.map((k) => metrics[k]?.c ?? 'estimado');
    const confidence = confs.reduce<Confidence>((a, c) => (RANK[c] < RANK[a] ? c : a), 'real');
    const monthly = missing.length ? 0 : Math.round(l.calc((k) => metrics[k]?.v ?? 0));
    return { key: l.key, label: l.label, kind: l.kind, monthly, explain: l.explain, confidence, missing };
  });

/** Email asking the client (or their accountant) for the documents. */
export const documentsEmail = (pb: Playbook, clientName: string, company: string, brand: string) =>
  `Hola ${clientName || ''},

Gracias por la conversación de hoy. Para afinar los números de la hoja de ruta de ${company || 'tu empresa'}, ¿me podrías enviar lo siguiente? Si no lo tienes a mano, tu contador puede ayudarte con casi todo:

${pb.documents.map((d, i) => `${i + 1}. ${d}`).join('\n')}

Con esto te entrego el PDF y el video con la explicación. Si algo no existe, no te preocupes: también es un hallazgo y lo incluimos en el análisis.

Saludos,
${brand}`;

// ---------- suggestions: one click adds an example process or leak the consultant then adjusts ----------
export interface SuggestedProcess {
  name: string;
  hoursWeek: number;
  pain: string;
}
export interface SuggestedLeak {
  title: string;
  detail: string;
}

const GENERAL_SUGGESTIONS: { processes: SuggestedProcess[]; leaks: SuggestedLeak[] } = {
  processes: [
    { name: 'Responder consultas de clientes (WhatsApp, correo, llamadas)', hoursWeek: 8, pain: 'Siempre las mismas preguntas y se responde tarde' },
    { name: 'Emitir facturas y cobrar', hoursWeek: 6, pain: 'Se hace a mano y se atrasa la cobranza' },
    { name: 'Pasar datos entre planillas o sistemas', hoursWeek: 5, pain: 'Se digita dos veces y hay errores' },
    { name: 'Armar reportes para la gerencia', hoursWeek: 4, pain: 'Llegan tarde y nadie confía en las cifras' },
  ],
  leaks: [
    { title: 'Clientes que se van', detail: 'Dejan de comprar y nadie los contacta para saber por qué' },
    { title: 'Consultas sin respuesta a tiempo', detail: 'Escriben fuera de horario o en hora punta y se enfrían' },
    { title: 'Facturas que se cobran tarde', detail: 'La plata queda en manos de los clientes semanas o meses' },
  ],
};

const SUGGESTIONS: Record<string, { processes: SuggestedProcess[]; leaks: SuggestedLeak[] }> = {
  'transporte-y-flotas': {
    processes: [
      { name: 'Anotar viajes y guías de despacho', hoursWeek: 10, pain: 'Cuaderno y papel; después hay que pasarlo a Excel' },
      { name: 'Facturar viajes a fin de mes', hoursWeek: 12, pain: 'Una semana digitando guías para poder facturar' },
      { name: 'Coordinar choferes por WhatsApp', hoursWeek: 8, pain: 'Todo pasa por mensajes; se pierde información' },
      { name: 'Cobranza de facturas', hoursWeek: 5, pain: 'No hay recordatorios y se paga a 60 o 90 días' },
    ],
    leaks: [
      { title: 'Camiones parados', detail: 'Mantención, falta de chofer o falta de carga: no facturan' },
      { title: 'Retornos vacíos', detail: 'El camión vuelve sin carga y el viaje de vuelta se pierde' },
      { title: 'Esperas en carga y descarga', detail: 'Horas de camión y chofer detenidos que nadie cobra' },
      { title: 'No se sabe qué camión deja plata', detail: 'Sin números por camión, las decisiones se toman a ojo' },
    ],
  },
  'clinicas-y-salud': {
    processes: [
      { name: 'Agendar y confirmar citas', hoursWeek: 12, pain: 'Llamadas y mensajes uno por uno' },
      { name: 'Responder consultas de precios y horarios', hoursWeek: 8, pain: 'Siempre las mismas preguntas' },
      { name: 'Seguimiento de presupuestos de tratamiento', hoursWeek: 4, pain: 'Se entregan y no se vuelve a llamar' },
      { name: 'Registrar fichas y cobros', hoursWeek: 6, pain: 'Se digita en varios lugares' },
    ],
    leaks: [
      { title: 'Horas de agenda vacías', detail: 'Profesionales disponibles sin pacientes' },
      { title: 'Pacientes que no llegan', detail: 'Faltan sin avisar y la hora se pierde' },
      { title: 'Presupuestos que no se concretan', detail: 'El paciente se enfría porque nadie le hace seguimiento' },
    ],
  },
  inmobiliarias: {
    processes: [
      { name: 'Responder interesados de portales y redes', hoursWeek: 10, pain: 'Llegan por varios canales y se responde tarde' },
      { name: 'Seguimiento de interesados', hoursWeek: 6, pain: 'Se olvida volver a escribir' },
      { name: 'Coordinar visitas', hoursWeek: 5, pain: 'Muchos mensajes para cuadrar un horario' },
      { name: 'Publicar y actualizar propiedades', hoursWeek: 5, pain: 'Se repite en cada portal' },
    ],
    leaks: [
      { title: 'Interesados sin respuesta', detail: 'El que responde primero se queda con el cliente' },
      { title: 'Sin seguimiento', detail: 'Interesados tibios que nunca se retoman' },
      { title: 'Visitas que no se concretan', detail: 'Se agendan y no llegan, o llegan sin ser el cliente adecuado' },
    ],
  },
  'retail-y-ecommerce': {
    processes: [
      { name: 'Responder mensajes de clientes (stock, tallas, despacho)', hoursWeek: 12, pain: 'Preguntas repetidas todo el día' },
      { name: 'Actualizar stock entre tienda, web y marketplaces', hoursWeek: 6, pain: 'Se desalinea y se vende lo que no hay' },
      { name: 'Gestionar pedidos y despachos', hoursWeek: 8, pain: 'Planillas y copiar datos a mano' },
      { name: 'Recuperar compras abandonadas', hoursWeek: 2, pain: 'No se hace, o se hace de forma manual' },
    ],
    leaks: [
      { title: 'Compras a medias', detail: 'Clientes que dejan el carrito y no vuelven' },
      { title: 'Ventas perdidas por falta de stock', detail: 'Se vende en un canal lo que ya no hay' },
      { title: 'Mensajes sin respuesta rápida', detail: 'El cliente compra en otro lado mientras espera' },
    ],
  },
  'estudios-profesionales': {
    processes: [
      { name: 'Pedir y recibir documentos de clientes', hoursWeek: 8, pain: 'Se persigue cliente por cliente' },
      { name: 'Digitar información en sistemas', hoursWeek: 10, pain: 'Trabajo repetitivo de bajo valor' },
      { name: 'Controlar plazos y vencimientos', hoursWeek: 4, pain: 'En planillas o de memoria' },
      { name: 'Emitir informes y cobrar honorarios', hoursWeek: 5, pain: 'Se hace a mano y se atrasa' },
    ],
    leaks: [
      { title: 'Horas que no se cobran', detail: 'Trabajo administrativo que nadie factura' },
      { title: 'Multas por plazos vencidos', detail: 'Un vencimiento olvidado cuesta caro' },
      { title: 'Clientes que pagan tarde', detail: 'Honorarios impagos por meses' },
    ],
  },
  educacion: {
    processes: [
      { name: 'Responder consultas de postulantes', hoursWeek: 10, pain: 'Siempre las mismas preguntas sobre aranceles y requisitos' },
      { name: 'Seguimiento de admisión', hoursWeek: 6, pain: 'Postulantes que no reciben respuesta a tiempo' },
      { name: 'Cobranza de mensualidades', hoursWeek: 6, pain: 'Se llama o escribe uno por uno' },
      { name: 'Comunicados a apoderados', hoursWeek: 4, pain: 'Se arman a mano por varios canales' },
    ],
    leaks: [
      { title: 'Postulantes que no se matriculan', detail: 'Se enfrían por falta de respuesta o seguimiento' },
      { title: 'Mensualidades atrasadas', detail: 'Plata que el establecimiento financia' },
      { title: 'Equipo administrativo saturado', detail: 'Admisión y cobranza compiten por el mismo tiempo' },
    ],
  },
  mineria: {
    processes: [
      { name: 'Armar reportes de turno', hoursWeek: 10, pain: 'Se arman a mano y llegan tarde' },
      { name: 'Control documental de contratistas', hoursWeek: 8, pain: 'Documentos vencidos que frenan el ingreso' },
      { name: 'Registrar fallas y detenciones', hoursWeek: 5, pain: 'Sin historial confiable para anticipar' },
      { name: 'Solicitudes de compra y repuestos', hoursWeek: 5, pain: 'Largas cadenas de correos y firmas' },
    ],
    leaks: [
      { title: 'Detenciones no planificadas', detail: 'Cada hora detenida es producción perdida' },
      { title: 'Reportes a mano', detail: 'Tiempo de gente calificada en papeleo' },
      { title: 'Contratistas sin documentos al día', detail: 'Retrasos y riesgos por falta de control' },
    ],
  },
  seguros: {
    processes: [
      { name: 'Gestionar renovaciones de pólizas', hoursWeek: 8, pain: 'Se avisa tarde o no se avisa' },
      { name: 'Cotizar con varias compañías', hoursWeek: 10, pain: 'Se repite el mismo ingreso en cada portal' },
      { name: 'Revisar y registrar siniestros', hoursWeek: 8, pain: 'Mucho papeleo y seguimiento manual' },
      { name: 'Responder consultas de asegurados', hoursWeek: 6, pain: 'Estado de pólizas y coberturas, una y otra vez' },
    ],
    leaks: [
      { title: 'Renovaciones que se pierden', detail: 'El cliente se va con otro corredor al vencer la póliza' },
      { title: 'Cotizaciones lentas', detail: 'Quien cotiza primero cierra la venta' },
      { title: 'Siniestros revisados a mano', detail: 'Horas de personal en revisión repetitiva' },
    ],
  },
  'banca-y-finanzas': {
    processes: [
      { name: 'Revisar documentos de solicitudes', hoursWeek: 12, pain: 'Revisión manual y repetitiva' },
      { name: 'Seguimiento de solicitudes en curso', hoursWeek: 6, pain: 'El cliente no sabe en qué etapa está' },
      { name: 'Cobranza de cartera atrasada', hoursWeek: 8, pain: 'Llamadas y correos sin priorización' },
      { name: 'Reportes regulatorios y de gestión', hoursWeek: 6, pain: 'Armados a mano cada mes' },
    ],
    leaks: [
      { title: 'Solicitudes abandonadas', detail: 'El cliente desiste por lentitud o falta de información' },
      { title: 'Revisión documental manual', detail: 'Mucho tiempo por solicitud' },
      { title: 'Cartera morosa', detail: 'Se actúa tarde sobre los atrasos' },
    ],
  },
  'alimentacion-y-restaurantes': {
    processes: [
      { name: 'Tomar pedidos por WhatsApp y teléfono', hoursWeek: 12, pain: 'En hora punta no se alcanza a contestar' },
      { name: 'Gestionar reservas', hoursWeek: 5, pain: 'Se anotan a mano y no se confirman' },
      { name: 'Hacer compras a proveedores', hoursWeek: 5, pain: 'Se pide de memoria y se compra de más o de menos' },
      { name: 'Cuadrar caja e inventario', hoursWeek: 6, pain: 'Planillas y conteos manuales' },
    ],
    leaks: [
      { title: 'Mermas', detail: 'Insumos que se botan por mala estimación' },
      { title: 'Reservas que no llegan', detail: 'Mesas vacías en horario de mayor venta' },
      { title: 'Pedidos que no se alcanzan a tomar', detail: 'Clientes que compran en otro lado' },
    ],
  },
  'turismo-y-hoteleria': {
    processes: [
      { name: 'Responder consultas de reserva', hoursWeek: 10, pain: 'Llegan a toda hora y en varios idiomas' },
      { name: 'Actualizar disponibilidad en cada canal', hoursWeek: 5, pain: 'Riesgo de sobreventa' },
      { name: 'Enviar confirmaciones e indicaciones de llegada', hoursWeek: 4, pain: 'Se hace uno por uno' },
      { name: 'Gestionar opiniones y reseñas', hoursWeek: 3, pain: 'Se responden tarde o no se responden' },
    ],
    leaks: [
      { title: 'Comisiones de agencias en línea', detail: 'Se pagan por reservas que podrían ser directas' },
      { title: 'Consultas sin respuesta a tiempo', detail: 'El turista reserva en otro lugar' },
      { title: 'Habitaciones o cupos vacíos', detail: 'Temporada baja sin acciones para llenarlos' },
    ],
  },
  manufactura: {
    processes: [
      { name: 'Registrar producción y detenciones', hoursWeek: 10, pain: 'En papel; llega tarde a gerencia' },
      { name: 'Controlar calidad y defectos', hoursWeek: 6, pain: 'Se anota pero no se analiza' },
      { name: 'Pedir y controlar insumos', hoursWeek: 5, pain: 'Quiebres que paran la línea' },
      { name: 'Planificar la producción', hoursWeek: 6, pain: 'En planillas que no se actualizan' },
    ],
    leaks: [
      { title: 'Detenciones no planificadas', detail: 'Línea parada sin saber la causa real' },
      { title: 'Productos defectuosos', detail: 'Reprocesos y mermas que cuestan' },
      { title: 'Quiebres de insumos', detail: 'Falta de material que paraliza la producción' },
    ],
  },
  agro: {
    processes: [
      { name: 'Registrar labores y cosecha', hoursWeek: 8, pain: 'En cuaderno; se pasa a mano después' },
      { name: 'Control de personal y asistencia', hoursWeek: 6, pain: 'Planillas semanales a mano' },
      { name: 'Documentos de trazabilidad para exportación', hoursWeek: 6, pain: 'Se arman a último minuto' },
      { name: 'Coordinar fletes y entregas', hoursWeek: 5, pain: 'Llamadas y mensajes sueltos' },
    ],
    leaks: [
      { title: 'Merma de cosecha', detail: 'Fruta o producto que no llega a venderse' },
      { title: 'Rechazos por trazabilidad', detail: 'Descuentos o rechazos por documentación incompleta' },
      { title: 'Registro en papel', detail: 'Horas en papeleo en vez de en el campo' },
    ],
  },
  automotriz: {
    processes: [
      { name: 'Responder y dar seguimiento a cotizaciones de vehículos', hoursWeek: 16, pain: 'Llegan por varios canales a vendedores distintos y no se retoman' },
      { name: 'Agendar horas de taller y confirmar', hoursWeek: 10, pain: 'Por teléfono; los atrasos y ausencias dejan huecos' },
      { name: 'Órdenes de trabajo y planillas del taller', hoursWeek: 12, pain: 'Se escriben a mano y se digitan de nuevo' },
      { name: 'Publicar y actualizar stock de usados en portales', hoursWeek: 6, pain: 'Se actualiza a mano y a veces con días de atraso' },
      { name: 'Cobranza a empresas y financieras', hoursWeek: 6, pain: 'Cobro uno por uno, sin recordatorios' },
    ],
    leaks: [
      { title: 'Cotizaciones sin seguimiento', detail: 'Se contestan una vez y no se retoman; el que responde primero se queda con la venta' },
      { title: 'Clientes que no vuelven al taller', detail: 'Compran el auto y nadie les recuerda la mantención ni la revisión técnica' },
      { title: 'Citas de taller perdidas', detail: 'Horas de mecánico vacías por clientes que no llegan ni avisan' },
      { title: 'Autos usados parados', detail: 'Stock que nadie pregunta y que cuesta financiamiento cada mes' },
    ],
  },
  construccion: {
    processes: [
      { name: 'Control documental de subcontratos y trabajadores', hoursWeek: 10, pain: 'Documentos vencidos que frenan la obra' },
      { name: 'Seguimiento de avance y costos por obra', hoursWeek: 8, pain: 'Se detectan los sobrecostos tarde' },
      { name: 'Solicitudes de compra a obra', hoursWeek: 5, pain: 'Pedidos por WhatsApp y correo sin trazabilidad' },
      { name: 'Reportes semanales a la gerencia', hoursWeek: 5, pain: 'Se arman a mano con datos de varias obras' },
    ],
    leaks: [
      { title: 'Atrasos de obra', detail: 'Cada día de atraso corren los gastos generales' },
      { title: 'Sobrecostos detectados tarde', detail: 'Se ve el desvío cuando ya no hay cómo corregirlo' },
      { title: 'Control documental a mano', detail: 'Horas de oficina y riesgo de multas' },
    ],
  },
};

export const suggestionsFor = (id: string | undefined) => SUGGESTIONS[id ?? ''] ?? GENERAL_SUGGESTIONS;
