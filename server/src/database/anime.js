const db = require('./db');

async function GetAnime(user) {
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

        const [rows] = await db.query(sql, [user, user, user]);
    
        return rows;
    }
    catch(e) {
        console.error(e);
        return [{error: "ERROR: Nie udało się pobrać danych!"}];
    }
}

module.exports = GetAnime;