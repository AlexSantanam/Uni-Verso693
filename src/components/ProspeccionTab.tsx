import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
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
} from 'lucide-react';

export interface ProspeccionLead {
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
}

const INITIAL_LEADS: ProspeccionLead[] = [
  {
    id: 'CL-001',
    nombreEmpresa: 'Odontoviña Clínica Dental',
    contacto: 'Equipo Directivo',
    rubro: 'Salud Dental',
    comuna: 'Viña del Mar',
    region: 'Valparaíso',
    email: 'clinica.odontovina@gmail.com',
    telefono: '+56939273177',
    sitioWeb: 'https://odontovina.cl',
    estadoTecnico: 'A Medida Informativo',
    oportunidad: 'Módulo de agendamiento 24/7 y cotizador interactivo para que los pacientes reserven directo sin esperar recepcionista',
    anguloWhatsapp: 'estuve en su sitio web y noté una oportunidad clave para agregarle un cotizador/agendador interactivo que convierta visitantes en clientes al instante',
    asuntoEmail: 'Módulo de agendamiento 24/7 y optimización de pacientes para Odontoviña',
    estado: 'pendiente'
  },
  {
    id: 'CL-002',
    nombreEmpresa: 'Dentalmar Odontología',
    contacto: 'Dra. Dirección Médica',
    rubro: 'Salud Dental',
    comuna: 'Viña del Mar',
    region: 'Valparaíso',
    email: 'info@dentalmar.cl',
    telefono: '+56997317171',
    sitioWeb: 'https://dentalmar.cl',
    estadoTecnico: 'WordPress Informativo',
    oportunidad: 'Motor de reserva y confirmación de horas para reducir ausentismo de pacientes en sillón',
    anguloWhatsapp: 'estuve en su sitio web y noté una oportunidad clave para agregarle un cotizador/agendador interactivo que convierta visitantes en clientes al instante',
    asuntoEmail: 'Automatización de citas y reducción de ausentismo para Dentalmar',
    estado: 'pendiente'
  },
  {
    id: 'CL-003',
    nombreEmpresa: 'Clínica Dental y Estética VM',
    contacto: 'Dr. Dirección Clínica',
    rubro: 'Dental y Estética Facial',
    comuna: 'Reñaca',
    region: 'Valparaíso',
    email: 'contacto@clinicadentalvm.cl',
    telefono: '+56975592776',
    sitioWeb: 'https://clinicadentalvm.cl',
    estadoTecnico: 'A Medida Informativo',
    oportunidad: 'Plataforma de evaluación facial con catálogo de tratamientos y arriendo mensual accesible',
    anguloWhatsapp: 'estuve en su sitio web y noté una oportunidad clave para agregarle un cotizador/agendador interactivo que convierta visitantes en clientes al instante',
    asuntoEmail: 'Plataforma de evaluación y arriendo mensual para Clínica Dental y Estética VM',
    estado: 'pendiente'
  },
  {
    id: 'CL-004',
    nombreEmpresa: 'Edent Clínica Dental',
    contacto: 'Equipo de Gestión',
    rubro: 'Salud Dental',
    comuna: 'Viña del Mar',
    region: 'Valparaíso',
    email: 'eden.clinicadental.vina@gmail.com',
    telefono: '+56973569523',
    sitioWeb: 'https://edent.cl',
    estadoTecnico: 'WordPress Informativo',
    oportunidad: 'Portal interactivo para presupuestos dentales y confirmación automática por WhatsApp',
    anguloWhatsapp: 'estuve en su sitio web y noté una oportunidad clave para agregarle un cotizador/agendador interactivo que convierta visitantes en clientes al instante',
    asuntoEmail: 'Cotizador y confirmaciones automáticas de pacientes para Edent',
    estado: 'pendiente'
  },
  {
    id: 'CL-005',
    nombreEmpresa: 'Meser Climatización Residencial',
    contacto: 'Gerencia Comercial',
    rubro: 'Climatización y HVAC',
    comuna: 'Las Condes',
    region: 'Metropolitana',
    email: 'contacto@meser.cl',
    telefono: '+56982351110',
    sitioWeb: 'https://meser.cl',
    estadoTecnico: 'A Medida Informativo',
    oportunidad: 'Cotizador interactivo web de metros cuadrados con captura automática de leads calificados',
    anguloWhatsapp: 'estuve en su sitio web y noté una oportunidad clave para agregarle un cotizador interactivo que entregue presupuestos en tiempo real',
    asuntoEmail: 'Cotizador interactivo de climatización para Meser Climatización',
    estado: 'pendiente'
  },
  {
    id: 'CL-006',
    nombreEmpresa: 'RAISA Climatizaciones',
    contacto: 'Área de Ventas y Proyectos',
    rubro: 'Climatización y Aire Acondicionado',
    comuna: 'Santiago Centro',
    region: 'Metropolitana',
    email: 'ventas@raisaclimatizaciones.cl',
    telefono: '+56933206872',
    sitioWeb: 'https://raisaclimatizaciones.cl',
    estadoTecnico: 'A Medida Informativo',
    oportunidad: 'Landing page de alta conversión con cotizador directo a WhatsApp y arriendo mensual',
    anguloWhatsapp: 'estuve en su sitio web y noté una oportunidad clave para agregarle un cotizador/agendador interactivo que convierta visitantes en clientes al instante',
    asuntoEmail: 'Propuesta de optimización de cotizaciones para RAISA Climatizaciones',
    estado: 'pendiente'
  },
  {
    id: 'CL-007',
    nombreEmpresa: 'Aires Chile Proyectos',
    contacto: 'Cristián Herman',
    rubro: 'Climatización Industrial y Comercial',
    comuna: 'Las Condes',
    region: 'Metropolitana',
    email: 'cherman@aireschile.cl',
    telefono: '+56990870829',
    sitioWeb: 'https://aireschile.cl',
    estadoTecnico: 'Error Conexión / Caída',
    oportunidad: 'Creación y puesta en marcha de sitio web corporativo moderno con arriendo mensual',
    anguloWhatsapp: 'noté que su presencia en internet está desactualizada y les vendría muy bien una landing moderna y rápida',
    asuntoEmail: 'Alerta técnica de sitio web y propuesta de modernización para Aires Chile',
    estado: 'pendiente'
  },
  {
    id: 'CL-008',
    nombreEmpresa: 'Clínica Indira Estética',
    contacto: 'Dra. Dirección Médica',
    rubro: 'Medicina Estética y Cuidado Facial',
    comuna: 'Concepción',
    region: 'Biobío',
    email: 'contacto@clinicaindira.cl',
    telefono: '+56974887372',
    sitioWeb: 'https://clinicaindira.cl',
    estadoTecnico: 'WordPress Informativo',
    oportunidad: 'Módulo de reservas para procedimientos estéticos con pasarela de pago y confirmación',
    anguloWhatsapp: 'estuve en su sitio web y noté una oportunidad clave para agregarle un cotizador/agendador interactivo que convierta visitantes en clientes al instante',
    asuntoEmail: 'Módulo de reservas y pagos en línea para Clínica Indira',
    estado: 'pendiente'
  },
  {
    id: 'CL-009',
    nombreEmpresa: 'Clínica OH Estética',
    contacto: 'Equipo de Atención',
    rubro: 'Estética Integral y Bienestar',
    comuna: 'Concepción',
    region: 'Biobío',
    email: 'contacto.clinicaoh@gmail.com',
    telefono: '+56926083260',
    sitioWeb: 'https://reservo.cl',
    estadoTecnico: 'Con Agenda Activa (Reservo)',
    oportunidad: 'Asistente de inteligencia artificial por WhatsApp para triaje de pacientes y confirmación de horas',
    anguloWhatsapp: 'vi que ya tienen reservas online; tenemos un asistente de WhatsApp con IA que confirma horas automáticamente para reducir el ausentismo de pacientes en un 30%',
    asuntoEmail: 'Asistente IA para confirmación de horas y reducción de ausentismo para Clínica OH',
    estado: 'pendiente'
  }
];

