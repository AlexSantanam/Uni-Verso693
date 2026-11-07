/**
 * UNIVERSO693 · Starter Restaurante QR — Credenciales de Firebase
 * -----------------------------------------------------------------
 * Este archivo es el ÚNICO que cambia entre clientes para conectar
 * su carta, pedidos y panel a una base de datos real y en vivo.
 *
 * Cómo obtener estos valores (una vez por cliente, ~3 minutos):
 * 1. Entra a https://console.firebase.google.com/ y crea un proyecto
 *    nuevo (gratis, no pide tarjeta para el plan Spark).
 * 2. Dentro del proyecto: "Compilación" -> "Firestore Database" ->
 *    "Crear base de datos" -> modo producción -> región southamerica-east1.
 * 3. "Compilación" -> "Authentication" -> "Comenzar" -> habilita el
 *    proveedor "Correo electrónico/contraseña" -> crea 1 usuario
 *    (el dueño/recepción) con su correo y una clave.
 * 4. "Configuración del proyecto" (ícono de engranaje) -> en
 *    "Tus apps" agrega una app Web (</>) -> copia el objeto
 *    firebaseConfig que te muestra y pégalo abajo.
 * 5. Sube el archivo firestore.rules incluido en esta carpeta desde
 *    "Firestore Database" -> pestaña "Reglas".
 *
 * Este objeto NO es secreto: Firebase está diseñado para que la
 * configuración web viaje en el navegador del cliente. La seguridad
 * real la dan las Reglas de Firestore (firestore.rules), no esto.
 */
window.FIREBASE_CONFIG = {
  apiKey: "TU_API_KEY",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "000000000000",
  appId: "1:000000000000:web:0000000000000000000000"
};
