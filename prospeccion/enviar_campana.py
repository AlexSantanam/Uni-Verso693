import csv
import os
import smtplib
import time
from datetime import datetime
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.header import Header
import argparse
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

PROSPECCION_DIR = os.path.dirname(os.path.abspath(__file__))
CSV_FILE = os.path.join(PROSPECCION_DIR, "leads_pymes_chile.csv")
TEMPLATE_FILE = os.path.join(PROSPECCION_DIR, "plantilla_email.html")
PREVIEWS_DIR = os.path.join(PROSPECCION_DIR, "previsualizaciones")

def render_template(template_str, lead_data):
    rendered = template_str
    for key, val in lead_data.items():
        placeholder = f"{{{{{key}}}}}"
        rendered = rendered.replace(placeholder, str(val))
    return rendered

def generate_previews():
    os.makedirs(PREVIEWS_DIR, exist_ok=True)
    with open(TEMPLATE_FILE, "r", encoding="utf-8") as tf:
        template_content = tf.read()

    with open(CSV_FILE, "r", encoding="utf-8-sig") as cf:
        reader = csv.DictReader(cf)
        for row in reader:
            html = render_template(template_content, row)
            # Limpiar nombre para archivo
            clean_name = "".join(c for c in row['Nombre_Empresa'] if c.isalnum() or c in (' ', '_', '-')).replace(' ', '_')
            preview_filename = f"preview_{row['ID']}_{clean_name}.html"
            preview_path = os.path.join(PREVIEWS_DIR, preview_filename)
            with open(preview_path, "w", encoding="utf-8") as pf:
                pf.write(html)
            print(f"[OK] Previsualizacion generada: {preview_filename}")
    print(f"\nPuedes abrir los archivos HTML en la carpeta: {PREVIEWS_DIR}")

def update_csv_status(leads_list):
    if not leads_list:
        return
    headers = list(leads_list[0].keys())
    with open(CSV_FILE, "w", newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(f, fieldnames=headers)
        writer.writeheader()
        writer.writerows(leads_list)

def send_campaign(test_email=None, limit=None, force=False):
    smtp_server = os.getenv("SMTP_SERVER", "smtp.gmail.com")
    smtp_port = int(os.getenv("SMTP_PORT", 587))
    smtp_user = os.getenv("SMTP_USER", "")
    smtp_pass = os.getenv("SMTP_PASS", "")
    smtp_from = os.getenv("SMTP_FROM", "contacto@universo693.com")

    if not smtp_user or not smtp_pass:
        print("\n[ALERTA] No se han configurado SMTP_USER y SMTP_PASS en el archivo .env")
        print("Para enviar correos reales, configura tus credenciales SMTP (o clave de aplicación de Gmail/Workspace).")
        return

    with open(TEMPLATE_FILE, "r", encoding="utf-8") as tf:
        template_content = tf.read()

    with open(CSV_FILE, "r", encoding="utf-8-sig") as cf:
        leads = list(csv.DictReader(cf))

    sent_count = 0
    print(f"[*] Conectando al servidor SMTP ({smtp_server}:{smtp_port})...")
    server = smtplib.SMTP(smtp_server, smtp_port)
    server.starttls()
    server.login(smtp_user, smtp_pass)
    print(f"[OK] Autenticado exitosamente como: {smtp_user}")
    print(f"[OK] Remitente visible: {smtp_from}\n")

    try:
        for lead in leads:
            # Si no es correo de prueba y ya fue enviado, saltar (salvo que use --force)
            if not test_email and not force and "Enviado" in lead.get("Estado_Contacto", ""):
                print(f"[SKIP] Ya enviado previamente a: {lead['Nombre_Empresa']} ({lead['Email']})")
                continue

            if limit and sent_count >= limit:
                break

            recipient = test_email if test_email else lead["Email"]
            subject_text = lead.get("Asunto_Email_Custom") or f"Propuesta de digitalización y agendamiento para {lead['Nombre_Empresa']} - UNIVERSO693"
            if not subject_text.endswith("UNIVERSO693"):
                subject_text = f"{subject_text} - UNIVERSO693"

            html_body = render_template(template_content, lead)

            msg = MIMEMultipart("alternative")
            msg["Subject"] = Header(subject_text, "utf-8")
            msg["From"] = f"Alexis Santana - UNIVERSO693 SpA <{smtp_from}>"
            msg["To"] = recipient
            msg["Reply-To"] = smtp_from
            msg.attach(MIMEText(html_body, "html", "utf-8"))

            server.sendmail(smtp_user, recipient, msg.as_string())
            print(f"[ENVIADO] A: {lead['Nombre_Empresa']} ({recipient})")
            sent_count += 1

            if not test_email:
                now_str = datetime.now().strftime("%d/%m/%Y %H:%M")
                lead["Estado_Contacto"] = f"Enviado ({now_str})"
                update_csv_status(leads)

            time.sleep(2.0)  # Pausa segura de 2 segundos entre envíos

    finally:
        server.quit()

    print(f"\n[FIN] Campana finalizada. Total correos enviados: {sent_count}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Motor de Mailing B2B - UNIVERSO693")
    parser.add_argument("--preview", action="store_true", help="Genera archivos HTML de previsualización para cada lead")
    parser.add_argument("--test-email", type=str, help="Envía un correo de prueba a la dirección especificada")
    parser.add_argument("--send", action="store_true", help="Ejecuta el envío de la campaña a los leads del CSV")
    parser.add_argument("--force", action="store_true", help="Fuerza el reenvío incluso si ya figura como enviado")
    parser.add_argument("--limit", type=int, default=None, help="Límite máximo de correos a enviar")

    args = parser.parse_args()

    if args.preview or (not args.send and not args.test_email):
        generate_previews()
    elif args.send or args.test_email:
        send_campaign(test_email=args.test_email, limit=args.limit, force=args.force)
