const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function ImageRescale(raw, out, size) {
    sharp.cache(false);
    sharp.simd(false);
    
    try {
        await sharp(raw)
            .resize(size)
            .jpeg({quality: 50})
            .toFile(out);
    }
    catch(e) {
        console.error(`ERROR IMAGE RESIZE: ${e}`);
    }
}

async function ProcessImage(raw, hash, type, size) {
    const dph = path.resolve(__dirname, `../../upload/${hash}/${type}`);
    const out = path.join(dph, `${type}.jpg`);

    try {
        fs.mkdirSync(dph, {recursive: true});

        if (!fs.existsSync(raw)) {
            console.error(`Plik wejściowy nie istnieje: ${raw}`);
            return null;
        }

        await ImageRescale(raw, out, size);
        
        return out;
    }
    catch(e) {
        console.error(`ERROR PROCESSING IMAGE: ${e}`);
        return null;
    }
}

module.exports = ProcessImage;