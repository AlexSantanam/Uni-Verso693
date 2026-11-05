import React, { useState, useEffect, useMemo } from 'react';
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
  Building2,
  Phone,
  Globe,
  Sparkles,
  Check,
  Copy,
  X,
  Clock
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
  estado: 'pendiente' | 'contactado' | 'reunión' | 'cerrado';
  contactadoAt?: string;
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
    estado: 'pendiente'
  }
];

const STORAGE_KEY = 'u693_prospeccion_leads_v2';

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
  const [selectedLead, setSelectedLead] = useState<ProspeccionLead | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

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
    const pendientes = total - contactados;
    const tasa = total > 0 ? Math.round((contactados / total) * 100) : 0;
    return { total, contactados, pendientes, tasa };
  }, [leads]);

  // Lista de rubros únicos
  const rubros = useMemo(() => {
    const set = new Set<string>();
    leads.forEach(l => set.add(l.rubro));
    return Array.from(set);
  }, [leads]);

  // Filtrado
  const filteredLeads = useMemo(() => {
    return leads.filter(l => {
      const matchesSearch =
        l.nombreEmpresa.toLowerCase().includes(search.toLowerCase()) ||
        l.contacto.toLowerCase().includes(search.toLowerCase()) ||
        l.comuna.toLowerCase().includes(search.toLowerCase()) ||
        l.email.toLowerCase().includes(search.toLowerCase());

      const matchesRubro = filterRubro === 'todos' || l.rubro === filterRubro;
      const matchesEstado = filterEstado === 'todos' || l.estado === filterEstado;

      return matchesSearch && matchesRubro && matchesEstado;
    });
  }, [leads, search, filterRubro, filterEstado]);

  const handleMarkContacted = (id: string) => {
    const now = new Date().toLocaleString('es-CL', { dateStyle: 'short', timeStyle: 'short' });
    setLeads(prev =>
      prev.map(l => (l.id === id ? { ...l, estado: 'contactado', contactadoAt: now } : l))
    );
  };

  const handleOpenWhatsApp = (lead: ProspeccionLead) => {
    const phone = lead.telefono.replace(/[^0-9]/g, '');
    const msg = `Hola ${lead.contacto}, buen día. Te escribe Alexis Santana de UNIVERSO693 SpA.\n\nTe envié un correo breve con una propuesta para ${lead.nombreEmpresa}: ${lead.anguloWhatsapp}.\n\nTenemos una modalidad de arriendo mensual desde $45.000 sin costo de desarrollo inicial, para que no tengan que desembolsar capital fuerte.\n\nTe escribo por acá solo para confirmar si te llegó bien el correo a tu bandeja principal. Saludos!`;
    const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    handleMarkContacted(lead.id);
  };

  const handleCopyPitch = (lead: ProspeccionLead) => {
    const msg = `Hola ${lead.contacto}, buen día. Te escribe Alexis Santana de UNIVERSO693 SpA.\n\nTe envié un correo breve con una propuesta para ${lead.nombreEmpresa}: ${lead.anguloWhatsapp}.\n\nTenemos una modalidad de arriendo mensual desde $45.000 sin costo de desarrollo inicial, para que no tengan que desembolsar capital fuerte.\n\nTe escribo por acá solo para confirmar si te llegó bien el correo a tu bandeja principal. Saludos!`;
    navigator.clipboard.writeText(msg);
    setCopiedId(lead.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDeleteLead = (id: string) => {
    if (confirm('¿Eliminar esta empresa de la lista?')) {
      setLeads(prev => prev.filter(l => l.id !== id));
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
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
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Empresa', 'Contacto', 'Rubro', 'Comuna', 'Email', 'Telefono', 'SitioWeb', 'EstadoTecnico', 'Oportunidad', 'Estado', 'FechaContacto'];
    const rows = leads.map(l => [
      l.id,
      `"${l.nombreEmpresa}"`,
      `"${l.contacto}"`,
      `"${l.rubro}"`,
      `"${l.comuna}"`,
      l.email,
      l.telefono,
      l.sitioWeb,
      `"${l.estadoTecnico}"`,
      `"${l.oportunidad}"`,
      l.estado,
      l.contactadoAt || ''
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

  return (
    <div className="space-y-6">
      {/* Header & Stats Cards */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-white tracking-tight">Prospección Quirúrgica B2B</h2>
            <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2.5 py-0.5 rounded-full font-semibold border border-emerald-500/30">
              En Vivo
            </span>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Módulo automatizado de captación de clientes Pyme en Chile con modalidades de Arriendo ($45.000/mes) y Leasing.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg border border-slate-700 transition"
          >
            <Download className="w-4 h-4" /> Exportar CSV
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
          <div className="text-emerald-400 text-xs font-medium uppercase tracking-wider">Contactados</div>
          <div className="text-2xl font-black text-emerald-400 mt-1">{stats.contactados}</div>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
          <div className="text-amber-400 text-xs font-medium uppercase tracking-wider">Pendientes</div>
          <div className="text-2xl font-black text-amber-400 mt-1">{stats.pendientes}</div>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
          <div className="text-brand-300 text-xs font-medium uppercase tracking-wider">Tasa de Cobertura</div>
          <div className="text-2xl font-black text-white mt-1">{stats.tasa}%</div>
        </div>
      </div>

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

        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="flex items-center gap-1 text-slate-400 text-xs">
            <Filter className="w-3.5 h-3.5" /> Rubro:
          </div>
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

      {/* Leads Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-950/70 border-b border-slate-800 text-xs text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Empresa / Sitio Web</th>
                <th className="py-3 px-4">Contacto & Canales</th>
                <th className="py-3 px-4">Diagnóstico & Oportunidad Auditada</th>
                <th className="py-3 px-4 text-center">Acción Inmediata</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-slate-500 text-sm">
                    No se encontraron empresas con los filtros seleccionados.
                  </td>
                </tr>
              ) : (
                filteredLeads.map(lead => {
                  const isContacted = lead.estado !== 'pendiente';
                  return (
                    <tr
                      key={lead.id}
                      className={`transition-colors ${isContacted ? 'bg-emerald-950/10 hover:bg-emerald-950/20' : 'hover:bg-white/5'}`}
                    >
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
                            <Clock className="w-3 h-3" /> Contactado el {lead.contactadoAt}
                          </div>
                        )}
                      </td>

                      {/* Botones de Accion */}
                      <td className="py-4 px-4 align-middle text-center">
                        <div className="flex flex-col items-center gap-2">
                          <button
                            onClick={() => handleOpenWhatsApp(lead)}
                            className={`w-full sm:w-auto px-4 py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-2 shadow-md transition ${
                              isContacted
                                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                                : 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-emerald-500/20'
                            }`}
                          >
                            <MessageCircle className="w-4 h-4" />
                            {isContacted ? 'Reenviar WhatsApp' : 'Enviar WhatsApp'}
                          </button>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleCopyPitch(lead)}
                              title="Copiar texto del mensaje al portapapeles"
                              className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 p-1 hover:bg-white/5 rounded"
                            >
                              {copiedId === lead.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                              {copiedId === lead.id ? '¡Copiado!' : 'Copiar Texto'}
                            </button>
                            <button
                              onClick={() => handleDeleteLead(lead.id)}
                              title="Eliminar de la lista"
                              className="text-slate-500 hover:text-red-400 p-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
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

            <form onSubmit={handleAddSubmit} className="space-y-3.5 text-xs">
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

