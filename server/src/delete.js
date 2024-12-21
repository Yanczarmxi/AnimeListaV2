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

async function DeleteFavoriteRecord(user, anime) {
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

async function DeleteCategoryRecord(user, anime) {
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