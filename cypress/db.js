// cypress/db.js
const { Pool } = require('pg');

const pool = new Pool({
  host: '127.0.0.1',
  user: 'postgres',
  password: 'admin',
  database: 'testdb',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
});

async function query(sql, params) {
  const client = await pool.connect();
  try {
    const res = await client.query(sql, params);
    return res.rows;
  } finally {
    client.release();
  }
}

// Poți închide pool-ul când nu mai e nevoie:
// async function closePool() {
//   await pool.end();
// }

module.exports = { query, pool };