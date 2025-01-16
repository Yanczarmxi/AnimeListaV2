const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

class ImageManipulate {
    constructor(img, hash) {
        this.raw = path.resolve(__dirname, `../../upload/${hash}/raw/${img}`);
        this.hash = hash;

        // Wymiary grafik
        this.posterSize = { w: 200, h: 285 };
        this.miniatureSize = { w: 50, h: 70 };
        this.avatarSize = { w: 128, h: 128 };
    }

    async ResizePoster() {
        const resPoster = await this.Poster();
        const resMiniature = await this.Miniature();

        return {poster: resPoster, miniature: resMiniature};
    }

    async Poster() {
        return await this.processImage('poster', this.posterSize);
    }

    async Miniature() {
        return await this.processImage('miniature', this.miniatureSize);
    }

    async Avatar() {
        return await this.processImage('avatar', this.avatarSize);
    }

    async processImage(type, size) {
        //const raw = path.resolve(__dirname, `../../upload/${hash}/raw/${img}`);
        const dph = path.resolve(__dirname, `../../upload/${this.hash}/${type}`);
        const out = path.join(dph, `${type}.jpg`);

        try {
            // Tworzenie ścieżki, jeśli nie istnieje
            fs.mkdirSync(dph, { recursive: true });

            // Sprawdzanie istnienia pliku wejściowego
            if (!fs.existsSync(this.raw)) {
                console.error(`Plik wejściowy nie istnieje: ${this.raw}`);
                return null;
            }

            // Przetwarzanie obrazu
            const result = await this.Resize(out, size);
            if (!result) return null;

            return out;
        } catch (e) {
            console.error(`ERROR PROCESSING IMAGE: ${e}`);
            return null;
        }
    }

    async Resize(out, size) {
        try {
            console.log(this.raw);
            const image = sharp(this.raw); // Użycie await
            const resimg = image
                .resize(size.w, size.h)
                .jpeg({ quality: 50 });

            await resimg.toFile(out);

            return true;
        } catch (e) {
            console.error(`ERROR IMAGE RESIZE: ${e}`);
            return false;
        }
    }
}

module.exports = ImageManipulate;