const CURRENT_VERSION = 'v1';
const LIFECYCLE_PREFIX = `[serviceWorker: sw.js(${CURRENT_VERSION})]`;

console.log(`${LIFECYCLE_PREFIX} load serviceWorker`, this);

self.addEventListener('install', (event) => {
  console.log(`${LIFECYCLE_PREFIX} onInstall`, event);

  event.waitUntil(
    caches.open(CURRENT_VERSION).then((cache) => {
      return cache.addAll(['/', '/index.html', '/index.css', '/index.js']);
    })
  );
});

self.addEventListener('activate', (event) => {
  console.log(`${LIFECYCLE_PREFIX} onActivate`, event);

  // clean none current version cache
  event.waitUntil(
    caches.keys().then((keys) => {
      console.log(`${LIFECYCLE_PREFIX} onActivate: caches keys`, keys);
      return Promise.all(
        keys.map((key) => {
          if (key !== CURRENT_VERSION) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  console.log(`${LIFECYCLE_PREFIX} onFetch, url=${event.request.url}`, event);

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        console.log(`${LIFECYCLE_PREFIX} onFetch: pre cache`, response);
      }
      return (
        response ||
        fetch(event.request)
          .then(function (response) {
            let responseClone = response.clone();

            console.log(`${LIFECYCLE_PREFIX} onFetch: fetch and cache`, response);
            caches.open(CURRENT_VERSION).then(function (cache) {
              cache.put(event.request, responseClone);
            });
            return response;
          })
          .catch(function () {
            // return caches.match('/sw-test/gallery/myLittleVader.jpg');
            return new Response('fetch fail');
          })
      );
    })
  );
});
