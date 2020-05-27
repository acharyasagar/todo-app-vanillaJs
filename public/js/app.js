/**
 * first register the service worker in the browser
 */
if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then((reg) => {
      console.log('Service worker registered', reg)
    })
    .catch(() => {
      console.log('Service worker not registered', err)
    })
}



