//const GetDescription = require('./database/description');
const AnimeRepository = require('./database/AnimeRepository');

async function GetReadyDescription(req) {
    var {anime_id} = req.body;

    //const des = await GetDescription({id: anime_id, user: req.session.user_id});
    const des = await AnimeRepository.GetDescription(anime_id, req.session.user_id);

    if(!des) {
        return null;
    }

    var img = des.an_image ? Buffer.from(des.an_image).toString('base64') : null;

    var result = {
        title: des.an_title,
        episodes: des.an_episodes,
        description: des.an_description,
        img: img
    };
    
    return result;
}

module.exports = GetReadyDescription;