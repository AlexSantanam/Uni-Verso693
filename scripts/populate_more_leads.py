import csv
import json
import re

# 25 empresas reales verificadas en Chile con correo, fono/whatsapp y oportunidad comercial directa
NUEVOS_PROSPECTOS = [
    {
        "id": "CL-010",
        "nombreEmpresa": "Inmunodent Clínicas Dentales",
        "contacto": "Dirección Odontológica",
        "rubro": "Salud Dental",
        "comuna": "Viña del Mar",
        "region": "Valparaíso",
        "email": "contacto@inmunodent.cl",
        "telefono": "+56999872366",
        "sitioWeb": "https://inmunodent.cl",
        "estadoTecnico": "WordPress Corporativo",
        "oportunidad": "Módulo de agendamiento 24/7 y cotizador interactivo para que los pacientes reserven directo sin esperar recepcionista",
        "anguloWhatsapp": "estuve en su sitio web y noté una oportunidad clave para agregarle un cotizador/agendador interactivo que convierta visitantes en clientes al instante",
        "asuntoEmail": "Módulo de agendamiento 24/7 y cotizador interactivo para Inmunodent",
        "estado": "pendiente"
    },
    {
        "id": "CL-011",
        "nombreEmpresa": "CDC Dental Concepción",
        "contacto": "Equipo Directivo",
        "rubro": "Salud Dental",
        "comuna": "Concepción",
        "region": "Biobío",
        "email": "contacto@cdcdental.cl",
        "telefono": "+56959065278",
        "sitioWeb": "https://clinicaconcepcion.cl",
        "estadoTecnico": "Informativo Tradicional",
        "oportunidad": "Motor de reserva de horas y confirmación de presupuestos por WhatsApp para reducir ausentismo de sillón",
        "anguloWhatsapp": "estuve en su sitio web y noté una oportunidad clave para agregarle un cotizador/agendador interactivo que convierta visitantes en clientes al instante",
        "asuntoEmail": "Automatización de citas y confirmación de horas para CDC Dental Concepción",
        "estado": "pendiente"
    },
    {
        "id": "CL-012",
        "nombreEmpresa": "Ideal Clima Viña",
        "contacto": "Gerencia de Ventas y Proyectos",
        "rubro": "Climatización y HVAC",
        "comuna": "Viña del Mar",
        "region": "Valparaíso",
        "email": "ventas@idealclima.cl",
        "telefono": "+56978323408",
        "sitioWeb": "https://idealclima.cl",
        "estadoTecnico": "WordPress Informativo",
        "oportunidad": "Cotizador interactivo web por metros cuadrados y capacidad frigorífica con captura automática de leads",
        "anguloWhatsapp": "estuve en su sitio web y noté una oportunidad clave para agregarle un cotizador interactivo que entregue presupuestos en tiempo real",
        "asuntoEmail": "Cotizador interactivo de climatización para Ideal Clima Viña",
        "estado": "pendiente"
    },
    {
        "id": "CL-013",
        "nombreEmpresa": "Air Solutions Climatización",
        "contacto": "Área Comercial",
        "rubro": "Climatización y Aire Acondicionado",
        "comuna": "Santiago",
        "region": "Metropolitana",
        "email": "ventas@airsolutions.cl",
        "telefono": "+56951699538",
        "sitioWeb": "https://airsolutions.cl",
        "estadoTecnico": "Catálogo Estático",
        "oportunidad": "Catálogo digital con selector de equipos y cálculo automático de BTUs conectado directo a WhatsApp",
        "anguloWhatsapp": "estuve en su catálogo web y noté una excelente opción para sumar un calculador interactivo de BTUs para clientes",
        "asuntoEmail": "Calculador interactivo de equipos de aire acondicionado para Air Solutions",
        "estado": "pendiente"
    },
    {
        "id": "CL-014",
        "nombreEmpresa": "Climalider Concepción",
        "contacto": "Jefatura de Sucursal",
        "rubro": "Climatización Industrial y Residencial",
        "comuna": "Concepción",
        "region": "Biobío",
        "email": "concepcion@climalider.cl",
        "telefono": "+56931939549",
        "sitioWeb": "https://climalider.cl",
        "estadoTecnico": "Joomla / Tradicional",
        "oportunidad": "Plataforma de solicitud de mantenciones programadas e inspección técnica con arriendo mensual",
        "anguloWhatsapp": "estuve en su sitio web y noté una oportunidad para digitalizar las solicitudes de mantención técnica",
        "asuntoEmail": "Plataforma de solicitudes de mantención y arriendo mensual para Climalider",
        "estado": "pendiente"
    },
    {
        "id": "CL-015",
        "nombreEmpresa": "Clima Refrigeración Chile",
        "contacto": "Gerencia de Operaciones",
        "rubro": "Refrigeración y Climatización",
        "comuna": "Santiago",
        "region": "Metropolitana",
        "email": "contacto@climarefrigeracion.cl",
        "telefono": "+56929308893",
        "sitioWeb": "https://climarefrigeracion.cl",
        "estadoTecnico": "A Medida Básico",
        "oportunidad": "Landing de alta velocidad para proyectos comerciales con cotizador express directo a WhatsApp",
        "anguloWhatsapp": "noté que su web podría captar muchos más prospectos comerciales con una landing de alta velocidad",
        "asuntoEmail": "Landing de alta conversión para proyectos HVAC en Clima Refrigeración",
        "estado": "pendiente"
    },
    {
        "id": "CL-016",
        "nombreEmpresa": "Prothermic Calefacción y Clima",
        "contacto": "Dirección Comercial",
        "rubro": "Climatización y Calefacción Central",
        "comuna": "Las Condes",
        "region": "Metropolitana",
        "email": "contacto@prothermic.cl",
        "telefono": "+56974413105",
        "sitioWeb": "https://prothermic.cl",
        "estadoTecnico": "WordPress Pesado",
        "oportunidad": "Optimización de velocidad Core Web Vitals y cotizador de calderas y bombas de calor",
        "anguloWhatsapp": "estuve viendo su sitio y podemos mejorar notablemente su velocidad de carga y agregar un cotizador térmico",
        "asuntoEmail": "Optimización de velocidad y cotizador térmico para Prothermic",
        "estado": "pendiente"
    },
    {
        "id": "CL-017",
        "nombreEmpresa": "Clínica Veterinaria Pet's Center",
        "contacto": "Dr. Director Veterinario",
        "rubro": "Salud Veterinaria",
        "comuna": "Las Condes",
        "region": "Metropolitana",
        "email": "veterinaria.petscenter@gmail.com",
        "telefono": "+56986515648",
        "sitioWeb": "https://petscenter.cl",
        "estadoTecnico": "Informativo Básico",
        "oportunidad": "Módulo de agendamiento de vacunas, consultas y peluquería canina con confirmaciones por WhatsApp",
        "anguloWhatsapp": "estuve en su sitio web y noté que les vendría muy bien un agendador interactivo de horas veterinarias y peluquería",
        "asuntoEmail": "Sistema de agendamiento online y peluquería para Clínica Veterinaria Pet's Center",
        "estado": "pendiente"
    },
    {
        "id": "CL-018",
        "nombreEmpresa": "Red de Clínicas Wivet",
        "contacto": "Gerencia de Operaciones",
        "rubro": "Red Veterinaria",
        "comuna": "Las Condes",
        "region": "Metropolitana",
        "email": "contacto@wivet.cl",
        "telefono": "+56956895201",
        "sitioWeb": "https://wivet.cl",
        "estadoTecnico": "Web Corporativa",
        "oportunidad": "Portal de clientes para historial de mascotas y asistente IA para confirmación de turnos médicos",
        "anguloWhatsapp": "vi su presencia digital y tenemos una solución de asistente IA por WhatsApp para confirmación de horas veterinarias",
        "asuntoEmail": "Asistente IA para confirmación de horas y portal de fichas para Red Wivet",
        "estado": "pendiente"
    },
    {
        "id": "CL-019",
        "nombreEmpresa": "Clínica Veterinaria Vidas",
        "contacto": "Dra. Dirección Médica",
        "rubro": "Dermatología y Salud Veterinaria",
        "comuna": "Viña del Mar",
        "region": "Valparaíso",
        "email": "veterinariavidas@gmail.com",
        "telefono": "+56961771297",
        "sitioWeb": "https://dermoveterinariavidas.cl",
        "estadoTecnico": "Wix Informativo",
        "oportunidad": "Portal moderno con pasarela de pago para reservas de especialidad dermatológica y arriendo mensual",
        "anguloWhatsapp": "noté su excelente especialización dermatológica; podemos implementarles una plataforma de reservas moderna en arriendo mensual",
        "asuntoEmail": "Plataforma de reservas de especialidad y arriendo mensual para Veterinaria Vidas",
        "estado": "pendiente"
    },
    {
        "id": "CL-020",
        "nombreEmpresa": "Veterinaria Los Castaños",
        "contacto": "Equipo Clínico",
        "rubro": "Salud Veterinaria",
        "comuna": "Viña del Mar",
        "region": "Valparaíso",
        "email": "contacto@veterinarialoscastanos.com",
        "telefono": "+56996262341",
        "sitioWeb": "https://veterinarialoscastanos.com",
        "estadoTecnico": "WordPress Tradicional",
        "oportunidad": "Cotizador de planes de salud preventiva para mascotas y reserva de urgencias",
        "anguloWhatsapp": "estuve en su sitio web y noté que un cotizador de planes preventivos aumentaría sus inscripciones mensuales",
        "asuntoEmail": "Cotizador de planes preventivos y agendamiento para Veterinaria Los Castaños",
        "estado": "pendiente"
    },
    {
        "id": "CL-021",
        "nombreEmpresa": "Troncoso García & Asociados Abogados",
        "contacto": "Área de Gestión Jurídica",
        "rubro": "Servicios Legales y Corporativos",
        "comuna": "Concepción",
        "region": "Biobío",
        "email": "contacto@troncosogarcia.cl",
        "telefono": "+56931727566",
        "sitioWeb": "https://troncosogarcia.cl",
        "estadoTecnico": "WordPress Corporativo",
        "oportunidad": "Calculador de indemnizaciones laborales y cotizador interactivo de defensas corporativas",
        "anguloWhatsapp": "estuve revisando su sitio web y noté que un cotizador de consultas jurídicas filtraría prospectos calificados al instante",
        "asuntoEmail": "Filtro de consultas y cotizador jurídico para Troncoso García & Asociados",
        "estado": "pendiente"
    },
    {
        "id": "CL-022",
        "nombreEmpresa": "Estudio Jurídico Veragua",
        "contacto": "Socio Principal",
        "rubro": "Derecho Civil y Familiar",
        "comuna": "Viña del Mar",
        "region": "Valparaíso",
        "email": "contacto@estudioveragua.cl",
        "telefono": "+56969029280",
        "sitioWeb": "https://estudioveragua.cl",
        "estadoTecnico": "A Medida Informativo",
        "oportunidad": "Formulario inteligente de diagnóstico de casos con agendamiento de consulta inicial pagada",
        "anguloWhatsapp": "noté su prestigio en Viña del Mar; podemos implementarles un agendador con pago online de consulta inicial",
        "asuntoEmail": "Agendador de consultas iniciales y diagnóstico legal para Estudio Veragua",
        "estado": "pendiente"
    },
    {
        "id": "CL-023",
        "nombreEmpresa": "Fortunato & Cía. Abogados",
        "contacto": "Dirección Legal",
        "rubro": "Asesoría Legal Integral",
        "comuna": "Viña del Mar",
        "region": "Valparaíso",
        "email": "consultas@fortunatoycia.cl",
        "telefono": "+56989052095",
        "sitioWeb": "https://fortunatoycia.cl",
        "estadoTecnico": "Informativo Básico",
        "oportunidad": "Landing page de captación de casos deudores y quiebras con cotizador automático",
        "anguloWhatsapp": "noté que para sus casos civiles y laborales una landing enfocada en conversión multiplicaría sus consultas",
        "asuntoEmail": "Landing de captación y cotización de casos para Fortunato & Cía. Abogados",
        "estado": "pendiente"
    },
    {
        "id": "CL-024",
        "nombreEmpresa": "Todo Juicio Abogados",
        "contacto": "Área de Nuevos Clientes",
        "rubro": "Servicios Legales Pyme",
        "comuna": "Santiago",
        "region": "Metropolitana",
        "email": "contacto@todojuicio.cl",
        "telefono": "+56986186320",
        "sitioWeb": "https://todojuicio.cl",
        "estadoTecnico": "WordPress Tradicional",
        "oportunidad": "Portal de clientes para seguimiento de causas y cotizador interactivo de arriendo mensual de asesoría Pyme",
        "anguloWhatsapp": "estuve en su sitio web y noté una excelente oportunidad para sumar un cotizador de planes legales para Pymes",
        "asuntoEmail": "Cotizador de planes de asesoría legal Pyme para Todo Juicio Abogados",
        "estado": "pendiente"
    },
    {
        "id": "CL-025",
        "nombreEmpresa": "S&C Auditores Consultores",
        "contacto": "Gerencia de Auditoría",
        "rubro": "Contabilidad y Tributaria",
        "comuna": "Santiago",
        "region": "Metropolitana",
        "email": "contacto@scauditores.cl",
        "telefono": "+56920489254",
        "sitioWeb": "https://scauditores.cl",
        "estadoTecnico": "Informativo Básico",
        "oportunidad": "Cotizador web por tramo de facturación y número de trabajadores para planes contables mensuales",
        "anguloWhatsapp": "estuve en su sitio web y un cotizador interactivo por tramo de facturación atraería clientes Pyme calificados",
        "asuntoEmail": "Cotizador de planes contables y tributarios para S&C Auditores",
        "estado": "pendiente"
    },
    {
        "id": "CL-026",
        "nombreEmpresa": "Contauditor Consultores",
        "contacto": "Área de Clientes",
        "rubro": "Contabilidad y Remuneraciones",
        "comuna": "Viña del Mar",
        "region": "Valparaíso",
        "email": "contacto@contauditor.cl",
        "telefono": "+56958734354",
        "sitioWeb": "https://contauditor.cl",
        "estadoTecnico": "WordPress Estático",
        "oportunidad": "Simulador de remuneraciones y cotizador de formalización de empresas en 1 día",
        "anguloWhatsapp": "noté que en su sitio web un simulador de costos de remuneraciones y contabilidad aumentaría sus leads",
        "asuntoEmail": "Simulador y cotizador contable interactivo para Contauditor",
        "estado": "pendiente"
    },
    {
        "id": "CL-027",
        "nombreEmpresa": "Kisha Construcciones",
        "contacto": "Dirección de Obras",
        "rubro": "Construcción y Remodelaciones",
        "comuna": "Concepción",
        "region": "Biobío",
        "email": "contacto@kishaconstrucciones.cl",
        "telefono": "+56954148269",
        "sitioWeb": "https://kishaconstrucciones.cl",
        "estadoTecnico": "WordPress Informativo",
        "oportunidad": "Cotizador interactivo de metros cuadrados construidos y ampliaciones con galería de proyectos antes/después",
        "anguloWhatsapp": "estuve viendo su web y un cotizador de m2 y ampliaciones permitiría a sus clientes proyectar costos al instante",
        "asuntoEmail": "Cotizador de m2 y portafolio interactivo para Kisha Construcciones",
        "estado": "pendiente"
    },
    {
        "id": "CL-028",
        "nombreEmpresa": "Constructora G7",
        "contacto": "Gerencia de Proyectos",
        "rubro": "Construcción y Obras Civiles",
        "comuna": "Viña del Mar",
        "region": "Valparaíso",
        "email": "contacto@g7constructora.cl",
        "telefono": "+56972631067",
        "sitioWeb": "https://g7constructora.cl",
        "estadoTecnico": "Informativo Básico",
        "oportunidad": "Plataforma de presentación de licitaciones y catálogo interactivo de obras terminadas",
        "anguloWhatsapp": "noté que para sus obras habitacionales e industriales una plataforma interactiva les daría mucha ventaja comercial",
        "asuntoEmail": "Portafolio interactivo y captación de proyectos para Constructora G7",
        "estado": "pendiente"
    },
    {
        "id": "CL-029",
        "nombreEmpresa": "Ateliá Banquetería y Eventos",
        "contacto": "Producción de Eventos",
        "rubro": "Banquetería y Bodas",
        "comuna": "Santiago",
        "region": "Metropolitana",
        "email": "contacto@ateliabanqueteria.cl",
        "telefono": "+56965913010",
        "sitioWeb": "https://ateliabanqueteria.cl",
        "estadoTecnico": "WordPress Estético",
        "oportunidad": "Cotizador interactivo por invitado con selección de menú de 3 tiempos y arriendo mensual accesible",
        "anguloWhatsapp": "estuve viendo sus montajes gastronómicos; un cotizador en línea por cantidad de invitados elevaría sus conversiones",
        "asuntoEmail": "Cotizador interactivo por invitado y menú para Ateliá Banquetería",
        "estado": "pendiente"
    },
    {
        "id": "CL-030",
        "nombreEmpresa": "Oliva y Miel Banquetería",
        "contacto": "Área de Eventos Corporativos",
        "rubro": "Gastronomía y Eventos",
        "comuna": "Santiago",
        "region": "Metropolitana",
        "email": "contacto@olivaymiel.cl",
        "telefono": "+56926172651",
        "sitioWeb": "https://olivaymiel.cl",
        "estadoTecnico": "Informativo Básico",
        "oportunidad": "Calculador de coffee breaks y almuerzos para empresas con checkout de reserva directo a WhatsApp",
        "anguloWhatsapp": "noté que para sus eventos corporativos un calculador express de coffee breaks agilizaría muchísimo los presupuestos",
        "asuntoEmail": "Calculador express de coffee breaks y eventos para Oliva y Miel",
        "estado": "pendiente"
    },
    {
        "id": "CL-031",
        "nombreEmpresa": "Taller Multi Marcas DyP Morel",
        "contacto": "Jefatura de Taller",
        "rubro": "Mecánica y Desabolladura",
        "comuna": "Viña del Mar",
        "region": "Valparaíso",
        "email": "recepcion@tallerdyp.cl",
        "telefono": "+56974457929",
        "sitioWeb": "https://tallerdyp.cl",
        "estadoTecnico": "A Medida Informativo",
        "oportunidad": "Cotizador express por panel dañado con subida de fotografía del choque para presupuesto preliminar",
        "anguloWhatsapp": "estuve en su sitio web y noté que un cotizador donde el cliente suba la foto del choque agilizaría todas sus ventas",
        "asuntoEmail": "Cotizador por foto y agendamiento express para Taller DyP Morel",
        "estado": "pendiente"
    },
    {
        "id": "CL-032",
        "nombreEmpresa": "Innovautos Concepción",
        "contacto": "Administración de Taller",
        "rubro": "Mecánica y Pintura Automotriz",
        "comuna": "Concepción",
        "region": "Biobío",
        "email": "contacto@reparatuauto.cl",
        "telefono": "+56957946677",
        "sitioWeb": "https://reparatuauto.cl",
        "estadoTecnico": "WordPress Tradicional",
        "oportunidad": "Agendador de mantenciones por kilometraje y módulo de seguimiento de estado de reparación",
        "anguloWhatsapp": "noté su cobertura en Concepción; un agendador por kilometraje y seguimiento de auto en taller aumentaría la fidelidad",
        "asuntoEmail": "Módulo de agendamiento y estado de reparación para Innovautos Concepción",
        "estado": "pendiente"
    },
    {
        "id": "CL-033",
        "nombreEmpresa": "Laboclin Laboratorio Clínico",
        "contacto": "Dirección Técnica",
        "rubro": "Laboratorio Clínico y Diagnóstico",
        "comuna": "Viña del Mar",
        "region": "Valparaíso",
        "email": "contacto@laboclin.cl",
        "telefono": "+56997380577",
        "sitioWeb": "https://laboclin.cl",
        "estadoTecnico": "Informativo Tradicional",
        "oportunidad": "Buscador de exámenes con precios Fonasa/Isapre y agendamiento de toma de muestras a domicilio",
        "anguloWhatsapp": "estuve en su sitio web y un buscador de exámenes con agendamiento a domicilio aumentaría fuertemente sus consultas",
        "asuntoEmail": "Buscador interactivo de exámenes y reservas a domicilio para Laboclin",
        "estado": "pendiente"
    },
    {
        "id": "CL-034",
        "nombreEmpresa": "W Gestión Inmobiliaria",
        "contacto": "Gerencia Comercial",
        "rubro": "Corretaje de Propiedades",
        "comuna": "Viña del Mar",
        "region": "Valparaíso",
        "email": "contacto@wgestioninmobiliaria.cl",
        "telefono": "+56997494382",
        "sitioWeb": "https://wgestioninmobiliaria.cl",
        "estadoTecnico": "Catálogo Tradicional",
        "oportunidad": "Buscador de propiedades con mapas interactivos y formulario de tasación online instantánea",
        "anguloWhatsapp": "estuve en su portal inmobiliario y un formulario de tasación en línea captaría propietarios para venta todos los días",
        "asuntoEmail": "Captador de propiedades y tasación online para W Gestión Inmobiliaria",
        "estado": "pendiente"
    }
]

