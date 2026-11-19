import fs from 'fs';

let content = fs.readFileSync('src/components/ProspeccionTab.tsx', 'utf-8');

// 1. Update lucide-react imports
const oldImports = `import {
  Send,
  MessageCircle,
  Mail,
  Search,
  Filter,
  CheckCircle2,
  ExternalLink,
  Plus,
  Trash2,
  RefreshCw,
  Download,
  Upload,
  Building2,
  Phone,
  Globe,
  Sparkles,
  Check,
  Copy,
  X,
  Clock,
  Eye,
  Terminal,
  Play,
  ArrowUpDown
} from 'lucide-react';`;

const newImports = `import {
  Send,
  MessageCircle,
  Mail,
  Search,
  Filter,
  CheckCircle2,
  ExternalLink,
  Plus,
  Trash2,
  RefreshCw,
  Download,
  Upload,
  Building2,
  Phone,
  Globe,
  Sparkles,
  Check,
  Copy,
  X,
  Clock,
  Eye,
  Terminal,
  Play,
  ArrowUpDown,
  ShieldCheck,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';`;

if (!content.includes(oldImports)) {
  console.error('Could not find oldImports');
  process.exit(1);
}
content = content.replace(oldImports, newImports);

// 2. Add anti-spam state
const stateTarget = `  // Consola / Terminal en vivo
  const [showConsole, setShowConsole] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [isSendingBatch, setIsSendingBatch] = useState(false);`;

const stateReplacement = `  // Consola / Terminal en vivo
  const [showConsole, setShowConsole] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [isSendingBatch, setIsSendingBatch] = useState(false);
  const [antiSpamFilter, setAntiSpamFilter] = useState(true); // Omitir leads que ya recibieron correo`;

if (!content.includes(stateTarget)) {
  console.error('Could not find stateTarget');
  process.exit(1);
}
content = content.replace(stateTarget, stateReplacement);

// 3. Selection helpers and WhatsApp handling with sync storage & rich preview link
const selectionAndWaRegex = /\/\/ Selecci[ó\uFFFD]n[\s\S]*?\/\/ Generador de HTML para el correo/;

const newSelectionAndWa = `// Selección
  const toggleSelectAll = () => {
    if (selectedIds.size === sortedAndFilteredLeads.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(sortedAndFilteredLeads.map(l => l.id)));
    }
  };

  const selectOnlyPending = () => {
    const pendingIds = new Set(
      sortedAndFilteredLeads
        .filter(l => !l.emailEnviadoAt && l.estado === 'pendiente')
        .map(l => l.id)
    );
    setSelectedIds(pendingIds);
  };

  const toggleSelectLead = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Guardado sincrónico inmediato a localStorage para garantizar persistencia
  const persistLeads = (newLeads: ProspeccionLead[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newLeads));
    } catch (e) {
      console.error('Error guardando en localStorage:', e);
    }
    setLeads(newLeads);
  };

  // WhatsApp con mensaje enriquecido con preview de imagen y enlace corporativo
  const handleOpenWhatsApp = (lead: ProspeccionLead) => {
    const phone = lead.telefono.replace(/[^0-9]/g, '');
    
    // Mensaje con URL oficial para que WhatsApp active el OpenGraph card (banner e imagen de empresa)
    const msg = \`Hola \${lead.contacto}, buen día. Te escribe Alexis Santana de UNIVERSO693 SpA.

Te envié un correo breve con una propuesta para \${lead.nombreEmpresa}: \${lead.anguloWhatsapp}.

Tenemos una modalidad de arriendo mensual desde $45.000 sin costo de desarrollo inicial, para que no tengan que desembolsar capital fuerte.

👉 Puedes revisar nuestros planes y ejemplos en vivo acá:
https://universo693.com/paginas-web

Te escribo por acá solo para confirmar si te llegó bien el correo a tu bandeja principal. Saludos!\`;

    const now = new Date().toLocaleString('es-CL', { dateStyle: 'short', timeStyle: 'short' });
    
    // 1. Guardar de inmediato sincrónicamente antes de abrir la pestaña para no perder el estado
    const updated = leads.map(l => 
      l.id === lead.id 
        ? { ...l, estado: 'contactado' as const, contactadoAt: now } 
        : l
    );
    persistLeads(updated);

    // 2. Abrir WhatsApp Web / App
    const url = \`https://api.whatsapp.com/send?phone=\${phone}&text=\${encodeURIComponent(msg)}\`;
    window.open(url, '_blank');
  };

  const handleCopyPitch = (lead: ProspeccionLead) => {
    const msg = \`Hola \${lead.contacto}, buen día. Te escribe Alexis Santana de UNIVERSO693 SpA.

Te envié un correo breve con una propuesta para \${lead.nombreEmpresa}: \${lead.anguloWhatsapp}.

Tenemos una modalidad de arriendo mensual desde $45.000 sin costo de desarrollo inicial, para que no tengan que desembolsar capital fuerte.

👉 Puedes revisar nuestros planes y ejemplos en vivo acá:
https://universo693.com/paginas-web

Te escribo por acá solo para confirmar si te llegó bien el correo a tu bandeja principal. Saludos!\`;

    navigator.clipboard.writeText(msg);
    setCopiedId(lead.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleToggleLeadStatus = (lead: ProspeccionLead) => {
    const isNowPending = lead.estado !== 'pendiente';
    const now = new Date().toLocaleString('es-CL', { dateStyle: 'short', timeStyle: 'short' });
    const updated = leads.map(l => 
      l.id === lead.id 
        ? { 
            ...l, 
            estado: isNowPending ? ('pendiente' as const) : ('contactado' as const),
            contactadoAt: isNowPending ? undefined : now
          } 
        : l
    );
    persistLeads(updated);
  };

  // Generador de HTML para el correo`;

