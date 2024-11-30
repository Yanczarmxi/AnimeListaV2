const loadsql = require('./load');

const sql =  `
SELECT 
	anm_animes.an_id,
	anm_animes.an_title,
	COALESCE(anm_favorites.fv_episode, 1) AS fv_episode,
	COALESCE(anm_favorites.fv_state, 0) AS fv_state,
	anm_segregated.st_group,
    anm_animes.an_url,
    anm_animes.an_description,
    anm_animes.an_episodes,
    anm_animes.an_miniature
FROM anm_animes
LEFT JOIN anm_favorites ON anm_animes.an_id = anm_favorites.fv_anime
LEFT JOIN anm_segregated ON anm_animes.an_id = anm_segregated.st_anime;
`;
const result = loadsql(sql);

module.exports = result;