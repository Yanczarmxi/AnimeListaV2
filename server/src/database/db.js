const mysql = require('mysql2/promise');

const con = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '123',
  database: 'animedb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0  
});

module.exports = con;