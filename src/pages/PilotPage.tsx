import React, { useState, useMemo, useEffect } from 'react';
import {
  ExternalLink,
  Copy,
  Check,
  Send,
  Smartphone,
  RefreshCw,
  Sparkles,
  Truck,
  HardHat,
  Wrench,
  Building,
  Shield,
  Layers,
  Phone,
  MapPin,
  Building2,
  Trash2,
  ArrowRight
} from 'lucide-react';
import { RUBROS_CATALOG, RubroConfig, getRubroConfig } from '../data/demoRubros';

interface ProspectoGuardado {
  id: string;
  empresa: string;
  rubroId: string;
  telefono: string;
  comuna: string;
  urlDemo: string;
  fecha: string;
}

export const PilotPage: React.FC = () => {
  const [empresa, setEmpresa] = useState('Transportes San Bernardo');
  const [rubroId, setRubroId] = useState('transporte');
  const [telefono, setTelefono] = useState('+56 9 9123 4567');
  const [comuna, setComuna] = useState('San Bernardo');
  const [precio, setPrecio] = useState('$85.000');
  const [fotoCustom, setFotoCustom] = useState('');
  const [rawPasted, setRawPasted] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractFeedback, setExtractFeedback] = useState<string | null>(null);

  const [copiadoLink, setCopiadoLink] = useState(false);
  const [copiadoMsg, setCopiadoMsg] = useState(false);
  const [historial, setHistorial] = useState<ProspectoGuardado[]>([]);

  // Cargar historial de localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('universo693_prospectos_pilot');
      if (saved) {
        setHistorial(JSON.parse(saved));
      }
    } catch {}
  }, []);

  const rubroConfig: RubroConfig = useMemo(() => {
    return RUBROS_CATALOG[rubroId] || RUBROS_CATALOG.maquinaria;
  }, [rubroId]);

  const telefonoLimpio = useMemo(() => {
    return telefono.replace(/[^0-9]/g, '') || '56944194618';
  }, [telefono]);

  // Construir URL limpia de la demo
  const urlDemo = useMemo(() => {
    const base = typeof window !== 'undefined' ? window.location.origin : 'https://universo693.com';
    const params = new URLSearchParams();
    if (empresa.trim()) params.set('e', empresa.trim());
    if (rubroId) params.set('r', rubroId);
    if (telefonoLimpio) params.set('t', telefonoLimpio);
    if (comuna.trim()) params.set('c', comuna.trim());
    if (fotoCustom.trim()) params.set('f', fotoCustom.trim());
    return `${base}/demo?${params.toString()}`;
  }, [empresa, rubroId, telefonoLimpio, comuna, fotoCustom]);

  // Construir mensaje de prospección WhatsApp
  const mensajeWhatsApp = useMemo(() => {
    const rawTemplate = rubroConfig.pitchWhatsAppTemplate;
    return rawTemplate
      .replace(/{empresa}/g, empresa.trim() || 'Estimados')
      .replace(/{comuna}/g, comuna.trim() || 'su comuna')
      .replace(/{linkDemo}/g, urlDemo);
  }, [rubroConfig, empresa, comuna, urlDemo]);

  const urlWhatsAppDirecto = useMemo(() => {
    return `https://wa.me/${telefonoLimpio}?text=${encodeURIComponent(mensajeWhatsApp)}`;
  }, [telefonoLimpio, mensajeWhatsApp]);

  // Extractor inteligente con IA (Groq) para Marketplace, enlaces y anuncios copiados
  const handleExtraerConIA = async (inputOverride?: string) => {
    let textToProcess = (inputOverride !== undefined ? inputOverride : rawPasted).trim();
    if (!textToProcess) return;

    // Limpiar si el usuario pegó dos URLs pegadas juntas (ej: https://...https://...)
    if (textToProcess.includes('http')) {
      const matchUrl = textToProcess.match(/(https?:\/\/[^\s"'<>]+)/i);
      if (matchUrl) {
        let singleUrl = matchUrl[1];
        const secondHttp = singleUrl.indexOf('http', 7);
        if (secondHttp !== -1) {
          singleUrl = singleUrl.substring(0, secondHttp);
        }
        textToProcess = singleUrl;
      }
    }

    // 1. Detección rápida local SOLO si es una URL de demo propia (universo693.com/demo?e=...)
    const isOurDemoUrl = (textToProcess.includes('e=') || textToProcess.includes('empresa=')) && (textToProcess.includes('universo693') || textToProcess.includes('/demo'));
    if (isOurDemoUrl && textToProcess.includes('?')) {
      const query = textToProcess.split('?')[1];
      const sp = new URLSearchParams(query);
      const e = sp.get('e') || sp.get('empresa');
      const r = sp.get('r') || sp.get('rubro');
      const t = sp.get('t') || sp.get('tel');
      const c = sp.get('c') || sp.get('comuna');
      if (e) setEmpresa(decodeURIComponent(e));
      if (r && RUBROS_CATALOG[r]) setRubroId(r);
      if (t) setTelefono(decodeURIComponent(t));
      if (c) setComuna(decodeURIComponent(c));
      setExtractFeedback('✅ Parámetros de demo cargados exitosamente');
      return;
    }

    // 2. Línea clásica de lista: "Empresa (Comuna) — https://wa.me/569..."
    const matchLine = textToProcess.match(/^(.*?)\s*\((.*?)\)\s*—\s*https:\/\/wa\.me\/(\d+)/i);
    if (matchLine) {
      const [, empName, comName, telNum] = matchLine;
      setEmpresa(empName.trim());
      setComuna(comName.trim());
      setTelefono(telNum.trim());
      const detected = getRubroConfig('', empName);
      setRubroId(detected.id);
      setExtractFeedback(`✅ Datos extraídos: ${empName} (${detected.id})`);
      return;
    }

    // 3. Procesamiento profundo con IA para anuncios de Marketplace, webs o texto libre
    setIsExtracting(true);
    setExtractFeedback('Analizando anuncio de Marketplace con IA...');

    try {
      const isUrl = textToProcess.startsWith('http://') || textToProcess.startsWith('https://');
      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: isUrl ? textToProcess : undefined,
          rawInput: textToProcess,
          extractOnly: true
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.extracted) {
          const { nombre, rubro, telefono: tel, comuna: com, foto } = data.extracted;

          // Si vino un enlace de Facebook y Facebook devolvió datos vacíos por login wall
          if (!nombre && !tel && textToProcess.includes('facebook.com')) {
            setExtractFeedback('⚠️ Facebook bloqueó la lectura del enlace (exige inicio de sesión). Por favor copia el texto o título del anuncio en Marketplace y pégalo aquí para que la IA arme la demo al instante.');
            return;
          }

          if (nombre) setEmpresa(nombre);
          if (rubro && RUBROS_CATALOG[rubro]) {
            setRubroId(rubro);
          } else if (rubro) {
            const detected = getRubroConfig(rubro, nombre || '');
            setRubroId(detected.id);
          }
          if (tel && tel !== '56991234567') {
            setTelefono(tel);
          } else if (tel) {
            setTelefono(tel);
          }
          if (com) setComuna(com);
          if (foto) setFotoCustom(foto.replace(/&amp;/g, '&'));

          setExtractFeedback(`✨ ¡Anuncio analizado con éxito! Rubro detectado: ${rubro || 'transporte'}`);
        } else {
          setExtractFeedback('⚠️ No se pudieron extraer datos precisos. Revisa los campos manuales.');
        }
      } else {
        // Fallback heurístico en el navegador si falla la API
        const detected = getRubroConfig(textToProcess, textToProcess);
        setRubroId(detected.id);
        setExtractFeedback(`ℹ️ Rubro aproximado detectado: ${detected.nombreRubro}`);
      }
    } catch (err) {
      console.warn('Error al extraer con IA:', err);
      const detected = getRubroConfig(textToProcess, textToProcess);
      setRubroId(detected.id);
      setExtractFeedback(`ℹ️ Rubro detectado por palabras clave: ${detected.nombreRubro}`);
    } finally {
      setIsExtracting(false);
    }
  };

  const handleParsePasted = (text: string) => {
    setRawPasted(text);
  };

  const handleCopiarLink = () => {
    navigator.clipboard.writeText(urlDemo);
    setCopiadoLink(true);
    setTimeout(() => setCopiadoLink(false), 2000);
    guardarEnHistorial();
  };

  const handleCopiarMensaje = () => {
    navigator.clipboard.writeText(mensajeWhatsApp);
    setCopiadoMsg(true);
    setTimeout(() => setCopiadoMsg(false), 2000);
    guardarEnHistorial();
  };

  const guardarEnHistorial = () => {
    if (!empresa.trim()) return;
    const nuevo: ProspectoGuardado = {
      id: Date.now().toString(),
      empresa: empresa.trim(),
      rubroId,
      telefono: telefonoLimpio,
      comuna: comuna.trim(),
      urlDemo,
      fecha: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    const filtrado = [nuevo, ...historial.filter(h => h.empresa.toLowerCase() !== nuevo.empresa.toLowerCase())].slice(0, 15);
    setHistorial(filtrado);
    try {
      localStorage.setItem('universo693_prospectos_pilot', JSON.stringify(filtrado));
    } catch {}
  };

  const borrarHistorial = () => {
    setHistorial([]);
    localStorage.removeItem('universo693_prospectos_pilot');
  };

  return (
    <div className="min-h-screen bg-[#0E1116] text-slate-100 font-sans pb-20">
      
      {/* Header Corporativo de la Herramienta */}
      <header className="border-b border-white/10 bg-[#161B22]/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#FF6412] flex items-center justify-center text-white font-black shadow-lg shadow-[#FF6412]/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-white font-heading">
                  UniVerso 693 · Pilot Page Engine
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#FF6412]/20 text-[#FF6412] border border-[#FF6412]/30 uppercase">
                  Generador B2B
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Arma demos en 1 segundo por rubro y dispara el WhatsApp de venta al cliente
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={urlDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-md bg-white/10 hover:bg-white/15 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors border border-white/10"
            >
              <span>Ver Demo Actual</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
            <a
              href={urlWhatsAppDirecto}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 rounded-md bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-transform active:scale-95 shadow-md shadow-[#25D366]/20"
            >
              <Send className="w-3.5 h-3.5 fill-current" />
              <span>Disparar WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      {/* Contenedor Principal */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Banner de entrada rápida con IA (Marketplace, Links, Anuncios o Texto) */}
        <div className="mb-8 p-5 rounded-xl bg-[#161B22] border border-white/10 shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FF6412]" />
              Pegar enlace de Marketplace, Google Maps o texto copiado del anuncio:
            </label>
            <span className="text-[10px] text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">
              Powered by Groq AI
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <textarea
              rows={2}
              value={rawPasted}
              onChange={e => handleParsePasted(e.target.value)}
              onPaste={e => {
                const text = e.clipboardData.getData('text');
                if (text && text.trim().length > 3) {
                  setRawPasted(text);
                  handleExtraerConIA(text);
                }
              }}
              placeholder="Pega aquí el enlace de Facebook Marketplace o copia y pega el texto del anuncio (ej: 'Fletes y mudanzas en San Bernardo fono 988341122...')"
              className="flex-1 bg-[#0E1116] border border-white/15 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF6412] font-sans"
            />
            <button
              onClick={() => handleExtraerConIA()}
              disabled={isExtracting || !rawPasted.trim()}
              className="px-5 py-2.5 bg-[#FF6412] hover:bg-[#E0520A] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-xs font-bold text-white transition-all shadow-md shadow-[#FF6412]/20 flex items-center justify-center gap-2 shrink-0 active:scale-95"
            >
              {isExtracting ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Analizando con IA...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>⚡ Analizar con IA</span>
                </>
              )}
            </button>
          </div>

          {extractFeedback && (
            <div className={`text-xs px-3.5 py-2 rounded-lg border flex items-center gap-2 ${
              extractFeedback.startsWith('⚠️')
                ? 'bg-amber-950/40 border-amber-800/40 text-amber-200'
                : extractFeedback.startsWith('✨')
                ? 'bg-emerald-950/40 border-emerald-800/40 text-emerald-200'
                : 'bg-white/5 border-white/10 text-slate-300'
            }`}>
              <span>{extractFeedback}</span>
            </div>
          )}

          <p className="text-[11px] text-slate-400">
            💡 <strong>Tip Marketplace:</strong> Si Facebook bloquea el enlace privado, copia y pega directamente el texto del anuncio (título, descripción o fono) en esta caja. La IA extrae el rubro y arma la demo en 1 segundo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* COLUMNA IZQUIERDA: FORMULARIO GENERADOR */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 rounded-2xl bg-[#161B22] border border-white/10 space-y-5 shadow-xl">
              
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#FF6412] flex items-center gap-2 border-b border-white/10 pb-3">
                <Layers className="w-4 h-4" />
                1. Configuración del Prospecto
              </h2>

              {/* Selector Visual de Rubro */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-2">
                  Rubro de la Empresa *
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setRubroId('maquinaria')}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                      rubroId === 'maquinaria'
                        ? 'border-[#FF6412] bg-[#FF6412]/15 text-white font-bold shadow-md shadow-[#FF6412]/10'
                        : 'border-white/10 bg-[#0E1116] text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <span className="text-lg">🚜</span>
                    <div>
                      <strong className="block leading-tight text-white">Maquinaria</strong>
                      <span className="text-[10px] text-slate-400">Excavación & Obras</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRubroId('transporte_pasajeros')}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                      rubroId === 'transporte_pasajeros'
                        ? 'border-[#FF6412] bg-[#FF6412]/15 text-white font-bold shadow-md shadow-[#FF6412]/10'
                        : 'border-white/10 bg-[#0E1116] text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <span className="text-lg">🚐</span>
                    <div>
                      <strong className="block leading-tight text-white">Pasajeros & Vans</strong>
                      <span className="text-[10px] text-slate-400">Personal & Viajes</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRubroId('transporte')}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                      rubroId === 'transporte'
                        ? 'border-[#FF6412] bg-[#FF6412]/15 text-white font-bold shadow-md shadow-[#FF6412]/10'
                        : 'border-white/10 bg-[#0E1116] text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <span className="text-lg">🚛</span>
                    <div>
                      <strong className="block leading-tight text-white">Carga & Fletes</strong>
                      <span className="text-[10px] text-slate-400">Camiones & Ramplas</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRubroId('maestranza')}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                      rubroId === 'maestranza'
                        ? 'border-[#FF6412] bg-[#FF6412]/15 text-white font-bold shadow-md shadow-[#FF6412]/10'
                        : 'border-white/10 bg-[#0E1116] text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <span className="text-lg">⚙️</span>
                    <div>
                      <strong className="block leading-tight text-white">Maestranza</strong>
                      <span className="text-[10px] text-slate-400">Acero & Soldadura</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRubroId('construccion')}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                      rubroId === 'construccion'
                        ? 'border-[#FF6412] bg-[#FF6412]/15 text-white font-bold shadow-md shadow-[#FF6412]/10'
                        : 'border-white/10 bg-[#0E1116] text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <span className="text-lg">🏗️</span>
                    <div>
                      <strong className="block leading-tight text-white">Construcción</strong>
                      <span className="text-[10px] text-slate-400">Radier & Obras Civiles</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRubroId('seguridad')}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all col-span-2 ${
                      rubroId === 'seguridad'
                        ? 'border-[#FF6412] bg-[#FF6412]/15 text-white font-bold shadow-md shadow-[#FF6412]/10'
                        : 'border-white/10 bg-[#0E1116] text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <span className="text-lg">🛡️</span>
                    <div>
                      <strong className="block leading-tight text-white">Seguridad Privada & Vigilancia OS-10</strong>
                      <span className="text-[10px] text-slate-400">Guardias, Patrullaje Móvil y Cámaras CCTV</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Nombre de la Empresa */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#FF6412]" />
                  Nombre de la Empresa *
                </label>
                <input
                  type="text"
                  value={empresa}
                  onChange={e => setEmpresa(e.target.value)}
                  placeholder="Ej: Transportes San Bernardo"
                  className="w-full bg-[#0E1116] border border-white/15 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF6412]"
                />
              </div>

              {/* Teléfono & Comuna */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#FF6412]" />
                    WhatsApp del Cliente *
                  </label>
                  <input
                    type="text"
                    value={telefono}
                    onChange={e => setTelefono(e.target.value)}
                    placeholder="+56 9 7648 4015"
                    className="w-full bg-[#0E1116] border border-white/15 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF6412]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#FF6412]" />
                    Comuna / Ciudad *
                  </label>
                  <input
                    type="text"
                    value={comuna}
                    onChange={e => setComuna(e.target.value)}
                    placeholder="San Bernardo, Lampa, etc."
                    className="w-full bg-[#0E1116] border border-white/15 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF6412]"
                  />
                </div>
              </div>

              {/* Foto Opcional */}
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
                  Foto Hero Personalizada (Opcional)
                </label>
                <input
                  type="text"
                  value={fotoCustom}
                  onChange={e => setFotoCustom(e.target.value)}
                  placeholder="Dejar vacío para usar la foto de stock oficial del rubro"
                  className="w-full bg-[#0E1116] border border-white/10 rounded-lg px-3 py-2 text-[11px] text-white focus:outline-none focus:border-[#FF6412]"
                />
              </div>

            </div>

            {/* Historial Reciente */}
            {historial.length > 0 && (
              <div className="p-4 rounded-xl bg-[#161B22] border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300 uppercase tracking-wider">
                  <span>Prospectos Generados Recientemente</span>
                  <button
                    onClick={borrarHistorial}
                    className="text-slate-500 hover:text-red-400 transition-colors p-1"
                    title="Limpiar historial"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 text-xs">
                  {historial.map(item => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setEmpresa(item.empresa);
                        setRubroId(item.rubroId);
                        setTelefono(item.telefono);
                        setComuna(item.comuna);
                      }}
                      className="p-2 rounded-lg bg-[#0E1116] hover:bg-white/5 border border-white/5 cursor-pointer flex items-center justify-between transition-colors"
                    >
                      <div>
                        <strong className="text-white block">{item.empresa}</strong>
                        <span className="text-[10px] text-slate-400">{item.comuna} · {item.rubroId}</span>
                      </div>
                      <span className="text-[10px] text-slate-500">{item.fecha}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* COLUMNA DERECHA: RESULTADOS INMEDIATOS & SIMULADOR */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Caja de Enlace Generado */}
            <div className="p-5 rounded-2xl bg-[#161B22] border border-white/10 space-y-3 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <ExternalLink className="w-4 h-4 text-[#FF6412]" />
                  Enlace Demo Directo (Para Enviar al Cliente)
                </span>
                <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full">
                  100% Activo en Producción
                </span>
              </div>

              <div className="p-3 bg-[#0E1116] border border-white/10 rounded-xl flex items-center justify-between gap-3 text-xs font-mono text-cyan-300 break-all select-all">
                <span>{urlDemo}</span>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={handleCopiarLink}
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-2 transition-all active:scale-95"
                >
                  {copiadoLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiadoLink ? '¡Link Copiado!' : 'Copiar Link de la Demo'}</span>
                </button>

                <a
                  href={urlDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-[#FF6412] hover:bg-[#E0520A] text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-[#FF6412]/20"
                >
                  <span>Abrir Demo en Pestaña Nueva</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* 2. Mensaje de Prospección WhatsApp */}
            <div className="p-5 rounded-2xl bg-[#161B22] border border-white/10 space-y-3 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Send className="w-4 h-4 text-[#25D366]" />
                  Mensaje de Prospección WhatsApp (Calibrado para {rubroConfig.nombreRubro})
                </span>
              </div>

              <div className="p-4 bg-[#0E1116] border border-white/10 rounded-xl text-xs text-slate-300 whitespace-pre-line leading-relaxed font-sans max-h-48 overflow-y-auto select-all">
                {mensajeWhatsApp}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={handleCopiarMensaje}
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-2 transition-all active:scale-95"
                >
                  {copiadoMsg ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiadoMsg ? '¡Mensaje Copiado!' : 'Copiar Mensaje'}</span>
                </button>

                <a
                  href={urlWhatsAppDirecto}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={guardarEnHistorial}
                  className="px-6 py-2 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-black text-xs flex items-center gap-2 transition-transform active:scale-95 shadow-lg shadow-[#25D366]/25"
                >
                  <Send className="w-4 h-4 fill-current" />
                  <span>🚀 Disparar por WhatsApp al Cliente</span>
                </a>
              </div>
            </div>

            {/* 3. Simulador Visual de Teléfono Celular */}
            <div className="p-5 rounded-2xl bg-[#161B22] border border-white/10 space-y-3 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-[#FF6412]" />
                  Simulador en Vivo (Vista en Pantalla de Celular)
                </span>
                <span className="text-[11px] text-slate-400">
                  Así lo verá el dueño de {empresa} en su móvil
                </span>
              </div>

              {/* Mockup de Celular */}
              <div className="flex justify-center py-4 bg-[#0E1116] rounded-xl border border-white/5 overflow-hidden">
                <div className="w-[340px] h-[580px] bg-black rounded-[40px] border-4 border-slate-700 shadow-2xl relative overflow-hidden flex flex-col">
                  {/* Notch superior */}
                  <div className="h-6 bg-black flex items-center justify-center relative shrink-0 z-20">
                    <div className="w-24 h-4 bg-slate-900 rounded-full flex items-center justify-end px-3">
                      <div className="w-2 h-2 rounded-full bg-slate-700" />
                    </div>
                  </div>

                  {/* Iframe con la Demo en vivo */}
                  <div className="flex-1 w-full bg-white relative">
                    <iframe
                      src={urlDemo}
                      title="Vista Previa Móvil"
                      className="w-full h-full border-none"
                    />
                  </div>

                  {/* Barra inferior de gestos */}
                  <div className="h-4 bg-black flex items-center justify-center shrink-0 z-20">
                    <div className="w-28 h-1 bg-white/40 rounded-full" />
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default PilotPage;
