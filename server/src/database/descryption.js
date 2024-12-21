const db = require('./db');

async function GetDescription(id) {
    try {
        const sql = `
            SELECT
                an_title,
                an_description,
                an_episodes,
                an_image
            FROM anm_animes
            WHERE anm_id=?;
        `;

        const [rows] = await db.query(sql, [id]);

        return rows;
    }
    catch(e) {
        console.error(e);
        return [{error: "ERROR: Nie udało się pobrać danych!"}]
    }
}

module.exports = GetDescription;