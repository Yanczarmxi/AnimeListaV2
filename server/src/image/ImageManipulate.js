const Jimp = require('jimp');
const fs = require('fs');
const path = require('path');

class ImageManipulate {
    constructor() {
        this.jimp = Jimp;
        this.fs = fs;
        this.path = path;

        // Wymiary grafik
        this.posterSize = { w: 200, h: 285 };
        this.miniatureSize = { w: 50, h: 70 };
        this.avatarSize = { w: 128, h: 128 };
    }

    async Poster(img, hash) {
        return await this.processImage(img, hash, 'poster', this.posterSize);
    }

    async Miniature(img, hash) {
        return await this.processImage(img, hash, 'miniature', this.miniatureSize);
    }

    async Avatar(img, hash) {
        return await this.processImage(img, hash, 'avatar', this.avatarSize);
    }

    async processImage(img, hash, type, size) {
        const raw = this.path.resolve(__dirname, `../../upload/${hash}/raw/${img}`);
        const dph = this.path.resolve(__dirname, `../../upload/${hash}/${type}`);
        const out = this.path.join(dph, `${type}.jpg`);

        try {
            // Tworzenie ścieżki, jeśli nie istnieje
            this.fs.mkdirSync(dph, { recursive: true });

            // Sprawdzanie istnienia pliku wejściowego
            if (!this.fs.existsSync(raw)) {
                console.error(`Plik wejściowy nie istnieje: ${raw}`);
                return null;
            }

            // Przetwarzanie obrazu
            const result = await this.Resize(raw, out, size);
            if (!result) return null;

            return out;
        } catch (e) {
            console.error(`ERROR PROCESSING IMAGE: ${e}`);
            return null;
        }
    }

    async Resize(imp, out, size) {
        try {
            const image = await this.jimp.read(imp); // Użycie await
            await image
                .resize(size.w, size.h)
                .quality(70)
                .writeAsync(out);

            return true;
        } catch (e) {
            console.error(`ERROR IMAGE RESIZE: ${e}`);
            return false;
        }
    }
}

module.exports = new ImageManipulate();