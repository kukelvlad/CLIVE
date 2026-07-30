/* CLIVE Service Worker — enables offline mode
   IMPORTANT: bump CACHE whenever this file changes, so old caches get evicted. */
const CACHE = 'clive-v2';
const STATIC_ASSETS = [
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/icon-180.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(STATIC_ASSETS)).catch(() => {})
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
  const url = e.request.url;

  /* Network-first for the app shell (HTML) and third-party fonts/scripts —
     always try to fetch the freshest deploy; fall back to cache only when offline.
     This is what makes new deployments actually reach returning visitors. */
  const isAppShell = e.request.mode === 'navigate' || url.endsWith('/') || url.endsWith('/index.html');
  const isThirdParty = url.includes('fonts.googleapis') || url.includes('fonts.gstatic') ||
                        url.includes('cdnjs.cloudflare') || url.includes('unpkg.com');

  if (isAppShell || isThirdParty) {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          const resClone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, resClone));
          return res;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  /* Cache-first for static assets (icons, manifest) — these rarely change,
     and CACHE is bumped whenever they do. */
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
