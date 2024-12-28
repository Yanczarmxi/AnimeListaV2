const AnimeRepository = require('../database/AnimeRepository');

async function GetReadyDescription(req, res) {
    if(!req.session.isLogged) {
        console.error('DESCRYPTION ERROR: Urzytkownik nie jest zalogowany');
        return res.status(401).json(null);
    }

    const {anime_id} = req.body;

    if(isNaN(anime_id)) {
        console.error('DESCRYPTION ERROR: Błędne dane wejściowe');
        return res.status(400).json(null);
    }

    const des = await AnimeRepository.GetDescription(anime_id, req.session.user_id);

    if(!des) {
        console.error('DESCRYPTION ERROR: Nie pobrano danych z DB')
        return res.status(500).json(null);
    }

    const img = des.an_image ? Buffer.from(des.an_image).toString('base64') : null;

    const result = {
        title: des.an_title,
        episodes: des.an_episodes,
        description: des.an_description,
        img: img
    };
    
    res.status(200).json(result);
}

module.exports = GetReadyDescription;