# 1. Actualizar prospeccion/leads_pymes_chile.csv
CSV_PATH = "prospeccion/leads_pymes_chile.csv"

# Leer existentes para evitar duplicados
existentes_nombres = set()
with open(CSV_PATH, "r", encoding="utf-8-sig") as f:
    reader = csv.DictReader(f)
    for row in reader:
        existentes_nombres.add(row["Nombre_Empresa"].lower().strip())

nuevos_agregados = 0
with open(CSV_PATH, "a", newline="", encoding="utf-8-sig") as f:
    fieldnames = [
        "ID", "Nombre_Empresa", "Contacto", "Rubro", "Comuna", "Region",
        "Email", "Telefono_WhatsApp", "Sitio_Web_Actual", "Oportunidad_Detectada",
        "Estado_Contacto", "Estado_Tecnico", "Angulo_Venta",
        "Asunto_Email_Custom", "Angulo_WhatsApp_Custom"
    ]
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    
    for lead in NUEVOS_PROSPECTOS:
        if lead["nombreEmpresa"].lower().strip() in existentes_nombres:
            continue
        writer.writerow({
            "ID": lead["id"],
            "Nombre_Empresa": lead["nombreEmpresa"],
            "Contacto": lead["contacto"],
            "Rubro": lead["rubro"],
            "Comuna": lead["comuna"],
            "Region": lead["region"],
            "Email": lead["email"],
            "Telefono_WhatsApp": lead["telefono"],
            "Sitio_Web_Actual": lead["sitioWeb"],
            "Oportunidad_Detectada": lead["oportunidad"],
            "Estado_Contacto": "Pendiente",
            "Estado_Tecnico": lead["estadoTecnico"],
            "Angulo_Venta": "CONVERSION_AGENDAMIENTO",
            "Asunto_Email_Custom": lead["asuntoEmail"],
            "Angulo_WhatsApp_Custom": lead["anguloWhatsapp"]
        })
        existentes_nombres.add(lead["nombreEmpresa"].lower().strip())
        nuevos_agregados += 1

