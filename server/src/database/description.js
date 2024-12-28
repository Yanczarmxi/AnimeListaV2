//const db = require('./db');
const db = require('./db2');

async function GetDescription(params) {
    try {
        const dbc = db.getConnection();

        const sql = `
            SELECT
                an_title,
                an_description,
                an_episodes,
                an_image
            FROM anm_animes
            WHERE an_id=? AND an_user=?;
        `;

        const [rows] = await dbc.query(sql, [params.id, params.user]);

        return rows[0];
    }
    catch(e) {
        console.error(e);
        return null;
    }
}

module.exports = GetDescription;