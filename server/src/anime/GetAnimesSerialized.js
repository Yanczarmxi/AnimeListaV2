const animeRepo = require('../database/AnimeRepository');
const groupsRepo = require('../database/GroupRepository');

function SerializedAnime(animes) {
    let img = animes.an_miniature ? Buffer.from(animes.an_miniature).toString('base64') : null;

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
        }
    };
}

function SegregatedAnimeToGroup(groups, animes, filter){
    let data = [];
    let tmp = [];
    for(let i=0; i < groups.length; i++){
        for(let j=0; j < animes.length; j++){
            if(animes[j].st_group == groups[i].gr_id){
                console.log(`FV: ${animes[j].fv_state} X ${filter}`)
                if(animes[j].fv_state == filter && filter > -1) {
                    tmp.push(SerializedAnime(animes[j], img));
                }
                else {
                    tmp.push(SerializedAnime(animes[j], img));
                }
            }
        }

        if(filter > -2) {
            if(tmp.length > 0) {
                data.push({
                    gid: groups[i].gr_id,
                    gtitle: groups[i].gr_title,
                    anime: tmp
                });
            }
        }
        else {
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

    const filter = req.session.user_preference?.filter ? req.session.user_preference.filter : -2

    const groups = await groupsRepo.Get(req.session.user_id);
    const animes = await animeRepo.GetAll(req.session.user_id);

    const data = {
        segregated: SegregatedAnimeToGroup(groups, animes, filter),
        others:     SegregateAnimesToOtchers(animes),
        search:     SearchAnimeIndex(animes),
        groups:     groups
    };

    res.status(200).json(data);
}

module.exports = GetAnimesSerialized;