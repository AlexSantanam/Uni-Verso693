# -*- coding: utf-8 -*-
import os

target_folder = r'F:\UNI-VERSO693\zoco-os'

files_to_update = ['panel.html', 'index.html', 'cocina.html', 'bienvenida.html', 'config.js', 'package.json', 'README.md']

replacements = [
    ('zocowl.com', 'sokify.app'),
    ('zoco.app', 'sokify.app'),
    ('Zoco OS', 'Sokify'),
    ('Zoco-OS', 'Sokify'),
    ('ZOCO OS', 'SOKIFY'),
    ('Zocowl', 'Sokify'),
    ('ZOCOWL', 'SOKIFY'),
    ('Zoco', 'Sokify'),
    ('zoco', 'sokify'),
    ('ZOCO', 'SOKIFY')
]

for fname in files_to_update:
    path = os.path.join(target_folder, fname)
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        for old, new in replacements:
            content = content.replace(old, new)
        
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Actualizado a Sokify: {fname}")

print("Rebranding a Sokify completado en F:\\UNI-VERSO693\\zoco-os.")
