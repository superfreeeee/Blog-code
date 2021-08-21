import React from 'react';

import { PREFIX_TEST2 } from '@utils/prefixs';
import Worker from '@workers/test2.worker.ts';

const Test2 = () => {
  const createWorker = () => {
    const worker = new Worker();

    worker.onmessage = (event) => {
      const msg = event.data;
      console.log(`${PREFIX_TEST2} worker.onmessage: ${msg}`);
      worker.terminate();
      console.log(`${PREFIX_TEST2} worker finished`);
    };

    const msg = 'Hello World';
    console.log(`${PREFIX_TEST2} worker.postMessage: ${msg}`);
    worker.postMessage('Hello World');
  };

  return (
    <div>
      <h2>Test2 - Worker Loader</h2>
      <button onClick={createWorker}>createWorker</button>
    </div>
  );
};

export default Test2;
