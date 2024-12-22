/*
    Fukcja aktualizuje status anime w rekordzie favorite dla konkretnego użytkownika
    {episode: ACTUAL-NUMBER-OF-EPISODE, state: ACTUAL-STATUS(0,1,3,4), user: USER-ID, anime: ANIME-ID}
*/

const db = require('./db');

async function UpdateFavorite(params) {
    try {
        const sql = `
            UPDATE
                anm_favorites
            SET
                fv_episode = ?,
                fv_state = ?
            WHERE
                fv_user = ?,
                fv_anime = ?;
        `;

        await db.query(sql, [params.episode, params.status, params.user, params.anime]);
        return true;
    }
    catch(e) {
        console.error(e);
        return false;
    }
}

module.exports = UpdateFavorite;