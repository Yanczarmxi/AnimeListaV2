const db = require('./db2');

class AnimeRepository {
    constructor() {
        this.db = db.getConnection();
    }

    async GetAll(user) {
        try {
            const sql =  `
                SELECT 
                    anm_animes.an_id,
                    anm_animes.an_title,
                    anm_animes.an_date,
                    COALESCE(anm_favorites.fv_episode, 1) AS fv_episode,
                    COALESCE(anm_favorites.fv_state, 0) AS fv_state,
                    anm_segregated.st_group,
                    anm_animes.an_url,
                    anm_animes.an_episodes,
                    anm_animes.an_miniature
                FROM anm_animes
                LEFT JOIN anm_favorites ON anm_animes.an_id = anm_favorites.fv_anime AND anm_favorites.fv_user=?
                LEFT JOIN anm_segregated ON anm_animes.an_id = anm_segregated.st_anime AND anm_segregated.st_user=?
                WHERE anm_animes.an_user=?;
                `;
    
            const [rows] = await this.db.query(sql, [user, user, user]);
        
            return rows;
        }
        catch(e) {
            console.error(e);
            return null;
        }
    }

    async GetDescription(id, user) {
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
    
            const [rows] = await this.db.query(sql, [id, user]);
    
            return rows[0];
        }
        catch(e) {
            console.error(e);
            return null;
        }
    }

    async Delete(id) {
        try {
            const sql = 'DELETE FROM anm_anime WHERE an_id = ?';
            await this.db.query(sql, [id]);
    
            return true;
        }
        catch(e) {
            console.error(e);
            return false;
        }
    }

    async Update(id, title, url, episodes, description, miniature, image) {
        try {
            const sql = `
                UPDATE anm_animes
                SET
                    an_title = ?,
                    an_url = ?,
                    an_episodes = ?,
                    an_description = ?,
                    an_miniature = COALESCE(?, an_miniature),
                    an_image = COALESCE(?, an_image)
                WHERE
                    an_id = ?;
            `;

            await this.db.query(sql, [title, url, episodes, description, miniature, image, id]);

            return true;
        }
        catch(e) {
            console.error(e);
            return false;
        }
    }
}

module.exports = new AnimeRepository();