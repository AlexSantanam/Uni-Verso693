# 🍽️ UNIVERSO693 · Starter Restaurante QR (Zoco OS)

Plantilla oficial estandarizada de **UNIVERSO693 SpA** para entrega de cartas digitales interactivas, pedidos por QR en salón y delivery directo por WhatsApp.

---

## ⚡ ¿Por qué esta plantilla reemplaza a Zoco OS ($59 USD/mes)?

1. **Cero Comisiones:** El restaurante no paga porcentajes por pedido a UberEats, PedidosYa ni comisiones ocultas.
2. **Dominio Propio .CL:** Corre bajo el dominio oficial del restaurante (`www.mirestaurante.cl`), no en un subdominio genérico compartido.
3. **Modal de Modificadores con Extras:** Sube el ticket promedio entre un 15% y 25% permitiendo al comensal elegir cocción, acompañamientos, salsas y adicionales con costo.
4. **Propina Chilena Estándar (10%):** Calculada y formateada automáticamente en el total de la comanda.
5. **Formateo para WhatsApp Tipo Voucher:** Genera un mensaje estructurado y ordenado para cocina o barra.
6. **Impresión Térmica 58mm / 80mm:** Con 1 clic imprime el ticket directo en la ticketera física de cocina usando `window.print()` sin drivers propietarios.
7. **Panel del Dueño Autoadministrable (`panel.html`):** Sistema separado de la carta del cliente, con login propio, donde el dueño cambia precios, agota platos, agrega productos y categorías, y pausa el local — todo en vivo, sin tocar código. Igual que `panel.olaclick.app`, pero sin comisiones.
8. **Generador de QRs por Mesa:** Incluye herramienta interna para generar e imprimir todos los códigos QR para las mesas del local listos para plastificar.
9. **Pedidos 100% en tiempo real entre dispositivos:** Un pedido hecho desde el celular de un cliente aparece al instante en la Pantalla de Cocina y en el Panel del Dueño, aunque estén en WiFi o locales distintos (vía Firebase, no localStorage).

---

## 🏗️ Arquitectura: 3 sistemas separados, 1 sola base de datos

| Archivo | Para quién | Necesita login |
|---|---|---|
| `index.html` | El cliente (escanea el QR de su mesa o entra por el link) | No |
| `bienvenida.html` | El link para bio de Instagram / Google Business / flyers — antesala antes de la carta | No |
| `panel.html` | El dueño / recepción — carta, precios, stock, estado del local | Sí |
| `cocina.html` | Cocina / barra — tablero de pedidos en vivo (KDS) | Sí |

Los QR de las mesas (generados con `generador-qrs.html`) apuntan directo a `index.html?mesa=N` — quien ya está sentado no necesita la antesala. `bienvenida.html` es para los canales donde la persona todavía no decidió pedir (redes sociales, Google), con botones a Menú, WhatsApp, Instagram y la clave del WiFi.

Los tres leen y escriben la misma base de datos en **Firebase Firestore**, así que un cambio de precio en `panel.html` se ve al instante en `index.html`, y un pedido nuevo del cliente aparece al instante en `cocina.html` y `panel.html` — sin recargar, sin estar en el mismo navegador ni el mismo WiFi.

---

## 🚀 Cómo configurar y desplegar un nuevo cliente en 10 minutos

### Paso 0: Dar de alta al cliente en el backend compartido "Zoco" (~2 minutos, NO crear un proyecto nuevo)
`firebase-config.js` ya viene apuntando al proyecto compartido `universo693-zoco`, que aloja a todos los clientes en la misma base de datos (separados por `restaurantId`). **No lo toques** — solo haz esto:

1. Crea el usuario del cliente en [Authentication -> Usuarios -> Agregar usuario](https://console.firebase.google.com/project/universo693-zoco/authentication/users) (su correo + una clave). Copia el **UID** que te muestra la tabla.
2. En [Firestore Database -> Datos](https://console.firebase.google.com/project/universo693-zoco/firestore/databases/-default-/data), crea el documento `restaurantes/<restaurantId>` (mismo `restaurantId` que vas a poner en el Paso 1) con un campo `ownerUids` (tipo *array*) que contenga ese UID. Sin este paso, ese usuario no puede editar nada — cada restaurante solo lo pueden tocar los UID que estén en su propio `ownerUids`.
3. Abre `index.html` una vez en el navegador: la primera carga siembra automáticamente la carta de `config.js` dentro de Firestore para ese `restaurantId` (solo pasa una vez, si ese restaurante está vacío). De ahí en adelante, Firestore manda — los cambios se hacen desde `panel.html`.

Las reglas de seguridad (`firestore.rules`) y la base de datos del proyecto compartido ya están publicadas — no hay que volver a subirlas por cada cliente.

### Paso 1: Editar `config.js`
Abre el archivo `config.js` y personaliza los campos:
* `restaurantId`: identificador único del local en la base de datos (ej: *"sushi-vina-gourmet"*, sin tildes ni espacios). Un valor distinto por cliente = cada uno con su propia carta y pedidos aislados.
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
