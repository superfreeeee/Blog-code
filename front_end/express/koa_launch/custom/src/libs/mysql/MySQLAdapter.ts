import { Connection, ConnectionConfig, createConnection } from 'mysql';
import { logDevServer } from '../logger';

export default class MySQLAdapter {
  private readonly config: ConnectionConfig;
  private connection: Connection | null = null;

  constructor(config: ConnectionConfig) {
    this.config = config;
    this.connect();
  }

  connect(): boolean {
    try {
      this.connection = createConnection(this.config);
      logDevServer('connect success');
      return true;
    } catch (e) {
      logDevServer('connect error', e);
      return false;
    }
  }

  private ensureConnection(): boolean {
    return this.connection !== null || this.connect();
  }

  query<T>(stmt: string): Promise<T> {
    return new Promise((resolve, reject) => {
      if (!this.ensureConnection()) {
        reject(new Error('connect mysql fail'));
        return;
      }

      this.connection.query(stmt, (err, data) => {
        err ? reject(err) : resolve(data);
      });
    });
  }
}
