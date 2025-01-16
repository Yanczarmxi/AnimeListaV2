const fs = require('fs');
const ProcessImage = require('./ProcessImage');

async function AvatarImage(raw, hash) {
    try {
        if (!fs.existsSync(raw)) {
            console.error(`Plik wejściowy nie istnieje: ${raw}`);
            return null;
        }

        const avatarSize = { width: 128, height: 128 };
        return await ProcessImage(raw, hash, 'avatar', avatarSize);
    }
    catch(e) {
        console.error(`POSTER IMAGE ERROR: ${e}`);
    }
}

module.exports = AvatarImage;