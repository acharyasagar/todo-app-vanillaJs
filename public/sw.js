/**
 * Browser emits an "install" event automatically when the service worker is being installed
 */
self.addEventListener('install', e => {
  /**
   * Here you can do some caching
   */
  console.log('Service worker has been installed!!!')
})
/**
 * Brows emits activate event when service worker is activated
 */
self.addEventListener('activate', e => {
  /**
   * Here you can do some cache management
   */
  console.log('Service worker has been activated!!!')
})

/**
 * 
 */
self.addEventListener('fetch', e => {
  console.log('Fetch event', e)
})