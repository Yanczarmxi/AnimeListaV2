/*
    Funkcja kasująca rekord anime
    id = ANIME-ID
*/

const db = require('./db');

async function DeleteAnimeRecord(id) {
        try {
            const sql = 'DELETE FROM anm_anime WHERE an_id = ?';
            await db.query(sql, [id]);
    
            return true;
        }
        catch(e) {
            console.error(e);
            return false;
        }
}

module.exports = DeleteAnimeRecord;