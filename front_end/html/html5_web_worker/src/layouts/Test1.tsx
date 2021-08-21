import React from 'react';

import { PREFIX_TEST1 } from '@utils/prefixs';

const Test1 = () => {
  const createWorker = () => {
    const worker = new Worker('workers/test1.worker.js');

    worker.onmessage = (event) => {
      const msg = event.data;
      console.log(`${PREFIX_TEST1} worker.onmessage: ${msg}`);
      worker.terminate();
      console.log(`${PREFIX_TEST1} worker finished`);
    };

    const msg = 'Hello World';
    console.log(`${PREFIX_TEST1} worker.postMessage: ${msg}`);
    worker.postMessage('Hello World');
  };

  return (
    <div>
      <h2>Test1 - Basic Worker</h2>
      <button onClick={createWorker}>createWorker</button>
    </div>
  );
};

export default Test1;
