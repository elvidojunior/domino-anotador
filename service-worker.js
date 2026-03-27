// ── ANOTADOR DOMINÓ — Service Worker v3 ──
// Cambia este número cada vez que actualices la app
const CACHE_NAME = 'domino-anotador-v3';

self.addEventListener('install', event => {
  // Activa inmediatamente sin esperar
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        // Borra TODOS los cachés viejos
        console.log('[SW] Borrando caché viejo:', key);
        return caches.delete(key);
      }))
    ).then(() => self.clients.claim())
  );
});

// Sin caché — siempre va a la red para tener la versión más reciente
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
