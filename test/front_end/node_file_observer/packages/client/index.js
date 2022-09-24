console.log(`Hello Client`);

const wsUrl = `ws://localhost:8999/ws`;
console.log(`conneting to ${wsUrl}`);

const increment = document.querySelector('#increment');
let count = 0;
increment.addEventListener('click', () => {
  count++;
  sendMessage({ type: 'getComponentList' });
});

let currentConnection = null;
const sendMessage = (data) => {
  if (!currentConnection) {
    console.warn('No connection alive');
    return;
  }

  const raw = JSON.stringify(data);
  currentConnection.send(raw);
};

const closeConnection = () => {
  if (!currentConnection) {
    return;
  }

  if (currentConnection.readyState === WebSocket.OPEN) {
    currentConnection.close();
  }

  currentConnection = null;
};

const start = document.querySelector('#start');
const close = document.querySelector('#close');
start.addEventListener('click', () => {
  if (currentConnection) {
    console.warn('Connection still alive', currentConnection);
    return;
  }

  // create new connection
  const ws = (currentConnection = new WebSocket(wsUrl));

  ws.addEventListener('open', (e) => {
    console.log(`on open ${ws.readyState}`, e);

    // sendMessage({ msg: 'Hello Server' });
  });

  ws.addEventListener('message', (e) => {
    const data = JSON.parse(e.data);

    console.log(`on message`, data);
    // console.log(`on message`, e);
  });

  ws.addEventListener('error', (...args) => {
    console.log(`on error`, args);
    closeConnection();
  });

  ws.addEventListener('close', (e) => {
    console.log(`on close`, e);
    closeConnection();
  });
});
close.addEventListener('click', () => {
  if (!currentConnection) {
    console.warn('No connection alive');
    return;
  }

  closeConnection();
});
