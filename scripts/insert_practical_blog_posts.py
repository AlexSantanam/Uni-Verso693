import json

file_path = 'src/data/blog.ts'
with open(file_path, 'r', encoding='utf-8') as f:
    text = f.read()

target = 'export const posts: Post[] = ['

new_posts = '''export const posts: Post[] = [
  {
    slug: 'cuanto-cuesta-pagina-web-chile-precios-reales',
    seoTitle: '¿Cuánto cuesta una página web en Chile? Precios reales 2026',
    title: '¿Cuánto cuesta realmente una página web en Chile? Guía de precios y costos ocultos (2026)',
    description:
      'Desglose transparente de lo que cuesta una página web en Chile: desde $150.000 hasta software a medida. Dominios NIC Chile, hosting y costos ocultos.',
    date: '2026-11-06',
    minutes: 7,
    tags: ['Precios Web Chile', 'Diseño Web PyME', 'Costos Web'],
    body: [
      {
        type: 'p',
        text: 'Una de las preguntas más frecuentes de cualquier emprendedor o dueño de negocio en Chile es: "¿Cuánto me va a costar realmente tener una página web?". Si buscas en Google, encontrarás cotizaciones que van desde los $30.000 pesos en avisos informales hasta más de $2.000.000 en agencias tradicionales. Esta dispersión abruma y genera desconfianza. A continuación, desglosamos los rangos de precios del mercado chileno, qué incluye cada uno y los costos ocultos que nadie te dice antes de firmar.',
      },
      { type: 'h2', text: 'Los 4 rangos de precios en el mercado web chileno' },
      {
        type: 'ul',
        items: [
          '1. Creadores DIY (Wix, Shopify, Canva): Parecen "gratis" o muy baratos al inicio ($0 a $30.000), pero exigen pagar mensualidades en dólares que suben rápido ($15.000 a $45.000/mes) por el dominio, funciones básicas o quitar publicidad. Además, debes diseñarla tú mismo invirtiendo decenas de horas de tu tiempo.',
          '2. Sitios Web Profesionales Llave en Mano ($150.000 a $285.000 CLP IVA incluido): Es el estándar ideal para la pequeña y mediana empresa. Un equipo profesional maqueta tu sitio sobre plantillas optimizadas de alto rendimiento, incluye hosting, dominio .CL, certificado SSL, botón directo a WhatsApp y entrega garantizada en 5 a 10 días hábiles.',
          '3. Agencias de Publicidad Tradicionales ($600.000 a $1.800.000 CLP): Suelen cobrar más por reuniones ejecutivas y gastos operativos. En muchos casos el resultado técnico es similar a un sitio llave en mano (utilizan WordPress), pero el plazo de entrega se extiende de 1 a 3 meses.',
          '4. Desarrollo de Software y Plataformas a Medida ($2.000.000+ CLP): Justificado exclusivamente para empresas que requieren portales complejos, integraciones con ERPs internos, cotizadores industriales de metros cuadrados, pasarelas avanzadas o sistemas con inteligencia artificial.',
        ],
      },
      { type: 'h2', text: 'Los 4 costos obligatorios que debes considerar' },
      {
        type: 'p',
        text: 'Toda página web en internet necesita 4 elementos básicos para existir. Cuando compares cotizaciones, asegúrate de que no te cobren estos ítems como "adicionales sorpresa":',
      },
      {
        type: 'ul',
        items: [
          'Dominio .CL: Se registra directamente en NIC Chile (Universidad de Chile) y tiene un costo oficial de $10.950 CLP al año. El dominio debe quedar siempre a tu nombre o el de tu empresa.',
          'Hosting y Certificado SSL: Es el servidor donde viven los archivos y el candado de seguridad obligatorio para Google. Un buen hosting optimizado cuesta entre $35.000 y $90.000 CLP al año.',
          'Correos Corporativos: Indispensables para proyectar seriedad (ej: contacto@tunegocio.cl). Pueden funcionar en el hosting básico o en Google Workspace ($6 USD/mes por casilla).',
          'Mantenimiento y Soporte Técnico: Actualizaciones de seguridad, respaldos periódicos y cambios de precios o promociones.',
        ],
      },
      { type: 'h2', text: '¿Venta directa o Arriendo Mensual? La nueva alternativa para cuidar la caja' },
      {
        type: 'p',
        text: 'Para muchas PyMEs que están partiendo o que prefieren no descapitalizarse pagando $200.000 de golpe, en UNIVERSO693 creamos el programa Impulsa ProPyme: puedes acceder a tu sitio web completamente listo y optimizado bajo modalidad de arriendo desde $19.900/mes, con hosting, soporte y cambios continuos incluidos. También existe la modalidad de Derecho a Compra en 24 cuotas.',
      },
      {
        type: 'cta',
        text: 'Revisa nuestros Planes Transparentes desde $150.000 IVA incluido con entrega en 5 días hábiles, o cotiza tu web en arriendo mensual con nosotros.',
      },
    ],
  },
  {
    slug: 'por-que-tu-pagina-web-no-vende-errores-comunes',
    seoTitle: '¿Por qué tu página web no vende? 5 errores en negocios chilenos',
    title: '¿Por qué tu página web no te trae clientes? Los 5 errores más comunes en negocios chilenos',
    description:
      'Descubre por qué tu sitio web tiene visitas pero nadie te cotiza ni te compra. Los 5 fallos técnicos y de diseño que espantan a tus clientes.',
    date: '2026-11-06',
    minutes: 6,
    tags: ['Conversión Web', 'Ventas WhatsApp', 'Diseño Web'],
    body: [
      {
        type: 'p',
        text: 'Tener una página web bonita ya no es garantía de ventas. Decenas de empresas en Chile invierten en publicidad en Google o redes sociales, logran que cientos de personas visiten su sitio, pero el teléfono nunca suena y la bandeja de WhatsApp sigue vacía. Si este es tu caso, no es que tu servicio sea malo: es que tu página web comete uno o más de los 5 errores críticos de conversión.',
      },
      { type: 'h2', text: '1. El error del "Sitio Folleto": Misión, Visión y Cero Oferta Clara' },
      {
        type: 'p',
        text: 'El cliente promedio que llega a tu sitio web decide en menos de 4 segundos si se queda o si vuelve a Google a buscar a tu competencia. Si lo primero que ve al entrar es un párrafo largo sobre "Somos una empresa líder con altos estándares de excelencia", se irá. Tu pantalla principal (Hero) debe responder con claridad inmediata tres preguntas: ¿Qué haces?, ¿Para quién es?, y ¿Cómo te contacto ahora mismo?',
      },
      { type: 'h2', text: '2. No tener un botón de WhatsApp flotante y visible en el celular' },
      {
        type: 'p',
        text: 'En Chile, más del 85% de las visitas a sitios web de servicios y comercio provienen de smartphones. El consumidor chileno no quiere llenar formularios fríos de 8 campos ni esperar 48 horas a que le respondan un correo: quiere inmediatez. Un botón flotante de WhatsApp en la esquina inferior con un mensaje precargado (ej: "Hola, vi su web y quiero cotizar...") aumenta la tasa de contacto entre un 40% y un 70%.',
      },
      { type: 'h2', text: '3. Lentitud de carga: más de 3 segundos es muerte digital' },
      {
        type: 'p',
        text: 'Según estudios de Google, el 53% de los usuarios abandona una página móvil si tarda más de 3 segundos en abrirse. Muchas agencias instalan temas pesados de WordPress con 30 plugins que ralentizan la carga a 6 u 8 segundos sobre conexiones 4G/5G en Chile. Tu web debe estar optimizada en velocidad técnica con puntajes Core Web Vitals superiores a 90 puntos.',
      },
      { type: 'h2', text: '4. Ocultar los precios o no dar una referencia clara' },
      {
        type: 'p',
        text: 'El miedo a mostrar precios hace que muchas empresas escondan todo bajo un "Cotizar aquí". La consecuencia es que el cliente asume que el servicio es excesivamente caro o prefiere irse a un competidor que sí tenga precios de referencia o paquetes claros. Mostrar "Planes desde $X" filtra a los curiosos y te trae prospectos con presupuesto real.',
      },
      { type: 'h2', text: '5. La falta de llamado a la acción (CTA) concreto' },
      {
        type: 'p',
        text: 'No asumas que el visitante sabe qué hacer. En cada sección de tu sitio debe haber un botón directo y contrastante que le indique el siguiente paso: "Agendar Hora por WhatsApp", "Ver Carta y Pedir a Mesa", o "Simular Cuota".',
      },
      {
        type: 'cta',
        text: '¿Tu web actual no te está generando prospectos? Escríbenos para auditar tu sitio gratis o renueva tu presencia digital con un diseño optimizado para convertir.',
      },
    ],
  },
  {
    slug: 'dominio-cl-vs-com-chile-cual-conviene',
    seoTitle: 'Dominio .CL vs .COM en Chile: ¿Cuál le conviene a tu empresa?',
    title: 'Dominio .CL vs .COM en Chile: Diferencias de SEO local, costo en NIC Chile y confianza',
    description:
      '¿Debes registrar tu web con .cl o .com? Comparamos posicionamiento en Google Chile, costo de renovación en NIC Chile y confianza del comprador chileno.',
    date: '2026-11-06',
    minutes: 5,
    tags: ['Dominios Chile', 'NIC Chile', 'SEO Chile'],
    body: [
      {
        type: 'p',
        text: 'Al momento de digitalizar un negocio o lanzar una nueva marca en Chile, una de las primeras decisiones técnicas es la extensión del dominio: ¿debo comprar un .CL o un .COM? Aunque para muchos parece una simple elección estética, la terminación de tu dirección web impacta directamente en tu posicionamiento en Google, en los costos de renovación anual y en la confianza psicológica de tus clientes.',
      },
      { type: 'h2', text: '1. Ventaja en Google: SEO Geolocalizado en Chile' },
      {
        type: 'p',
        text: 'Los motores de búsqueda (Google Chile) aplican un criterio de relevancia geográfica. Si un usuario en Viña del Mar, Concepción o Santiago busca "abogado laboral", "reparación de aire acondicionado" o "veterinaria de urgencia", Google premia a los dominios con extensión territorial (.CL) por encima de los genéricos (.COM), interpretando de inmediato que la empresa atiende y factura localmente.',
      },
      { type: 'h2', text: '2. Confianza del comprador chileno' },
      {
        type: 'p',
        text: 'En el comercio digital y los servicios locales, el dominio .CL genera una percepción de empresa formal, registrada y amparada por la legislación chilena (SERNAC, boletas y facturas SII). Un sitio .COM sin dirección física local suele generar dudas sobre si se trata de un negocio chileno o de una plataforma internacional sin soporte en el país.',
      },
      { type: 'h2', text: '3. Costos y estabilidad: NIC Chile vs. Registradores Internacionales' },
      {
        type: 'ul',
        items: [
          'Dominio .CL: Se administra directamente en NIC Chile (organismo de la Universidad de Chile). Su valor es en pesos chilenos ($10.950 CLP al año), sin cargos en dólares ni variaciones por tipo de cambio.',
          'Dominio .COM: Se contrata con registradores privados internacionales (GoDaddy, Namecheap, etc.). Si bien el primer año suele costar $10 o $12 USD, las renovaciones posteriores suelen subir a $18 - $25 USD más impuestos, cobrados en moneda extranjera.',
        ],
      },
      { type: 'h2', text: '¿Cuándo conviene un .COM?' },
      {
        type: 'p',
        text: 'El dominio .COM es recomendable si tu empresa vende servicios digitales a nivel internacional (Latinoamérica, España o EE.UU.), si eres una empresa de software tipo SaaS o si exportas productos al extranjero. En todos los demás casos donde tus clientes están en Chile, el .CL es la opción ganadora.',
      },
      { type: 'h2', text: 'La mejor práctica recomendada: Proteger ambas extensiones' },
      {
        type: 'p',
        text: 'La estrategia profesional es comprar tu dominio principal en .CL (para alojar tu sitio y posicionar en Google) y, al mismo tiempo, adquirir el .COM para configurarlo con una redirección automática al .CL. Así evitas que competidores o terceros utilicen el nombre de tu marca.',
      },
      {
        type: 'cta',
        text: 'En todos nuestros planes web incluimos el registro y configuración oficial de tu dominio .CL por 1 año. Consulta con nuestro equipo para verificar la disponibilidad de tu marca.',
      },
    ],
  },
  {
    slug: 'certificado-ssl-sitio-no-seguro-chile',
    seoTitle: 'Certificado SSL: Por qué Google marca tu web como no segura',
    title: 'Certificado SSL: Qué es y por qué Google marca tu página web como "Sitio No Seguro"',
    description:
      'Qué significa el candado HTTPS, cómo afecta tus ventas y por qué el 70% de los usuarios abandona una página web si ve la advertencia de sitio no seguro.',
    date: '2026-11-06',
    minutes: 5,
    tags: ['Seguridad Web', 'Certificado SSL', 'SEO Google'],
    body: [
      {
        type: 'p',
        text: '¿Has entrado alguna vez a una página web y tu navegador te muestra un triángulo rojo con la advertencia "La conexión no es privada" o "Sitio no seguro"? Si a tu sitio web le ocurre esto, estás perdiendo más del 70% de tus ventas potenciales antes de que el cliente siquiera lea tu primera línea. En esta guía te explicamos qué es el Certificado SSL, por qué es obligatorio y cómo asegurarte de tenerlo activo sin pagar de más.',
      },
      { type: 'h2', text: '¿Qué es un Certificado SSL y el protocolo HTTPS?' },
      {
        type: 'p',
        text: 'SSL (Secure Sockets Layer) es una tecnología de cifrado que encripta los datos que viajan entre el celular o computador del visitante y el servidor de tu página web. Cuando un sitio cuenta con SSL, la dirección web comienza con https:// (en lugar de http://) y los navegadores modernos muestran el ícono de candado.',
      },
      { type: 'h2', text: 'El impacto devastador de no tener SSL en tu negocio' },
      {
        type: 'ul',
        items: [
          'Fuga masiva de clientes: Google Chrome, Safari y Edge muestran una advertencia a pantalla completa que asusta al usuario, sugiriendo que el sitio podría robar sus contraseñas o datos bancarios.',
          'Penalización directa en Google: Desde 2018, HTTPS es un factor oficial de ranking. Si tu página no tiene SSL, Google te hunde en los resultados de búsqueda en favor de tus competidores seguros.',
          'Imposibilidad de cobrar con Webpay: Pasarelas de pago como Transbank Webpay Plus, Mercado Pago o Flow exigen obligatoriamente que tu sitio funcione bajo HTTPS con cifrado TLS 1.3.',
        ],
      },
      { type: 'h2', text: 'Cuidado con los cobros abusivos de SSL' },
      {
        type: 'p',
        text: 'Muchas empresas de hosting tradicionales en Chile y agencias poco transparentes cobran entre $40.000 y $80.000 pesos anuales a clientes desinformados por "activar el candadito SSL". La realidad tecnológica hoy es que existen certificados SSL gratuitos, automatizados y de estándar mundial (como Let\'s Encrypt y Cloudflare) que se renuevan solos cada 90 días con máxima seguridad.',
      },
      {
        type: 'cta',
        text: 'En UNIVERSO693 todos nuestros sitios web y planes ProPyme incluyen Certificado SSL de alta seguridad y cifrado bancario de por vida sin costo adicional.',
      },
    ],
  },
  {
    slug: 'catalogo-whatsapp-vs-tienda-online-webpay',
    seoTitle: 'Catálogo con WhatsApp vs Tienda Webpay: ¿Cuál necesitas?',
    title: 'Catálogo con pedidos a WhatsApp vs. Tienda Online con Webpay: ¿Qué le conviene más a tu negocio?',
    description:
      'Comparamos catálogo digital directo a WhatsApp vs e-commerce con carrito y Webpay. Costos, comisiones, fricción de compra y cuál vende más según tu rubro.',
    date: '2026-11-06',
    minutes: 6,
    tags: ['E-Commerce Chile', 'WhatsApp Business', 'Webpay Plus'],
    body: [
      {
        type: 'p',
        text: 'Cuando un negocio chileno decide digitalizar sus ventas de productos o menús, suele pensar inmediatamente en una "Tienda Online con Carrito de Compras". Sin embargo, muchos descubren meses después que sus clientes abandonan el proceso de compra porque consideran engorroso ingresar sus datos de despacho y pagar con tarjeta para un pedido cotidiano. Aquí comparamos el modelo de Catálogo Interactivo con WhatsApp frente a la Tienda Online tradicional con Webpay.',
      },
      { type: 'h2', text: 'Modelo 1: Catálogo Interactivo con Pedido a WhatsApp' },
      {
        type: 'p',
        text: 'En este modelo, el cliente entra a tu web, navega por tus productos o platos mediante fotos y categorías, arma su pedido y al presionar "Enviar Pedido", se le abre automáticamente su WhatsApp con el detalle exacto: productos, cantidades, total calculado, dirección y forma de entrega.',
      },
      {
        type: 'ul',
        items: [
          'Ventajas: Cero comisiones bancarias por transacción. Trato humano y directo con el cliente. No exige que el usuario cree una cuenta ni recuerde contraseñas.',
          'Ideal para: Restaurantes, comida rápida, fuentes de soda (carta QR en mesa o delivery estilo OlaClick), almacenes de barrio, pastelerías, verdulerías y servicios con atención personalizada.',
        ],
      },
      { type: 'h2', text: 'Modelo 2: Tienda Online E-Commerce con Pasarela Webpay Plus' },
      {
        type: 'p',
        text: 'En este modelo, todo el proceso de cobro y validación de stock es 100% automático. El cliente selecciona productos, ingresa su dirección de despacho, calcula el costo del envío y paga en el momento con tarjeta de Débito, Crédito en cuotas o Prepago mediante Transbank Webpay Plus.',
      },
      {
        type: 'ul',
        items: [
          'Ventajas: Venta autónoma 24/7 sin necesidad de que un vendedor responda mensajes. Control automático de inventario y emisión de boleta.',
          'Ideal para: Tiendas de ropa, accesorios, tecnología, repuestos, cosmética y negocios con envíos a todo Chile mediante Starken, Blue Express o Chilexpress.',
        ],
      },
      { type: 'h2', text: '¿Cuál debes elegir?' },
      {
        type: 'p',
        text: 'Si tu negocio vende comida, reparto local en tu comuna o productos a medida, parte con un Catálogo directo a WhatsApp: es más rápido, más económico y convierte un 60% más en compras impulsivas. Si vendes productos estandarizados a nivel nacional con más de 50 ítems, una Tienda con Webpay es tu mejor aliada.',
      },
      {
        type: 'cta',
        text: 'En UNIVERSO693 desarrollamos ambas soluciones: Catálogo PWA interactivo con pedidos a WhatsApp (Plan Plus $250.000) o Tienda Online completa con Webpay (Plan Store $285.000).',
      },
    ],
  },
  {
    slug: 'comprar-o-arrendar-pagina-web-pymes-chile',
    seoTitle: '¿Comprar o arrendar una página web? Guía para PyMEs en Chile',
    title: '¿Comprar o arrendar tu página web? Cuándo conviene pagar de una sola vez y cuándo pagar mensual',
    description:
      'Análisis financiero para empresas chilenas: costos de compra única vs arriendo web con soporte. Cómo cuidar tu flujo de caja sin quedar atrapado.',
    date: '2026-11-06',
    minutes: 6,
    tags: ['Arriendo Web', 'Finanzas PyME', 'Impulsa ProPyme'],
    body: [
      {
        type: 'p',
        text: 'Históricamente, la única forma de tener una página web corporativa en Chile era pagar una suma importante por adelantado ($200.000 a $600.000 CLP) a un diseñador o agencia. Sin embargo, en los últimos años el modelo de Software as a Service (SaaS) y el arriendo mensual de plataformas digitales ha ganado terreno en el mundo de las PyMEs. ¿Qué modelo le conviene más a tu empresa?',
      },
      { type: 'h2', text: 'Modalidad 1: Compra Directa (Pago Único Llave en Mano)' },
      {
        type: 'ul',
        items: [
          'Cómo funciona: Pagas el valor del desarrollo (por ejemplo, nuestros planes de $150.000 a $285.000 IVA incluido), se entrega en 5 a 10 días y el sitio es 100% de tu propiedad desde el primer día.',
          'Para quién es ideal: Empresas con liquidez que ya tienen presupuesto asignado y que cuentan con un equipo o tiempo para administrar sus propios contenidos.',
          'Punto a considerar: Debes considerar que al término del primer año deberás renovar tu dominio en NIC Chile y tu servidor de hosting.',
        ],
      },
      { type: 'h2', text: 'Modalidad 2: Arriendo Mensual Todo Incluido (Impulsa ProPyme)' },
      {
        type: 'ul',
        items: [
          'Cómo funciona: No pagas costos iniciales de desarrollo. Pagas una mensualidad fija y accesible (desde $19.900 a $45.000/mes) que incluye el diseño, la puesta en marcha, el hosting de alta velocidad, certificado SSL y soporte técnico continuo para cambios de fotos y precios.',
          'Para quién es ideal: Nuevos negocios, emprendedores, restaurantes o profesionales que no quieren descapitalizarse ni perder tiempo lidiando con servidores y problemas técnicos.',
          'La gran ventaja: Si necesitas cambiar un precio, agregar un producto o actualizar tu horario, simplemente lo solicitas y tu equipo de soporte lo ejecuta sin cobros adicionales.',
        ],
      },
      { type: 'h2', text: 'Modalidad 3: Derecho a Compra (Leasing Digital a 24 Meses)' },
      {
        type: 'p',
        text: 'Es el punto medio perfecto: pagas una cuota mensual accesible durante 24 meses mientras disfrutas del hosting y soporte continuo. Al cumplirse el mes 24, el código fuente y la plataforma pasan a ser 100% de propiedad definitiva de tu empresa.',
      },
      {
        type: 'cta',
        text: 'En UNIVERSO693 te damos la libertad de elegir: compra tu web con pago único desde $150.000 IVA incluido o actívala hoy en arriendo mensual desde $19.900/mes.',
      },
    ],
  },
'''

if target in text:
    text_updated = text.replace(target, new_posts, 1)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(text_updated)
    print("SUCCESS: 6 PRACTICAL BLOG POSTS INSERTED")
else:
    print("TARGET NOT FOUND")