print(f"Se agregaron {nuevos_agregados} nuevos prospectos al archivo CSV: {CSV_PATH}")

# 2. Actualizar INITIAL_LEADS en src/components/ProspeccionTab.tsx
TSX_PATH = "src/components/ProspeccionTab.tsx"
with open(TSX_PATH, "r", encoding="utf-8") as f:
    code = f.read()

# Buscamos dónde termina INITIAL_LEADS: ];
# Reemplazamos la definición de INITIAL_LEADS por una lista ampliada
start_idx = code.find("const INITIAL_LEADS: ProspeccionLead[] = [")
end_idx = code.find("];\n\nconst STORAGE_KEY", start_idx)

if start_idx != -1 and end_idx != -1:
    # Obtener los existentes en JSON si es posible o simplemente reconstruir
    # Leemos la lista original desde el archivo
    # Vamos a extraer los items originales de CL-001 a CL-009 y agregar CL-010 a CL-034
    
    # Formateamos los nuevos leads a TSX
    leads_tsx_list = []
    
    # Extraemos el fragmento existente antes de ];
    existing_fragment = code[start_idx:end_idx]
    
    new_items_tsx = []
    for lead in NUEVOS_PROSPECTOS:
        item_str = f"""  {{
    id: '{lead["id"]}',
    nombreEmpresa: '{lead["nombreEmpresa"]}',
    contacto: '{lead["contacto"]}',
    rubro: '{lead["rubro"]}',
    comuna: '{lead["comuna"]}',
    region: '{lead["region"]}',
    email: '{lead["email"]}',
    telefono: '{lead["telefono"]}',
    sitioWeb: '{lead["sitioWeb"]}',
    estadoTecnico: '{lead["estadoTecnico"]}',
    oportunidad: '{lead["oportunidad"]}',
    anguloWhatsapp: '{lead["anguloWhatsapp"]}',
    asuntoEmail: '{lead["asuntoEmail"]}',
    estado: 'pendiente'
  }}"""
        new_items_tsx.append(item_str)
    
    combined_code = existing_fragment + ",\n" + ",\n".join(new_items_tsx)
    code = code[:start_idx] + combined_code + code[end_idx:]
    
    # También actualizamos STORAGE_KEY para que los usuarios carguen la nueva base limpia
    code = code.replace("const STORAGE_KEY = 'u693_prospeccion_leads_v3';", "const STORAGE_KEY = 'u693_prospeccion_leads_v4';")
    
    with open(TSX_PATH, "w", encoding="utf-8") as f:
        f.write(code)
    print("src/components/ProspeccionTab.tsx actualizado con éxito y versión de storage incrementada a v4!")
else:
    print("No se pudo localizar el bloque INITIAL_LEADS")

