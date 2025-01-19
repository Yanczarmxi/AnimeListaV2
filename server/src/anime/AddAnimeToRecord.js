const fs = require('fs');
const path = require('path');
const LoadImgToBlob = require('../image/LoadimgToBlob');
const AnimeRepository = require('../database/AnimeRepository');
const SegregatedRepository = require('../database/SegregatedRepository');

async function AddAnimeToRecord(req, res) {
    try {
        if(!req.session.isLogged) {
            console.error('DESCRYPTION ERROR: Urzytkownik nie jest zalogowany');
            return res.status(401).json({complete: false});
        }

        const data = req.body;
        const group = Number(data.group);
        const imgPaths = req.session.img_files;
        const userId = req.session.user_id;
        const userHash = req.session.user_hash;

        const blob = {
            poster: await LoadImgToBlob(imgPaths.poster),
            miniature: await LoadImgToBlob(imgPaths.miniature),
        };

        const animeId = await AnimeRepository.Add(data, blob, userId);

        if(group != 0) {
            SegregatedRepository.Add(userId, animeId, group);
        }

        const uploadDirectory = path.join(__dirname, '../../upload', userHash);
        console.log(uploadDirectory);
        if(fs.existsSync(uploadDirectory)) {
            fs.rmSync(uploadDirectory, { recursive: true });
        }

        res.status(200).json({complete: true});
    }
    catch(e) {
        console.error(`ERROR Nie udało się dodać anime do bazy danych: ${e}`);
        res.status(500).json({complete: false});
    }
}

module.exports = AddAnimeToRecord;