import csv
import os
import urllib.parse

PROSPECCION_DIR = os.path.dirname(os.path.abspath(__file__))
CSV_FILE = os.path.join(PROSPECCION_DIR, "leads_pymes_chile.csv")
HTML_OUTPUT = os.path.join(PROSPECCION_DIR, "panel_whatsapp.html")

def generate_whatsapp_panel():
    with open(CSV_FILE, "r", encoding="utf-8-sig") as f:
        leads = list(csv.DictReader(f))

    rows_html = ""
    for lead in leads:
        lead_id = lead["ID"]
        phone = lead["Telefono_WhatsApp"].replace("+", "").replace(" ", "").replace("-", "")
        
        # Mensaje ultra personalizado generado por el Auditor Tecnico
        angulo_custom = lead.get("Angulo_WhatsApp_Custom", "estuve revisando su presencia digital")
        dolor_custom = lead.get("Oportunidad_Detectada", "automatización de citas y clientes")
        
        msg = (
            f"Hola {lead['Contacto']}, buen día. Te escribe Alexis Santana de UNIVERSO693 SpA.\n\n"
            f"Te envié un correo breve con una propuesta para {lead['Nombre_Empresa']}: {angulo_custom}.\n\n"
            f"Tenemos una modalidad de arriendo mensual desde $15.000 sin costo de desarrollo inicial, para que no tengan que desembolsar capital fuerte.\n\n"
            f"Te escribo por acá solo para confirmar si te llegó bien el correo a tu bandeja principal. Saludos!"
        )
        
        encoded_msg = urllib.parse.quote(msg)
        wa_link = f"https://api.whatsapp.com/send?phone={phone}&text={encoded_msg}"

        web_url = lead.get('Sitio_Web_Actual', '')
        web_link = f"<a href='{web_url}' target='_blank' style='color: #2B6CB0; text-decoration: none; font-size: 11px;'>🔗 {web_url.replace('https://', '').replace('http://', '')}</a>" if web_url and web_url.startswith('http') else "<span style='font-size: 11px; color: #E53E3E;'>❌ Sin web</span>"

        tech_badge = lead.get('Estado_Tecnico', 'Auditado')

        rows_html += f"""
        <tr id="row-{lead_id}" class="lead-row" data-id="{lead_id}">
            <td style="padding: 14px 16px;">
                <div style="font-weight: 700; color: #1A365D; font-size: 14px;">{lead['Nombre_Empresa']}</div>
                <div style="font-size: 12px; color: #718096; margin-top: 2px;">{lead['Rubro']} &bull; {lead['Comuna']}</div>
                <div style="margin-top: 4px;">{web_link}</div>
            </td>
            <td style="padding: 14px 16px;">
                <div style="color: #2D3748; font-weight: 500;">{lead['Contacto']}</div>
                <div style="font-size: 12px; color: #4A5568; margin-top: 2px;">📞 {lead['Telefono_WhatsApp']}</div>
                <div style="font-size: 11px; color: #718096; margin-top: 2px;">✉️ {lead['Email']}</div>
            </td>
            <td style="padding: 14px 16px; max-width: 300px;">
                <div style="display: inline-block; background-color: #EDF2F7; color: #2B6CB0; font-size: 10.5px; font-weight: 700; padding: 2px 7px; border-radius: 4px; margin-bottom: 5px;">
                    {tech_badge}
                </div>
                <div style="font-size: 12.5px; color: #2D3748; line-height: 1.4;">
                    <strong>Propuesta Auditada:</strong> {dolor_custom}
                </div>
            </td>
            <td style="padding: 14px 16px; text-align: center; vertical-align: middle;">
                <a id="btn-{lead_id}" 
                   href="{wa_link}" 
                   target="_blank" 
                   onclick="markAsSent('{lead_id}')"
                   class="wa-btn"
                   style="background-color: #25D366; color: white; padding: 10px 18px; text-decoration: none; font-weight: 700; font-size: 13px; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s ease;">
                   <span class="btn-icon">📱</span> <span class="btn-text">Enviar WhatsApp</span>
                </a>
                <div id="status-{lead_id}" class="status-badge" style="display: none; font-size: 11px; color: #2B6CB0; font-weight: 600; margin-top: 6px;">
                    Enviado
                </div>
            </td>
        </tr>
        """

    full_html = f"""<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Panel de Prospección con Auditoría Automática - UNIVERSO693</title>
    <style>
        body {{
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: #F8FAFC;
            margin: 0;
            padding: 30px;
            color: #1A202C;
        }}
        .container {{
            max-width: 1200px;
            margin: 0 auto;
            background: #FFFFFF;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
            border: 1px solid #E2E8F0;
            overflow: hidden;
        }}
        .header {{
            background: #1A365D;
            color: white;
            padding: 24px 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 15px;
        }}
        .header-title h1 {{ margin: 0; font-size: 20px; }}
        .header-title p {{ margin: 6px 0 0 0; font-size: 13px; color: #CBD5E0; }}
        .header-stats {{
            background: rgba(255,255,255,0.12);
            padding: 10px 18px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 14px;
            font-size: 13px;
        }}
        .counter-badge {{
            background: #25D366;
            color: white;
            padding: 3px 8px;
            border-radius: 12px;
            font-weight: bold;
        }}
        .btn-reset {{
            background: transparent;
            border: 1px solid rgba(255,255,255,0.3);
            color: white;
            padding: 4px 10px;
            border-radius: 6px;
            font-size: 11px;
            cursor: pointer;
        }}
        .btn-reset:hover {{
            background: rgba(255,255,255,0.2);
        }}
        table {{
            width: 100%;
            border-collapse: collapse;
            text-align: left;
        }}
        th {{
            background: #F1F5F9;
            padding: 12px 16px;
            font-size: 12px;
            color: #4A5568;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border-bottom: 2px solid #E2E8F0;
        }}
        tr:hover {{
            background-color: #F8FAFC;
        }}
        .row-sent {{
            background-color: #F0FDF4 !important;
        }}
        .btn-sent {{
            background-color: #4A5568 !important;
            box-shadow: none !important;
            opacity: 0.9;
        }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="header-title">
                <h1>🚀 Panel de Prospección Quirúrgica (Auditoría en Vivo)</h1>
                <p>UNIVERSO693 SpA &bull; Propuestas automáticas generadas a partir del análisis real del sitio web de cada cliente.</p>
            </div>
            <div class="header-stats">
                <div>Progreso: <span id="sent-count" class="counter-badge">0 / {len(leads)}</span></div>
                <button class="btn-reset" onclick="resetAll()">Restablecer marcas</button>
            </div>
        </div>
        <table>
            <thead>
                <tr>
                    <th style="width: 26%;">Empresa / Web</th>
                    <th style="width: 24%;">Contacto / Canales</th>
                    <th style="width: 33%;">Diagnóstico de Auditoría y Propuesta</th>
                    <th style="width: 17%; text-align: center;">Acción WhatsApp</th>
                </tr>
            </thead>
            <tbody>
                {rows_html}
            </tbody>
        </table>
    </div>

    <script>
        const STORAGE_KEY = 'u693_whatsapp_sent_leads';

        function getSentLeads() {{
            try {{
                return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
            }} catch(e) {{
                return [];
            }}
        }}

        function saveSentLeads(leads) {{
            localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
            updateUI();
        }}

        function markAsSent(id) {{
            let sent = getSentLeads();
            if (!sent.includes(id)) {{
                sent.push(id);
                saveSentLeads(sent);
            }}
        }}

        function resetAll() {{
            if (confirm("¿Deseas reiniciar las marcas de enviado de todos los clientes?")) {{
                localStorage.removeItem(STORAGE_KEY);
                location.reload();
            }}
        }}

        function updateUI() {{
            const sent = getSentLeads();
            const allRows = document.querySelectorAll('.lead-row');
            
            allRows.forEach(row => {{
                const id = row.getAttribute('data-id');
                const btn = document.getElementById('btn-' + id);
                const status = document.getElementById('status-' + id);

                if (sent.includes(id)) {{
                    row.classList.add('row-sent');
                    if (btn) {{
                        btn.classList.add('btn-sent');
                        btn.querySelector('.btn-icon').textContent = '✅';
                        btn.querySelector('.btn-text').textContent = 'Enviado / Reabrir';
                    }}
                    if (status) status.style.display = 'block';
                }} else {{
                    row.classList.remove('row-sent');
                    if (btn) {{
                        btn.classList.remove('btn-sent');
                        btn.querySelector('.btn-icon').textContent = '📱';
                        btn.querySelector('.btn-text').textContent = 'Enviar WhatsApp';
                    }}
                    if (status) status.style.display = 'none';
                }}
            }});

            const counter = document.getElementById('sent-count');
            if (counter) {{
                counter.textContent = sent.length + ' / ' + allRows.length;
            }}
        }}

        document.addEventListener('DOMContentLoaded', updateUI);
    </script>
</body>
</html>
    """

    with open(HTML_OUTPUT, "w", encoding="utf-8") as f:
        f.write(full_html)
    print(f"[OK] Panel interactivo con auditoria en vivo generado en: {HTML_OUTPUT}")

if __name__ == "__main__":
    generate_whatsapp_panel()
