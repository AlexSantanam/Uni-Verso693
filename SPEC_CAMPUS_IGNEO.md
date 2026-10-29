# MEMORIA MAESTRA DE CONTEXTO: PROYECTO OTEC ÍGNEO (LMS SENCE & TUTOR IA)
> **UNIVERSO693 SpA — Dirección de Ingeniería & Arquitectura de Software**  
> *Este documento contiene el contexto 100% integral del proyecto para inicializar cualquier sesión de trabajo, agente de IA o nuevo workspace en VS Code.*

---

## 1. IDENTIDAD INSTITUCIONAL & REGLAS CRÍTICAS DE MARCA
- **Empresa Contratista:** UNIVERSO693 SpA
- **RUT:** `78.521.951-1`
- **Domicilio Fiscal Corporativo:** `Fernanda 596, Villa Alemana, Región de Valparaíso, Chile`
- **Contacto Institucional Oficial:** `contacto@universo693.com` | `+56 9 9038 7414` | `https://universo693.com`
- **REGLA DE ORO DE COMUNICACIÓN:** 
  - Todo documento, portal, pie de firma y respuesta a clientes debe ser **100% INSTITUCIONAL**.
  - **Firma Oficial:** `EQUIPO DE INGENIERÍA & ARQUITECTURA DE SOFTWARE — UNIVERSO693 SpA`.
  - **NUNCA** usar nombres personales (ej. *"Alexis Santana"*) ni domicilios particulares en documentos cara al cliente o cartas oficiales. Siempre usar la razón social corporativa y la dirección fiscal de Villa Alemana.

---

## 2. EL CLIENTE & ALIANZA ESTRATÉGICA
- **Cliente:** **OTEC Ígneo** (Organismo Técnico de Capacitación de la **Fundación Cuerpo de Bomberos de Viña del Mar - Concón**).
- **Contrapartes Clave:** 
  - Martín Romero (Director Ejecutivo de la Fundación y OTEC Ígneo).
  - Claudia Araya (Coordinación y gestión de OTEC Ígneo).
- **Misión del Proyecto:** Modernizar de raíz el ecosistema de capacitación técnica de Bomberos y empresas industriales de la región (minería, puertos, refinerías químicas, logística), pasando de depender de plataformas lentas o licencias de terceros a una **infraestructura propia de alta concurrencia con Soberanía Tecnológica Garantizada**.

---

## 3. PRESUPUESTO SELECCIONADO: PRESUPUESTO 2 (PLAN PROFESIONAL)
El proyecto se rige por la **Cotización Oficial COT-2026-0007**:
- **Nombre:** Campus Virtual LMS Profesional, Profesor IA & Motor SENCE.
- **Modalidad:** Llave en Mano con Soberanía Digital.
- **Valores Económicos:**
  - Subtotal Lista: \$3.430.000 CLP
  - Descuento Alianza Bomberos Viña: -\$500.000 CLP
  - **Subtotal Neto Acordado:** **\$2.930.000 CLP + IVA** (\$3.486.700 CLP Total)
  - **Hitos de Pago (50% / 25% / 25%):**
    - Hito 1 (50%): \$1.465.000 + IVA (Firma y Kickoff de Ingeniería)
    - Hito 2 (25%): \$732.500 + IVA (Entrega en Staging funcional)
    - Hito 3 (25%): \$732.500 + IVA (Pase a Producción y Entrega de Bóveda Digital)
  - **Continuidad Cloud & SENCE All-Inclusive:** \$190.000 + IVA / mes (Servidor dedicado cloud, base de datos, backups diarios, soporte SENCE).
  - **Consumo Variable Tokens IA:** Estimado en ~\$32 USD/mes (~\$30.000 CLP) a costo directo de inferencia ultra rápida (~20.000 consultas interactivas al mes para 700-1.000 alumnos).

### Los 6 Entregables de Ingeniería del Presupuesto 2:
1. **Campus Virtual LMS Profesional (PWA Multi-rol):**
   - Portal Alumno PWA optimizado para teléfonos móviles en terreno y PC.
   - Portal Docente autónomo (subida de lecciones, videos YouTube/MP4, cuestionarios y notas).
   - Portal Administrador Institucional (métricas, cursos y alumnos ilimitados sin cobro por licencia).
2. **Motor Forense de Asistencia y Auditoría SENCE / NCh 2728:**
   - Reproductor con candado anti-bypass (imposible saltar el video sin visualización real).
   - Registro al segundo de permanencia activa por lección.
   - Exportador en 1 clic de planillas oficiales Excel requeridas por fiscalizadores SENCE.
3. **Profesor Virtual con IA Especializada 24/7 (Tutor Pedagógico RAG):**
   - Chatbot pedagógico embebido en cada curso, entrenado exclusivamente con manuales de Ígneo y normativas NFPA.
   - Resuelve hasta el 85% de dudas repetitivas citando manuales y capítulos técnicos.
4. **Diplomas Digitales con Código QR y Validación Antifraude SHA-256:**
   - Emisión automatizada en PDF con código QR único por alumno.
   - Portal web público donde prevencionistas de riesgos o supervisores mineros escanean el código desde cualquier celular y verifican la autenticidad al instante.
5. **Carga Masiva B2B de Alumnos & Gestor de Empresas:**
   - Matrícula de hasta 500 trabajadores de empresas clientes en segundos mediante archivo Excel.
   - Despacho automático de accesos por correo electrónico.
6. **Bóveda Digital de Credenciales & Soberanía Tecnológica:**
   - Entrega formal con el 100% de accesos maestros, bases de datos y DNS a nombre de la Fundación (Cero secuestro tecnológico).

