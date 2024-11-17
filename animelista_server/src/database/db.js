const mysql = require('mysql2');
const config = require('../config')['database'];

const con = await mysql.createConnection({
  host: config['host'],
  user: config['user'],
  password: config['password'],
  database: config['database'],
});