import csv
import os

# Directorio de prospeccion
PROSPECCION_DIR = os.path.join(os.getcwd(), "prospeccion")
os.makedirs(PROSPECCION_DIR, exist_ok=True)

csv_path = os.path.join(PROSPECCION_DIR, "leads_pymes_chile.csv")

headers = [
    "ID",
    "Nombre_Empresa",
    "Contacto",
    "Rubro",
    "Comuna",
    "Region",
    "Email",
    "Telefono_WhatsApp",
    "Sitio_Web_Actual",
    "Oportunidad_Detectada",
    "Estado_Contacto"
]

# Lote inicial de prospección curado enfocado en Salud, Estetica, Servicios Tecnicos y Construccion
leads_iniciales = [
    {
        "ID": "CL-001",
        "Nombre_Empresa": "Clínica Dental OdontoVanguardia",
        "Contacto": "Dr. Fernando Morales",
        "Rubro": "Salud Dental / Estética",
        "Comuna": "Viña del Mar",
        "Region": "Valparaíso",
        "Email": "contacto@odontovanguardia.cl",
        "Telefono_WhatsApp": "+56984215632",
        "Sitio_Web_Actual": "Sin agendamiento online",
        "Oportunidad_Detectada": "Sistema de reservas y recordatorios de citas por WhatsApp",
        "Estado_Contacto": "Pendiente"
    },
    {
        "ID": "CL-002",
        "Nombre_Empresa": "Estética Integral Reñaca",
        "Contacto": "Constanza Valenzuela",
        "Rubro": "Estética y Belleza",
        "Comuna": "Reñaca / Viña del Mar",
        "Region": "Valparaíso",
        "Email": "info@esteticarenaca.cl",
        "Telefono_WhatsApp": "+56976543210",
        "Sitio_Web_Actual": "Solo Instagram",
        "Oportunidad_Detectada": "Landing page de alta conversión con catálogo y arriendo mensual",
        "Estado_Contacto": "Pendiente"
    },
    {
        "ID": "CL-003",
        "Nombre_Empresa": "Climatización y Energía Solar Aconcagua",
        "Contacto": "Ignacio Bustamante",
        "Rubro": "Climatización y Energía Solar",
        "Comuna": "Quillota",
        "Region": "Valparaíso",
        "Email": "ventas@climatizacionaconcagua.cl",
        "Telefono_WhatsApp": "+56991238475",
        "Sitio_Web_Actual": "Web desactualizada no responsiva",
        "Oportunidad_Detectada": "Cotizador interactivo de proyectos solares y rediseño web",
        "Estado_Contacto": "Pendiente"
    },
    {
        "ID": "CL-004",
        "Nombre_Empresa": "Centro Psicológico Conecta",
        "Contacto": "Camila Sepúlveda",
        "Rubro": "Salud Mental / Psicología",
        "Comuna": "Providencia",
        "Region": "Metropolitana",
        "Email": "contacto@psicologiaconecta.cl",
        "Telefono_WhatsApp": "+56987654321",
        "Sitio_Web_Actual": "Sitio estático sin ficha de profesionales",
        "Oportunidad_Detectada": "Plataforma de agenda por profesional y pagos web integrados",
        "Estado_Contacto": "Pendiente"
    },
    {
        "ID": "CL-005",
        "Nombre_Empresa": "Maestranza e Ingeniería Mecánica Sur",
        "Contacto": "Rodrigo Carvallo",
        "Rubro": "Metalmecánica / Industrial",
        "Comuna": "Concepción",
        "Region": "Biobío",
        "Email": "gerencia@maestranzasur.cl",
        "Telefono_WhatsApp": "+56993456789",
        "Sitio_Web_Actual": "Sin sitio web corporativo",
        "Oportunidad_Detectada": "Portal corporativo de licitaciones y catálogo técnico industrial",
        "Estado_Contacto": "Pendiente"
    },
    {
        "ID": "CL-006",
        "Nombre_Empresa": "Veterinaria y Pet Care San Francisco",
        "Contacto": "Dr. Marcelo Herrera",
        "Rubro": "Medicina Veterinaria",
        "Comuna": "Villa Alemana",
        "Region": "Valparaíso",
        "Email": "administracion@vetsanfrancisco.cl",
        "Telefono_WhatsApp": "+56982341908",
        "Sitio_Web_Actual": "Solo ficha de Google Maps",
        "Oportunidad_Detectada": "Ficha clínica básica y agendamiento de horas veterinarias",
        "Estado_Contacto": "Pendiente"
    },
    {
        "ID": "CL-007",
        "Nombre_Empresa": "Constructora y Obras Civiles Andina",
        "Contacto": "Eduardo Peña",
        "Rubro": "Construcción / Reformas",
        "Comuna": "Temuco",
        "Region": "Araucanía",
        "Email": "proyectos@obrasandina.cl",
        "Telefono_WhatsApp": "+56971239845",
        "Sitio_Web_Actual": "Web con error SSL",
        "Oportunidad_Detectada": "Sitio institucional seguro + portafolio de obras y cotizaciones",
        "Estado_Contacto": "Pendiente"
    },
    {
        "ID": "CL-008",
        "Nombre_Empresa": "Asesorías Tributarias y Contables Valparaíso",
        "Contacto": "Patricia Gómez",
        "Rubro": "Servicios Contables y Legales",
        "Comuna": "Valparaíso",
        "Region": "Valparaíso",
        "Email": "contacto@tributariaygestion.cl",
        "Telefono_WhatsApp": "+56995671234",
        "Sitio_Web_Actual": "Sin presencia web profesional",
        "Oportunidad_Detectada": "Portal de clientes para descarga de balances y agendamiento tributario",
        "Estado_Contacto": "Pendiente"
    }
]

with open(csv_path, mode="w", newline="", encoding="utf-8-sig") as f:
    writer = csv.DictWriter(f, fieldnames=headers)
    writer.writeheader()
    writer.writerows(leads_iniciales)

print(f"Base de datos de leads creada exitosamente en: {csv_path}")

