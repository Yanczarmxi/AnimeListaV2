const animeRepo = require('../database/AnimeRepository');
const groupsRepo = require('../database/GroupRepository');

function SegregatedAnimeToGroup(groups, animes){
    let data = [];
    let tmp = [];
    for(let i=0; i < groups.length; i++){
        for(let j=0; j < animes.length; j++){
            if(animes[j].st_group == groups[i].gr_id){
                let img = animes[j].an_miniature ? Buffer.from(animes[j].an_miniature).toString('base64') : null;

                tmp.push({
                    id:       animes[j].an_id,
                    title:    animes[j].an_title,
                    date:     animes[j].an_date,
                    url:      animes[j].an_url,
                    episodes: animes[j].an_episodes,
                    img:      img,
                    fav: {
                        status:  animes[j].fv_state,
                        episode: animes[j].fv_episode
                    }
                });
            }
        }

        if(tmp.length > 0) {
            data.push({
                gid: groups[i].gr_id,
                gtitle: groups[i].gr_title,
                anime: tmp
            });
        }
    
        tmp = [];
    }
    return data;
}

function SegregateAnimesToOtchers(animes){
    let tmp = [];
    for(let i=0; i < animes.length; i++){
        if(animes[i].st_group == null){
            let img = animes[i].an_miniature ? Buffer.from(animes[i].an_miniature).toString('base64') : null;

            tmp.push({
                id:       animes[i].an_id,
                title:    animes[i].an_title,
                date:     animes[i].an_date,
                url:      animes[i].an_url,
                episodes: animes[i].an_episodes,
                img:      img,
                fav: {
                    status:  animes[i].fv_state,
                    episode: animes[i].fv_episode
                }
            });
        }
    }

    return tmp;
}

function SearchAnimeIndex(animes){
    let tmp = [];

    for(let i=0; i < animes.length; i++){
        tmp.push({
            id: animes[i].an_id,
            title: animes[i].an_title
        });
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
        segregated: SegregatedAnimeToGroup(groups, animes),
        others:     SegregateAnimesToOtchers(animes),
        search:     SearchAnimeIndex(animes),
        groups:     groups
    };

    res.status(200).json(data);
}

module.exports = GetAnimesSerialized;