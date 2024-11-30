const db = require('./db');

async function GetRecords(sql){
    try {
        const [rows] = await db.query(sql);
    
        return rows;
    }
    catch(e) {
        console.error(e);
        return [{error: e.error}];
    }
}

module.exports = GetRecords;