'use strict';
if (navigator.serviceWorker) {
  // eslint-disable-next-line no-inner-declarations
  async function registerServiceWorker() {
    try {
      await navigator.serviceWorker.register('./sw.js');
    } catch (e) {
      console.error("Service Worker failed.  Falling back to 'online only'.", e);
    }
  }
  window.addEventListener('load', registerServiceWorker);
}
