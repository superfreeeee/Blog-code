import http from 'http';
import { AddressInfo } from 'net';

import app from './app';
import { logDevServer } from './libs/logger';

const PORT = 3001;

const server = http.createServer(app.callback());
server.listen(PORT);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
  // @ts-ignore
  if (error.syscall !== 'listen') {
    throw error;
  }
  // handle specific listen errors with friendly messages
  // @ts-ignore
  switch (error.code) {
    case 'EACCES':
      console.error(PORT + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(PORT + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address() as AddressInfo;
  logDevServer(`Listening on port ${addr.port}`);
}
