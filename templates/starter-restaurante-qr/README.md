# 🍽️ UNIVERSO693 · Starter Restaurante QR (OlaClick Pro Killer)

Plantilla oficial estandarizada de **UNIVERSO693 SpA** para entrega de cartas digitales interactivas, pedidos por QR en salón y delivery directo por WhatsApp.

---

## ⚡ ¿Por qué esta plantilla reemplaza a OlaClick ($59 USD/mes)?

1. **Cero Comisiones:** El restaurante no paga porcentajes por pedido a UberEats, PedidosYa ni comisiones ocultas.
2. **Dominio Propio .CL:** Corre bajo el dominio oficial del restaurante (`www.mirestaurante.cl`), no en un subdominio genérico compartido.
3. **Modal de Modificadores con Extras:** Sube el ticket promedio entre un 15% y 25% permitiendo al comensal elegir cocción, acompañamientos, salsas y adicionales con costo.
4. **Propina Chilena Estándar (10%):** Calculada y formateada automáticamente en el total de la comanda.
5. **Formateo para WhatsApp Tipo Voucher:** Genera un mensaje estructurado y ordenado para cocina o barra.
6. **Impresión Térmica 58mm / 80mm:** Con 1 clic imprime el ticket directo en la ticketera física de cocina usando `window.print()` sin drivers propietarios.
7. **Modo Dueño:** Panel flotante para apagar platos agotados en 1 segundo y pausar pedidos en horas pico.
8. **Generador de QRs por Mesa:** Incluye herramienta interna para generar e imprimir todos los códigos QR para las mesas del local listos para plastificar.

---

## 🚀 Cómo configurar y desplegar un nuevo cliente en 10 minutos

### Paso 1: Editar `config.js`
Abre el archivo `config.js` y personaliza los campos:
* `nombre`: Nombre comercial del restaurante (ej: *"Sushi Viña Gourmet"*).
* `whatsapp`: Número con código de país sin el `+` (ej: *"56990387414"*).
* `direccion` y `horario`.
* `categorias`: Lista de categorías del menú.
* `platos`: Array de platos con sus fotos (Unsplash o fotos del cliente), precios y modificadores (puntos de cocción, agregados con precio).

### Paso 2: Desplegar en Vercel o Netlify
Desde la terminal:
```bash
# Opción A: Vercel CLI (1 minuto)
vercel --prod

# Opción B: Subir a un repositorio privado de GitHub y conectar a Vercel con costo de servidor $0.
```

### Paso 3: Conectar Dominio .CL
En Vercel:
1. `Settings` -> `Domains` -> Agregar `mirestaurante.cl`.
2. En NIC Chile, apuntar los DNS o registros CNAME/A indicados por Vercel.

### Paso 4: Imprimir los Códigos QR para las Mesas
1. Abre en tu navegador el archivo `generador-qrs.html`.
2. Ingresa el nombre del restaurante, la URL de producción (ej: `https://mirestaurante.cl`) y la cantidad de mesas (ej: 15).
3. Presiona **"🖨️ Imprimir Todos los QRs"**.
4. ¡Listo! Plastificar y pegar en cada mesa.

---

## 💼 Esquema de Precios Sugerido para Clientes:
* **Arriendo Mensual Todo Incluido (SaaS):** $25.000 CLP / mes *(incluye hosting cloud, soporte y cambios menores de carta)*.
* **Leasing a 12 Meses con Derecho a Compra:** 12 cuotas de $37.000 CLP / mes.
* **Leasing a 24 Meses con Derecho a Compra:** 24 cuotas de $23.000 CLP / mes.
* **Compra Directa Contado:** $250.000 CLP + IVA *(código entregado en Bóveda Digital con propiedad 100%)*.

---
**UNIVERSO693 SpA** · *Ingeniería de Software & Soluciones Digitales*  
Viña del Mar, Chile · [universo693.com](https://universo693.com)
