import React, { useEffect, useRef } from 'react';
import { Clock3, Globe2, Languages, Laptop } from 'lucide-react';
import { geoEquirectangular, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import type { Topology } from 'topojson-specification';
import landTopo from 'world-atlas/land-110m.json';
import { useLang } from '../lib/lang';
import { Container, SectionHeading } from './ui';

type V3 = [number, number, number];

const HOME = { lat: -33.45, lon: -70.66 }; // Santiago, Chile
const CITIES = [
  { lat: 19.43, lon: -99.13 }, // Ciudad de México
  { lat: 25.76, lon: -80.19 }, // Miami
  { lat: 40.71, lon: -74.0 }, // Nueva York
  { lat: 43.65, lon: -79.38 }, // Toronto
  { lat: 4.71, lon: -74.07 }, // Bogotá
  { lat: -12.05, lon: -77.04 }, // Lima
  { lat: -34.6, lon: -58.38 }, // Buenos Aires
  { lat: -23.55, lon: -46.63 }, // São Paulo
  { lat: 40.42, lon: -3.7 }, // Madrid
  { lat: 51.5, lon: -0.12 }, // Londres
  { lat: 52.52, lon: 13.4 }, // Berlín
  { lat: 33.57, lon: -7.59 }, // Casablanca
  { lat: 14.72, lon: -17.47 }, // Dakar
  { lat: 6.52, lon: 3.38 }, // Lagos
  { lat: -8.84, lon: 13.23 }, // Luanda
  { lat: -26.2, lon: 28.05 }, // Johannesburgo
  { lat: -33.92, lon: 18.42 }, // Ciudad del Cabo
];

const toVec = (lat: number, lon: number): V3 => {
  const la = (lat * Math.PI) / 180;
  const lo = (lon * Math.PI) / 180;
  return [Math.cos(la) * Math.sin(lo), Math.sin(la), Math.cos(la) * Math.cos(lo)];
};

/** Spherical interpolation between unit vectors. */
const slerp = (a: V3, b: V3, t: number): V3 => {
  const dot = Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
  const om = Math.acos(dot);
  if (om < 1e-4) return a;
  const s = Math.sin(om);
  const k1 = Math.sin((1 - t) * om) / s;
  const k2 = Math.sin(t * om) / s;
  return [a[0] * k1 + b[0] * k2, a[1] * k1 + b[1] * k2, a[2] * k1 + b[2] * k2];
};

/**
 * Unit vectors for a dot grid over land. The land polygons are rasterised once
 * into an equirectangular offscreen canvas (1 px per degree × 2) and sampled,
 * which is far cheaper than point-in-polygon tests.
 */
const landDots = (): V3[] => {
  const W = 720;
  const H = 360;
  const off = document.createElement('canvas');
  off.width = W;
  off.height = H;
  const octx = off.getContext('2d');
  if (!octx) return [];
  const land = feature(landTopo as unknown as Topology, (landTopo as unknown as Topology).objects.land);
  const projection = geoEquirectangular().scale(W / (2 * Math.PI)).translate([W / 2, H / 2]);
  octx.fillStyle = '#fff';
  octx.beginPath();
  geoPath(projection, octx)(land);
  octx.fill();
  const px = octx.getImageData(0, 0, W, H).data;

  const out: V3[] = [];
  const STEP = 1.6; // degrees between dots
  for (let lat = -58; lat <= 80; lat += STEP) {
    // widen longitude spacing towards the poles so density stays even
    const lonStep = STEP / Math.max(0.25, Math.cos((lat * Math.PI) / 180));
    for (let lon = -180; lon < 180; lon += lonStep) {
      const x = Math.floor(((lon + 180) / 360) * W);
      const y = Math.floor(((90 - lat) / 180) * H);
      if (px[(y * W + x) * 4 + 3] > 128) out.push(toVec(lat, lon));
    }
  }
  return out;
};

/** Swaying dotted globe with arcs from Chile to the world. */
const Globe: React.FC = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const dots = landDots();
    const home = toVec(HOME.lat, HOME.lon);
    const SEGMENTS = 64;
    const STAGGER = 0.3; // seconds between launches
    const arcs = CITIES.map((c, idx) => {
      const end = toVec(c.lat, c.lon);
      // flight-style height: longer routes climb higher so arcs fan out
      const angle = Math.acos(Math.min(1, home[0] * end[0] + home[1] * end[1] + home[2] * end[2]));
      const peak = 0.05 + angle * 0.16;
      const pts: V3[] = [];
      for (let i = 0; i <= SEGMENTS; i++) {
        const t = i / SEGMENTS;
        const p = slerp(home, end, t);
        const lift = 1 + peak * Math.sin(Math.PI * t);
        pts.push([p[0] * lift, p[1] * lift, p[2] * lift]);
      }
      // stagger launches so they go out one after another
      return { pts, end, delay: idx * STAGGER };
    });
    const CYCLE = arcs.length * STAGGER + 1.6; // seconds for the whole volley
    const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);

    let size = 0;
    let raf = 0;
    let visible = true;
    // spin = -longitude facing the viewer. Centre on lon -32° (between the
    // Americas and Europe) and sway ±16° so Chile and every arc stay in view.
    const BASE_SPIN = (32 * Math.PI) / 180;
    const SWAY = (16 * Math.PI) / 180;
    let spin = BASE_SPIN;
    const tilt = 0.12;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = canvas.clientWidth;
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const project = (v: V3) => {
      // spin around Y, then tilt around X
      const cs = Math.cos(spin);
      const sn = Math.sin(spin);
      const x = v[0] * cs + v[2] * sn;
      const z0 = -v[0] * sn + v[2] * cs;
      const ct = Math.cos(tilt);
      const st = Math.sin(tilt);
      const y = v[1] * ct - z0 * st;
      const z = v[1] * st + z0 * ct;
      const R = size * 0.42;
      return { x: size / 2 + x * R, y: size / 2 - y * R, z };
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, size, size);
      const c = size / 2;
      const R = size * 0.42;

      // atmosphere
      const atm = ctx.createRadialGradient(c, c, R * 0.85, c, c, R * 1.25);
      atm.addColorStop(0, 'rgba(56, 189, 248, 0.12)');
      atm.addColorStop(1, 'rgba(56, 189, 248, 0)');
      ctx.fillStyle = atm;
      ctx.beginPath();
      ctx.arc(c, c, R * 1.25, 0, Math.PI * 2);
      ctx.fill();

      // ocean body with a lit upper-left side
      const body = ctx.createRadialGradient(c - R * 0.35, c - R * 0.4, R * 0.1, c, c, R);
      body.addColorStop(0, 'rgba(30, 58, 110, 0.55)');
      body.addColorStop(1, 'rgba(8, 16, 34, 0.85)');
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(c, c, R, 0, Math.PI * 2);
      ctx.fill();

      // globe rim
      ctx.strokeStyle = 'rgba(125, 211, 252, 0.35)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(c, c, R, 0, Math.PI * 2);
      ctx.stroke();

      // land dots (front hemisphere only), brighter towards the centre
      const dot = Math.max(1.4, size / 330);
      for (const d of dots) {
        const p = project(d);
        if (p.z <= 0.02) continue;
        ctx.fillStyle = `rgba(125, 211, 252, ${0.15 + p.z * 0.75})`;
        ctx.fillRect(p.x - dot / 2, p.y - dot / 2, dot, dot);
      }

      // Each arc: a comet flies Santiago → city (0–1.1 s), its trail fades
      // (1.1–2.2 s) and a ring ripples out at the destination on arrival.
      const clock = reduce ? 1.2 : ((now / 1000) % CYCLE);
      ctx.lineCap = 'round';
      for (const arc of arcs) {
        const local = reduce ? 1.1 : clock - arc.delay; // reduced motion: every route fully drawn
        const FLY = 1.1;
        const head = local <= 0 ? 0 : easeOut(Math.min(1, local / FLY));
        const fade = local <= FLY ? 1 : Math.max(0, 1 - (local - FLY) / 1.1);
        const n = arc.pts.length - 1;
        const headIdx = head * n;

        // faint permanent route so the network is always legible
        for (let i = 1; i <= n; i++) {
          const a = project(arc.pts[i - 1]);
          const b = project(arc.pts[i]);
          if (a.z <= -0.05 || b.z <= -0.05) continue;
          ctx.strokeStyle = 'rgba(129, 140, 248, 0.10)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }

        // drawn trail up to the comet head, brightest near the head
        if (head > 0 && fade > 0) {
          for (let i = 1; i <= Math.ceil(headIdx); i++) {
            const a = project(arc.pts[i - 1]);
            const b = project(arc.pts[Math.min(i, n)]);
            if (a.z <= -0.05 || b.z <= -0.05) continue;
            const behind = (headIdx - i) / n; // 0 at the head
            const glow = Math.max(0, 1 - behind * 3.2);
            const f = i / n;
            ctx.strokeStyle = `rgba(${Math.round(139 - 83 * f)}, ${Math.round(92 + 97 * f)}, 246, ${(0.22 + glow * 0.78) * fade})`;
            ctx.lineWidth = 1 + glow * 1.8;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
          // comet head
          if (head < 1) {
            const hp = project(arc.pts[Math.round(headIdx)]);
            if (hp.z > -0.05) {
              const g = ctx.createRadialGradient(hp.x, hp.y, 0, hp.x, hp.y, 9);
              g.addColorStop(0, 'rgba(255, 255, 255, 1)');
              g.addColorStop(0.35, 'rgba(103, 232, 249, 0.8)');
              g.addColorStop(1, 'rgba(103, 232, 249, 0)');
              ctx.fillStyle = g;
              ctx.beginPath();
              ctx.arc(hp.x, hp.y, 9, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }

        // destination: steady dot + arrival ripple
        const e = project(arc.end);
        if (e.z > 0) {
          if (local > FLY && local < FLY + 1.2) {
            const r = (local - FLY) / 1.2;
            ctx.strokeStyle = `rgba(103, 232, 249, ${0.8 * (1 - r)})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(e.x, e.y, 3 + r * 14, 0, Math.PI * 2);
            ctx.stroke();
          }
          ctx.fillStyle = 'rgba(103, 232, 249, 0.9)';
          ctx.beginPath();
          ctx.arc(e.x, e.y, 2.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // home beacon
      const h = project(home);
      if (h.z > 0) {
        const pulse = reduce ? 0.5 : (now / 1400) % 1;
        ctx.strokeStyle = `rgba(167, 139, 250, ${1 - pulse})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(h.x, h.y, 4 + pulse * 16, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = '#c4b5fd';
        ctx.beginPath();
        ctx.arc(h.x, h.y, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (now: number) => {
      spin = BASE_SPIN + Math.sin(now / 9000) * SWAY;
      draw(now);
      if (visible) raf = requestAnimationFrame(loop);
    };

    resize();
    draw(performance.now());
    if (!reduce) raf = requestAnimationFrame(loop);

    const ro = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      const was = visible;
      visible = entry.isIntersecting;
      if (visible && !was && !reduce) raf = requestAnimationFrame(loop);
    });
    io.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={ref} className="w-full aspect-square" aria-hidden />;
};

export const GlobalReach: React.FC = () => {
  const { lang } = useLang();
  const es = lang === 'es';
  const points = [
    {
      icon: Laptop,
      title: es ? 'Trabajo 100 % remoto' : '100% remote work',
      text: es ? 'Reuniones por videollamada, avances visibles y entregas en línea.' : 'Video calls, visible progress and online delivery.',
    },
    {
      icon: Languages,
      title: es ? 'Español e inglés' : 'Spanish and English',
      text: es ? 'Comunicación y documentación en tu idioma.' : 'Communication and documentation in your language.',
    },
    {
      icon: Clock3,
      title: es ? 'Horarios compatibles' : 'Compatible hours',
      text: es ? 'Coordinamos con América y Europa sin fricción.' : 'We coordinate with the Americas and Europe with ease.',
    },
  ];

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-10">
          <SectionHeading
            eyebrow={
              <span className="inline-flex items-center gap-2">
                <Globe2 className="w-3.5 h-3.5" />
                {es ? 'Alcance global' : 'Global reach'}
              </span>
            }
            title={
              es ? (
                <>
                  Desde Chile, <span className="text-gradient-brand">desarrollamos para el mundo</span>
                </>
              ) : (
                <>
                  From Chile, <span className="text-gradient-brand">we build for the world</span>
                </>
              )
            }
            subtitle={
              es
                ? 'No importa dónde esté tu empresa: diseñamos, construimos y acompañamos tu producto a distancia, con la misma cercanía que un equipo local.'
                : 'Wherever your company is, we design, build and support your product remotely, with the same closeness as a local team.'
            }
          />
          <div className="space-y-5">
            {points.map((p) => (
              <div key={p.title} className="reveal flex items-start gap-4">
                <div className="w-11 h-11 shrink-0 rounded-xl bg-brand-500/10 text-cyan-300 flex items-center justify-center">
                  <p.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white">{p.title}</h3>
                  <p className="text-sm text-slate-400">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-6 flex justify-center">
          <div className="w-full max-w-[36rem]">
            <Globe />
          </div>
        </div>
      </Container>
    </section>
  );
};