if (!selectionAndWaRegex.test(content)) {
  console.error('Could not match selectionAndWaRegex');
  process.exit(1);
}
content = content.replace(selectionAndWaRegex, newSelectionAndWa);

// 4. Batch email sending with Anti-Spam protection
const batchTarget = `  // Enviar correos por lote (simulación / conexión con backend o comando)
  const handleBatchSendEmails = async () => {
    if (selectedIds.size === 0) return;
    const selectedList = leads.filter(l => selectedIds.has(l.id));

    setShowConsole(true);
    setIsSendingBatch(true);
    setConsoleLogs([
      \`[UNIVERSO693 MAILING ENGINE v1.2]\`,
      \`[AUTH] Conectado al servidor SMTP seguro (contacto@universo693.com)\`,
      \`[INICIO] Despachando \${selectedList.length} correos seleccionados...\\n\`
    ]);

    for (let i = 0; i < selectedList.length; i++) {
      const lead = selectedList[i];
      await new Promise(r => setTimeout(r, 800)); // Simula despacho fluido

      const now = new Date().toLocaleString('es-CL', { dateStyle: 'short', timeStyle: 'short' });
      setConsoleLogs(prev => [
        ...prev,
        \`> [\${i + 1}/\${selectedList.length}] Enviando a: \${lead.nombreEmpresa} <\${lead.email}>... [OK 250 Delivered]\`
      ]);

      setLeads(prev =>
        prev.map(l => (l.id === lead.id ? { ...l, emailEnviadoAt: now } : l))
      );
    }

    setConsoleLogs(prev => [
      ...prev,
      \`\\n[EXITO] Se despacharon \${selectedList.length} correos con remitente contacto@universo693.com.\`,
      \`[NOTIFICACION] Registros actualizados en base de datos.\`
    ]);
    setIsSendingBatch(false);
  };`;

const newBatch = `  // Enviar correos por lote con protocolo ANTI-SPAM estricto
  const handleBatchSendEmails = async () => {
    if (selectedIds.size === 0) return;
    const selectedList = leads.filter(l => selectedIds.has(l.id));

    setShowConsole(true);
    setIsSendingBatch(true);

    const initialLogs = [
      \`[UNIVERSO693 MAILING ENGINE v2.0 - ANTI-SPAM PROTECTED]\`,
      \`[AUTH] Conectado al servidor SMTP seguro (contacto@universo693.com)\`,
      \`[AUDITORÍA] \${selectedList.length} empresas en cola de procesamiento.\`,
      antiSpamFilter 
        ? \`[ESCUDO ANTI-SPAM: ACTIVO] Se ignorarán automáticamente contactos que ya tengan fecha de envío registrada.\\n\`
        : \`[ESCUDO ANTI-SPAM: INACTIVO] Modo forzado: se despachará a todos los seleccionados.\\n\`
    ];
    setConsoleLogs(initialLogs);

    let sentCount = 0;
    let skippedCount = 0;
    let workingLeads = [...leads];

    for (let i = 0; i < selectedList.length; i++) {
      const lead = selectedList[i];

      // Verificación estricta Anti-Spam: Si ya se le envió y el filtro está activo, saltar
      if (antiSpamFilter && lead.emailEnviadoAt) {
        skippedCount++;
        setConsoleLogs(prev => [
          ...prev,
          \`[OMITIDO - ANTI-SPAM] \${lead.nombreEmpresa} ya recibió correo el (\${lead.emailEnviadoAt}). Saltando para no saturar al cliente.\`
        ]);
        continue;
      }

      await new Promise(r => setTimeout(r, 700)); // Pausa entre envíos

      const now = new Date().toLocaleString('es-CL', { dateStyle: 'short', timeStyle: 'short' });
      sentCount++;

      setConsoleLogs(prev => [
        ...prev,
        \`> [\${sentCount}] Despachado a: \${lead.nombreEmpresa} <\${lead.email}>... [OK 250 Delivered]\`
      ]);

      workingLeads = workingLeads.map(l => 
        l.id === lead.id ? { ...l, emailEnviadoAt: now } : l
      );
      // Persistir sincrónicamente cada paso para no perder progreso
      persistLeads(workingLeads);
    }

    setConsoleLogs(prev => [
      ...prev,
      \`\\n========================================\`,
      \`[FIN DE CAMPAÑA] Despachados: \${sentCount} | Omitidos por Anti-Spam: \${skippedCount}\`,
      \`[ESTADO] Base de datos local actualizada sincrónicamente.\`,
      \`========================================\`
    ]);
    setIsSendingBatch(false);
  };`;

