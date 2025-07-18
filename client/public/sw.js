// Service Worker for ArabWeather Pro
const CACHE_NAME = 'arabweather-pro-v1';
const STATIC_CACHE_NAME = 'arabweather-static-v1';
const DATA_CACHE_NAME = 'arabweather-data-v1';

// Files to cache for offline use
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/src/main.tsx',
  '/src/index.css',
  '/icon-any.svg',
  '/icon-maskable.svg',
  '/manifest.json'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline page');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activate');
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== STATIC_CACHE_NAME && key !== DATA_CACHE_NAME) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  console.log('[ServiceWorker] Fetch', event.request.url);
  
  // Handle API requests
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      caches.open(DATA_CACHE_NAME).then((cache) => {
        return fetch(event.request)
          .then((response) => {
            // If the response is valid, clone it and store in cache
            if (response.status === 200) {
              cache.put(event.request.url, response.clone());
            }
            return response;
          })
          .catch(() => {
            // Network failed, try to get from cache
            return cache.match(event.request);
          });
      })
    );
    return;
  }

  // Handle all other requests
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or fetch from network
      return response || fetch(event.request);
    })
  );
});

// Background sync for when connectivity is restored
self.addEventListener('sync', (event) => {
  console.log('[ServiceWorker] Background sync', event.tag);
  
  // Validate event tag length and content
  if (event.tag && event.tag.length <= 20 && event.tag === 'weather-sync') {
    event.waitUntil(
      // Sync weather data when back online
      syncWeatherData().catch((error) => {
        console.log('[ServiceWorker] Sync failed:', error);
      })
    );
  }
});

// Periodic background sync for automatic updates (if supported)
if ('periodicsync' in self) {
  self.addEventListener('periodicsync', (event) => {
    console.log('[ServiceWorker] Periodic sync', event.tag);
    
    if (event.tag === 'weather-update') {
      event.waitUntil(
        updateWeatherData()
      );
    }
  });
}

// Push notification support
self.addEventListener('push', (event) => {
  console.log('[ServiceWorker] Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'تحديث جديد للطقس متاح',
    icon: '/icon-any.svg',
    badge: '/icon-maskable.svg',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'open',
        title: 'فتح التطبيق',
        icon: '/icon-any.svg'
      },
      {
        action: 'close',
        title: 'إغلاق'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('طقس العرب المطور', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  console.log('[ServiceWorker] Notification click received');
  
  event.notification.close();
  
  if (event.action === 'open') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Helper functions
async function syncWeatherData() {
  try {
    const cache = await caches.open(DATA_CACHE_NAME);
    const requests = await cache.keys();
    
    for (const request of requests) {
      if (request.url.includes('/api/weather')) {
        try {
          const response = await fetch(request);
          if (response.ok) {
            await cache.put(request, response.clone());
          }
        } catch (error) {
          console.log('[ServiceWorker] Failed to sync:', request.url);
        }
      }
    }
  } catch (error) {
    console.log('[ServiceWorker] Sync failed:', error);
  }
}

async function updateWeatherData() {
  try {
    // Get stored favorite cities from IndexedDB or localStorage
    const favorites = await getFavoritesCities();
    
    for (const city of favorites) {
      try {
        const response = await fetch(`/api/weather?lat=${city.lat}&lon=${city.lon}`);
        if (response.ok) {
          const cache = await caches.open(DATA_CACHE_NAME);
          await cache.put(response.url, response.clone());
        }
      } catch (error) {
        console.log('[ServiceWorker] Failed to update weather for:', city.name);
      }
    }
  } catch (error) {
    console.log('[ServiceWorker] Update failed:', error);
  }
}

async function getFavoritesCities() {
  try {
    // This would need to be implemented based on your storage mechanism
    return [];
  } catch (error) {
    console.log('[ServiceWorker] Failed to get favorites:', error);
    return [];
  }
}