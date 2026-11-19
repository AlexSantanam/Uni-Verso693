import fs from 'fs';
import { RUBROS_CATALOG } from '../src/data/demoRubros.ts';

const PROSPECTS = [
  { empresa: 'Arriendo de maquinaria pesada', comuna: 'Lampa', telefono: '56976484015', rubro: 'maquinaria' },
  { empresa: 'Maquinarias Arriendo Jusaae', comuna: 'Colina', telefono: '56994221076', rubro: 'maquinaria' },
  { empresa: 'Arriendo de maquinaria RYA', comuna: 'San Bernardo', telefono: '56999366480', rubro: 'maquinaria' },
  { empresa: 'Court Maquinarias', comuna: 'San Bernardo', telefono: '56974518397', rubro: 'maquinaria' },
  { empresa: 'Arriendo de Camión Pluma JVO', comuna: 'Rancagua', telefono: '56977552222', rubro: 'camion_pluma' },
  { empresa: 'Transportes Grevy', comuna: 'Quillota', telefono: '56977644630', rubro: 'maquinaria' },
  { empresa: 'Hemaq Arriendo Retroexcavadoras', comuna: 'Quillota', telefono: '56998936612', rubro: 'maquinaria' },
  { empresa: 'Arriendo Retroexcavadora y Camiones Tolva', comuna: 'Antofagasta', telefono: '56959074183', rubro: 'maquinaria' },
  { empresa: 'Morosmin Rental', comuna: 'Antofagasta', telefono: '56978490186', rubro: 'maquinaria' },
  { empresa: 'AYM Arriendo de Maquinaria', comuna: 'La Serena', telefono: '56995909078', rubro: 'maquinaria' },
  { empresa: 'Temumac', comuna: 'Temuco', telefono: '56961408615', rubro: 'maquinaria' },
  { empresa: 'Jr Arriendos', comuna: 'Melipilla', telefono: '56999699573', rubro: 'maquinaria' },
  { empresa: 'AFCE Maquinarias', comuna: 'Melipilla', telefono: '56953907448', rubro: 'maquinaria' },
  { empresa: 'Oass Arriendo Retroexcavadora', comuna: 'Talca', telefono: '56984623643', rubro: 'maquinaria' },
  { empresa: 'Rodimaq', comuna: 'Talca', telefono: '56994517973', rubro: 'maquinaria' },
  { empresa: 'VIAJES ESPECIALES', comuna: 'Quilpué', telefono: '56944194618', rubro: 'transporte_pasajeros' }
];

const results = PROSPECTS.map((p, idx) => {
  const cfg = RUBROS_CATALOG[p.rubro] || RUBROS_CATALOG['maquinaria'];
  const query = new URLSearchParams({
    e: p.empresa,
    r: p.rubro,
    t: p.telefono,
    c: p.comuna
  });
  const linkDemo = `https://universo693.com/demo?${query.toString()}`;
  const rawMsg = cfg.pitchWhatsAppTemplate
    .replace(/{empresa}/g, p.empresa)
    .replace(/{comuna}/g, p.comuna)
    .replace(/{linkDemo}/g, linkDemo);
  const waUrl = `https://wa.me/${p.telefono}?text=${encodeURIComponent(rawMsg).replace(/%3F/g, '?')}`;
  return {
    num: idx + 1,
    title: `${p.empresa} (${p.comuna})`,
    rubroName: cfg.nombreRubro,
    phone: p.telefono,
    linkDemo,
    waUrl,
    rawMsg
  };
});

fs.writeFileSync('scripts/leads_ready.json', JSON.stringify(results, null, 2));
console.log('Processed', results.length, 'leads successfully.');
