/*
    Fukcja aktualizuje status anime w rekordzie favorite dla konkretnego użytkownika
    {episode: ACTUAL-NUMBER-OF-EPISODE, state: ACTUAL-STATUS(0,1,3,4), user: USER-ID, anime: ANIME-ID}
*/

const db = require('./db');

async function UpdateFavorite(params) {
    try {
        const sql = `
            UPDATE anm_favorites
            SET
                fv_episode = CASE WHEN ? IS NOT NULL THEN ? ELSE fv_episode END,
                fv_state = CASE WHEN ? IS NOT NULL THEN ? ELSE fv_state END
            WHERE
                fv_user = ?
                AND fv_anime = ?;
        `;

        const [updateRequest] = await db.query(sql, [
            params.episode, 
            params.episode, 
            params.status, 
            params.status, 
            params.user, 
            params.anime]);

        if(updateRequest.affectedRows === 0) {
            const sql_insert = `
                INSERT INTO anm_favorites (fv_user, fv_anime, fv_episode, fv_state)
                VALUES (?, ?, 
                    COALESCE(?, DEFAULT(fv_episode)), 
                    COALESCE(?, DEFAULT(fv_state)));
            `;

            await db.query(sql_insert, [
                params.user, 
                params.anime, 
                params.episode, 
                params.status, 
            ]);
        }

        return true;
    }
    catch(e) {
        console.error(e);
        return false;
    }
}

module.exports = UpdateFavorite;