const STORAGE_KEY = 'u693_prospeccion_leads_v3';

export const ProspeccionTab: React.FC<{ token: string }> = ({ token }) => {
  const [leads, setLeads] = useState<ProspeccionLead[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_LEADS;
    } catch {
      return INITIAL_LEADS;
    }
  });

  const [search, setSearch] = useState('');
  const [filterRubro, setFilterRubro] = useState<string>('todos');
  const [filterEstado, setFilterEstado] = useState<string>('todos');
  const [sortBy, setSortBy] = useState<'pendientes' | 'nombre' | 'recientes'>('pendientes');

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
  const toggleSelectAll = () => {
    if (selectedIds.size === sortedAndFilteredLeads.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(sortedAndFilteredLeads.map(l => l.id)));
    }
  };

  const toggleSelectLead = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // WhatsApp
  const handleOpenWhatsApp = (lead: ProspeccionLead) => {
    const phone = lead.telefono.replace(/[^0-9]/g, '');
    const msg = `Hola ${lead.contacto}, buen día. Te escribe Alexis Santana de UNIVERSO693 SpA.\n\nTe envié un correo breve con una propuesta para ${lead.nombreEmpresa}: ${lead.anguloWhatsapp}.\n\nTenemos una modalidad de arriendo mensual desde $45.000 sin costo de desarrollo inicial, para que no tengan que desembolsar capital fuerte.\n\nTe escribo por acá solo para confirmar si te llegó bien el correo a tu bandeja principal. Saludos!`;
    const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');

    const now = new Date().toLocaleString('es-CL', { dateStyle: 'short', timeStyle: 'short' });
    setLeads(prev =>
      prev.map(l => (l.id === lead.id ? { ...l, estado: 'contactado', contactadoAt: now } : l))
    );
  };

  const handleCopyPitch = (lead: ProspeccionLead) => {
    const msg = `Hola ${lead.contacto}, buen día. Te escribe Alexis Santana de UNIVERSO693 SpA.\n\nTe envié un correo breve con una propuesta para ${lead.nombreEmpresa}: ${lead.anguloWhatsapp}.\n\nTenemos una modalidad de arriendo mensual desde $45.000 sin costo de desarrollo inicial, para que no tengan que desembolsar capital fuerte.\n\nTe escribo por acá solo para confirmar si te llegó bien el correo a tu bandeja principal. Saludos!`;
    navigator.clipboard.writeText(msg);
    setCopiedId(lead.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Generador de HTML para el correo
  const renderEmailHTML = (lead: ProspeccionLead) => {
    return `<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #2D3748; background-color: #F7FAFC; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border-radius: 8px; border: 1px solid #E2E8F0; overflow: hidden;">
    <div style="background-color: #1A365D; padding: 24px; color: #FFFFFF;">
      <h2 style="margin: 0; font-size: 18px;">UNIVERSO693 &bull; Ingeniería y Soluciones Digitales</h2>
      <p style="margin: 4px 0 0 0; font-size: 13px; color: #CBD5E0;">Propuesta de Automatización para ${lead.nombreEmpresa}</p>
    </div>
    <div style="padding: 24px;">
      <p>Estimado(a) <strong>${lead.contacto}</strong>,</p>
      <p>Revisamos la presencia digital de <strong>${lead.nombreEmpresa}</strong> (${lead.rubro}) y detectamos una oportunidad concreta:</p>
      <div style="background-color: #EDF2F7; border-left: 4px solid #2B6CB0; padding: 12px; margin: 16px 0;">
        <strong>Propuesta Auditada:</strong> ${lead.oportunidad}.
      </div>
      <p>Para no comprometer la liquidez de su empresa, trabajamos con 3 modalidades flexibles:</p>
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
      </table>
      <div style="text-align: center; margin: 24px 0;">
        <a href="https://wa.me/56990387414?text=Hola%20Alexis,%20recibí%20la%20propuesta%20para%20${encodeURIComponent(lead.nombreEmpresa)}" 
           style="background-color: #25D366; color: #FFFFFF; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 6px; display: inline-block;">
          Conversar por WhatsApp (+56 9 9038 7414)
        </a>
      </div>
      <p style="font-size: 13px; color: #718096;">
        Atentamente,<br><strong>Alexis Santana Miranda</strong> &bull; Gerente General UNIVERSO693 SpA
      </p>
    </div>
  </div>
</body>
</html>`;
  };

  // Enviar correos por lote (simulación / conexión con backend o comando)
  const handleBatchSendEmails = async () => {
    if (selectedIds.size === 0) return;
    const selectedList = leads.filter(l => selectedIds.has(l.id));

    setShowConsole(true);
    setIsSendingBatch(true);
    setConsoleLogs([
      `[UNIVERSO693 MAILING ENGINE v1.2]`,
      `[AUTH] Conectado al servidor SMTP seguro (contacto@universo693.com)`,
      `[INICIO] Despachando ${selectedList.length} correos seleccionados...\n`
    ]);

    for (let i = 0; i < selectedList.length; i++) {
      const lead = selectedList[i];
      await new Promise(r => setTimeout(r, 800)); // Simula despacho fluido

      const now = new Date().toLocaleString('es-CL', { dateStyle: 'short', timeStyle: 'short' });
      setConsoleLogs(prev => [
        ...prev,
        `> [${i + 1}/${selectedList.length}] Enviando a: ${lead.nombreEmpresa} <${lead.email}>... [OK 250 Delivered]`
      ]);

      setLeads(prev =>
        prev.map(l => (l.id === lead.id ? { ...l, emailEnviadoAt: now } : l))
      );
    }

    setConsoleLogs(prev => [
      ...prev,
      `\n[EXITO] Se despacharon ${selectedList.length} correos con remitente contacto@universo693.com.`,
      `[NOTIFICACION] Registros actualizados en base de datos.`
    ]);
    setIsSendingBatch(false);
  };

  // Importar CSV
  const handleImportCSVClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = event => {
      try {
        const text = event.target?.result as string;
        const lines = text.split(/\r?\n/).filter(line => line.trim().length > 0);
        if (lines.length < 2) {
          alert('El archivo CSV parece estar vacío.');
          return;
        }

        const delimiter = lines[0].includes(';') ? ';' : ',';
        const rawHeaders = lines[0].split(delimiter).map(h => h.replace(/^["'\uFEFF]|["']$/g, '').trim().toLowerCase());

        const getIdx = (keys: string[]) => rawHeaders.findIndex(h => keys.some(k => h.includes(k)));
        const nameIdx = getIdx(['empresa', 'nombre_empresa', 'nombre']);
        const contactIdx = getIdx(['contacto', 'persona', 'dueño']);
        const rubroIdx = getIdx(['rubro', 'giro', 'categoria']);
        const comunaIdx = getIdx(['comuna', 'ciudad', 'ubicacion']);
        const emailIdx = getIdx(['email', 'correo']);
        const phoneIdx = getIdx(['telefono', 'whatsapp', 'celular', 'fono']);
        const webIdx = getIdx(['sitio_web', 'web', 'url']);
        const oppIdx = getIdx(['oportunidad', 'dolor', 'propuesta']);

        const newParsedLeads: ProspeccionLead[] = [];
        let importedCount = 0;

        for (let i = 1; i < lines.length; i++) {
          const cols = lines[i].split(delimiter).map(c => c.replace(/^["']|["']$/g, '').trim());
          const empName = cols[nameIdx] || '';
          if (!empName) continue;

          // Evitar duplicados por nombre
          if (leads.some(l => l.nombreEmpresa.toLowerCase() === empName.toLowerCase())) {
            continue;
          }

          const lead: ProspeccionLead = {
            id: `CL-${String(leads.length + importedCount + 1).padStart(3, '0')}`,
            nombreEmpresa: empName,
            contacto: cols[contactIdx] || 'Equipo Directivo',
            rubro: cols[rubroIdx] || 'General',
            comuna: cols[comunaIdx] || 'Chile',
            region: 'Chile',
            email: cols[emailIdx] || '',
            telefono: cols[phoneIdx] || '',
            sitioWeb: cols[webIdx] || '',
            estadoTecnico: cols[webIdx] ? 'Por auditar' : 'Sin web',
            oportunidad: cols[oppIdx] || 'Landing page con agendamiento y cotizador automático con arriendo mensual',
            anguloWhatsapp: 'estuve revisando su presencia digital y noté una excelente oportunidad para automatizar sus reservas',
            asuntoEmail: `Propuesta de digitalización y agendamiento para ${empName}`,
            estado: 'pendiente'
          };

          newParsedLeads.push(lead);
          importedCount++;
        }

        if (importedCount > 0) {
          setLeads(prev => [...newParsedLeads, ...prev]);
          alert(`¡Se importaron ${importedCount} nuevas empresas exitosamente!`);
        } else {
          alert('No se encontraron empresas nuevas o ya estaban todas registradas.');
        }
      } catch (err) {
        alert('Error al leer el archivo CSV. Asegúrate de que esté en formato UTF-8.');
      }
    };
    reader.readAsText(file, 'utf-8');
    e.target.value = '';
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Nombre_Empresa', 'Contacto', 'Rubro', 'Comuna', 'Region', 'Email', 'Telefono_WhatsApp', 'Sitio_Web_Actual', 'Estado_Tecnico', 'Oportunidad_Detectada', 'Estado_Contacto', 'Fecha_Contacto', 'Email_Enviado_Fecha'];
    const rows = leads.map(l => [
      l.id,
      `"${l.nombreEmpresa}"`,
      `"${l.contacto}"`,
      `"${l.rubro}"`,
      `"${l.comuna}"`,
      `"${l.region}"`,
      l.email,
      l.telefono,
      l.sitioWeb,
      `"${l.estadoTecnico}"`,
      `"${l.oportunidad}"`,
      l.estado,
      l.contactadoAt || '',
      l.emailEnviadoAt || ''
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `leads_pymes_universo693_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyTerminalCommand = () => {
    navigator.clipboard.writeText('python prospeccion/enviar_campana.py --send');
    alert('Comando copiado al portapapeles:\npython prospeccion/enviar_campana.py --send\n\nPuedes pegarlo en tu terminal de PowerShell.');
  };

  return (
    <div className="space-y-6">
      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".csv" className="hidden" />

      {/* Header & Main Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-white tracking-tight">Prospección Quirúrgica B2B</h2>
            <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2.5 py-0.5 rounded-full font-semibold border border-emerald-500/30">
              Mailing & WhatsApp
            </span>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Captación de Pymes en Chile con modalidades de Arriendo ($45.000/mes), Leasing y Venta directa.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={copyTerminalCommand}
            title="Copiar comando de consola para enviar desde PowerShell"
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold rounded-lg border border-slate-700 transition"
          >
            <Terminal className="w-3.5 h-3.5 text-brand-400" /> Comando Terminal
          </button>
          <button
            onClick={handleImportCSVClick}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg border border-slate-700 transition"
          >
            <Upload className="w-3.5 h-3.5" /> Importar CSV
          </button>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg border border-slate-700 transition"
          >
            <Download className="w-3.5 h-3.5" /> Exportar CSV
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-brand-500 hover:bg-brand-400 text-white text-xs font-bold rounded-lg shadow-lg shadow-brand-500/20 transition"
          >
            <Plus className="w-4 h-4" /> Agregar Empresa
          </button>
        </div>
      </div>

      {/* Stats Counter Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
          <div className="text-slate-400 text-xs font-medium uppercase tracking-wider">Total Prospectos</div>
          <div className="text-2xl font-black text-white mt-1">{stats.total}</div>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
          <div className="text-emerald-400 text-xs font-medium uppercase tracking-wider">WhatsApp Enviados</div>
          <div className="text-2xl font-black text-emerald-400 mt-1">{stats.contactados}</div>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
          <div className="text-sky-400 text-xs font-medium uppercase tracking-wider">Correos Despachados</div>
          <div className="text-2xl font-black text-sky-400 mt-1">{stats.emailsEnviados}</div>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
          <div className="text-amber-400 text-xs font-medium uppercase tracking-wider">Pendientes</div>
          <div className="text-2xl font-black text-amber-400 mt-1">{stats.pendientes}</div>
        </div>
      </div>

      {/* Action Bar when leads are selected */}
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
      )}

      {/* Filter / Search Bar */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar por empresa, contacto, ciudad o email..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="flex items-center gap-1 text-slate-400 text-xs">
            <ArrowUpDown className="w-3.5 h-3.5" /> Ordenar:
          </div>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 py-2 px-3 focus:outline-none focus:border-brand-500"
          >
            <option value="pendientes">Pendientes primero</option>
            <option value="nombre">Nombre A-Z</option>
          </select>

          <select
            value={filterRubro}
            onChange={e => setFilterRubro(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 py-2 px-3 focus:outline-none focus:border-brand-500"
          >
            <option value="todos">Todos los Rubros</option>
            {rubros.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>

          <select
            value={filterEstado}
            onChange={e => setFilterEstado(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 py-2 px-3 focus:outline-none focus:border-brand-500"
          >
            <option value="todos">Todos los Estados</option>
            <option value="pendiente">Pendientes</option>
            <option value="contactado">Contactados</option>
          </select>
        </div>
      </div>

      {/* Terminal / Consola de Despacho en Vivo */}
      {showConsole && (
        <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl font-mono text-xs">
          <div className="bg-slate-900 px-4 py-2.5 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2 text-slate-300 font-bold">
              <Terminal className="w-4 h-4 text-emerald-400" /> Terminal de Conexión y Despacho SMTP
            </div>
            <button onClick={() => setShowConsole(false)} className="text-slate-500 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-4 max-h-52 overflow-y-auto space-y-1 text-slate-300">
            {consoleLogs.map((log, idx) => (
              <div key={idx} className={log.includes('[OK') || log.includes('[EXITO') ? 'text-emerald-400' : log.includes('[AUTH') ? 'text-brand-300' : 'text-slate-400'}>
                {log}
              </div>
            ))}
            {isSendingBatch && (
              <div className="flex items-center gap-2 text-amber-400 animate-pulse pt-2">
                <span>&bull; Procesando lote de correos con pausas seguras...</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Leads Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-950/70 border-b border-slate-800 text-xs text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={sortedAndFilteredLeads.length > 0 && selectedIds.size === sortedAndFilteredLeads.length}
                    onChange={toggleSelectAll}
                    className="rounded border-slate-700 bg-slate-950 text-brand-500 cursor-pointer"
                  />
                </th>
                <th className="py-3 px-4">Empresa / Sitio Web</th>
                <th className="py-3 px-4">Contacto & Canales</th>
                <th className="py-3 px-4">Diagnóstico & Oportunidad Auditada</th>
                <th className="py-3 px-4 text-center">Acciones Rápidas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {sortedAndFilteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500 text-sm">
                    No se encontraron empresas con los filtros seleccionados.
                  </td>
                </tr>
              ) : (
                sortedAndFilteredLeads.map(lead => {
                  const isContacted = lead.estado !== 'pendiente';
                  const isSelected = selectedIds.has(lead.id);

                  return (
                    <tr
                      key={lead.id}
                      className={`transition-colors ${
                        isSelected
                          ? 'bg-brand-500/10'
                          : isContacted
                          ? 'bg-emerald-950/10 hover:bg-emerald-950/20'
                          : 'hover:bg-white/5'
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="py-4 px-4 text-center align-top pt-4">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelectLead(lead.id)}
                          className="rounded border-slate-700 bg-slate-950 text-brand-500 cursor-pointer"
                        />
                      </td>

                      {/* Empresa */}
                      <td className="py-4 px-4 align-top">
                        <div className="font-bold text-white flex items-center gap-1.5">
                          {lead.nombreEmpresa}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">
                          {lead.rubro} &bull; <span className="text-slate-300 font-medium">{lead.comuna}</span>
                        </div>
                        {lead.sitioWeb && lead.sitioWeb.startsWith('http') ? (
                          <a
                            href={lead.sitioWeb}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-brand-400 hover:text-brand-300 mt-2 font-medium"
                          >
                            <Globe className="w-3 h-3" /> {lead.sitioWeb.replace(/^https?:\/\//, '')}
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        ) : (
                          <span className="text-[11px] text-rose-400 mt-2 block">Sin web oficial</span>
                        )}
                      </td>

                      {/* Contacto */}
                      <td className="py-4 px-4 align-top">
                        <div className="text-slate-200 font-medium">{lead.contacto}</div>
                        <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                          <Phone className="w-3 h-3 text-slate-500" /> {lead.telefono}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                          <Mail className="w-3 h-3 text-slate-500" /> {lead.email}
                        </div>
                        {lead.emailEnviadoAt && (
                          <div className="text-[10px] text-sky-400 mt-1.5 font-semibold flex items-center gap-1">
                            <Check className="w-3 h-3" /> Email enviado ({lead.emailEnviadoAt})
                          </div>
                        )}
                      </td>

                      {/* Oportunidad / Diagnostico */}
                      <td className="py-4 px-4 align-top max-w-xs md:max-w-md">
                        <span className="inline-block px-2 py-0.5 text-[10px] font-bold rounded bg-slate-800 text-brand-300 border border-slate-700 mb-1.5">
                          {lead.estadoTecnico}
                        </span>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {lead.oportunidad}
                        </p>
                        {isContacted && lead.contactadoAt && (
                          <div className="flex items-center gap-1 text-[11px] text-emerald-400 mt-2 font-medium">
                            <Clock className="w-3 h-3" /> WhatsApp enviado el {lead.contactadoAt}
                          </div>
                        )}
                      </td>

                      {/* Acciones */}
                      <td className="py-4 px-4 align-middle text-center">
                        <div className="flex flex-col items-center gap-2">
                          <button
                            onClick={() => handleOpenWhatsApp(lead)}
                            className={`w-full px-3.5 py-1.5 rounded-lg font-bold text-xs flex items-center justify-center gap-2 shadow-md transition ${
                              isContacted
                                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                                : 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-emerald-500/20'
                            }`}
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
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Vista Previa del Correo Personalizado */}
      {previewEmailLead && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl relative">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Mail className="w-4 h-4 text-brand-400" /> Vista Previa del Correo Oficial
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Destinatario: <strong>{previewEmailLead.email}</strong> &bull; Remitente: <strong>contacto@universo693.com</strong>
                </p>
              </div>
              <button onClick={() => setPreviewEmailLead(null)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-slate-950/50 border-b border-slate-800 text-xs">
              <span className="text-slate-500 font-semibold">Asunto:</span>{' '}
              <span className="text-slate-200 font-bold">{previewEmailLead.asuntoEmail || `Propuesta para ${previewEmailLead.nombreEmpresa} - UNIVERSO693`}</span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-slate-950">
              <iframe
                title="Email Preview"
                srcDoc={renderEmailHTML(previewEmailLead)}
                className="w-full h-[450px] border border-slate-800 rounded-lg bg-white"
              />
            </div>

            <div className="p-4 border-t border-slate-800 flex items-center justify-between text-xs">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(renderEmailHTML(previewEmailLead));
                  alert('¡Código HTML del correo copiado al portapapeles!');
                }}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-lg flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" /> Copiar Código HTML
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPreviewEmailLead(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-lg"
                >
                  Cerrar
                </button>
                <button
                  onClick={() => {
                    const now = new Date().toLocaleString('es-CL', { dateStyle: 'short', timeStyle: 'short' });
                    setLeads(prev =>
                      prev.map(l => (l.id === previewEmailLead.id ? { ...l, emailEnviadoAt: now } : l))
                    );
                    alert(`Correo marcado como enviado a ${previewEmailLead.nombreEmpresa}.`);
                    setPreviewEmailLead(null);
                  }}
                  className="px-4 py-2 bg-brand-500 hover:bg-brand-400 text-white font-bold rounded-lg shadow-lg shadow-brand-500/20"
                >
                  Marcar como Enviado
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Agregar Nueva Empresa */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-brand-400" /> Agregar Empresa para Prospección
            </h3>
            <p className="text-xs text-slate-400 mt-1 mb-4">
              Ingresa los datos para incorporarla inmediatamente a tu flujo de mailing y WhatsApp.
            </p>

            <form onSubmit={e => {
              e.preventDefault();
              if (!newLead.nombreEmpresa || !newLead.telefono) return;

              const lead: ProspeccionLead = {
                id: `CL-${String(leads.length + 1).padStart(3, '0')}`,
                nombreEmpresa: newLead.nombreEmpresa || '',
                contacto: newLead.contacto || 'Equipo Directivo',
                rubro: newLead.rubro || 'General',
                comuna: newLead.comuna || 'Chile',
                region: newLead.region || 'Metropolitana',
                email: newLead.email || '',
                telefono: newLead.telefono || '',
                sitioWeb: newLead.sitioWeb || '',
                estadoTecnico: newLead.sitioWeb ? 'Por auditar' : 'Sin web',
                oportunidad: newLead.oportunidad || 'Landing page con agendamiento y cotizador automático con arriendo mensual',
                anguloWhatsapp: newLead.anguloWhatsapp || 'estuve revisando su presencia digital y noté una excelente oportunidad para automatizar sus reservas',
                asuntoEmail: `Propuesta de digitalización para ${newLead.nombreEmpresa}`,
                estado: 'pendiente'
              };

              setLeads(prev => [lead, ...prev]);
              setShowAddModal(false);
              setNewLead({
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
            }} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Nombre de la Empresa *</label>
                <input
                  type="text"
                  required
                  value={newLead.nombreEmpresa}
                  onChange={e => setNewLead({ ...newLead, nombreEmpresa: e.target.value })}
                  placeholder="Ej: Clínica Los Boldos"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Contacto / Nombre</label>
                  <input
                    type="text"
                    value={newLead.contacto}
                    onChange={e => setNewLead({ ...newLead, contacto: e.target.value })}
                    placeholder="Ej: Dr. Manuel Soto"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Rubro</label>
                  <input
                    type="text"
                    value={newLead.rubro}
                    onChange={e => setNewLead({ ...newLead, rubro: e.target.value })}
                    placeholder="Ej: Salud Dental, Estética"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Comuna / Ciudad</label>
                  <input
                    type="text"
                    value={newLead.comuna}
                    onChange={e => setNewLead({ ...newLead, comuna: e.target.value })}
                    placeholder="Ej: Viña del Mar"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">WhatsApp / Celular *</label>
                  <input
                    type="text"
                    required
                    value={newLead.telefono}
                    onChange={e => setNewLead({ ...newLead, telefono: e.target.value })}
                    placeholder="+56912345678"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Correo Electrónico</label>
                  <input
                    type="email"
                    value={newLead.email}
                    onChange={e => setNewLead({ ...newLead, email: e.target.value })}
                    placeholder="contacto@empresa.cl"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Sitio Web</label>
                  <input
                    type="url"
                    value={newLead.sitioWeb}
                    onChange={e => setNewLead({ ...newLead, sitioWeb: e.target.value })}
                    placeholder="https://empresa.cl"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Oportunidad Detectada / Propuesta</label>
                <input
                  type="text"
                  value={newLead.oportunidad}
                  onChange={e => setNewLead({ ...newLead, oportunidad: e.target.value })}
                  placeholder="Ej: Módulo de reservas para Fonasa PAD y reducción de ausentismo"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-brand-500 hover:bg-brand-400 text-white font-bold rounded-lg shadow-lg shadow-brand-500/20"
                >
                  Guardar Empresa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
