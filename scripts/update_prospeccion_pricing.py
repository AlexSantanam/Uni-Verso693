import re

file_path = 'src/components/ProspeccionTab.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update WhatsApp pitch
old_pitch = """Tenemos una modalidad de arriendo mensual desde $45.000 sin costo de desarrollo inicial, para que no tengan que desembolsar capital fuerte.

👉 Puedes revisar nuestros planes y ejemplos en vivo acá:
https://universo693.com/paginas-web"""

new_pitch = """Trabajamos con tarifas transparentes basadas en porcentajes para cuidar su flujo de caja:
• Arriendo Mensual Todo Incluido: desde $45.000/mes (~4.5% del valor base, hosting y soporte inc.).
• Leasing con Derecho a Compra: en 12 cuotas ($115.000/mes) o 24 cuotas ($65.000/mes), con 100% de propiedad del código al terminar.
• Venta directa contado con traspaso de repositorio.

👉 Puedes revisar los planes y simular en vivo acá:
https://universo693.com/impulsa-pyme"""

content = content.replace(old_pitch, new_pitch)

# 2. Update Table in renderEmailHTML
old_table = """      <p>Para no comprometer la liquidez de su empresa, trabajamos con 3 modalidades flexibles:</p>
      <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin: 16px 0;">
        <tr style="background-color: #F1F5F9;">
          <th style="padding: 8px; border: 1px solid #E2E8F0;">Modalidad</th>
          <th style="padding: 8px; border: 1px solid #E2E8F0;">Inversión</th>
          <th style="padding: 8px; border: 1px solid #E2E8F0;">Beneficio</th>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #E2E8F0; font-weight: bold; color: #2B6CB0;">1. Arriendo Mensual</td>
          <td style="padding: 8px; border: 1px solid #E2E8F0;">Desde <strong>$45.000 CLP / mes</strong></td>
          <td style="padding: 8px; border: 1px solid #E2E8F0;">Cero inversión inicial. Todo incluido.</td>
        </tr>
        <tr style="background-color: #F8FAFC;">
          <td style="padding: 8px; border: 1px solid #E2E8F0; font-weight: bold; color: #2B6CB0;">2. Arriendo con Compra</td>
          <td style="padding: 8px; border: 1px solid #E2E8F0;">12 cuotas de <strong>$85.000 CLP</strong></td>
          <td style="padding: 8px; border: 1px solid #E2E8F0;">Al año es 100% suyo sin bancos.</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #E2E8F0; font-weight: bold; color: #2B6CB0;">3. Compra Directa</td>
          <td style="padding: 8px; border: 1px solid #E2E8F0;">Pago único contra entrega</td>
          <td style="padding: 8px; border: 1px solid #E2E8F0;">Código fuente transferido a su empresa.</td>
        </tr>
      </table>"""

new_table = """      <p>Para no comprometer la liquidez de su empresa, trabajamos con <strong>tarifas transparentes basadas en porcentajes de inversión y no valores al azar</strong>:</p>
      <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin: 16px 0;">
        <tr style="background-color: #F1F5F9;">
          <th style="padding: 10px; border: 1px solid #E2E8F0; text-align: left;">Modalidad</th>
          <th style="padding: 10px; border: 1px solid #E2E8F0; text-align: left;">Inversión Transparente</th>
          <th style="padding: 10px; border: 1px solid #E2E8F0; text-align: left;">Infraestructura & Propiedad</th>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #E2E8F0; font-weight: bold; color: #2B6CB0;">1. Arriendo Perpetuo (SaaS)</td>
          <td style="padding: 10px; border: 1px solid #E2E8F0;">Desde <strong>$45.000 CLP / mes</strong><br><span style="font-size: 11px; color: #718096;">(4.5% del valor base)</span></td>
          <td style="padding: 10px; border: 1px solid #E2E8F0;">Hosting de alta velocidad, SSL y soporte continuo incluidos. Sin descapitalización.</td>
        </tr>
        <tr style="background-color: #F8FAFC;">
          <td style="padding: 10px; border: 1px solid #E2E8F0; font-weight: bold; color: #2B6CB0;">2. Leasing a 12 Meses</td>
          <td style="padding: 10px; border: 1px solid #E2E8F0;">12 cuotas de <strong>$115.000 CLP</strong><br><span style="font-size: 11px; color: #718096;">(~11.5% del valor base)</span></td>
          <td style="padding: 10px; border: 1px solid #E2E8F0;">Incluye hosting año 1. Al mes 13 el código es 100% de su empresa.</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #E2E8F0; font-weight: bold; color: #2B6CB0;">3. Leasing a 24 Meses</td>
          <td style="padding: 10px; border: 1px solid #E2E8F0;">24 cuotas de <strong>$65.000 CLP</strong><br><span style="font-size: 11px; color: #718096;">(~6.5% del valor base)</span></td>
          <td style="padding: 10px; border: 1px solid #E2E8F0;">Incluye hosting años 1 y 2. Al mes 25 el código es 100% de su empresa.</td>
        </tr>
        <tr style="background-color: #F8FAFC;">
          <td style="padding: 10px; border: 1px solid #E2E8F0; font-weight: bold; color: #2B6CB0;">4. Compra Directa Contado</td>
          <td style="padding: 10px; border: 1px solid #E2E8F0;"><strong>$1.000.000 CLP</strong> (Valor Lista)</td>
          <td style="padding: 10px; border: 1px solid #E2E8F0;">Traspaso inmediato de repositorio en GitHub y llaves maestras en Bóveda Digital.</td>
        </tr>
      </table>
      <div style="background-color: #EDF2F7; padding: 10px 14px; border-radius: 6px; font-size: 12px; color: #4A5568; margin-bottom: 16px;">
        ℹ️ <strong>Nota de Soberanía Tecnológica:</strong> En todas las modalidades de Leasing, una vez que paga la última cuota (mes 12 o 24) usted pasa a ser dueño absoluto del software. Si decide quedarse en nuestros servidores, solo paga la mantención anual del hosting ($90.000 al año / ~$7.500 al mes), o retira sus llaves en Bóveda Digital a costo $0.
      </div>"""

content = content.replace(old_table, new_table)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated ProspeccionTab.tsx successfully!')

