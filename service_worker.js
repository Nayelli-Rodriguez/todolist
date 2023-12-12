const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
    '/',
    '/client/src/index.js', 
    '/client/src/assets/index.css',
    '/client/src/App/App.jsx',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => {
            console.log('Caché abierta');
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
        .then((response) => {
            return response || fetch(event.request);
        })
    );
});
