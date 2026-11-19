import fs from 'fs';
import path from 'path';

const QUERIES = {
  transporte: {
    'hero-transporte-carga.jpg': 'semi-trailer truck highway',
    'camion-rampla-plana.jpg': 'flatbed truck cargo',
    'camion-tres-cuartos.jpg': 'isuzu box truck delivery',
    'camion-refrigerado.jpg': 'refrigerated truck delivery',
    'fletes-mudanzas.jpg': 'moving van truck'
  },
  maestranza: {
    'hero-maestranza-soldadura.jpg': 'welder welding steel workshop',
    'fabricacion-galpones.jpg': 'steel structural framework building',
    'corte-cnc-plasma.jpg': 'plasma cutter cutting steel plate',
    'montaje-estructural.jpg': 'crane lifting steel girder beam',
    'torno-mecanizado.jpg': 'metal lathe turning machining'
  },
  construccion: {
    'hero-construccion-obras.jpg': 'construction building site concrete',
    'radier-pavimentacion.jpg': 'concrete slab finishing construction',
    'fundaciones-muros.jpg': 'rebar reinforced concrete foundation',
    'remodelaciones-terminaciones.jpg': 'building renovation interior drywall',
    'zanjas-alcantarillado.jpg': 'trench pipe sewer water construction'
  },
  seguridad: {
    'hero-seguridad-vigilancia.jpg': 'surveillance security control room monitors',
    'guardias-os10.jpg': 'security guard uniform patrol',
    'patrullaje-movil.jpg': 'security patrol vehicle car',
    'control-acceso.jpg': 'access control turnstile badge',
    'camaras-cctv.jpg': 'cctv surveillance camera building outdoor'
  }
};

async function getImageUrl(query) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=3&prop=imageinfo&iiprop=url&iiurlwidth=1200&format=json`;
  const res = await fetch(url, { headers: { 'User-Agent': 'UniVerso693-Bot/1.0 (dev@universo693.com)' } });
  if (!res.ok) return null;
  const data = await res.json();
  if (!data.query || !data.query.pages) return null;
  for (const page of Object.values(data.query.pages)) {
    if (page.imageinfo && page.imageinfo[0]) {
      const info = page.imageinfo[0];
      return info.thumburl || info.url;
    }
  }
  return null;
}

async function main() {
  for (const [rubro, files] of Object.entries(QUERIES)) {
    const dir = path.join(process.cwd(), 'public', 'assets', rubro);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    for (const [filename, query] of Object.entries(files)) {
      const dest = path.join(dir, filename);
      console.log(`Searching for ${rubro}/${filename} -> "${query}"`);
      const imgUrl = await getImageUrl(query);
      if (!imgUrl) {
        console.warn(`  No image found for ${query}`);
        continue;
      }
      console.log(`  Downloading from ${imgUrl}...`);
      const res = await fetch(imgUrl, { headers: { 'User-Agent': 'UniVerso693-Bot/1.0 (dev@universo693.com)' } });
      if (res.ok) {
        const buf = Buffer.from(await res.arrayBuffer());
        fs.writeFileSync(dest, buf);
        console.log(`  Saved ${filename} (${buf.length} bytes)`);
      } else {
        console.warn(`  Download failed: ${res.status}`);
      }
    }
  }
}

main();
