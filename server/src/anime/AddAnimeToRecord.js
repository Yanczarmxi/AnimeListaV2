const fs = require('fs');
const path = require('path');
const imm = require('../image');
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

        const posterPath = imgPaths?.poster !== undefined ? imgPaths.poster : null;
        const miniaturePath = imgPaths?.miniature !== undefined ? imgPaths.miniature : null;

        const blob = {
            poster: await imm.LoadImgToBlob(posterPath),
            miniature: await imm.LoadImgToBlob(miniaturePath),
        };

        const animeId = await AnimeRepository.Add(data, blob, userId);

        if(group != 0) {
            SegregatedRepository.Add(animeId, group, userId);
        }

        const uploadDirectory = path.join(__dirname, '../../upload', userHash);
        console.log(uploadDirectory);
        if(fs.existsSync(uploadDirectory)) {
            fs.rmSync(uploadDirectory, { recursive: true });
        }

        res.status(200).json({
            mess: 'Dodano nowe anime',
            complete: true
        });
    }
    catch(e) {
        console.error(`ERROR Nie udało się dodać anime do bazy danych: ${e}`);
        res.status(500).json({complete: false});
    }
}

module.exports = AddAnimeToRecord;