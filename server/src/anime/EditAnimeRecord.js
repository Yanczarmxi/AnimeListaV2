const AnimeRepository = require('../database/AnimeRepository');
const SegregatedRepository = require('../database/SegregatedRepository');
const imm = require('../image');
const path = require('path');
const fs = require('fs');

async function EditAnimeRecord(req, res) {
    try {
        if(!req.session.isLogged) {
            console.error('ERROR: Edit anime record request. Użytkownik nie jest zalogowany');
            return res.status(401).json({
                mess: 'Użytkownik nie jest zalogowany',
                complete: false
            });
        }

        if(!req.body) {
            console.error('ERROR: Edit anime record request. Użytkownik nie jest zalogowany');
            return res.status(401).json({
                mess: 'Użytkownik nie jest zalogowany',
                complete: false
            }); 
        }

        const updateData = req.body;
        const userHash = req.session.user_hash;
        const imgPaths = req.session.img_files;
        let updateImage = false;
        let blob = {
            poster: null,
            miniature: null,
        }

        if(updateData.newImage && !updateData.removeImage) {
            blob = {
                poster: await imm.LoadImgToBlob(imgPaths.poster),
                miniature: await imm.LoadImgToBlob(imgPaths.miniature),
            };
            updateImage = true;
        }

        if(updateData.removeImage && !updateData.newImage) {
            updateImage = true;
        }

        const data = {
            title: updateData.title,
            url: updateData.url,
            episodes: updateData.episodes,
            description: updateData.description,
            image: blob.poster,
            miniature: blob.miniature,
            updateImage: updateImage
        }

        AnimeRepository.Update(updateData.id, data);

        const uploadDirectory = path.join(__dirname, '../../upload', userHash);
        if(fs.existsSync(uploadDirectory)) {
            fs.rmSync(uploadDirectory, { recursive: true });
        }

        res.status(200).json({
            mess: 'Rekord został zaktualizowany',
            complete: true
        });
    }
    catch(e) {
        console.error(`ERROR: Nie udało się zaktualizować recordu: ${e}`);
        res.status(500).json({
            mess: 'Nie udało się zaktualizować rekordu',
            complete: false
        });
    }
}

module.exports = EditAnimeRecord;