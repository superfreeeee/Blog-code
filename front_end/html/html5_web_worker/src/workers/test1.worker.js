const PREFIX_WORKER1 = '[Worker1]';

self.onmessage = (event) => {
  const msg = event.data;
  console.log(`${PREFIX_WORKER1} receive msg in worker: ${msg}`);

  const greeting = `${msg} from test1.worker.js`;
  postMessage(greeting);
};
