with open('src/components/ProspeccionTab.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update ProspeccionLead interface
old_interface = """export interface ProspeccionLead {
  id: string;
  nombreEmpresa: string;
  contacto: string;
  rubro: string;
  comuna: string;
  region: string;
  email: string;
  telefono: string;
  sitioWeb: string;
  estadoTecnico: string;
  oportunidad: string;
  anguloWhatsapp: string;
  asuntoEmail?: string;
  estado: 'pendiente' | 'contactado' | 'reunión' | 'cerrado';
  contactadoAt?: string;
  emailEnviadoAt?: string;
  notas?: string;
}"""

new_interface = """export interface ProspeccionLead {
  id: string;
  nombreEmpresa: string;
  contacto: string;
  rubro: string;
  comuna: string;
  region: string;
  email: string;
  telefono: string;
  sitioWeb: string;
  estadoTecnico: string;
  oportunidad: string;
  anguloWhatsapp: string;
  asuntoEmail?: string;
  estado: 'pendiente' | 'contactado' | 'reunión' | 'cerrado';
  contactadoAt?: string;
  contactadoPor?: 'martin' | 'alexis';
  emailEnviadoAt?: string;
  emailEnviadoPor?: 'martin' | 'alexis';
  asignadoA: 'martin' | 'alexis' | 'compartido';
  notas?: string;
}"""

if old_interface in code:
    code = code.replace(old_interface, new_interface, 1)
    print("1. Updated ProspeccionLead interface with asignadoA and contactadoPor")
else:
    print("1. FAILED to find old_interface")

# 2. Update initial leads migration in useState
old_state_init = """  const [leads, setLeads] = useState<ProspeccionLead[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_LEADS;
    } catch {
      return INITIAL_LEADS;
    }
  });"""

new_state_init = """  const [leads, setLeads] = useState<ProspeccionLead[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map((l: any) => ({
          ...l,
          asignadoA: l.asignadoA || 'martin'
        }));
      }
      return INITIAL_LEADS.map(l => ({ ...l, asignadoA: l.asignadoA || 'martin' }));
    } catch {
      return INITIAL_LEADS.map(l => ({ ...l, asignadoA: 'martin' }));
    }
  });"""

if old_state_init in code:
    code = code.replace(old_state_init, new_state_init, 1)
    print("2. Updated leads state initialization with automatic 'martin' migration")
else:
    print("2. FAILED to find old_state_init")

# 3. Add filterCartera state
old_filters = """  const [search, setSearch] = useState('');
  const [filterRubro, setFilterRubro] = useState<string>('todos');"""

new_filters = """  const [filterCartera, setFilterCartera] = useState<'todos' | 'martin' | 'alexis'>(() => {
    return isMartinUser ? 'martin' : 'todos';
  });

  const [search, setSearch] = useState('');
  const [filterRubro, setFilterRubro] = useState<string>('todos');"""

if old_filters in code:
    code = code.replace(old_filters, new_filters, 1)
    print("3. Added filterCartera state")
else:
    print("3. FAILED to find old_filters")

# 4. Update newLead form state to include asignadoA
old_new_lead = """  const [newLead, setNewLead] = useState<Partial<ProspeccionLead>>({
    nombreEmpresa: '',
    contacto: '',
    rubro: 'Salud Dental',
    comuna: '',
    region: 'Valparaíso',
    email: '',
    telefono: '',
    sitioWeb: '',
    oportunidad: '',
    anguloWhatsapp: ''
  });"""

new_new_lead = """  const [newLead, setNewLead] = useState<Partial<ProspeccionLead>>({
    nombreEmpresa: '',
    contacto: '',
    rubro: 'Salud Dental',
    comuna: '',
    region: 'Valparaíso',
    email: '',
    telefono: '',
    sitioWeb: '',
    oportunidad: '',
    anguloWhatsapp: '',
    asignadoA: isMartinUser ? 'martin' : 'alexis'
  });"""

if old_new_lead in code:
    code = code.replace(old_new_lead, new_new_lead, 1)
    print("4. Updated newLead state default")
else:
    print("4. FAILED to find old_new_lead")

# 5. Update sortedAndFilteredLeads to filter by cartera
old_filter_logic = """      const matchesRubro = filterRubro === 'todos' || l.rubro === filterRubro;
      const matchesEstado = filterEstado === 'todos' || l.estado === filterEstado;

      return matchesSearch && matchesRubro && matchesEstado;
    });"""

new_filter_logic = """      const matchesRubro = filterRubro === 'todos' || l.rubro === filterRubro;
      const matchesEstado = filterEstado === 'todos' || l.estado === filterEstado;
      const matchesCartera =
        filterCartera === 'todos' ||
        l.asignadoA === filterCartera ||
        l.asignadoA === 'compartido';

      return matchesSearch && matchesRubro && matchesEstado && matchesCartera;
    });"""

if old_filter_logic in code:
    code = code.replace(old_filter_logic, new_filter_logic, 1)
    print("5. Updated filter logic with matchesCartera")
else:
    print("5. FAILED to find old_filter_logic")

# Also update useMemo dependencies
code = code.replace(
    "[leads, search, filterRubro, filterEstado, sortBy]",
    "[leads, search, filterRubro, filterEstado, filterCartera, sortBy]"
)
print("5.1 Updated useMemo dependencies")

# 6. Add assignment helpers
helper_anchor = "  const selectOnlyPending = () => {"
helper_insert = """  const handleAssignSelected = (targetUser: 'martin' | 'alexis' | 'compartido') => {
    if (selectedIds.size === 0) return;
    const updated = leads.map(l =>
      selectedIds.has(l.id) ? { ...l, asignadoA: targetUser } : l
    );
    persistLeads(updated);
    setSelectedIds(new Set());
  };

  const handleAssignSingleLead = (leadId: string, targetUser: 'martin' | 'alexis' | 'compartido') => {
    const updated = leads.map(l =>
      l.id === leadId ? { ...l, asignadoA: targetUser } : l
    );
    persistLeads(updated);
  };

  const selectOnlyPending = () => {"""

if helper_anchor in code:
    code = code.replace(helper_anchor, helper_insert, 1)
    print("6. Added handleAssignSelected and handleAssignSingleLead")
else:
    print("6. FAILED to find helper_anchor")

# 7. Update handleOpenWhatsApp to record contactadoPor
old_wa_update = """    const updated = leads.map(l => 
      l.id === lead.id 
        ? { ...l, estado: 'contactado' as const, contactadoAt: now } 
        : l
    );"""

new_wa_update = """    const updated = leads.map(l => 
      l.id === lead.id 
        ? { ...l, estado: 'contactado' as const, contactadoAt: now, contactadoPor: senderId } 
        : l
    );"""

if old_wa_update in code:
    code = code.replace(old_wa_update, new_wa_update, 1)
    print("7. Updated handleOpenWhatsApp with contactadoPor")
else:
    print("7. FAILED to find old_wa_update")

# 8. Update handleBatchSendEmails to record emailEnviadoPor
old_batch_update = """      workingLeads = workingLeads.map(l => 
        l.id === lead.id ? { ...l, emailEnviadoAt: now } : l
      );"""

new_batch_update = """      workingLeads = workingLeads.map(l => 
        l.id === lead.id ? { ...l, emailEnviadoAt: now, emailEnviadoPor: senderId } : l
      );"""

if old_batch_update in code:
    code = code.replace(old_batch_update, new_batch_update, 1)
    print("8. Updated handleBatchSendEmails with emailEnviadoPor")
else:
    print("8. FAILED to find old_batch_update")

# 9. Add Cartera Tabs and Action bar assignment buttons in JSX
old_action_bar_btns = """            <button
              onClick={() => setSelectedIds(new Set())}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition"
            >
              Deseleccionar
            </button>"""

new_action_bar_btns = """            {/* Asignación rápida en lote */}
            <div className="flex items-center gap-1.5 border-l border-slate-800 pl-2 ml-1">
              <span className="text-[11px] text-slate-400 font-medium">Asignar:</span>
              <button
                type="button"
                onClick={() => handleAssignSelected('martin')}
                className="px-2.5 py-1.5 bg-cyan-950 hover:bg-cyan-900 text-cyan-200 text-xs font-bold rounded-lg border border-cyan-800 transition cursor-pointer"
                title="Asignar seleccionados a Martín Romero"
              >
                👤 A Martín
              </button>
              <button
                type="button"
                onClick={() => handleAssignSelected('alexis')}
                className="px-2.5 py-1.5 bg-emerald-950 hover:bg-emerald-900 text-emerald-200 text-xs font-bold rounded-lg border border-emerald-800 transition cursor-pointer"
                title="Asignar seleccionados a Alexis Santana"
              >
                💼 A Alexis
              </button>
            </div>

            <button
              onClick={() => setSelectedIds(new Set())}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition cursor-pointer"
            >
              Deseleccionar
            </button>"""

if old_action_bar_btns in code:
    code = code.replace(old_action_bar_btns, new_action_bar_btns, 1)
    print("9. Added batch assignment buttons to action bar")
else:
    print("9. FAILED to find old_action_bar_btns")

# 10. Add Cartera Segmented Bar above the search bar
old_search_box = """      {/* Filter / Search Bar */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-center gap-3">"""

new_search_box = """      {/* Segmentación por Cartera y Escudo Anti-Colisión */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/50 border border-slate-800 rounded-xl p-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400 px-1 flex items-center gap-1.5">
            <Users className="w-4 h-4 text-brand-400" /> Cartera:
          </span>
          <button
            type="button"
            onClick={() => setFilterCartera('todos')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              filterCartera === 'todos'
                ? 'bg-slate-800 text-white shadow-sm border border-slate-600'
                : 'text-slate-400 hover:text-white bg-slate-950/60 border border-slate-800'
            }`}
          >
            🌐 Vista Global ({leads.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterCartera('martin')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              filterCartera === 'martin'
                ? 'bg-cyan-950 text-cyan-200 border border-cyan-500/60 shadow-sm'
                : 'text-slate-400 hover:text-cyan-300 bg-slate-950/60 border border-slate-800'
            }`}
          >
            👤 Lote Martín ({leads.filter(l => l.asignadoA === 'martin' || l.asignadoA === 'compartido').length})
          </button>
          <button
            type="button"
            onClick={() => setFilterCartera('alexis')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              filterCartera === 'alexis'
                ? 'bg-emerald-950 text-emerald-200 border border-emerald-500/60 shadow-sm'
                : 'text-slate-400 hover:text-emerald-300 bg-slate-950/60 border border-slate-800'
            }`}
          >
            💼 Cartera Alexis ({leads.filter(l => l.asignadoA === 'alexis').length})
          </button>
        </div>

        <div className="text-[11px] text-slate-400 flex items-center gap-1.5 bg-slate-950/80 px-2.5 py-1 rounded-md border border-slate-800/80">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Protección Anti-Colisión activa: no permite duplicar correos ni llamadas</span>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-center gap-3">"""

if old_search_box in code:
    code = code.replace(old_search_box, new_search_box, 1)
    print("10. Added Cartera segmented bar above search box")
else:
    print("10. FAILED to find old_search_box")

# 11. Make sure Users and ShieldAlert icons are imported
if "ShieldAlert," not in code:
    code = code.replace("ShieldCheck,", "ShieldCheck,\n  ShieldAlert,\n  Users,")
    print("11. Added ShieldAlert and Users to imports")

# 12. In Table Row: add assignment badge and who sent it
old_table_td_company = """                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{lead.nombreEmpresa}</span>"""

new_table_td_company = """                    <td className="py-3 px-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{lead.nombreEmpresa}</span>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            lead.asignadoA === 'martin'
                              ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/80'
                              : lead.asignadoA === 'alexis'
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/80'
                              : 'bg-purple-950 text-purple-300 border border-purple-800/80'
                          }`}>
                            {lead.asignadoA === 'martin' ? '👤 Martín' : lead.asignadoA === 'alexis' ? '💼 Alexis' : '👥 Compartido'}
                          </span>
                        </div>
                        {lead.emailEnviadoAt && (
                          <div className="text-[10px] text-slate-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            Enviado por {lead.emailEnviadoPor === 'martin' ? 'Martín' : 'Alexis'} el {lead.emailEnviadoAt}
                          </div>
                        )}
                      </div>"""

if old_table_td_company in code:
    code = code.replace(old_table_td_company, new_table_td_company, 1)
    print("12. Added executive badge and contact history to table row")
else:
    print("12. FAILED to find old_table_td_company")

with open('src/components/ProspeccionTab.tsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("SCRIPT FINISHED")
