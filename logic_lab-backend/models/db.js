import mysql from 'mysql2/promise'; 

const pool = await mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'bk200423',
  database: 'logic_lab',
});

export default pool;
