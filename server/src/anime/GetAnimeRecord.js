const AnimeRepository = require('../database/AnimeRepository');
const SegregatedRepository = require('../database/SegregatedRepository');

async function GetAnimeRecord(req, res) {
    try {
        if(!req.session.isLogged) {
            console.error('ERROR: Użytkownik nie jest zalogowany');
            return res.status(401).json({mess: 'Persmision Deniet!'});
        }
        
        if(!req.body.anime) {
            console.error('ERROR: Nie podano ID do pobrania rekordu');
            return res.status(400).json({mess: 'No data'});
        }

        const anime = req.body.anime;
        const user = req.session.user_id;

        const animeResult = AnimeRepository.GetRecord(anime, user);
        const groupIdResult = SegregatedRepository.GetRecord(anime, user);

        //Serializacja danych
        const img = animeResult.an_image ? Buffer.from(animeResult.an_image).toString('base64') : null;

        const data = {
            title:       animeResult.an_title,
            url:         animeResult.an_url,
            description: animeResult.an_description,
            episodes:    animeResult.an_episodes,
            group:       groupIdResult.st_group,
            image:       img
        };

        res.status(200).json(data);
    }
    catch(e) {
        console.error(`ERROR: Nie można pobrać danych: ${e}`);
        res.status(500).json({mess: 'Server Error!'});
    }
}

module.exports = GetAnimeRecord;