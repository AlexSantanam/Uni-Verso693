import requests
from bs4 import BeautifulSoup
import csv
import os
import time

PROSPECCION_DIR = os.path.dirname(os.path.abspath(__file__))
CSV_FILE = os.path.join(PROSPECCION_DIR, "leads_pymes_chile.csv")

HEADERS_REQUEST = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

def audit_website(url):
    """
    Analiza automáticamente el sitio web de un lead y determina:
    - Plataforma (Wix, WordPress, etc.)
    - Presencia de WhatsApp / Botón flotante
    - Sistema de agendamiento online (Dentalink, Reservo, Calendly, etc.)
    - Velocidad y estado técnico
    - Ángulo de venta quirúrgico personalizado
    """
    if not url or not url.startswith("http"):
        return {
            "estado_web": "Sin sitio web",
            "tipo_propuesta": "NUEVA_WEB",
            "diagnostico": "No posee sitio web oficial activo (solo presencia en redes o mapas).",
            "asunto_email": "Propuesta de presencia web y captación de clientes con arriendo mensual",
            "dolor_especifico": "Diseño y puesta en marcha de sitio web profesional con agendamiento y cotizador directo",
            "angulo_whatsapp": "noté que actualmente no cuentan con sitio web propio para captar pacientes desde Google"
        }

    try:
        start_time = time.time()
        resp = requests.get(url, headers=HEADERS_REQUEST, timeout=8, verify=True)
        load_time = round(time.time() - start_time, 2)
        
        if resp.status_code != 200:
            return {
                "estado_web": f"Error {resp.status_code}",
                "tipo_propuesta": "NUEVA_WEB",
                "diagnostico": f"El sitio web responde con código de error {resp.status_code}.",
                "asunto_email": "Alerta técnica en su sitio web y solución de modernización",
                "dolor_especifico": "Restauración y modernización completa de sitio web caído",
                "angulo_whatsapp": "noté que su sitio web presenta intermitencias técnicas al abrirlo desde el celular"
            }

        html = resp.text.lower()
        soup = BeautifulSoup(resp.text, "html.parser")

        # 1. Detección de tecnología
        tech = "A Medida / Desconocido"
        if "wix.com" in html or "wixstatic.com" in html or "x-wix" in str(resp.headers).lower():
            tech = "Wix"
        elif "wp-content" in html or "wp-includes" in html:
            tech = "WordPress"
        elif "shopify" in html:
            tech = "Shopify"

        # 2. Detección de botón WhatsApp
        has_whatsapp = False
        for a in soup.find_all("a", href=True):
            href = a["href"].lower()
            if "wa.me" in href or "api.whatsapp.com" in href or "whatsapp" in href:
                has_whatsapp = True
                break

        # 3. Detección de motor de agendamiento
        has_booking = False
        booking_keywords = ["reservo.cl", "dentalink", "calendly", "doctoralia", "agendamiento", "agenda-online", "reserva-tu-hora", "agendar-cita"]
        for kw in booking_keywords:
            if kw in html:
                has_booking = True
                break

        # 4. Clasificación del ángulo de venta
        if tech == "Wix" and not has_booking:
            return {
                "estado_web": f"Wix ({load_time}s)",
                "tipo_propuesta": "MODULO_AGENDAMIENTO_WIX",
                "diagnostico": f"Sitio en plataforma Wix sin motor de reservas automatizado (carga en {load_time}s).",
                "asunto_email": "Módulo de agendamiento 24/7 y optimización de velocidad para su clínica",
                "dolor_especifico": "Instalación de motor de agendamiento inteligente y reducción de ausentismo sin cambiar su web",
                "angulo_whatsapp": "estuve revisando su sitio web y noté que no tienen agendamiento automático 24/7 para que los pacientes reserven directo sin esperar a la recepcionista"
            }
        elif has_booking:
            return {
                "estado_web": f"{tech} con Agenda",
                "tipo_propuesta": "IA_CHATBOT_CONFIRMACIONES",
                "diagnostico": f"Sitio en {tech} con agendamiento activo. Oportunidad en automatización de confirmaciones.",
                "asunto_email": "Automatización de confirmaciones y triaje por WhatsApp para reducir ausentismo",
                "dolor_especifico": "Asistente de inteligencia artificial por WhatsApp para triaje de pacientes y confirmación de horas",
                "angulo_whatsapp": "vi que ya tienen reservas online; tenemos un asistente de WhatsApp con IA que confirma horas automáticamente para reducir el ausentismo de pacientes en un 30%"
            }
        else:
            return {
                "estado_web": f"{tech} Informativo",
                "tipo_propuesta": "CONVERSION_AGENDAMIENTO",
                "diagnostico": f"Sitio informativo en {tech}. No cuenta con sistema directo de conversión o reservas.",
                "asunto_email": "Transformación de su sitio web en un canal de agendamiento y cotizaciones activas",
                "dolor_especifico": "Integración de pasarela de citas y cotizador interactivo para multiplicar consultas",
                "angulo_whatsapp": "estuve en su sitio web y noté una oportunidad clave para agregarle un cotizador/agendador interactivo que convierta visitantes en clientes al instante"
            }

    except requests.exceptions.SSLError:
        return {
            "estado_web": "SSL Inseguro",
            "tipo_propuesta": "SEGURIDAD_NUEVA_WEB",
            "diagnostico": "Sitio web sin certificado SSL seguro (Google lo marca como peligroso).",
            "asunto_email": "Alerta de seguridad SSL en su sitio web y propuesta de modernización",
            "dolor_especifico": "Corrección de seguridad SSL y migración a plataforma moderna",
            "angulo_whatsapp": "noté que Google Chrome marca su sitio web como 'No Seguro' por problemas en su certificado SSL"
        }
    except Exception as e:
        return {
            "estado_web": "Error Conexión",
            "tipo_propuesta": "NUEVA_WEB",
            "diagnostico": f"No fue posible conectar con el dominio ({str(e)[:30]}).",
            "asunto_email": "Propuesta de digitalización y presencia web con arriendo mensual",
            "dolor_especifico": "Creación de sitio web moderno y optimizado",
            "angulo_whatsapp": "noté que su presencia en internet está desactualizada y les vendría muy bien una landing moderna"
        }

