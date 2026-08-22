// Minimal Service Worker for PWA installability requirements
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  // Let network handle all fetches directly to ensure real-time Google Sheet sync
  e.respondWith(fetch(e.request));
});