---

## 4. ESTADO TÉCNICO ACTUAL DEL CÓDIGO (Landing 2)
- **Repositorio:** `f:\UNI-VERSO693\Landing 2`
- **Stack:** React 19, TypeScript, Tailwind CSS v4 (`@theme`), Vite, Upstash Redis, Vercel Serverless Functions (`/api/admin.ts`).
- **Rutas Implementadas y Desplegadas:**
  - **`/boveda`:** Portal unificado para clientes. Ofrece 2 pestañas protegidas:
    - `📋 Configuración & Recepción de Insumos` (Módulo Onboarding para subir logos, DNS, pagos, administradores y curso piloto).
    - `🔐 Bóveda de Credenciales & Soberanía` (Inventario de contraseñas maestras, revelador de claves y descarga de respaldo JSON).
    - **Acceso:** Login único unificado. Correo institucional: `contacto@bomberosvinadelmar.cl` (o cualquier correo institucional que contenga `bomberos` o `igneo`) + Clave: `Bomberos2026!`.
  - **`/onboarding`:** Módulo interactivo de recolección de insumos con pasarela de pago abierta (Transbank, Mercado Pago, Flow, Fintoc) y campos de reporte DNS.
  - **`/interno`:** Dashboard interno de UNIVERSO693 SpA. La pestaña **Bóveda** cuenta con auto-sembrado en Redis y botón de activación en 1-clic (`[✨ ¡Activar Bóveda OTEC Ígneo (1-Clic)!]`), permitiendo editar correos y credenciales en tiempo real.
  - **`public/llms.txt` y `public/llms-full.txt`:** Manifiestos actualizados con todas las capacidades de ingeniería de UNIVERSO693 (LMS SENCE con ClaveÚnica, Tutores IA, Bóveda y Fintech).
- **Documentación Generada:**
  - `Carta_Requerimientos_Inicio_Proyecto_Igneo.pdf` & `.docx` (Carta ejecutiva de 2 páginas con checklist de insumos y acceso a la Bóveda).
  - `Evaluacion_Tecnica_Comparativa_LMS_Igneo.pdf` (Auditoría comparativa TCO: Desarrollo a Medida vs Moodle vs Canvas).
  - `public/cotizacion_0007_profesional_igneo.html` (Cotización oficial lista para imprimir/firmar).
  - `public/email_propuesta_igneo.html` (Correo ejecutivo listo para enviar a directorio).
- **Activos Multimedia Guardados:**
  - Carpeta: `public/assets/igneo/` (`logo-igneo-light.webp`, `logo-bomberos-vina.webp`, etc.).

---


- **Cuenta Matriz de Infraestructura Cloud & Google (Base):**
  - **Servicio:** `https://accounts.google.com`
  - **Usuario:** `aula.igneo.uv693@gmail.com`
  - **Contraseña:** `Igneo2026`
  - **Rol:** Cuenta raíz para consolas cloud, YouTube (videos de lecciones privadas), Google Drive (respaldos de actas SENCE) y vinculación de infraestructura.


- **Repositorio Oficial de Código Fuente (GitHub):**
  - **URL:** `https://github.com/aulaigneouv693-wq/aula.Igneo`
  - **Organización / Usuario:** `aulaigneouv693-wq`
  - **Notas:** Repositorio soberano de código fuente del Campus Virtual (React, TypeScript, PWA, Node.js).
- **Inferencia de Inteligencia Artificial (Groq Cloud LPU):**
  - **Consola:** `https://console.groq.com`
  - **API Key:** `gsk_egxZ...itmK`
  - **Modelo:** `llama-3.3-70b-versatile` (Inferencia ultra veloz a ~800 tokens/s para el Tutor IA NFPA 24/7).

## 5. TAREA INMEDIATA: MAQUETACIÓN INTERACTIVA DEL PRESUPUESTO 2
El siguiente hito es construir una maqueta/prototipo funcional interactivo en la ruta **`/campus-igneo`** (`src/pages/CampusIgneoDemo.tsx`) que permita demostrar y probar en vivo:
1. **Vista Alumno (PWA Mobile/Desktop):** Aula virtual con lección en video, candado anti-bypass SENCE (bloqueo de salto rápido y cronómetro de permanencia activa).
2. **Tutor IA 24/7:** Panel lateral interactivo con preguntas y respuestas sobre la norma NFPA 1001 y materiales de Ígneo.
3. **Panel Administrador OTEC:** Métricas de avance, botón de descarga de Planilla SENCE Excel en tiempo real y módulo de carga masiva B2B de empresas contratistas.
4. **Validador de Diplomas con QR:** Pantalla pública de verificación criptográfica SHA-256 para supervisores de faena.

---

## 6. PROMPT RÁPIDO PARA PEGAR EN UNA NUEVA VENTANA DE VS CODE
Copia y pega este texto exacto al abrir un nuevo chat con la IA en VS Code:

```markdown
Hola. Por favor lee el archivo `MEMORY_PROYECTO_IGNEO.md` ubicado en la raíz del proyecto.
Actúa como parte del Equipo de Ingeniería & Arquitectura de Software de UNIVERSO693 SpA.
Conoces todo el contexto del cliente OTEC Ígneo (Fundación Bomberos Viña del Mar), el Presupuesto 2 (Plan Profesional COT-2026-0007), la Bóveda en `/boveda`, el panel `/interno` y las reglas de marca 100% institucional.
Nuestra tarea actual es maquetar el Campus Virtual interactivo en `/campus-igneo`. Por favor confirma que leíste la memoria y dime cómo empezamos.
```

