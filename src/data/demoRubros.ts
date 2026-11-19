export interface RubroCard {
  linea: string;
  titulo: string;
  descripcion: string;
  foto: string;
  eett: string;
  disponibilidad: string;
  cta: string;
}

export interface RubroNormativa {
  tag: string;
  titulo: string;
  desc: string;
}

export interface RubroSector {
  nombre: string;
  desc: string;
}

export interface RubroConfig {
  id: string;
  nombreRubro: string;
  rubroSubheader: string;
  keywords: string[];
  heroImg: string;
  aboutImg?: string;
  tagline: string;
  bajadaHero: string;
  trustBadges: Array<{ label: string; valor: string }>;
  serviciosTitle: string;
  serviciosDesc: string;
  cards: RubroCard[];
  sectoresTitle: string;
  sectores: RubroSector[];
  normativas: RubroNormativa[];
  leadMsgTemplate: string;
  pitchWhatsAppTemplate: string;
}

export const RUBROS_CATALOG: Record<string, RubroConfig> = {
  maquinaria: {
    id: 'maquinaria',
    nombreRubro: 'Arriendo de Maquinaria Pesada & Movimiento de Tierras',
    rubroSubheader: 'Maquinaria Pesada & Movimiento de Tierras',
    keywords: ['maquinaria', 'retro', 'excavacion', 'oruga', 'tolva', 'bobcat', 'movimiento', 'tierra', 'faena', 'arriendo maquina'],
    heroImg: '/assets/maquinaria/hero-maquinaria-pesada.jpg',
    tagline: 'Flota y Operaciones en {comuna}',
    bajadaHero: 'Arriendo de maquinaria pesada, excavaciones masivas, apertura de zanjas y movimiento de tierras en {comuna}. Operadores certificados, mantención preventiva al día y respuesta inmediata en faena.',
    trustBadges: [
      { label: 'Disponibilidad:', valor: 'En el Día' },
      { label: 'Normativa:', valor: 'Mutual CChC / APR' },
      { label: 'Facturación:', valor: 'Inmediata (SII)' },
      { label: 'Traslado:', valor: 'Cama Baja Propia' }
    ],
    serviciosTitle: 'Flota y Maquinaria en Arriendo',
    serviciosDesc: 'Equipos de alto rendimiento y confiabilidad mecánica preparados para faenas de excavación, demolición, transporte y despeje en {comuna}.',
    cards: [
      {
        linea: 'Línea 01 · Excavación y Zanjeo',
        titulo: 'Retroexcavadora 4x4 con Balde y Martillo',
        descripcion: 'Apertura de zanjas para sanitarias y APR, excavación de fundaciones, demolición de radieres y carga de tolvas. Operador con certificación y mutual.',
        foto: '/assets/maquinaria/retroexcavadora-faena.jpg',
        eett: 'Tracción 4x4 · Martillo demoledor 450 kg · Balde 0.3 m³',
        disponibilidad: 'Turnos por Hora y Jornada',
        cta: 'Cotizar Retroexcavadora'
      },
      {
        linea: 'Línea 02 · Alto Tonelaje Masivo',
        titulo: 'Excavadora de Oruga (14 a 22 Toneladas)',
        descripcion: 'Movimiento masivo de tierras, despeje de parcelas, corte de laderas en roca y excavaciones profundas para fundaciones industriales.',
        foto: '/assets/maquinaria/excavadora-oruga.jpg',
        eett: 'Balde de 1.2 m³ · Orugas de acero · Traslado en cama baja',
        disponibilidad: 'Arriendo con Operador',
        cta: 'Cotizar Excavadora'
      },
      {
        linea: 'Línea 03 · Transporte y Retiro',
        titulo: 'Camión Tolva 14 m³ para Retiro de Áridos',
        descripcion: 'Retiro de escombros, transporte de material estabilizado, base granular y tierra vegetal directo a faena con descarga hidráulica.',
        foto: '/assets/maquinaria/camion-tolva-faena.jpg',
        eett: 'Capacidad 14 m³ · Tolva reforzada Hardox · Chofer clase A-4/A-5',
        disponibilidad: 'Flota Disponible en Faena',
        cta: 'Cotizar Camión Tolva'
      },
      {
        linea: 'Línea 04 · Movimiento & Nivelación',
        titulo: 'Minicargador Bobcat & Movimiento de Tierra',
        descripcion: 'Nivelación de terrenos en espacios reducidos, radieres industriales, limpieza de pavimentos y zanjas técnicas en faena.',
        foto: '/assets/maquinaria/minicargador-bobcat.jpg',
        eett: 'Bobcat S175 · Nivelación láser · Cuchilla frontal',
        disponibilidad: 'Jornada Completa y Media Jornada',
        cta: 'Cotizar Minicargador'
      }
    ],
    sectoresTitle: 'Faenas Habituales & Sectores de Operación en Terreno',
    sectores: [
      { nombre: 'Constructoras & Edificación', desc: 'Fundaciones y Movimiento de Tierras' },
      { nombre: 'Parcelas de Agrado & Loteos', desc: 'Despeje, Caminos y Nivelación' },
      { nombre: 'Obras Viales & Pavimentación', desc: 'Subbase, Estabilizado y Cunetas' },
      { nombre: 'Agua Potable Rural (APR)', desc: 'Zanjeo Técnico y Tendido de Redes' },
      { nombre: 'Canales & Tranques Agrícolas', desc: 'Limpieza y Desembalse de Suelos' },
      { nombre: 'Retiro de Escombros y Áridos', desc: 'Disposición y Despacho en Tolva' }
    ],
    normativas: [
      { tag: 'Prevención de Riesgos', titulo: 'Mutual de Seguridad CChC', desc: 'Afiliación activa, charlas de seguridad diarias antes de iniciar posturas y política permanente de Cero Daño.' },
      { tag: 'Personal en Terreno', titulo: 'Operadores Calificados', desc: 'Licencias de conducir al día (D y A-4/A-5), exámenes de altura física y acreditación para faenas industriales.' },
      { tag: 'Mantenimiento Mecánico', titulo: 'Pauta Preventiva Rigurosa', desc: 'Revisión diaria de niveles hidráulicos, engrase de pasadores y control de horómetro para garantizar cero fallas.' },
      { tag: 'Administración & SII', titulo: 'Facturación Inmediata', desc: 'Emisión de Factura Electrónica con detalle de horas o metraje cúbico, estado de pago formal y recepción conforme.' }
    ],
    leadMsgTemplate: 'Hola {empresa}, vi su sitio web oficial y necesito cotizar arriendo de maquinaria para una faena en {comuna}. ¿Tienen disponibilidad?',
    pitchWhatsAppTemplate: 'Hola {empresa}, buen día. Alexis por acá de UniVerso 693. Vi su contacto buscando arriendo de maquinaria en {comuna}. Noté que quienes buscan máquinas en Google desde el celular no encuentran una página directa de ustedes para cotizar rápido, y terminan llamando a la competencia.\n\nLes armé una vista previa de cómo quedaría su catálogo en el celular para recibir cotizaciones en 1 clic directo a su WhatsApp:\n👉 {linkDemo}\n\nSe las dejamos 100% activa con su propio dominio .CL, su flota y su teléfono por $85.000 IVA inc. pago único (sin mensualidades obligatorias). ¿Le damos una mirada y se las dejamos andando hoy? Saludos!'
  },

  camion_pluma: {
    id: 'camion_pluma',
    nombreRubro: 'Arriendo de Camión Pluma, Grúa Móvil & Servicios de Izaje',
    rubroSubheader: 'Camión Pluma & Servicios de Izaje',
    keywords: ['pluma', 'camion pluma', 'grua movil', 'grua camion', 'izaje', 'grua horquilla', 'telescopica'],
    heroImg: '/assets/camion_pluma/hero-camion-pluma.jpg',
    aboutImg: '/assets/camion_pluma/about-camion-pluma.jpg',
    tagline: 'Flota y Operaciones en {comuna}',
    bajadaHero: 'Arriendo de camión pluma y grúa móvil para izaje, montaje y descarga de materiales en {comuna}. Operadores certificados, pluma telescópica y respuesta inmediata en faena.',
    trustBadges: [
      { label: 'Disponibilidad:', valor: 'En el Día' },
      { label: 'Normativa:', valor: 'Mutual CChC / DS N°594' },
      { label: 'Facturación:', valor: 'Inmediata (SII)' },
      { label: 'Capacidad:', valor: 'Hasta 20 Toneladas' }
    ],
    serviciosTitle: 'Flota y Servicios de Izaje en Arriendo',
    serviciosDesc: 'Equipos de izaje y camiones pluma preparados para montaje, carga y descarga de materiales en {comuna}.',
    cards: [
      {
        linea: 'Línea 01 · Izaje en Altura',
        titulo: 'Camión Pluma con Grúa Telescópica',
        descripcion: 'Izaje de estructuras, paneles, equipos y materiales de construcción en altura con operador certificado y rigger a cargo de maniobra.',
        foto: '/assets/camion_pluma/izaje-grua-boom.jpg',
        eett: 'Pluma telescópica · Capacidad hasta 20 Ton · Gancho doble',
        disponibilidad: 'Turnos por Hora y Jornada',
        cta: 'Cotizar Camión Pluma'
      },
      {
        linea: 'Línea 02 · Carga y Descarga',
        titulo: 'Carga y Descarga de Materiales & Contenedores',
        descripcion: 'Descarga de camiones, movimiento de contenedores, maquinaria liviana y materiales paletizados directo en bodega o faena.',
        foto: '/assets/camion_pluma/carga-descarga-material.jpg',
        eett: 'Brazo hidráulico extensible · Descarga lateral y trasera',
        disponibilidad: 'Arriendo con Operador',
        cta: 'Cotizar Carga y Descarga'
      },
      {
        linea: 'Línea 03 · Traslado de Equipos',
        titulo: 'Traslado de Maquinaria en Cama Baja',
        descripcion: 'Transporte de maquinaria pesada, equipos industriales y vehículos fuera de ruta entre faenas con permisos de carga.',
        foto: '/assets/camion_pluma/traslado-cama-baja.jpg',
        eett: 'Cama baja multieje · Rampas hidráulicas · Amarre certificado',
        disponibilidad: 'Flota Disponible en Faena',
        cta: 'Cotizar Traslado'
      },
      {
        linea: 'Línea 04 · Servicio General',
        titulo: 'Grúa Móvil para Faenas y Montajes Programados',
        descripcion: 'Servicio de grúa móvil para montajes programados, mantenimiento industrial y apoyo a cuadrillas en terreno.',
        foto: '/assets/camion_pluma/grua-movil-faena.jpg',
        eett: 'Grúa móvil sobre camión · Operador y rigger incluidos',
        disponibilidad: 'Jornada Completa y Media Jornada',
        cta: 'Cotizar Grúa Móvil'
      }
    ],
    sectoresTitle: 'Faenas Habituales & Sectores de Operación',
    sectores: [
      { nombre: 'Constructoras & Edificación', desc: 'Montaje de Estructuras y Paneles' },
      { nombre: 'Bodegas & Centros Logísticos', desc: 'Carga y Descarga de Contenedores' },
      { nombre: 'Parques Industriales', desc: 'Mantenimiento de Equipos en Altura' },
      { nombre: 'Instalación de Letreros & Postes', desc: 'Izaje Puntual en Vía Pública' },
      { nombre: 'Eventos & Montajes Temporales', desc: 'Estructuras de Escenario y Toldos' },
      { nombre: 'Traslado de Maquinaria', desc: 'Entre Faenas y Bodegas' }
    ],
    normativas: [
      { tag: 'Prevención de Riesgos', titulo: 'Mutual de Seguridad CChC', desc: 'Afiliación activa, charlas de seguridad diarias antes de iniciar maniobras y política permanente de Cero Daño.' },
      { tag: 'Personal en Terreno', titulo: 'Operadores y Rigger Certificados', desc: 'Licencias de conducir al día, certificación de maniobrista (rigger) y acreditación para izaje en faenas industriales.' },
      { tag: 'Mantenimiento Mecánico', titulo: 'Pauta Preventiva Rigurosa', desc: 'Revisión diaria de niveles hidráulicos, cables de acero y control de horómetro para garantizar cero fallas.' },
      { tag: 'Administración & SII', titulo: 'Facturación Inmediata', desc: 'Emisión de Factura Electrónica con detalle de horas de maniobra, estado de pago formal y recepción conforme.' }
    ],
    leadMsgTemplate: 'Hola {empresa}, vi su sitio web oficial y necesito cotizar un servicio de camión pluma / izaje en {comuna}. ¿Tienen disponibilidad?',
    pitchWhatsAppTemplate: 'Hola {empresa}, buen día. Alexis por acá de UniVerso 693. Vi su contacto buscando arriendo de camión pluma en {comuna}. Noté que quienes buscan grúas o izaje en Google desde el celular no encuentran una página directa de ustedes para cotizar rápido, y terminan llamando a la competencia.\n\nLes armé una vista previa de cómo quedaría su catálogo en el celular para recibir cotizaciones en 1 clic directo a su WhatsApp:\n👉 {linkDemo}\n\nSe las dejamos 100% activa con su propio dominio .CL, su flota y su teléfono por $85.000 IVA inc. pago único (sin mensualidades obligatorias). ¿Le damos una mirada y se las dejamos andando hoy? Saludos!'
  },

  transporte_pasajeros: {
    id: 'transporte_pasajeros',
    nombreRubro: 'Transporte Privado de Pasajeros, Vans & Personal',
    rubroSubheader: 'Transporte de Pasajeros & Viajes Especiales',
    keywords: ['pasajero', 'personal', 'van', 'vans', 'minibus', 'turismo', 'aeropuerto', 'viajes especiales', 'viaje especial', 'traslado', 'sprinter', 'paseo', 'bus', 'concierto', 'matrimonio', 'gira'],
    heroImg: '/assets/pasajeros/hero-transporte-pasajeros.jpg',
    aboutImg: '/assets/pasajeros/about-transporte-pasajeros.jpg',
    tagline: 'Flota de Vans & Minibuses en {comuna} y Cobertura Nacional',
    bajadaHero: 'Servicio de transporte privado de pasajeros, traslado de personal a faenas y empresas, viajes especiales, traslados al aeropuerto y paseos turísticos desde {comuna}. Vans ejecutivas modernas, choferes profesionales con licencia A-2 y máxima puntualidad.',
    trustBadges: [
      { label: 'Normativa:', valor: 'Decreto 80 / MTT' },
      { label: 'Conductores:', valor: 'Licencia Profesional A-2' },
      { label: 'Equipamiento:', valor: 'Climatizador & GPS 24/7' },
      { label: 'Facturación:', valor: 'Inmediata (SII)' }
    ],
    serviciosTitle: 'Flota de Vans & Servicios de Pasajeros',
    serviciosDesc: 'Vehículos ejecutivos y minibuses acondicionados para el confort y seguridad de pasajeros en trayectos urbanos, interurbanos y viajes especiales desde {comuna}.',
    cards: [
      {
        linea: 'Línea 01 · Corporativo & Faenas',
        titulo: 'Transporte de Personal para Empresas & Faenas',
        descripcion: 'Turnos rotativos, traslados de acercamiento para cuadrillas, operarios y personal administrativo con retiro y retorno directo a faena o planta.',
        foto: '/assets/pasajeros/van-transporte-personal.jpg',
        eett: 'Vans 11 a 19 asientos · Asientos reclinables · GPS en vivo',
        disponibilidad: 'Contratos Mensuales y Turnos Diarios',
        cta: 'Cotizar Transporte Personal'
      },
      {
        linea: 'Línea 02 · Aeropuerto & Negocios',
        titulo: 'Traslados al Aeropuerto & Viajes Ejecutivos',
        descripcion: 'Recepción y salidas a terminales aéreos 24/7 (ida y regreso), hoteles, embajadas y eventos corporativos con monitoreo de vuelo.',
        foto: '/assets/pasajeros/traslado-aeropuerto.jpg',
        eett: 'Vehículo ejecutivo · Maletero amplio · Chofer formal',
        disponibilidad: 'Reservas 24/7 con Anticipación',
        cta: 'Cotizar Traslado Aeropuerto'
      },
      {
        linea: 'Línea 03 · Turismo & Delegaciones',
        titulo: 'Viajes Turísticos, Paseos de Curso & Grupos',
        descripcion: 'Viajes a la playa, nieve, viñas, paseos escolares, delegaciones deportivas y giras con chofer dedicado por jornada completa.',
        foto: '/assets/pasajeros/minibus-turismo.jpg',
        eett: 'Minibuses de turismo · Micrófono a bordo · Cargadores USB',
        disponibilidad: 'Salidas Programadas y Feriados',
        cta: 'Cotizar Viaje Turístico'
      },
      {
        linea: 'Línea 04 · Eventos & Matrimonios',
        titulo: 'Traslados para Conciertos, Fiestas & Matrimonios',
        descripcion: 'Transporte seguro de invitados y familias para matrimonios, conciertos y celebraciones especiales con retorno nocturno garantizado.',
        foto: '/assets/pasajeros/van-eventos.jpg',
        eett: 'Servicio puerta a puerta · Coordinación de retornos seguros',
        disponibilidad: 'Disponibilidad Nocturna y Fines de Semana',
        cta: 'Cotizar Eventos Especiales'
      }
    ],
    sectoresTitle: 'Modalidades Habituales de Traslado de Pasajeros',
    sectores: [
      { nombre: 'Empresas & Faenas Industriales', desc: 'Turnos y Acercamiento de Trabajadores' },
      { nombre: 'Aeropuertos & Hotelería', desc: 'Traslados Ejecutivos 24/7' },
      { nombre: 'Colegios & Universidades', desc: 'Paseos de Curso y Giras de Estudio' },
      { nombre: 'Productoras & Conciertos', desc: 'Traslado de Staff, Artistas y Asistentes' },
      { nombre: 'Familias & Grupos Particulares', desc: 'Vacaciones y Viajes a Regiones' },
      { nombre: 'Matrimonios & Celebraciones', desc: 'Retornos Seguros y Coordinación de Horarios' }
    ],
    normativas: [
      { tag: 'Ministerio de Transportes', titulo: 'Cumplimiento Decreto 80 MTT', desc: 'Inscripción reglamentaria en el Registro Nacional de Servicios de Transporte Remunerado de Pasajeros.' },
      { tag: 'Conductores', titulo: 'Licencia Profesional Clase A-2', desc: 'Choferes con antecedentes intachables, exámenes psicotécnicos rigurosos y amplia experiencia en carretera.' },
      { tag: 'Seguridad a Bordo', titulo: 'Cinturones de 3 Puntas & Extintores', desc: 'Todas las butacas cuentan con cinturón inercial, botiquín de primeros auxilios y revisión técnica al día.' },
      { tag: 'Administración', titulo: 'Facturación Electrónica SII', desc: 'Emisión inmediata de Factura exenta o afecta para rendición corporativa o reembolso de empresas.' }
    ],
    leadMsgTemplate: 'Hola {empresa}, vi su sitio web oficial y necesito cotizar un servicio de van / transporte de pasajeros en {comuna}. ¿Tienen disponibilidad?',
    pitchWhatsAppTemplate: 'Hola {empresa}, buen día. Alexis por acá de UniVerso 693. Vi su servicio de vans y transporte de pasajeros en {comuna}. Noté que cuando empresas o grupos buscan traslados o vans en Google desde el celular, no encuentran una página directa de ustedes con su flota y botón para cotizar en 1 clic.\n\nLes armé una vista previa de cómo quedaría su sitio web en el celular con sus vans y cotización directa a su WhatsApp:\n👉 {linkDemo}\n\nSe las dejamos 100% activa con su propio dominio .CL y su teléfono por $85.000 IVA inc. pago único (sin mensualidades obligatorias). ¿Le damos una mirada y se las dejamos funcionando hoy? Saludos!'
  },

  transporte: {
    id: 'transporte',
    nombreRubro: 'Transporte de Carga, Fletes & Logística Terrestre',
    rubroSubheader: 'Transporte de Carga & Logística Terrestre',
    keywords: ['transporte', 'flete', 'carga', 'logistica', 'camion', 'mudanza', 'despacho', 'distribucion', 'rampla'],
    heroImg: '/assets/transporte/hero-transporte-carga.jpg',
    tagline: 'Flota y Despacho en {comuna} & Cobertura Nacional',
    bajadaHero: 'Transporte de carga terrestre, fletes de alto tonelaje, distribución y logística express en {comuna} y todo Chile. Choferes profesionales, monitoreo GPS en ruta y cumplimiento estricto de entregas.',
    trustBadges: [
      { label: 'Seguimiento:', valor: 'GPS en Vivo 24/7' },
      { label: 'Choferes:', valor: 'Licencia A-4 / A-5' },
      { label: 'Carga Asegurada:', valor: 'Póliza Vigente' },
      { label: 'Facturación:', valor: 'Inmediata (SII)' }
    ],
    serviciosTitle: 'Flota de Transporte & Servicios de Carga',
    serviciosDesc: 'Unidades modernas y acondicionadas para transporte seguro de materias primas, productos terminados y cargas consolidadas desde y hacia {comuna}.',
    cards: [
      {
        linea: 'Línea 01 · Carga Pesada & Granel',
        titulo: 'Tractocamión con Rampla Plana y Barandas',
        descripcion: 'Transporte de acero, perfiles, madera, sacos y carga paletizada de gran volumen a nivel interurbano con amarre reglamentario.',
        foto: '/assets/transporte/camion-rampla-plana.jpg',
        eett: 'Capacidad hasta 28 Ton · Rampla 13.5m · Amarre certificado',
        disponibilidad: 'Servicio Dedicado y Spot',
        cta: 'Cotizar Rampla Plana'
      },
      {
        linea: 'Línea 02 · Reparto Urbano Express',
        titulo: 'Camión 3/4 Cerrado con Plataforma Hidráulica',
        descripcion: 'Distribución en centros urbanos, entrega a bodegas, retail y retiro de encomiendas de medianas dimensiones.',
        foto: '/assets/transporte/camion-tres-cuartos.jpg',
        eett: 'Carga útil 3.5 a 5 Ton · Caja cerrada hermética · Rampa hidráulica',
        disponibilidad: 'Rutas Diarias Programadas',
        cta: 'Cotizar Camión 3/4'
      },
      {
        linea: 'Línea 03 · Cadena de Frío',
        titulo: 'Transporte Refrigerado / Termo con Control T°',
        descripcion: 'Traslado de alimentos perecibles, productos farmacéuticos y congelados con registro térmico digital continuo.',
        foto: '/assets/transporte/camion-refrigerado.jpg',
        eett: 'Rango -20°C a +15°C · Certificación Seremi de Salud',
        disponibilidad: 'Turnos Programados',
        cta: 'Cotizar Carga Fría'
      },
      {
        linea: 'Línea 04 · Fletes Directos',
        titulo: 'Fletes Industriales y Mudanzas Corporativas',
        descripcion: 'Traslado de oficinas, maquinaria ligera, mobiliario y herramientas de faena con personal de estiba y protección acolchada.',
        foto: '/assets/transporte/fletes-mudanzas.jpg',
        eett: 'Servicio punto a punto · Peonetas disponibles · Seguro de carga',
        disponibilidad: 'Salidas Inmediatas',
        cta: 'Cotizar Flete Express'
      }
    ],
    sectoresTitle: 'Clientes y Modalidades de Carga Habituales',
    sectores: [
      { nombre: 'Centros de Distribución & Retail', desc: 'Entregas en Ventanas Horarias' },
      { nombre: 'Constructoras & Proveedores de Obras', desc: 'Despacho de Fierro y Áridos' },
      { nombre: 'Agroindustria & Packing', desc: 'Fruta, Granos y Cadena de Frío' },
      { nombre: 'Empresas Manufactureras', desc: 'Insumos Industriales y Repuestos' },
      { nombre: 'Comercio Mayorista & E-commerce', desc: 'Logística B2B y Abastecimiento' },
      { nombre: 'Faenas Mineras & Energía', desc: 'Cargas Sobredimensionadas y Equipos' }
    ],
    normativas: [
      { tag: 'Control de Flota', titulo: 'Telemetría GPS 24/7', desc: 'Monitoreo en tiempo real de velocidad, detenciones y geo-cercas de seguridad en carretera.' },
      { tag: 'Conductores', titulo: 'Choferes Profesionales', desc: 'Acreditaciones clase A-4 y A-5, exámenes psicosensométricos y cursos de conducción a la defensiva.' },
      { tag: 'Protección', titulo: 'Seguro de Carga y Responsabilidad Civil', desc: 'Cobertura integral ante accidentes, mermas o siniestros en trayecto con póliza vigente.' },
      { tag: 'Administración', titulo: 'Facturación Electrónica SII', desc: 'Emisión de Guías de Despacho electrónicas, Facturas exentas/afectas y control de recepción.' }
    ],
    leadMsgTemplate: 'Hola {empresa}, vi su sitio web oficial y necesito cotizar un servicio de transporte / flete desde {comuna}. ¿Tienen disponibilidad de camión?',
    pitchWhatsAppTemplate: 'Hola {empresa}, buen día. Alexis por acá de UniVerso 693. Vi su contacto buscando servicios de transporte y fletes en {comuna}. Noté que quienes buscan camiones y fletes en Google desde el celular no encuentran una página rápida de ustedes para cotizar directo, y terminan llamando a otra empresa.\n\nLes armé una vista previa de cómo quedaría su página web en el celular con su flota y botón de cotización directa a su WhatsApp:\n👉 {linkDemo}\n\nSe las dejamos 100% activa con su propio dominio .CL, sus camiones y su teléfono por $85.000 IVA inc. pago único (sin cobros mensuales obligatorios). ¿Le damos una mirada y se las dejamos funcionando hoy? Saludos!'
  },

  maestranza: {
    id: 'maestranza',
    nombreRubro: 'Maestranza, Estructuras Metálicas & Montaje Industrial',
    rubroSubheader: 'Maestranza & Montaje Industrial',
    keywords: ['maestranza', 'metal', 'acero', 'estructura', 'soldadura', 'caldereria', 'torno', 'galpon', 'oxicorte', 'plasma'],
    heroImg: '/assets/maestranza/hero-maestranza-soldadura.jpg',
    tagline: 'Taller & Maestranza en {comuna}',
    bajadaHero: 'Fabricación de estructuras metálicas, calderería pesada, corte CNC y montaje industrial en {comuna}. Soldadores calificados bajo norma AWS D1.1, cálculo estructural y control de calidad riguroso.',
    trustBadges: [
      { label: 'Soldadura:', valor: 'AWS D1.1 / ASME' },
      { label: 'Ingeniería:', valor: 'Memoria de Cálculo' },
      { label: 'Pintura:', valor: 'Epóxico / Galvanizado' },
      { label: 'Facturación:', valor: 'Inmediata (SII)' }
    ],
    serviciosTitle: 'Servicios de Maestranza & Fabricación en Acero',
    serviciosDesc: 'Capacidad técnica de maestranza para proyectos industriales, galpones a medida, tolvas, piping y piezas de alto desgaste en {comuna}.',
    cards: [
      {
        linea: 'Línea 01 · Galpones & Naves',
        titulo: 'Fabricación y Montaje de Estructuras Metálicas',
        descripcion: 'Cálculo, armado y montaje de naves industriales, vigas IPE, cerchas reticuladas y pilares de soporte con pintura anticorrosiva.',
        foto: '/assets/maestranza/fabricacion-galpones.jpg',
        eett: 'Perfiles estructurales ASTM A36 / A572 · Planos de taller',
        disponibilidad: 'Proyectos a Medida',
        cta: 'Cotizar Galpón / Estructura'
      },
      {
        linea: 'Línea 02 · Corte de Alta Precisión',
        titulo: 'Corte CNC por Plasma & Oxicorte en Planchas',
        descripcion: 'Corte computarizado de planchas de acero al carbono, bridas, cartelas y piezas complejas con tolerancias milimétricas.',
        foto: '/assets/maestranza/corte-cnc-plasma.jpg',
        eett: 'Espesores hasta 50 mm · Mesa CNC de alto formato',
        disponibilidad: 'Producción en Serie y Piezas Únicas',
        cta: 'Cotizar Corte CNC'
      },
      {
        linea: 'Línea 03 · Cuadrillas en Faena',
        titulo: 'Montaje Estructural & Soldadura en Terreno',
        descripcion: 'Cuadrillas especializadas para faenas de izaje, empernado, soldadura MIG/TIG y refuerzos estructurales en terreno.',
        foto: '/assets/maestranza/montaje-estructural.jpg',
        eett: 'Camión pluma y rigger calificado · AST diario y mutual',
        disponibilidad: 'Turnos Diurnos y Nocturnos',
        cta: 'Cotizar Montaje Terreno'
      },
      {
        linea: 'Línea 04 · Mecanizado de Precisión',
        titulo: 'Mecanizado Industrial & Torno Pesado',
        descripcion: 'Torneado, fresado y recuperación de ejes motrices, bujes de bronce, flanges y piezas de maquinaria pesada.',
        foto: '/assets/maestranza/torno-mecanizado.jpg',
        eett: 'Tornos paralelos hasta 3 metros · Tolerancias mecánicas finas',
        disponibilidad: 'Trabajos de Urgencia en Taller',
        cta: 'Cotizar Mecanizado'
      }
    ],
    sectoresTitle: 'Industrias y Mandantes de Maestranza',
    sectores: [
      { nombre: 'Plantas Industriales & Químicas', desc: 'Mantenimiento Mecánico y Piping' },
      { nombre: 'Constructoras & Edificación', desc: 'Vigas, Pilares e Insertos de Acero' },
      { nombre: 'Minería & Áridos', desc: 'Chutes, Tolvas y Piezas Anti-Desgaste' },
      { nombre: 'Agroindustria & Frigoríficos', desc: 'Galpones Climatizados y Pasarelas' },
      { nombre: 'Sector Portuario & Logístico', desc: 'Portones Industriales y Rampas' },
      { nombre: 'Particulares & Comercio', desc: 'Protecciones, Rejas y Estructuras' }
    ],
    normativas: [
      { tag: 'Calidad de Unión', titulo: 'Soldadores Calificados AWS', desc: 'Procedimientos WPS y personal homologado en procesos SMAW, GMAW y GTAW.' },
      { tag: 'Protección Superficial', titulo: 'Esquemas de Pintura y Galvanizado', desc: 'Preparación de superficie bajo SSPC-SP, fondos anticorrosivos y poliuretano industrial.' },
      { tag: 'Seguridad Operacional', titulo: 'Mutualidad & Cero Daño', desc: 'Supervisión de maniobras críticas de izaje, EPP reglamentario y permisos de trabajo en caliente.' },
      { tag: 'Comercial', titulo: 'Facturación Electrónica SII', desc: 'Estados de pago por avance de obra, guías de despacho y recepción conforme.' }
    ],
    leadMsgTemplate: 'Hola {empresa}, vi su sitio web oficial y necesito cotizar un trabajo de maestranza / estructuras en {comuna}. ¿Cómo podemos coordinar?',
    pitchWhatsAppTemplate: 'Hola {empresa}, buen día. Alexis por acá de UniVerso 693. Vi su taller de maestranza y estructuras en {comuna}. Noté que cuando empresas o constructoras buscan maestranza en Google desde el celular, no encuentran un catálogo claro de ustedes para pedir cotizaciones técnicas directas.\n\nLes armé una vista previa de cómo se vería su sitio web profesional en el celular:\n👉 {linkDemo}\n\nSe las dejamos 100% lista con su propio dominio .CL, sus servicios de soldadura/estructuras y su teléfono por $85.000 IVA inc. pago único. ¿Le echamos un vistazo y se las dejamos activa hoy? Saludos!'
  },

  construccion: {
    id: 'construccion',
    nombreRubro: 'Construcción, Obras Civiles & Remodelaciones',
    rubroSubheader: 'Construcción & Obras Civiles',
    keywords: ['construccion', 'constructora', 'obra', 'civil', 'edificacion', 'radier', 'hormigon', 'remodelacion', 'contratista'],
    heroImg: '/assets/construccion/hero-construccion-obras.jpg',
    tagline: 'Obras Civiles & Edificación en {comuna}',
    bajadaHero: 'Construcción de obras civiles, pavimentación, radieres industriales y proyectos de edificación en {comuna}. Profesionales residentes, cumplimiento riguroso de plazos y mano de obra calificada.',
    trustBadges: [
      { label: 'Supervisión:', valor: 'Profesionales ITO' },
      { label: 'Normativa:', valor: 'OGUC / NCh Vigente' },
      { label: 'Seguridad:', valor: 'Mutual de Seguridad' },
      { label: 'Garantía:', valor: 'Por Contrato Formal' }
    ],
    serviciosTitle: 'Servicios de Construcción & Obras Civiles',
    serviciosDesc: 'Ejecución integral de proyectos de edificación, radieres de alto tráfico, fundaciones y remodelaciones comerciales en {comuna}.',
    cards: [
      {
        linea: 'Línea 01 · Pavimentos & Pisos',
        titulo: 'Radieres Industriales & Hormigón Pulido',
        descripcion: 'Construcción de radieres de alto tonelaje para bodegas, galpones y talleres con corte de juntas de dilatación y helicóptero.',
        foto: '/assets/construccion/radier-pavimentacion.jpg',
        eett: 'Hormigón H25/H30 · Malla acma y fibra estructural',
        disponibilidad: 'Turnos Continuos de Hormigonado',
        cta: 'Cotizar Radier'
      },
      {
        linea: 'Línea 02 · Obra Gruesa',
        titulo: 'Fundaciones, Muros de Contención & Cadenas',
        descripcion: 'Enfierradura, moldajes técnicos y hormigonado de fundaciones corridas, zapatas aisladas y muros de sostenimiento en terreno.',
        foto: '/assets/construccion/fundaciones-muros.jpg',
        eett: 'Acero A63-42H · Moldajes metálicos y fenólicos',
        disponibilidad: 'Ejecución por Etapas',
        cta: 'Cotizar Fundaciones'
      },
      {
        linea: 'Línea 03 · Habilitación Comercial',
        titulo: 'Remodelaciones Comerciales & Oficinas',
        descripcion: 'Transformación de espacios, tabiquería volcánica, cielos modulares, iluminación técnica y terminaciones de alto estándar.',
        foto: '/assets/construccion/remodelaciones-terminaciones.jpg',
        eett: 'Proyectos llave en mano · Pinturas lavables y pisos técnicos',
        disponibilidad: 'Plazos Acotados de Entrega',
        cta: 'Cotizar Remodelación'
      },
      {
        linea: 'Línea 04 · Urbanización & Servicios',
        titulo: 'Zanjas Sanitarias, Alcantarillado & Redes APR',
        descripcion: 'Instalación de tuberías de alcantarillado, cámaras de inspección, drenes de infiltración y canalizaciones subterráneas.',
        foto: '/assets/construccion/zanjas-alcantarillado.jpg',
        eett: 'Tuberías PVC sanitario y HDPE · Pruebas de hermeticidad',
        disponibilidad: 'Cuadrillas con Maquinaria',
        cta: 'Cotizar Urbanización'
      }
    ],
    sectoresTitle: 'Ámbitos de Construcción en Faena',
    sectores: [
      { nombre: 'Centros Logísticos & Bodegas', desc: 'Radieres de Alto Tráfico y Galpones' },
      { nombre: 'Parcelas de Agrado & Loteos', desc: 'Cierres, Caminos y Casas Llave en Mano' },
      { nombre: 'Comercio & Retail', desc: 'Habilitación de Sucursales y Locales' },
      { nombre: 'Comunidades & Condominios', desc: 'Pavimentos, Muros y Reparaciones' },
      { nombre: 'Obras Públicas & APR', desc: 'Redes Sanitarias y Pavimentación' },
      { nombre: 'Clientes Particulares', desc: 'Ampliaciones y Proyectos Residenciales' }
    ],
    normativas: [
      { tag: 'Técnica', titulo: 'Cumplimiento Estricto OGUC', desc: 'Ejecución rigurosa según ordenanza general de urbanismo y construcciones y normas chilenas INN.' },
      { tag: 'Prevención', titulo: 'Mutualidad de Seguridad CChC', desc: 'Protocolos de seguridad en excavaciones profundas, trabajos en altura y uso obligatorio de EPP.' },
      { tag: 'Garantía', titulo: 'Contrato y Boleta de Garantía', desc: 'Formalización legal con hitos de pago contra recepción conforme de hitos de obra.' },
      { tag: 'Tributario', titulo: 'Facturación Electrónica SII', desc: 'Emisión de Facturas exentas o afectas según régimen de construcción y estados de pago.' }
    ],
    leadMsgTemplate: 'Hola {empresa}, vi su sitio web oficial y necesito cotizar una obra / construcción en {comuna}. ¿Podemos agendar una visita técnica?',
    pitchWhatsAppTemplate: 'Hola {empresa}, buen día. Alexis por acá de UniVerso 693. Vi su constructora en {comuna}. Noté que quienes buscan contratistas u obras civiles en Google desde el celular no encuentran una página clara de ustedes para ver proyectos y pedir presupuestos rápidos.\n\nLes armé una vista previa de cómo quedaría su página web en el celular con su catálogo de obras y botón de cotización directa a su WhatsApp:\n👉 {linkDemo}\n\nSe las dejamos 100% activa con su propio dominio .CL y su teléfono por $85.000 IVA inc. pago único (sin mensualidades obligatorias). ¿Le damos una mirada y se las dejamos lista hoy? Saludos!'
  },

  seguridad: {
    id: 'seguridad',
    nombreRubro: 'Seguridad Privada, Guardias OS-10 & Vigilancia',
    rubroSubheader: 'Seguridad Privada & Vigilancia',
    keywords: ['seguridad', 'guardia', 'vigilancia', 'os10', 'cctv', 'camara', 'porteria', 'ronda', 'control acceso'],
    heroImg: '/assets/seguridad/hero-seguridad-vigilancia.jpg',
    tagline: 'Servicios de Vigilancia y Seguridad en {comuna}',
    bajadaHero: 'Guardias de seguridad acreditados con certificación OS-10 de Carabineros, control de acceso perimetral y vigilancia 24/7 en {comuna}. Supervisión permanente en terreno y respuesta rápida.',
    trustBadges: [
      { label: 'Acreditación:', valor: 'OS-10 Carabineros' },
      { label: 'Supervisión:', valor: 'Terreno Móvil 24/7' },
      { label: 'Seguro:', valor: 'Responsabilidad Civil' },
      { label: 'Facturación:', valor: 'Inmediata (SII)' }
    ],
    serviciosTitle: 'Servicios de Seguridad & Vigilancia Integral',
    serviciosDesc: 'Cobertura de seguridad para condominios, empresas, bodegas industriales y obras de construcción en {comuna}.',
    cards: [
      {
        linea: 'Línea 01 · Personal Acreditado',
        titulo: 'Guardias de Seguridad con Certificación OS-10',
        descripcion: 'Guardias uniformados para puestos fijos, recepción, conserjería y vigilancia disuasiva diurna o nocturna.',
        foto: '/assets/seguridad/guardias-os10.jpg',
        eett: 'Curso OS-10 vigente · Examen psicológico al día · Dotación completa',
        disponibilidad: 'Turnos 4x4, 6x1 y 12 Horas',
        cta: 'Cotizar Guardias OS-10'
      },
      {
        linea: 'Línea 02 · Rondas Perimetrales',
        titulo: 'Patrullaje Móvil & Rondas Nocturnas',
        descripcion: 'Vehículos de patrullaje identificados con balizas para fiscalización de condominios, parques industriales y parcelas.',
        foto: '/assets/seguridad/patrullaje-movil.jpg',
        eett: 'Monitoreo GPS del vehículo · Libro de rondas digitalizado',
        disponibilidad: 'Supervisión Continua 24/7',
        cta: 'Cotizar Patrullaje'
      },
      {
        linea: 'Línea 03 · Filtro Perimetral',
        titulo: 'Control de Acceso Peatonal & Vehicular',
        descripcion: 'Registro de visitas, control de proveedores, apertura de portones automáticos y barreras de acceso en portería.',
        foto: '/assets/seguridad/control-acceso.jpg',
        eett: 'Registro digital de cédula de identidad · Protocolo de ingreso',
        disponibilidad: 'Puestos de Guardia 24 Horas',
        cta: 'Cotizar Control Acceso'
      },
      {
        linea: 'Línea 04 · Tecnología de Vigilancia',
        titulo: 'Instalación de Cámaras CCTV & Alarmas',
        descripcion: 'Sistemas de videovigilancia IP en alta definición, visión nocturna infrarroja y conexión directa al celular.',
        foto: '/assets/seguridad/camaras-cctv.jpg',
        eett: 'Resolución Full HD/4K · Grabación NVR continua · Alertas perimetrales',
        disponibilidad: 'Instalación y Mantención',
        cta: 'Cotizar Cámaras CCTV'
      }
    ],
    sectoresTitle: 'Instalaciones Protegidas Habituales',
    sectores: [
      { nombre: 'Condominios & Edificios Habitacionales', desc: 'Conserjería, Acceso y Rondas' },
      { nombre: 'Parques Industriales & Bodegas', desc: 'Custodia de Mercaderías y Portones' },
      { nombre: 'Faenas de Construcción & Obras', desc: 'Prevención de Robo de Materiales y Maquinaria' },
      { nombre: 'Centros Médicos & Clínicas', desc: 'Atención a Público y Control de Pacientes' },
      { nombre: 'Colegios e Instituciones', desc: 'Seguridad Escolar y Perímetro' },
      { nombre: 'Eventos Corporativos & Masivos', desc: 'Dotación Temporal de Guardias' }
    ],
    normativas: [
      { tag: 'Legal', titulo: 'Certificación OS-10 Carabineros', desc: 'Todos los guardias cuentan con credencial vigente otorgada por la Prefectura de Seguridad Privada.' },
      { tag: 'Operacional', titulo: 'Supervisión en Terreno 24/7', desc: 'Supervisores móviles visitan las posturas de forma inopinada para verificar novedades y alerta.' },
      { tag: 'Póliza', titulo: 'Seguro de Responsabilidad Civil', desc: 'Respaldo financiero y póliza de seguro ante siniestros en las instalaciones asignadas.' },
      { tag: 'Tributario', titulo: 'Facturación Electrónica SII', desc: 'Servicio formal con facturación mensual por puesto o por hora turno contratado.' }
    ],
    leadMsgTemplate: 'Hola {empresa}, vi su sitio web oficial y necesito cotizar servicio de guardias / seguridad en {comuna}. ¿Tienen disponibilidad?',
    pitchWhatsAppTemplate: 'Hola {empresa}, buen día. Alexis por acá de UniVerso 693. Vi su empresa de seguridad y vigilancia en {comuna}. Noté que quienes buscan guardias o seguridad en Google desde el celular no encuentran una página moderna de ustedes para solicitar propuestas formales.\n\nLes armé una vista previa de cómo quedaría su página web en el celular con sus servicios y botón de cotización directa a su WhatsApp:\n👉 {linkDemo}\n\nSe las dejamos 100% activa con su propio dominio .CL y su teléfono por $85.000 IVA inc. pago único. ¿Le damos una mirada y se las dejamos andando hoy? Saludos!'
  }
};

/**
 * Detecta el rubro adecuado buscando keywords en el parámetro 'r' o en el nombre de la empresa.
 * Por defecto retorna 'maquinaria' si nada coincide.
 */
export function getRubroConfig(rubroParam: string, nombreEmpresa: string): RubroConfig {
  const cleanR = (rubroParam || '').toLowerCase().trim();
  const cleanN = (nombreEmpresa || '').toLowerCase().trim();

  // 1. Coincidencia directa por id
  if (cleanR && RUBROS_CATALOG[cleanR]) {
    return RUBROS_CATALOG[cleanR];
  }

  // 2. Coincidencia por keywords en rubroParam
  for (const config of Object.values(RUBROS_CATALOG)) {
    if (config.keywords.some(k => cleanR.includes(k))) {
      return config;
    }
  }

  // 3. Auto-detección por keywords en el nombre de la empresa
  for (const config of Object.values(RUBROS_CATALOG)) {
    if (config.keywords.some(k => cleanN.includes(k))) {
      return config;
    }
  }

  // 4. Default: maquinaria (que es el rubro activo que el usuario está prospectando intensamente)
  return RUBROS_CATALOG.maquinaria;
}
