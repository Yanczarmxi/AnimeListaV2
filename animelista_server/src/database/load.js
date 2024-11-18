const db = require('./db');

function GetRecords(sql){
    try {
        const [rows, fields] = db.query(sql);
    
        return rows;
    }
    catch(e) {
        console.error(e);
    }
}

module.exports = GetRecords;