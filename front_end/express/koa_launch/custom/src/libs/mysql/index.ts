import MySQLAdapter from './MySQLAdapter';

const db = new MySQLAdapter({
  host: 'localhost',
  user: 'root',
  password: '1234567890',
  database: 'exampledb',
  // @ts-ignore
  // useConnectionPooling: true,
});

export default db;
