console.log('index.js loaded');

const URL = 'http://localhost:9000/data';

window.onload = () => {
  console.log('document loaded');

  const controller = new AbortController();

  const requrest = fetch(URL, {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
    signal: controller.signal,
  })
    .then(
      (res) => {
        if (res.ok) {
          console.log('res', res);
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(
                res.json().catch((error) => {
                  console.log('catch error inside', error);
                })
              );
            }, 3 * 1000);
          });
        } else {
          return Promise.reject({ msg: 'Res not ok', res });
        }
      },
      (error) => {
        if (
          error.name === 'AbortError' &&
          error instanceof DOMException
        ) {
          console.log('request aborted');
        } else {
          console.log('error occur', { error });
          return Promise.reject(error);
        }
      }
    )
    .then((data) => {
      console.log('data:', data);
    });

  setTimeout(() => {
    controller.abort();
  }, 1500);
};
