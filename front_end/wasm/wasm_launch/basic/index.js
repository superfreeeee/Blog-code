const fs = require('fs');

const src = new Uint8Array(fs.readFileSync('./main.wasm'));

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

WebAssembly.instantiate(src, { env })
  .then((res) => {
    const _instance = res.instance;
    const { add } = _instance.exports;

    console.log(`add(1, 2)=${add(1, 2)}`);
  })
  .catch((err) => {
    console.error('err', err);
    return Promise.reject(err);
  });