def run_audit_on_csv():
    with open(CSV_FILE, "r", encoding="utf-8-sig") as f:
        leads = list(csv.DictReader(f))

    print(f"[*] Iniciando Auditoría Técnica Automatizada sobre {len(leads)} empresas...\n")

    for lead in leads:
        url = lead.get("Sitio_Web_Actual", "")
        print(f"-> Auditando: {lead['Nombre_Empresa']} ({url})...")
        audit_res = audit_website(url)
        
        lead["Oportunidad_Detectada"] = audit_res["dolor_especifico"]
        lead["Estado_Tecnico"] = audit_res["estado_web"]
        lead["Angulo_Venta"] = audit_res["tipo_propuesta"]
        lead["Asunto_Email_Custom"] = audit_res["asunto_email"]
        lead["Angulo_WhatsApp_Custom"] = audit_res["angulo_whatsapp"]
        
        print(f"   [RESULTADO] {audit_res['estado_web']} | Tipo: {audit_res['tipo_propuesta']}")
        print(f"   [ENFOQUE] {audit_res['dolor_especifico']}\n")
        time.sleep(0.5)

    # Actualizar CSV con nuevas columnas de auditoría
    headers = list(leads[0].keys())
    with open(CSV_FILE, "w", newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(f, fieldnames=headers)
        writer.writeheader()
        writer.writerows(leads)

    print(f"[EXITO] Auditoría completada y base de datos actualizada en: {CSV_FILE}")

if __name__ == "__main__":
    run_audit_on_csv()

