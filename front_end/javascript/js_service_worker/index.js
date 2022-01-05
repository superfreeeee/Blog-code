const INDEX_PREFIX = `[index.js]`;

console.log(`${INDEX_PREFIX} load script sucess`);

// load service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const serviceWorkerUrl = '/sw.js';
    console.log(
      `${INDEX_PREFIX} try register serviceWorker: ${serviceWorkerUrl}`
    );

    navigator.serviceWorker
      .register(serviceWorkerUrl)
      .then((registration) => {
        console.log(`${INDEX_PREFIX} register success:`, registration);
      })
      .catch((reason) => {
        console.log(`${INDEX_PREFIX} register fail:`, reason);
      });
  });
}

const updateClock = () => {
  const clockEl = document.querySelector('.clock');
  clockEl.innerHTML = new Date().toLocaleString();
};
updateClock(); // init clock
const timer = setInterval(updateClock, 1000);
