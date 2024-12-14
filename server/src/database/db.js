const mysql = require('mysql2/promise');
const config = require('../config')

dbl = config['database'];

const con = mysql.createPool({
  host: dbl['host'],
  user: dbl['user'],
  password: dbl['password'],
  database: dbl['database'],
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0  
});

module.exports = con;