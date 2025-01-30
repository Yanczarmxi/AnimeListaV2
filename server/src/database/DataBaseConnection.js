const mysql = require('mysql2/promise');

class DataBase {
    constructor() {
        this.con = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            dateStrings: true,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0  
          });
    }

    getConnection() {
        return this.con;
    }
}

module.exports = new DataBase();