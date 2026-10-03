/* Marchés Ferme : cache hors ligne */
const VERSION = 'mf-v1';
const SHELL = ['./', './index.html', './manifest.webmanifest', './data.json',
  './icons/apple-touch-icon.png', './icons/icon-192.png', './icons/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
function networkFirst(req) {
  return fetch(req).then(res => {
    if (res && res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
    return res;
  }).catch(() => caches.match(req, { ignoreSearch: false }));
}
function staleWhileRevalidate(req) {
  return caches.match(req).then(hit => {
    const net = fetch(req).then(res => {
      if (res && (res.ok || res.type === 'opaque')) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => hit);
    return hit || net;
  });
}
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Cours du soir et météo : toujours le réseau d'abord, la copie en cache si hors ligne
  if (url.pathname.endsWith('/data.json') || url.hostname.endsWith('open-meteo.com')) { e.respondWith(networkFirst(req)); return; }
  // Page, icônes, polices : affichage immédiat depuis le cache, mise à jour en arrière-plan
  if (url.origin === self.location.origin || url.hostname.endsWith('googleapis.com') || url.hostname.endsWith('gstatic.com')) {
    e.respondWith(staleWhileRevalidate(req));
  }
});
