import debug from 'debug';

export const createDebugger = (namespace: string) => debug(namespace);

export const logDevServer = debug('server:dev');
