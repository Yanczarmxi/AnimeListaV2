const db = require('./db');

async function UpdateRecord(params) {
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

        await db.query(sql, [params.ep, params.st, params.usr, params.anm]);
        return true;
    }
    catch(e) {
        console.error(e);
        return false;
    }
}