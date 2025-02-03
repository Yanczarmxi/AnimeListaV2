const db = require('./DataBaseConnection');

class FavoritesRepository {
    constructor() {
            this.db = db.getConnection();
        }

    async Get(user) {
        try {
            const sql = `SELECT fv_anime, fv_episode, fv_state FROM anm_favorites WHERE fv_user = ?;`;
            const [rows] = await this.db.query(sql, [user]);

            return rows;
        }
        catch(e) {
            console.error('Favorites Get Query ERROR: ' + e);
            return null;
        }
    }

    async Set(episode, state, anime, user) {
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

            const [updateRequest] = await this.db.query(sql, [episode, episode, state, state, user, anime]);
            
            if(updateRequest.affectedRows === 0) {
                return this.Add(episode, state, anime, user);
            }
            return true;
        }
        catch(e) {
            console.error('Favorites Set Query ERROR: ' + e);
            return false;
        }
    }

    async Add(episode, state, anime, user) {
        try {
            const sql = `
                INSERT INTO anm_favorites (fv_user, fv_anime, fv_episode, fv_state)
                VALUES (?, ?, 
                    COALESCE(?, DEFAULT(fv_episode)), 
                    COALESCE(?, DEFAULT(fv_state)));
            `;

            await this.db.query(sql, [user, anime, episode, state]);

            return true;
        }
        catch(e) {
            console.error('Favorites Add Query ERROR: ' + e);
            return false;
        }
    }

    async Delete(anime, user) {
        try {
            const _anime = Array.isArray(anime) ? anime.map(Number) : [Number(anime)];

            if (_anime.some(isNaN)) {
                throw new Error("FAVORITES REPO: Nieprawidłowa wartość w anime");
            }

            const placeholder = _anime.map(() => '?').join(',');

            const sql = `DELETE FROM anm_favorites WHERE fv_anime IN (${placeholder}) AND fv_user = ?;`;
            const [result] = await this.db.execute(sql, [..._anime, user]);
            return result.affectedRows;
        }
        catch(e) {
            console.error('Favorites Delete Query ERROR: ' + e);
            return -1;
        }
    }
}

module.exports = new FavoritesRepository();