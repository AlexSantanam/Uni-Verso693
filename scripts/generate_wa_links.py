import urllib.parse

leads = [
  ('Arriendo de maquinaria pesada', 'Lampa', '56976484015'),
  ('Maquinarias Arriendo Jusaae', 'Colina', '56994221076'),
  ('Arriendo de maquinaria RYA', 'San Bernardo', '56999366480'),
  ('Court Maquinarias', 'San Bernardo', '56974518397'),
  ('Arriendo de Camión Pluma JVO', 'Rancagua', '56977552222'),
  ('Transportes Grevy', 'Quillota', '56977644630'),
  ('Hemaq Arriendo Retroexcavadoras', 'Quillota', '56998936612'),
  ('Arriendo Retroexcavadora y Camiones Tolva', 'Antofagasta', '56959074183'),
  ('Morosmin Rental', 'Antofagasta', '56978490186'),
  ('AYM Arriendo de Maquinaria', 'La Serena', '56995909078'),
  ('Temumac', 'Temuco', '56961408615'),
  ('Jr Arriendos', 'Melipilla', '56999699573'),
  ('AFCE Maquinarias', 'Melipilla', '56953907448'),
  ('Oass Arriendo Retroexcavadora', 'Talca', '56984623643'),
  ('Rodimaq', 'Talca', '56994517973')
]

with open('scripts/clean_wa_links.txt', 'w', encoding='utf-8') as f:
    for nombre, comuna, fono in leads:
        e_param = urllib.parse.quote_plus(nombre)
        c_param = urllib.parse.quote_plus(comuna)
        demo_url = f'https://universo693.com/demo?e={e_param}&r=maquinaria&t={fono}&c={c_param}'
        
        msg = (
            f'Hola {nombre}, buen día. Alexis por acá de UniVerso 693.\n\n'
            f'Vi su contacto buscando arriendo de maquinaria en {comuna}. Noté que quienes buscan máquinas en Google desde el celular no encuentran una página directa de ustedes para cotizar rápido, y terminan llamando a la competencia.\n\n'
            f'Les armé una vista previa de cómo quedaría su catálogo en el celular para recibir cotizaciones en 1 clic directo a su WhatsApp:\n'
            f'👉 {demo_url}\n\n'
            f'Se las dejamos 100% activa con su propio dominio .CL, su flota y su teléfono por $85.000 IVA inc. pago único (sin mensualidades obligatorias).\n\n'
            f'¿Le damos una mirada y se las dejamos andando hoy? Saludos!'
        )
        
        # URL encode text for wa.me query parameter
        encoded_text = urllib.parse.quote(msg)
        wa_url = f'https://wa.me/{fono}?text={encoded_text}'
        
        f.write(f'### {nombre} ({comuna})\n')
        f.write(f'👉 [Enviar WhatsApp al +{fono}]({wa_url})\n\n')

print("DONE")
