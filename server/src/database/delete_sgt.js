/*
    Funkcja kasuje przypisanie anime do konkretnej grupy
    
    Warianty podawania danych:
    1. {user: USER-ID, anime: ANIME-ID}
    2. {group: GROUP-ID}
*/

const db = require('./db');

async function DeleteSegregateRecord(params) {
        try {
            var user = params.user ? params.user : null;
            var anime = params.anime ? params.anime : null;
            var group = params.group ? params.group : null;

            const sql = 'DELETE FROM anm_segregated WHERE (st_user = ? AND st_anime = ?) OR (st_group = ?)';
            await db.query(sql, [user, anime, group]);
    
            return true;
        }
        catch(e) {
            console.error(e);
            return false;
        }
}

module.exports = DeleteSegregateRecord;