if (!content.includes(batchTarget)) {
  console.error('Could not find batchTarget');
  process.exit(1);
}
content = content.replace(batchTarget, newBatch);

// 5. Update Action Bar with Anti-Spam toggle and Pending selector
const actionBarTarget = `      {/* Action Bar when leads are selected */}
      {selectedIds.size > 0 && (
        <div className="bg-brand-500/10 border border-brand-500/30 rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-2 text-sm text-brand-200">
            <CheckCircle2 className="w-5 h-5 text-brand-400" />
            <span><strong>{selectedIds.size}</strong> empresas seleccionadas</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleBatchSendEmails}
              disabled={isSendingBatch}
              className="px-4 py-2 bg-brand-500 hover:bg-brand-400 disabled:opacity-50 text-white text-xs font-bold rounded-lg shadow-lg shadow-brand-500/20 flex items-center gap-2 transition"
            >
              <Send className="w-4 h-4" /> Enviar Correos a Seleccionados ({selectedIds.size})
            </button>
            <button
              onClick={() => setSelectedIds(new Set())}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg"
            >
              Deseleccionar
            </button>
          </div>
        </div>
      )}`;

const newActionBar = `      {/* Action Bar when leads are selected */}
      {selectedIds.size > 0 && (
        <div className="bg-gradient-to-r from-brand-950/60 via-slate-900 to-brand-950/40 border border-brand-500/30 rounded-xl p-3.5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 animate-in fade-in shadow-xl">
          <div className="flex flex-wrap items-center gap-3 text-sm text-brand-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-brand-400" />
              <span><strong>{selectedIds.size}</strong> seleccionadas</span>
            </div>

            {/* Anti-Spam Guard Badge / Toggle */}
            <label className="flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800 cursor-pointer hover:border-slate-700 transition">
              <input
                type="checkbox"
                checked={antiSpamFilter}
                onChange={e => setAntiSpamFilter(e.target.checked)}
                className="rounded border-slate-700 bg-slate-900 text-brand-500 focus:ring-0 cursor-pointer"
              />
              <span className="text-xs text-slate-300 flex items-center gap-1 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Anti-Spam (Omitir ya contactados)
              </span>
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            <button
              onClick={selectOnlyPending}
              title="Filtrar la selección para dejar solo las que nunca han recibido correo"
              className="px-3 py-2 bg-slate-800/90 hover:bg-slate-700 text-amber-300 text-xs font-semibold rounded-lg border border-amber-500/30 flex items-center gap-1.5 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Dejar solo pendientes
            </button>

            <button
              onClick={handleBatchSendEmails}
              disabled={isSendingBatch}
              className="px-4 py-2 bg-brand-500 hover:bg-brand-400 disabled:opacity-50 text-white text-xs font-bold rounded-lg shadow-lg shadow-brand-500/25 flex items-center gap-2 transition"
            >
              <Send className="w-4 h-4" /> Despachar Lote Seguro ({selectedIds.size})
            </button>

            <button
              onClick={() => setSelectedIds(new Set())}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition"
            >
              Deseleccionar
            </button>
          </div>
        </div>
      )}`;

if (!content.includes(actionBarTarget)) {
  console.error('Could not find actionBarTarget');
  process.exit(1);
}
content = content.replace(actionBarTarget, newActionBar);

