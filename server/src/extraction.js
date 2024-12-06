const GetAnimes = require('./database/anime')
const GetGroups = require('./database/groups');

function SegregatedAnimeToGroup(groups, animes){
    var data = [];
    var tmp = [];
    for(var i=0; i < groups.length; i++){
        for(var j=0; j < animes.length; j++){
            if(animes[j].st_group == groups[i].gr_id){
                tmp.push({
                    id:       animes[j].an_id,
                    title:    animes[j].an_title,
                    date:     animes[j].an_date,
                    url:      animes[j].an_url,
                    episodes: animes[j].an_episodes,
                    img:      animes[j].an_miniature,
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

function SegregateAnimesTootchers(animes){
    var tmp = [];
    for(var i=0; i < animes.length; i++){
        if(animes.an_group == null){
            tmp.push({
                id:       animes[i].an_id,
                title:    animes[i].an_title,
                date:     animes[i].an_date,
                url:      animes[i].an_url,
                episodes: animes[i].an_episodes,
                img:      animes[i].an_miniature,
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
    var tmp = [];

    for(var i=0; i < animes.length; i++){
        tmp.push({
            id: animes.an_id,
            title: animes.an_title
        });
    }

    return tmp;
}

const groups = await GetGroups(1);
const animes = await GetAnimes(1);

var data = [{
    segregated: SegregatedAnimeToGroup(groups, animes),
    others: SegregateAnimesTootchers(animes),
    search: SearchAnimeIndex(animes)
}];

module.exports = data;