const animeRepo = require('../database/AnimeRepository');
const groupsRepo = require('../database/GroupRepository');

function SerializedAnime(animes) {
    let img = animes.an_miniature ? Buffer.from(animes.an_miniature).toString('base64') : null;
    let group = animes.st_group == null ? 0 : animes.st_group;

    return {
        id:       animes.an_id,
        title:    animes.an_title,
        date:     animes.an_date,
        url:      animes.an_url,
        episodes: animes.an_episodes,
        img:      img,
        fav: {
            status:  animes.fv_state,
            episode: animes.fv_episode
        },
        group:    group
    };
}

function PreprareAnime(animes){
    let tmp = [];
    for(let i=0; i < animes.length; i++){
        tmp.push(SerializedAnime(animes[i]));
    }

    return tmp;
}

async function GetAnimesSerialized(req, res) {
    if(!req.session.user_id){
        return res.status(401).json({mess: 'Brak zalogowanej sessji używkownika'});
    }

    const groups = await groupsRepo.Get(req.session.user_id);
    const animes = await animeRepo.GetAll(req.session.user_id);

    const data = {
        animes:     PreprareAnime(animes),
        groups:     groups
    };

    res.status(200).json(data);
}

module.exports = GetAnimesSerialized;