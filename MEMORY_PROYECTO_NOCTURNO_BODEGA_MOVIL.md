# MEMORIA MAESTRA DE CONTEXTO: PLATAFORMA DE DELIVERY NOCTURNO & BODEGA MÓVIL
> **UNIVERSO693 SpA — Dirección de Ingeniería, Innovación & Arquitectura de Software**  
> *Documento maestro de especificación técnica, modelo operacional y reglas de negocio para inicializar el proyecto en cualquier entorno de desarrollo o sesión de trabajo.*

---

## 1. ORIGEN, VALIDACIÓN DE TERRENO & DOLOR CENTRAL
Este proyecto nace de una **validación comercial real en la calle**:
1. **La Demanda Desatendida:** Entre las **23:00 y las 06:00 hrs**, existe un mercado masivo de personas que quieren consumir (snacks, bebidas, energéticas, hielo, emergencias, fiesta) pero no tienen dónde comprar:
   - Las botillerías de barrio están obligadas por ley a cerrar temprano.
   - Los servicentros (Copec/Shell) quedan lejos o cobran precios inflados.
   - Las apps tradicionales (Rappi, PedidosYa) tardan entre 45 y 60 minutos porque el repartidor primero tiene que ir a buscar el producto a una tienda (y casi todas están cerradas).
2. **El Peligro Real del Negocio Nocturno Tradicional:**
   - Vender de noche en la calle cobrando en efectivo es un imán de asaltos, billetes falsos, encerronas y problemas de seguridad para el chofer.
3. **La Solución Disruptiva:**
   - **El conductor de app (Uber/Didi) ya está en la calle y ES la bodega móvil.**
   - **CERO EFECTIVO:** El cliente paga el 100% por adelantado a través de la pasarela digital de la plataforma. La plata va a una cuenta central segura y la plataforma le liquida directamente a la cuenta bancaria del conductor.

---

## 2. LA REGLA DE ORO DE SEGURIDAD (PROTOCOLO ANTI-ASALTO)

```
[Cliente hace el pedido] ───► [PAGO OBLIGATORIO 100% ONLINE] ───► [Pedido asignado al Chofer]
                                  (Webpay / Débito / Crédito)              │
                                                                           ▼
[Entrega segura en reja] ◄─── [Cliente dicta PIN de 4 dígitos] ◄─── [Chofer llega en 5 min]
```

1. **Sin Dinero en Mano:** El conductor jamás cobra en la puerta ni manipula efectivo de las ventas. Si alguien intenta un asalto al auto, el conductor no tiene recaudación que entregar.
2. **Despacho solo tras Confirmación Bancaria:** Ningún pedido se envía al conductor si el pago no fue aprobado exitosamente por la pasarela bancaria.
3. **Código de Seguridad PIN (4 Dígitos):** Al pagar, el cliente recibe un código PIN único en su pantalla. Para que la entrega quede finalizada y el chofer cobre su comisión, el cliente debe dictarle el PIN al chofer desde la puerta/reja.
4. **Validación de Identidad de Choferes:** Solo conductores de aplicaciones activos y verificados (con antecedentes limpios y hoja de vida de conductor) pueden darse de alta como "Bodega Móvil".

---

## 3. MODELO DE NEGOCIO Y UNIT ECONOMICS

### A. Estructura de Ingresos por Pedido:
- **Margen Comercial de Productos:** Los productos se compran a precio mayorista y se venden a tarifa nocturna de conveniencia (margen de 60% a 100% sobre costo de producto).
- **Tarifa de Despacho Rápido:** Tarifa fija de $1.990 a $2.990 CLP por entrega ultrarrápida (en menos de 10 minutos).
- **Split de Ganancias:**
  - **70% para el Conductor:** El chofer gana el valor del despacho + el 70% del margen de la mercadería que lleva en su maleta.
  - **30% para la Plataforma (UNIVERSO693):** Comisión tecnológica por procesamiento de pagos, hosting, captación de clientes y soporte.

### B. Ejemplo de Ticket Promedio Nocturno:
- **Pedido:** 2 Bebidas Energéticas + 1 Bolsa de Hielo + 1 Papas Fritas Grandes + 1 Encendedor.
  - Precio de Venta al Cliente: **$16.500 CLP** (incluye despacho).
  - Costo Mayorista de Productos: **$6.200 CLP**.
  - **Utilidad Bruta de la Orden:** **$10.300 CLP**.
  - **Ganancia para el Chofer (en 6 minutos de viaje):** **~$7.200 CLP**.
  - **Ganancia Neta para la Plataforma:** **~$3.100 CLP**.
- *Comparativa:* En Uber, por un viaje de 6 minutos el chofer gana apenas $1.800 CLP. En este modelo gana $7.200 CLP. **El chofer adora la plataforma.**

---

## 4. MATRIZ DE PRODUCTOS (ALTO MARGEN & LEGALMENTE BLINDADA)

Para operar con total tranquilidad frente a controles de Carabineros o Seguridad Ciudadana, el catálogo inicial se enfoca en **productos 100% de venta libre y consumo inmediato**:

