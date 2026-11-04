# 📓 CUADERNO DE IDEAS Y PROYECTOS ESTRATÉGICOS — UNIVERSO693 SpA

Este documento es el repositorio vivo de proyectos, productos SaaS, modelos de negocio y líneas de expansión tecnológica de **UNIVERSO693 SpA**.

---

## 🚀 PROYECTO 01: CAMPUS OTEC CLOUD (SaaS / PaaS B2B)
**Nombre en Clave:** `Campus693` / `OTEC Cloud`  
**Vertical:** EdTech B2B / Cumplimiento Normativo SENCE (Chile)  
**Estado:** En Validación / Piloto en Desarrollo (Caso de Éxito: OTEC Ígneo - Fundación Cuerpo de Bomberos de Viña del Mar)

---

### 1. El Problema del Mercado en Chile
* En Chile existen más de **2.300 OTECs acreditadas bajo la norma NCh 2728**.
* Por normativa del SENCE (Franquicia Tributaria), toda capacitación E-learning o B-learning está obligada por ley a ejecutarse en una plataforma LMS que registre asistencia, trazabilidad por alumno, reportes y conector SENCE.
* **El dolor actual de las OTECs:**
  * Proveedores tradicionales (`plataformasmoodle.cl`, `moodlechile.cl`, etc.) cobran mensualidades abusivas (**\$140.000 a \$190.000 CLP/mes por cliente**).
  * Ofrecen interfaces obsoletas (estética 2012, no adaptadas a móviles).
  * Alojan en hostings compartidos lentos (cPanel/Norteduc) con caídas frecuentes.
  * No ofrecen Inteligencia Artificial, certificados con verificación criptográfica QR ni aplicaciones móviles PWA.

---

### 2. La Propuesta de Valor de UNIVERSO693
Una solución **Multi-tenant / Cloud Gestionado** que entrega a cada OTEC un campus virtual moderno en 5 minutos bajo su propio subdominio (`campus.suempresa.cl`), listo para operar:

1. **Cumplimiento SENCE Nativo:** Control de asistencia, logs auditables y exportación de reportes exigidos por el Servicio Nacional de Capacitación y Empleo.
2. **Docente IA 24/7 Integrado:** Tutor inteligente autónomo contextualizado con el contenido de cada curso para resolver dudas de alumnos en tiempo real.
3. **Portal Soberano de Diplomas y Verificación QR:** Certificados digitales con hash SHA-256 verificables públicamente desde cualquier celular (imposibles de falsificar).
4. **App Móvil PWA:** Instalable con 1 clic en iPhone y Android sin necesidad de descargar desde App Store.
5. **Infraestructura Cloud Dedicada:** Contenedores aislados en VPS de alta velocidad con 99.9% de uptime garantizado.

---

### 3. Modelo Financiero y Unit Economics

| Métrica | Estimación / Valor |
| :--- | :--- |
| **Precio Plan Base OTEC** | \$99.000 – \$149.000 CLP / mes por OTEC |
| **Setup Inicial (Llave en mano)** | \$390.000 – \$600.000 CLP (único pago) |
| **Costo Servidor Cloud (Hetzner / AWS)** | \$50 – \$80 USD/mes (~$60.000 CLP) soporta hasta 20 OTECs |
| **Margen Bruto de Ganancia** | **> 90%** en ingreso recurrente mensual |

#### Proyección de Ingresos Recurrentes (MRR):
* **10 Clientes OTEC:** \$1.300.000 CLP / mes (\$15.6M anuales).
* **30 Clientes OTEC:** \$3.900.000 CLP / mes (\$46.8M anuales).
* **50 Clientes OTEC:** \$6.500.000 CLP / mes (\$78.0M anuales).

---

### 4. Canales de Distribución y Go-To-Market

1. **Venta Directa a OTECs:**
   * Utilizar el caso de éxito validado con la **Fundación Cuerpo de Bomberos de Viña del Mar / OTEC Ígneo** como carta de presentación y prueba social imbatible.
   * Prospección sobre la base pública de OTECs acreditadas en el registro oficial de SENCE.
2. **Red de Afiliados y Marca Blanca para Agencias:**
   * Agencias de marketing, consultoras de RRHH y diseñadores freelance que no saben administrar servidores ni Moodle pueden revender el servicio a sus clientes.
   * UNIVERSO693 provee la infraestructura y se queda con una suscripción mayorista (~$75.000 CLP/mes), dejando que la agencia cobre su margen.

---

### 5. Roadmap Tecnológico
- [x] Instalación y validación local de Moodle 5.3+ con PostgreSQL 16 y PHP 8.3.
- [ ] Construcción de plantilla maestra moderna (`theme_universo_otec`).
- [ ] Módulo / Webhook para "Docente IA 24/7".
- [ ] Plantilla estandarizada de diplomas con código QR y portal de validación.
- [ ] Orquestación en contenedores Docker para desplegar nuevas instancias de OTEC en menos de 10 minutos.

---

*Documento registrado en UNIVERSO693 SpA — Noviembre 2026.*

