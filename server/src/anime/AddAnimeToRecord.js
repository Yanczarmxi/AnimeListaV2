const path = require('path');
const LoadImgToBlob = require('../image/LoadimgToBlob');
//const ClearDirectory = require('../image/ClearDirctory');
const AnimeRepository = require('../database/AnimeRepository');

async function AddAnimeToRecord(req, res) {
    try {
        if(!req.session.isLogged) {
            console.error('DESCRYPTION ERROR: Urzytkownik nie jest zalogowany');
            return res.status(401).json(null);
        }

        const data = req.body;
        const imgPaths = req.session.img_files;
        const userId = req.session.user_id;
        const userHash = req.session.user_hash;
        console.log(data);
        console.log(imgPaths);

        const blob = {
            poster: await LoadImgToBlob(imgPaths.poster),
            miniature: await LoadImgToBlob(imgPaths.miniature),
        };

        await AnimeRepository.Add(data, blob, userId);

        //const uploadDirectory = path.join(__dirname, '../../upload', userHash);
        //await ClearDirectory(uploadDirectory);

        res.status(200);
    }
    catch(e) {
        console.error(`ERROR Nie udało się dodać anime do bazy danych: ${e}`);
        res.status(500);
    }
}

module.exports = AddAnimeToRecord;