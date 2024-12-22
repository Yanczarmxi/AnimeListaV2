const db = require('./db');

class DeleteData {
    async DeleteAnimeRecord(id) {
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
    
    async DeleteFavoriteRecord(user, anime) {
        try {
            const sql = 'DELETE FROM anm_favorite WHERE fv_user = ? AND fv_anime = ?';
            await db.query(sql, [user, anime]);
    
            return true;
        }
        catch(e) {
            console.error(e);
            return false;
        }
    }
    
    async DeleteCategoryRecord(user, anime) {
        try {
            const sql = 'DELETE FROM anm_segregated WHERE st_user = ? AND st_anime = ?';
            await db.query(sql, [id]);
    
            return true;
        }
        catch(e) {
            console.error(e);
            return false;
        }
    }
}

module.exports = DeleteData;