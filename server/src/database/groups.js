const db = require('./db');

async function GetGroups(user) {
    try {
        const sql = 'SELECT gr_id, gr_title FROM anm_groups WHERE gr_user=?';
        const [rows] = await db.query(sql, [user]);
        console.log('pobieranie grupy')
        return rows;
    }
    catch(e) {
        console.error(e);
        return [{error: e.error}];
    }
}

module.exports = GetGroups;