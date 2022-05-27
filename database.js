import config from './config.js';
import Postgres from 'pg';
import { words } from 'popular-english-words';
const sql = new Postgres.Client(config);
sql.connect();
sql.on('error', (err) => {
  console.error('SQL Fail', err);
  sql.end();
});
export async function selectWordFive(id) {
  const q = 'SELECT words FROM wordsTable WHERE id = $1;';
  const result = await sql.query(q, [id]);
  return result.rows[0];
}
export async function selectWordSix(id) {
  const q = 'SELECT wordsSix FROM wordsTable WHERE id = $1;';
  const result = await sql.query(q, [id]);
  return result.rows[0];
}
