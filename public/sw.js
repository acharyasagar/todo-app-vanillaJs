const SITE_STATIC = 'site-static-v1.3.0'
const PRE_CACHED_ASSETS = [
  '/',
  '/index.html',
  '/js/app.js',
  '/js/todo.js',
  'https://code.jquery.com/jquery-3.2.1.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.gstatic.com/s/materialicons/v50/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
  '/images/favicon.png',
  '/images/todo-icon-192x192.png',
  '/images/todo-icon-512x512.png'

]
/**
 * Browser emits an "install" event automatically when the service worker is being installed
 */
self.addEventListener('install', e => {
  console.log('Service worker has been installed!!!')
  /**
   * Here you can do some caching
   * Can do caching assets here when sw changes
   */
  e.waitUntil(
    caches.open(SITE_STATIC)
    .then(cache => {
      console.log('Caching shell assets . . .')
      cache.addAll(PRE_CACHED_ASSETS )
    })
  )
})
/**
 * Brows emits activate event when service worker is activated
 */
self.addEventListener('activate', e => {
  /**
   * Here you can do some cache management
   * Like Delete old cache
   */
  e.waitUntil(
    caches.keys().then(keys => {
      // console.log(keys)
      return Promise.all(keys
        .filter(key => key !== SITE_STATIC)
        .map(key => caches.delete(key))
      )
    })
  )
  console.log('Service worker has been activated!!!')
})

/**
 * 
 */
self.addEventListener('fetch', e => {
  // console.log('Fetch event', e)
  e.respondWith(
    caches.match(e.request).then(cacheRes => {
      // console.log(cacheRes)
      return cacheRes || fetch(e.request)
    })
  )
})
