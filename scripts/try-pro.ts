// Local check of the Audit 693 Pro pipeline (analysis + PDF), without payment:
//   npx tsx --env-file=.env scripts/try-pro.ts https://example.cl "Santiago, Chile" [out.pdf]
import { writeFileSync } from 'node:fs';
import { renderPdf, runProAudit } from '../api/pro';

const [url = 'https://universo693.com', location = 'Chile', out = 'audit-pro-test.pdf'] = process.argv.slice(2);
const input = {
  url,
  fullName: 'Prueba',
  email: 'prueba@example.com',
  company: '',
  location,
  teamSize: '6-20',
  manualHours: 25,
  hourlyCost: 9000,
  mainPain: 'Respondemos las mismas consultas todo el día y los prospectos se enfrían.',
  tools: 'Planillas, WhatsApp, correo',
  competitors: '',
};

const t0 = Date.now();
const { url: siteUrl, report } = await runProAudit(input);
console.log(`analysis: ${((Date.now() - t0) / 1000).toFixed(1)}s · ${report.opportunities.length} opportunities · ${report.competitors.length} competitors`);
console.log(report.competitors.map((c) => `  - ${c.name} ${c.url}`).join('\n'));
const pdf = await renderPdf({ input, report, siteUrl, currency: 'CLP', paidAt: new Date().toISOString() });
writeFileSync(out, pdf);
console.log(`pdf: ${out} (${Math.round(pdf.length / 1024)} KB)`);
