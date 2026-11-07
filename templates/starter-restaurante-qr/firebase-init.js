/**
 * UNIVERSO693 · Starter Restaurante QR — Inicialización de Firebase
 * Compartido por index.html, panel.html y cocina.html.
 * Expone window.db, window.auth y helpers de colección comunes.
 */
(function () {
  firebase.initializeApp(window.FIREBASE_CONFIG);

  window.db = firebase.firestore();
  window.auth = firebase.auth();

  // Identificador único del local. Si config.js no define restaurantId,
  // se genera uno a partir del nombre (útil mientras se configura por primera vez).
  const CFG = window.RESTAURANTE_CONFIG || {};
  window.RESTAURANT_ID =
    CFG.restaurantId ||
    (CFG.nombre || 'restaurante-demo')
      .toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

  function restRef() {
    return window.db.collection('restaurantes').doc(window.RESTAURANT_ID);
  }
  window.restRef = restRef;
  window.platosRef = () => restRef().collection('platos');
  window.categoriasRef = () => restRef().collection('categorias');
  window.pedidosRef = () => restRef().collection('pedidos');
  window.clientesRef = () => restRef().collection('clientes');
  window.descuentosRef = () => restRef().collection('descuentos');

  // Normaliza un teléfono a solo dígitos, para usarlo como ID de documento estable.
  window.normalizarTelefono = function normalizarTelefono(tel) {
    return (tel || '').replace(/\D/g, '');
  };

  /**
   * Siembra Firestore con el catálogo de config.js SOLO la primera vez
   * (si las colecciones están vacías). Así cualquier demo nuevo funciona
   * de inmediato sin tener que cargar datos a mano, y una vez que el
   * dueño edita algo desde el panel, Firestore pasa a ser la fuente real.
   */
  window.seedIfEmpty = async function seedIfEmpty() {
    try {
      const [platosSnap, catsSnap] = await Promise.all([
        window.platosRef().limit(1).get(),
        window.categoriasRef().limit(1).get()
      ]);

      if (catsSnap.empty && Array.isArray(CFG.categorias)) {
        const batch = window.db.batch();
        CFG.categorias.forEach((cat, idx) => {
          if (cat.id === 'todos') return; // "Toda la carta" se genera en el cliente, no se guarda
          batch.set(window.categoriasRef().doc(cat.id), { ...cat, orden: idx });
        });
        await batch.commit();
      }

      if (platosSnap.empty && Array.isArray(CFG.platos)) {
        const batch = window.db.batch();
        CFG.platos.forEach((plato, idx) => {
          batch.set(window.platosRef().doc('plato-' + plato.id), {
            ...plato,
            disponible: true,
            orden: idx
          });
        });
        await batch.commit();
      }

      // Documento raíz del local: estado abierto/pausado + promo en vivo.
      const rootSnap = await restRef().get();
      if (!rootSnap.exists) {
        await restRef().set({
          abierto: true,
          promo: '',
          actualizado: firebase.firestore.FieldValue.serverTimestamp()
        });
      }
    } catch (err) {
      console.error('Error sembrando datos iniciales en Firestore:', err);
    }
  };
})();
