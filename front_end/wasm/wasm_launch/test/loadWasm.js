const fs = require('fs');

const load = (source) => {
  const src = new Uint8Array(fs.readFileSync(source));

  const env = {
    memoryBase: 0,
    tableBase: 0,
    memory: new WebAssembly.Memory({
      initial: 256,
    }),
    table: new WebAssembly.Table({
      initial: 2,
      element: 'anyfunc',
    }),
    abort: () => {
      throw 'abort';
    },
  };

  return WebAssembly.instantiate(src, { env })
    .then((res) => {
      const _instance = res.instance;
      return _instance.exports;
    })
    .catch((err) => {
      console.error('err', err);
      return Promise.reject(err);
    });
};

module.exports = {
  load,
};
