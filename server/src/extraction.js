const GetAnimes = require('./database/anime')
const GetGroups = require('./database/groups');

function SegregatedAnimeToGroup(groups, animes){
    var data = [];
    var tmp = [];
    for(var i=0; i < groups.length; i++){
        for(var j=0; j < animes.length; j++){
            if(animes[j].st_group == groups[i].gr_id){
                var img = animes[i].an_miniature ? Buffer.from(animes[i].an_miniature).toString('base64') : null;

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
    
        data.push({
            gid: groups[i].gr_id,
            gtitle: groups[i].gr_title,
            anime: tmp
        });
    
        tmp = [];
    }

    return data;
}

function SegregateAnimesToOtchers(animes){
    var tmp = [];
    for(var i=0; i < animes.length; i++){
        if(animes[i].st_group == null){
            var img = animes[i].an_miniature ? Buffer.from(animes[i].an_miniature).toString('base64') : null;

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

    console.log(tmp);
    
    return tmp;
}

function SearchAnimeIndex(animes){
    var tmp = [];

    for(var i=0; i < animes.length; i++){
        tmp.push({
            id: animes[i].an_id,
            title: animes[i].an_title
        });
    }

    return tmp;
}

async function GetAnimesSerialized(req) {
    if(!req.session.user_id){
        return {mess: 'Brak zalogowanej sessji używkownika'}
    }

    const groups = await GetGroups(req.session.user_id);
    const animes = await GetAnimes(req.session.user_id);

    const data = {
        segregated: SegregatedAnimeToGroup(groups, animes),
        others:     SegregateAnimesToOtchers(animes),
        search:     SearchAnimeIndex(animes),
        groups:     groups
    };

    return data;
}

module.exports = GetAnimesSerialized;