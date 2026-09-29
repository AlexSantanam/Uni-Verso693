# Uni-Verso693 — sitio corporativo

Sitio multipágina (React 19 + Vite + Tailwind 4 + react-router) de Uni-Verso693, empresa de desarrollo de software e IA.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:4890
npm run lint     # typecheck
npm run build
```

`/api/chat` y `/api/contact` son funciones serverless; con `npm run dev` solo no responden (usa `vercel dev` o `netlify dev`).

## Estructura

- `src/pages/` — Inicio, Servicios (+ detalle), Casos (+ detalle), Nosotros, Contacto
- `src/data/site.ts` — todo el contenido bilingüe (servicios, casos, FAQ, cifras)
- `src/components/PlasmaVideo.tsx` — esfera de plasma del hero (`asset/plasma-sphere.mp4`, fondo negro fundido con `mix-blend-mode: screen`); `PlasmaGlobe.tsx` es el respaldo WebGL
- `api/contact.ts` — formulario de contacto (Resend)
- `src/server/chatHandler.ts` — agente de IA del widget de chat (Claude)

## Variables de entorno

Ver `.env.example`: `ANTHROPIC_API_KEY`, `RESEND_API_KEY`, `CONTACT_NOTIFICATION_EMAIL`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`.
