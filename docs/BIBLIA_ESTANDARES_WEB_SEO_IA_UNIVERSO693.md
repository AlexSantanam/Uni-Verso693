# 📘 BIBLIA DE ESTÁNDARES: DESARROLLO WEB, SEO TÉCNICO, POSICIONAMIENTO IA (AEO) Y CONVERSIÓN
**UNIVERSO693 SpA · Documento de Control Operativo Interno**  
*Guía de Verificación Obligatoria para Proyectos Propios y Sitios Web de Clientes.*

---

## 🎯 OBJETIVO DE ESTA BIBLIA
Asegurar que **ningún sitio web o plataforma** desarrollado por UNIVERSO693 (sea interno o para un cliente comercial atendido por Martín Romero o el equipo de ingeniería) sea publicado con fallas de conversión, lentitud móvil, vulnerabilidades de cabeceras o invisibilidad ante motores de Inteligencia Artificial (ChatGPT, Claude, Perplexity y Google AI Overviews).

---

## 🏛️ PILAR 1: ABOVE-THE-FOLD Y LA REGLA DE LOS 3 SEGUNDOS (CRO)
> *El 80% del tiempo de atención del visitante se concentra en los primeros 1.000 píxeles de pantalla sin hacer scroll.* (Nielsen Norman Group).

### Checklist de Verificación:
- [ ] **Titular H1 Directo e Inequívoco:** Debe responder en 3 segundos qué hace la empresa, para quién y en qué ubicación geográfica.
  - *Ejemplo correcto:* `«Clínica Dental Especializada en Implantes y Ortodoncia en Viña del Mar»` o `«Desarrollo de Software a Medida e IA para Empresas en Chile»`.
  - *Error prohibido:* Frases poéticas, crípticas o en inglés sin contexto (`«This is happening...»`, `«Transformando el futuro digital»`).
- [ ] **Bloque de Respuesta Ejecutiva (Semántica AEO):** Un párrafo breve en los primeros 300 píxeles que responda: *¿Qué es [Nombre Empresa] y qué problema resuelve?*
- [ ] **Llamado a la Acción (CTA) Primario Visible:** El botón principal debe verse sin necesidad de hacer scroll.
- [ ] **Insignias de Confianza Inmediata (Trust Proofs):** Entre 3 y 4 sellos visibles debajo del titular:
  - Plazo de entrega o atención garantizado.
  - RUT chileno y factura legal.
  - Garantía técnica post-lanzamiento.
  - 100% de código propio y soberanía.

---

## 🤖 PILAR 2: POSICIONAMIENTO EN MOTORES DE IA (AEO & GEO)
> *Las IAs no leen páginas web como humanos; buscan párrafos de definición directa y datos numéricos auditables.*

### Checklist de Verificación:
- [ ] **Definición para Cita Directa:** Párrafo estructurado con: Razón social, año de fundación, ubicación geográfica, servicios y modelo de entrega.
- [ ] **Métricas Cuantificadas Obligatorias en Casos de Éxito:** Nunca usar adjetivos subjetivos («excelente calidad», «los mejores»). Todo caso de éxito debe tener números:
  - *Ejemplo:* `+15.000 usuarios`, `65% de ahorro de tiempo`, `99.98% de disponibilidad`, `retorno de inversión en 4 meses`.
- [ ] **Archivo `llms.txt` en la raíz del sitio:**
  - Documento plano (`/llms.txt`) con la ficha de la empresa, servicios y preguntas frecuentes para que GPTBot, ClaudeBot y Perplexity lo procesen sin gastar tokens.
- [ ] **Schema JSON-LD (`schema.org`):**
  - Objeto `Organization` o `LocalBusiness` con RUT, dirección, coordenadas y teléfono.
  - Objeto `Service` con lista de prestaciones.
  - Objeto `FAQPage` con las 3 a 5 preguntas exactas que un usuario le hace a ChatGPT sobre esa empresa.

---

## ⚡ PILAR 3: VELOCIDAD TÉCNICA Y CORE WEB VITALS
> *Más del 53% de los usuarios abandona una web si tarda más de 3 segundos en abrir en su celular.*

