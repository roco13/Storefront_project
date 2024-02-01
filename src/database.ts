import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_TEST_DB,
  ENV
} = process.env;

let client: any;
console.log(ENV);
console.log('host:' , POSTGRES_HOST);
console.log('user', POSTGRES_USER);
console.log('password', POSTGRES_PASSWORD);
if (ENV === 'test') {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_TEST_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
  });
}

if (ENV === 'dev') {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
  });
}

client.connect((err: Error) => {
  if (err) {
    console.error('connection error', err.stack);
  } else {
    client.query('SELECT NOW()', (err: Error, res: any) => {
      if (err) {
        console.error('query error', err.stack);
      } else {
        console.log('connected successfully', res.rows[0]);
      }
      client.end();
    });
  }
});

export default client;
