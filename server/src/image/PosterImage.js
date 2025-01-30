const fs = require('fs');
const ProcessImage = require('./ProcessImage');

async function PosterImage(raw, hash) {
    try {
        if (!fs.existsSync(raw)) {
            console.error(`Plik wejściowy nie istnieje: ${raw}`);
            return null;
        }

        const posterSize = { width: 200, height: 285 };
        const miniatureSize = { width: 50, height: 70 };

        const poster = await ProcessImage(raw, hash, 'poster', posterSize);
        const miniature = await ProcessImage(raw, hash, 'miniature', miniatureSize);

        return {poster: poster, miniature: miniature};
    }
    catch(e) {
        console.error(`POSTER IMAGE ERROR: ${e}`);
    }
}

module.exports = PosterImage;