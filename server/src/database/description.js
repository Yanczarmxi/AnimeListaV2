const db = require('./db');

async function GetDescription(params) {
    try {
        const sql = `
            SELECT
                an_title,
                an_description,
                an_episodes,
                an_image
            FROM anm_animes
            WHERE an_id=? AND an_user=?;
        `;

        const [rows] = await db.query(sql, [params.id, params.user]);

        return rows[0];
    }
    catch(e) {
        console.error(e);
        return null;
    }
}

module.exports = GetDescription;