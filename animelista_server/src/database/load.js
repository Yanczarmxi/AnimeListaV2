const db = require('./db');

function GetRecords(sql){
    try {
        const [rows, fields] = db.query(sql);
    
        return rows;
    }
    catch(e) {
        return(e)
    }
}

module.exports = GetRecords;