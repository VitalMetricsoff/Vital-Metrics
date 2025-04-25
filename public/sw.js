const CACHE_NAME = 'vital-metrics-v2';
const STATIC_CACHE = 'static-v2';
const DYNAMIC_CACHE = 'dynamic-v2';
const OFFLINE_PAGE = '/offline.html';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/favicon.svg',
  '/favicon-96x96.png',
  '/web-app-manifest-192x192.png',
  '/web-app-manifest-512x512.png',
  '/fonts/inter-var.woff2',
  '/src/main.tsx',
  '/src/App.css'
];

const CACHE_STRATEGIES = {
  cacheFirst: async (request) => {
    const cache = await caches.open(STATIC_CACHE);
    const cachedResponse = await cache.match(request);
    if (cachedResponse) return cachedResponse;
    return fetch(request);
  },
  networkFirst: async (request) => {
    try {
      const response = await fetch(request);
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, response.clone());
      return response;
    } catch (error) {
      const cachedResponse = await caches.match(request);
      return cachedResponse || caches.match(OFFLINE_PAGE);
    }
  }
};

self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then(cache => cache.addAll(STATIC_ASSETS)),
      caches.open(DYNAMIC_CACHE)
    ])
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Handle different types of requests
  if (request.mode === 'navigate') {
    event.respondWith(CACHE_STRATEGIES.networkFirst(request));
  } else if (STATIC_ASSETS.some(asset => url.pathname.endsWith(asset))) {
    event.respondWith(CACHE_STRATEGIES.cacheFirst(request));
  } else if (request.destination === 'image' || request.destination === 'font') {
    event.respondWith(CACHE_STRATEGIES.cacheFirst(request));
  } else {
    event.respondWith(CACHE_STRATEGIES.networkFirst(request));
  }
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(name => name !== STATIC_CACHE && name !== DYNAMIC_CACHE)
            .map(name => caches.delete(name))
        );
      }),
      self.clients.claim()
    ])
  );
});