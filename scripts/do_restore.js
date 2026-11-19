import fs from 'fs';

let content = fs.readFileSync('src/components/ProspeccionTab.tsx', 'utf-8');

const anchor1 = "const [sortBy, setSortBy] = useState<'pendientes' | 'nombre' | 'recientes'>('pendientes');";
const anchor2 = "const toggleSelectAll = () => {";

const idx1 = content.indexOf(anchor1);
const idx2 = content.indexOf(anchor2);

console.log('idx1:', idx1, 'idx2:', idx2);

if (idx1 !== -1 && idx2 !== -1) {
  const insert = `const [sortBy, setSortBy] = useState<'pendientes' | 'nombre' | 'recientes'>('pendientes');

  // Selección múltiple
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Modales
  const [previewEmailLead, setPreviewEmailLead] = useState<ProspeccionLead | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Consola / Terminal en vivo
  const [showConsole, setShowConsole] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [isSendingBatch, setIsSendingBatch] = useState(false);
  const [antiSpamFilter, setAntiSpamFilter] = useState(true); // Omitir leads que ya recibieron correo

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Nuevo lead form state
  const [newLead, setNewLead] = useState<Partial<ProspeccionLead>>({
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
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  }, [leads]);

  // Métricas
  const stats = useMemo(() => {
    const total = leads.length;
    const contactados = leads.filter(l => l.estado === 'contactado' || l.estado === 'reunión' || l.estado === 'cerrado').length;
    const emailsEnviados = leads.filter(l => Boolean(l.emailEnviadoAt)).length;
    const pendientes = total - contactados;
    const tasa = total > 0 ? Math.round((contactados / total) * 100) : 0;
    return { total, contactados, emailsEnviados, pendientes, tasa };
  }, [leads]);

  const rubros = useMemo(() => {
    const set = new Set<string>();
    leads.forEach(l => set.add(l.rubro));
    return Array.from(set);
  }, [leads]);

  // Ordenamiento y Filtrado
  const sortedAndFilteredLeads = useMemo(() => {
    let result = leads.filter(l => {
      const matchesSearch =
        l.nombreEmpresa.toLowerCase().includes(search.toLowerCase()) ||
        l.contacto.toLowerCase().includes(search.toLowerCase()) ||
        l.comuna.toLowerCase().includes(search.toLowerCase()) ||
        l.email.toLowerCase().includes(search.toLowerCase());

      const matchesRubro = filterRubro === 'todos' || l.rubro === filterRubro;
      const matchesEstado = filterEstado === 'todos' || l.estado === filterEstado;

      return matchesSearch && matchesRubro && matchesEstado;
    });

    if (sortBy === 'pendientes') {
      result.sort((a, b) => {
        if (a.estado === 'pendiente' && b.estado !== 'pendiente') return -1;
        if (a.estado !== 'pendiente' && b.estado === 'pendiente') return 1;
        return a.nombreEmpresa.localeCompare(b.nombreEmpresa);
      });
    } else if (sortBy === 'nombre') {
      result.sort((a, b) => a.nombreEmpresa.localeCompare(b.nombreEmpresa));
    }

    return result;
  }, [leads, search, filterRubro, filterEstado, sortBy]);

  // Selección
  `;

  content = content.substring(0, idx1) + insert + content.substring(idx2);
  fs.writeFileSync('src/components/ProspeccionTab.tsx', content, 'utf-8');
  console.log('Successfully restored all missing hooks and state in ProspeccionTab.tsx!');
}

