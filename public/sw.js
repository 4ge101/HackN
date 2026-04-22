const CACHE_NAME = 'hn-cache-v1'
const HN_API = 'https://hacker-news.firebaseio.com'

// Static assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
]

// Install - cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS)
    })
  )
  self.skipWaiting()
})

// Activate - clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  )
  self.clients.claim()
})

// Fetch strategy:
// - HN API calls → network first, fall back to cache
// - Static assets → cache first, fall back to network
self.addEventListener('fetch', event => {
  const { request } = event
  const url = new URL(request.url)

  // HN API - network first with cache fallback
  if (url.origin === HN_API) {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Cache successful API responses
          if (response.ok) {
            const clone = response.clone()
            caches.open(CACHE_NAME).then(cache => {
              cache.put(request, clone)
            })
          }
          return response
        })
        .catch(() => {
          // Network failed - try cache
          return caches.match(request).then(cached => {
            if (cached) return cached
            // Return empty array for feed IDs if completely offline
            if (url.pathname.includes('stories.json')) {
              return new Response('[]', {
                headers: { 'Content-Type': 'application/json' }
              })
            }
            return new Response('null', {
              headers: { 'Content-Type': 'application/json' }
            })
          })
        })
    )
    return
  }

  // Static assets - cache first
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached
      return fetch(request).then(response => {
        if (response.ok) {
          const clone = response.clone()
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone))
        }
        return response
      })
    })
  )
})

// Listen for messages from app
self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})