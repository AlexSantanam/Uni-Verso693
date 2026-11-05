import urllib.request
import json
import os
import csv
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("RESEND_API_KEY")
dest = os.getenv("CONTACT_NOTIFICATION_EMAIL", "conectadoaia@gmail.com")

# Leer plantilla
template_path = os.path.join(os.path.dirname(__file__), "plantilla_email.html")
with open(template_path, "r", encoding="utf-8") as f:
    template = f.read()

# Leer primer lead
csv_path = os.path.join(os.path.dirname(__file__), "leads_pymes_chile.csv")
with open(csv_path, "r", encoding="utf-8-sig") as f:
    lead = next(csv.DictReader(f))

for k, v in lead.items():
    template = template.replace(f"{{{{{k}}}}}", str(v))

company_name = lead["Nombre_Empresa"]
subject = f"Propuesta de digitalización y agendamiento para {company_name} - UNIVERSO693"

payload = {
    "from": "onboarding@resend.dev",
    "to": [dest],
    "subject": subject,
    "html": template
}

req = urllib.request.Request(
    "https://api.resend.com/emails",
    data=json.dumps(payload).encode("utf-8"),
    headers={
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
    }
)

with urllib.request.urlopen(req) as resp:
    result = resp.read().decode()
    print("PROPOSAL EMAIL SENT SUCCESSFULLY:")
    print(result)

