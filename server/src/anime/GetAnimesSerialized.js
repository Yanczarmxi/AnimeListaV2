const animeRepo = require('../database/AnimeRepository');
const groupsRepo = require('../database/GroupRepository');

function SerializedAnime(animes){
    let tmp = [];
    for(let i=0; i < animes.length; i++){
        let img = animes.an_miniature ? Buffer.from(animes.an_miniature).toString('base64') : null;

        tmp.push({
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
            group:     animes.st_group
        });
    }

    console.log(tmp)

    return tmp;
}

async function GetAnimesSerialized(req, res) {
    if(!req.session.user_id){
        return res.status(401).json({mess: 'Brak zalogowanej sessji używkownika'});
    }

    const groups = await groupsRepo.Get(req.session.user_id);
    const animes = await animeRepo.GetAll(req.session.user_id);

    const data = {
        animes:     SerializedAnime(animes),
        groups:     groups
    };

    res.status(200).json(data);
}

module.exports = GetAnimesSerialized;