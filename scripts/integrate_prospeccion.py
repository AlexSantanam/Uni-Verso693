import re

file_path = "src/pages/Interno.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Import
import_marker = "from '../data/ebsPlaybooks';"
new_import = "from '../data/ebsPlaybooks';\nimport { ProspeccionTab } from '../components/ProspeccionTab';"
if new_import not in content:
    content = content.replace(import_marker, new_import, 1)

# 2. UserPermissions
perm_marker = "  usuarios: boolean;"
new_perm = "  usuarios: boolean;\n  prospeccion?: boolean;"
if "prospeccion?: boolean;" not in content:
    content = content.replace(perm_marker, new_perm, 1)

# 3. DEFAULT_USER_PERMISSIONS
def_perm_marker = "  usuarios: false,"
new_def_perm = "  usuarios: false,\n  prospeccion: true,"
if "prospeccion: true," not in content:
    content = content.replace(def_perm_marker, new_def_perm, 1)

# 4. type Tab
tab_marker = "type Tab = 'solicitudes' | 'whatsapp' | 'ebs'"
new_tab = "type Tab = 'solicitudes' | 'whatsapp' | 'prospeccion' | 'ebs'"
if "'prospeccion'" not in content:
    content = content.replace(tab_marker, new_tab, 1)

# 5. TABS array
tabs_marker = "  { id: 'whatsapp', label: 'WhatsApp', Icon: MessageCircle },"
new_tabs = "  { id: 'whatsapp', label: 'WhatsApp', Icon: MessageCircle },\n  { id: 'prospeccion', label: 'Prospección B2B', Icon: Send },"
if "{ id: 'prospeccion'" not in content:
    content = content.replace(tabs_marker, new_tabs, 1)

# 6. Render tab
render_marker = "        ) : tab === 'whatsapp' ? (\n          <WhatsAppInbox api={api} onUnread={setWaUnread} />"
new_render = "        ) : tab === 'whatsapp' ? (\n          <WhatsAppInbox api={api} onUnread={setWaUnread} />\n        ) : tab === 'prospeccion' ? (\n          <ProspeccionTab token={token} />"
if "tab === 'prospeccion'" not in content:
    content = content.replace(render_marker, new_render, 1)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("SUCCESSFULLY INTEGRATED ProspeccionTab into src/pages/Interno.tsx!")