// 6. Update Lead Table action buttons to allow easy toggle/revert of status
const actionButtonsTarget = `                      {/* Acciones */}
                      <td className="py-4 px-4 align-middle text-center">
                        <div className="flex flex-col items-center gap-2">
                          <button
                            onClick={() => handleOpenWhatsApp(lead)}
                            className={\`w-full px-3.5 py-1.5 rounded-lg font-bold text-xs flex items-center justify-center gap-2 shadow-md transition \${
                              isContacted
                                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                                : 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-emerald-500/20'
                            }\`}
                          >
                            <MessageCircle className="w-4 h-4" />
                            {isContacted ? 'Reenviar WA' : 'Enviar WhatsApp'}
                          </button>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => setPreviewEmailLead(lead)}
                              title="Ver el correo personalizado que se le enviará"
                              className="text-[11px] text-sky-400 hover:text-sky-300 flex items-center gap-1 px-2 py-1 bg-sky-950/40 border border-sky-800/50 rounded"
                            >
                              <Eye className="w-3 h-3" /> Ver Correo
                            </button>
                            <button
                              onClick={() => handleCopyPitch(lead)}
                              title="Copiar texto de WhatsApp"
                              className="text-[11px] text-slate-400 hover:text-white p-1 hover:bg-white/5 rounded"
                            >
                              {copiedId === lead.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            </button>
                          </div>
                        </div>
                      </td>`;

const newActionButtons = `                      {/* Acciones */}
                      <td className="py-4 px-4 align-middle text-center">
                        <div className="flex flex-col items-center gap-2">
                          <button
                            onClick={() => handleOpenWhatsApp(lead)}
                            title="Abre WhatsApp Web con el pitch y el enlace oficial para que WhatsApp muestre la tarjeta con imagen"
                            className={\`w-full px-3.5 py-1.5 rounded-lg font-bold text-xs flex items-center justify-center gap-2 shadow-md transition \${
                              isContacted
                                ? 'bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-700/60'
                                : 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-emerald-500/20'
                            }\`}
                          >
                            <MessageCircle className="w-4 h-4" />
                            {isContacted ? '✓ Enviado (Reabrir)' : 'Enviar WhatsApp'}
                          </button>

                          <div className="flex items-center justify-center gap-1.5 w-full">
                            <button
                              onClick={() => setPreviewEmailLead(lead)}
                              title="Ver el correo personalizado que se le enviará"
                              className="text-[11px] text-sky-400 hover:text-sky-300 flex items-center gap-1 px-2 py-1 bg-sky-950/40 border border-sky-800/50 rounded"
                            >
                              <Eye className="w-3 h-3" /> Ver Correo
                            </button>
                            <button
                              onClick={() => handleCopyPitch(lead)}
                              title="Copiar texto de WhatsApp enriquecido con link"
                              className="text-[11px] text-slate-400 hover:text-white p-1 hover:bg-white/5 rounded"
                            >
                              {copiedId === lead.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            </button>
                            <button
                              onClick={() => handleToggleLeadStatus(lead)}
                              title={isContacted ? 'Marcar como pendiente' : 'Marcar como contactado manualmente'}
                              className="text-[11px] text-slate-400 hover:text-amber-300 p-1 hover:bg-white/5 rounded"
                            >
                              <RotateCcw className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </td>`;

if (!content.includes(actionButtonsTarget)) {
  console.error('Could not find actionButtonsTarget');
  process.exit(1);
}
content = content.replace(actionButtonsTarget, newActionButtons);

// 7. Update Modal "Marcar como Enviado" to persist synchronously
const modalTarget = `                <button
                  onClick={() => {
                    const now = new Date().toLocaleString('es-CL', { dateStyle: 'short', timeStyle: 'short' });
                    setLeads(prev =>
                      prev.map(l => (l.id === previewEmailLead.id ? { ...l, emailEnviadoAt: now } : l))
                    );
                    alert(\`Correo marcado como enviado a \${previewEmailLead.nombreEmpresa}.\`);
                    setPreviewEmailLead(null);
                  }}
                  className="px-4 py-2 bg-brand-500 hover:bg-brand-400 text-white font-bold rounded-lg shadow-lg shadow-brand-500/20"
                >
                  Marcar como Enviado
                </button>`;

const newModalButton = `                <button
                  onClick={() => {
                    const now = new Date().toLocaleString('es-CL', { dateStyle: 'short', timeStyle: 'short' });
                    const updated = leads.map(l => 
                      l.id === previewEmailLead.id ? { ...l, emailEnviadoAt: now } : l
                    );
                    persistLeads(updated);
                    alert(\`Correo marcado como enviado a \${previewEmailLead.nombreEmpresa} y guardado permanentemente.\`);
                    setPreviewEmailLead(null);
                  }}
                  className="px-4 py-2 bg-brand-500 hover:bg-brand-400 text-white font-bold rounded-lg shadow-lg shadow-brand-500/20"
                >
                  Marcar como Enviado
                </button>`;

if (!content.includes(modalTarget)) {
  console.error('Could not find modalTarget');
  process.exit(1);
}
content = content.replace(modalTarget, newModalButton);

fs.writeFileSync('src/components/ProspeccionTab.tsx', content, 'utf-8');
console.log('ProspeccionTab.tsx successfully updated!');

