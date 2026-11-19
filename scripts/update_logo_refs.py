# -*- coding: utf-8 -*-
import os

target = r'F:\UNI-VERSO693\zoco-os'
for fname in os.listdir(target):
    if fname.endswith(('.html', '.js')):
        path = os.path.join(target, fname)
        with open(path, 'r', encoding='utf-8') as f:
            c = f.read()
        if 'zoco-avatar' in c or 'zoco-logo' in c:
            c = c.replace('zoco-avatar.png', 'sokify-avatar.png')
            c = c.replace('zoco-avatar.jpg', 'sokify-avatar.png')
            c = c.replace('zoco-logo.png', 'sokify-logo.png')
            with open(path, 'w', encoding='utf-8') as f:
                f.write(c)
            print(f"Referencias de logo actualizadas en {fname}")