### Checklist de Verificación:
- [ ] **Puntaje PageSpeed / Lighthouse Móvil ≥ 90/100:**
  - Largest Contentful Paint (LCP) < 2.5 segundos.
  - Cumulative Layout Shift (CLS) < 0.1 (cero saltos visuales al cargar).
  - First Input Delay (FID) / INP < 100 ms.
- [ ] **Imágenes en Formato Moderno:**
  - Todas las fotos deben estar en `.webp` o `.avif`.
  - Peso máximo por imagen de portada: 120 KB.
  - Atributos `width`, `height` y `alt` descriptivo siempre presentes.
- [ ] **Prerenderizado Estático (SSG / SSR):**
  - El HTML debe contener todo el texto al descargarse (no depender de llamadas lentas de cliente) para que los rastreadores indexen el 100% del contenido.

---

## 🛡️ PILAR 4: SEGURIDAD HTTP Y BLINDAJE DE SERVIDOR (100/100)
> *Cualquier auditor de ciberseguridad califica con 50/100 un sitio si no tiene estas 5 cabeceras en el archivo de configuración (`vercel.json` o NGINX).*

### Checklist de Cabeceras HTTP Obligatorias:
```json
{
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "Content-Security-Policy": "default-src 'self' https: data: blob: 'unsafe-inline' 'unsafe-eval'; img-src 'self' https: data: blob:; media-src 'self' https: data: blob:; connect-src 'self' https: wss:; font-src 'self' https: data:;"
}
```

---

## 💬 PILAR 5: EMBUDO DE CONVERSIÓN Y VENTAS (WHATSAPP FIRST)
> *En Chile y Latinoamérica, más del 70% de las conversiones de servicios profesionales y B2B cierran por WhatsApp.*

### Checklist de Verificación:
- [ ] **Botón Flotante de WhatsApp:** Visible en esquina inferior derecha en móviles y escritorio.
- [ ] **Mensaje Pre-redactado Contextual:** Al dar clic, el chat debe abrir con el motivo claro:
  - *Ejemplo:* `«Hola, estoy en su web y me interesa cotizar el [Servicio/Plan].»`
- [ ] **Formularios Cortos (Baja Fricción):** Máximo 3 campos: Nombre, WhatsApp o Correo, y Breve consulta. (Cada campo extra reduce un 15% la tasa de contacto).
- [ ] **Medición de Clics:** Configurar evento de analítica al hacer clic en WhatsApp o enviar formulario.

---

## 📦 PILAR 6: SOBERANÍA Y TRANSPARENCIA CON EL CLIENTE
> *El diferencial competitivo de UNIVERSO693 frente a las agencias tradicionales es la Soberanía Tecnológica.*

### Checklist de Cierre y Entrega:
- [ ] **100% Código Propio y Propiedad:** El cliente no paga mensualidades de arriendo ni está cautivo.
- [ ] **Entrega de Credenciales en Bóveda:** Dominio en NIC Chile a su nombre, accesos de hosting y repositorios privados entregados formalmente.
- [ ] **Garantía Técnica:** Toda entrega incluye entre 30 y 60 días de garantía técnica post-lanzamiento por contrato.
- [ ] **Facturación Formal:** Emisión de factura legal por UNIVERSO693 SpA con RUT 78.521.951-1.

---

## 📋 HOJA DE CONTROL RÁPIDA (PRINT / CHECKLIST ANTES DE PUBLICAR)

| Etapa | Ítem de Control | Responsable | Estado |
| :--- | :--- | :---: | :---: |
| **Hero** | ¿El H1 dice qué hace la empresa en 3 segundos? | Comercial / Copy | [ ] |
| **AEO** | ¿Hay párrafo de respuesta para que ChatGPT y Claude la citen? | Copywriting | [ ] |
| **Casos** | ¿Los casos de éxito tienen números reales cuantificados? | Comercial | [ ] |
| **Speed** | ¿PageSpeed móvil marca >90 y las imágenes están en .webp? | Ingeniería | [ ] |
| **Security** | ¿Están las 5 cabeceras HTTP activas en el servidor? | Infraestructura | [ ] |
| **WhatsApp**| ¿El botón de WhatsApp abre con mensaje pre-cargado? | Frontend | [ ] |
| **SEO** | ¿Tiene Title, Description, Canonical, robots.txt y sitemap? | SEO | [ ] |
| **Legal** | ¿Se emitirá factura legal y se entregará garantía escrita? | Administración | [ ] |