| Categoría | Productos Clave | Margen Est. |
| :--- | :--- | :---: |
| **Bebidas & Energéticas** | Monster, Red Bull, Coca-Cola normal y Zero, Sprite, Aguas minerales con gas. | 65% |
| **Previas & Fiesta** | Hielo en bolsa 1kg/2kg, vasos plásticos duros, limones, sal, servilletas. | 80% |
| **Snacks & Dulces** | Papas fritas, Doritos, Ramitas, chocolates (Sahne-Nuss, Trencito), galletas, gomitas. | 60% |
| **Urgencias Personales** | Preservativos (LifeStyles / Durex), encendedores Bic, paracetamol / ibuprofeno venta libre. | 85% |
| **Tecnología Exprés** | Cables cargador Tipo C, iPhone Lightning, adaptadores de enchufe para auto. | 120% |

> [!NOTE]
> **Sobre Alcohol y Cigarrillos:** En Chile la venta ambulante de alcohol de noche sin patente de botillería arriesga multas. El modelo arranca enfocado en los complementos de alta demanda (bebidas, hielo, energéticas, snacks y emergencias), donde el margen es gigantesco y no existe riesgo legal.

---

## 5. ARQUITECTURA TÉCNICA RECOMENDADA

La plataforma se diseña como **2 Aplicaciones Web Progresivas (PWA)** para evitar la fricción de descargar apps pesadas de App Store / Play Store:

```
┌─────────────────────────────────────────────────────────────┐
│                   ECOSISTEMA NOCTURNO PWA                   │
└─────────────────────────────────────────────────────────────┘
                               ▲
                               │
            ┌──────────────────┴──────────────────┐
            ▼                                     ▼
 ┌──────────────────────┐              ┌──────────────────────┐
 │   PWA CLIENTE FINAL  │              │    PWA CONDUCTOR     │
 ├──────────────────────┤              ├──────────────────────┤
 │ • GPS / Ubicación    │              │ • Toggle "En Ruta"   │
 │ • Autos cerca (mapa) │              │ • Switch de Stock    │
 │ • Carro de compra    │              │ • Alarma sonoroa     │
 │ • Checkout Webpay    │              │ • Ruta a Waze/Maps   │
 │ • Pantalla con PIN   │              │ • Verificador de PIN │
 └──────────────────────┘              └──────────────────────┘
            │                                     │
            └──────────────────┬──────────────────┘
                               ▼
        ┌─────────────────────────────────────────────┐
        │        BACKEND SERVERLESS & REALTIME        │
        ├─────────────────────────────────────────────┤
        │ • Base de Datos: Firebase / Supabase        │
        │ • Sync en Vivo: WebSockets / Firestore      │
        │ • Pagos: Transbank Webpay Plus / Flow       │
        │ • Billetera: Ledger de saldos y depósitos   │
        └─────────────────────────────────────────────┘
```

### Funcionalidades PWA Cliente:
1. **Radar de Cobertura Nocturna:** El usuario entra por un link o QR y ve en el mapa los móviles con stock disponibles en un radio de 3 a 5 km.
2. **Inventario en Tiempo Real:** El cliente solo puede comprar los ítems que el auto más cercano tiene físicamente en el maletero.
3. **Pago Express:** Integración con Webpay Plus (Débito/Crédito) o Oneclick.
4. **Tracking en Vivo & PIN:** Ve el auto acercarse en el mapa y tiene su PIN de seguridad en pantalla.

### Funcionalidades PWA Conductor:
1. **Interruptor de Disponibilidad:** Botón grande `[ 🟢 DISPONIBLE CON STOCK ]` o `[ ⚪ DESCONECTADO ]`.
2. **Gestión Ultrarrápida de Inventario:** Lista de productos con switches para marcar si se le acabó un ítem con un solo toque.
3. **Alerta Sonora de Despacho:** Sonido de alta prioridad cuando entra una orden pagada a menos de 5 minutos de su posición.
4. **Navegación en 1-Clic:** Botón directo para abrir la ruta en **Waze** o **Google Maps**.
5. **Teclado de PIN:** Ingresa los 4 dígitos del cliente para liberar los fondos de la orden.
6. **Billetera Digital:** Registro acumulado de sus ganancias de la noche y botón de retiro a su cuenta bancaria.

---

## 6. PLAN DE IMPLEMENTACIÓN & PRÓXIMOS PASOS

1. **Hito 1 — Prototipo Base PWA:**
   - Montar la estructura base con selector de ubicación, catálogo de conveniencia y simulación de despacho por PIN.
2. **Hito 2 — Pasarela de Pago Digital:**
   - Conectar pasarela bancaria chilena (Transbank Webpay Plus o Flow) para liquidaciones seguras.
3. **Hito 3 — Piloto de Terreno (Alfa Cerrado):**
   - Probar con 2 a 3 conductores de confianza en una zona delimitada (ej. Viña del Mar / Reñaca / Quilpué).
   - Abastecer cada auto con un kit inicial de $30.000 a $50.000 en productos de alta rotación.
   - Medir tiempos reales de respuesta, rotación de productos y feedback de seguridad.

---
*UNIVERSO693 SpA · Soberanía Tecnológica, Arquitectura Cloud & Modelos Disruptivos.*
