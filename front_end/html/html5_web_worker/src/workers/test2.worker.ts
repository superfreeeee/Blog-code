const PREFIX_WORKER2 = '[Worker2]';

self.onmessage = (event) => {
  const msg = event.data;
  console.log(`${PREFIX_WORKER2} receive msg in worker: ${msg}`);

  const greeting = `${msg} from test2.worker.ts`;
  postMessage(greeting);
};
