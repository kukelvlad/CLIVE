/* CLIVE Service Worker — enables offline mode */
const CACHE = 'clive-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/icon-180.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  /* Network first for Google Fonts and CDN scripts */
  if (e.request.url.includes('fonts.googleapis') ||
      e.request.url.includes('cdnjs.cloudflare')) {
    e.respondWith(
      fetch(e.request).catch(() => caches.match(e.request))
    );
    return;
  }
  /* Cache first for everything else */
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
