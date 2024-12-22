/*
    Funckja kasuje rekord ustawień statusu oglądania dla danego użytkowanika
    {user: USER-ID, anime: ANIME-ID}
*/

const db = require('./db');

async function DeleteFavoriteRecord(params) {
        try {
            const sql = 'DELETE FROM anm_favorite WHERE fv_user = ? AND fv_anime = ?';
            await db.query(sql, [params.user, params.anime]);
    
            return true;
        }
        catch(e) {
            console.error(e);
            return false;
        }
}

module.exports = DeleteFavoriteRecord;