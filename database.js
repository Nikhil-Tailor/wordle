import config from './config.js';
import Postgres from 'pg';
import {words} from 'popular-english-words'

const sql = new Postgres.Client(config);
sql.connect();

sql.on('error', (err) => {
  console.error('SQL Fail', err);
  sql.end();
});

export async function selectWord(id) {
  const q = 'SELECT words FROM wordsTable WHERE id = $1;';
  const result = await sql.query(q, [id]);
  console.log('from db.js');
  // console.log(result.rows[0]);
  // console.log(result);
  return result.rows[0];
}

export async function populateDB(){
  const q = 'INSERT INTO wordsTable (words) VALUES';
  let wordsq='';
  for (const words of x){
    wordsq+='(' + words +'s';
  } 
}
