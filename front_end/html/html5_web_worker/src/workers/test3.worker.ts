type MessageType = 'RESET' | 'SKIP';

let count = 0;
let skipOnce = false;

self.onmessage = (e: MessageEvent<{ type: MessageType }>) => {
  const { type } = e.data;
  switch (type) {
    case 'RESET':
      count = 0;
      break;
    case 'SKIP':
      skipOnce = true;
      break;
  }
};

const SEC = 1000;
setInterval(() => {
  if (skipOnce) {
    skipOnce = false;
  } else {
    count++;
  }
  self.postMessage({ currentTime: new Date(), count });
}, SEC);
