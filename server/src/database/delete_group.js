/*
    Funkcja kasuje zapis konkretnej grupy
*/

const db = require('./db');

async function DeleteSegregateRecord(params) {
        try {
            const sql = 'DELETE FROM anm_groups WHERE (gr_id = ? AND gr_user = ?)';
            await db.query(sql, [params.id, params.user]);
    
            return true;
        }
        catch(e) {
            console.error(e);
            return false;
        }
}

module.exports = DeleteSegregateRecord;