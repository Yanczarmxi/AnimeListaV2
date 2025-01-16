const fs = require('fs');
const path = require('path');
const PosterImage = require('./PosterImage');
//const ImageManipulate = require('./ImageManipulate');

async function clearDirectory(directoryPath) {
    try {
        // Pobierz listę plików i folderów w katalogu
        const files = fs.readdirSync(directoryPath);

        // Usuń każdy plik lub folder
        for (const file of files) {
            const fullPath = path.join(directoryPath, file);
            fs.unlinkSync(fullPath);
        }

        console.log(`Zawartość katalogu ${directoryPath} została usunięta.`);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log(`Katalog ${directoryPath} nie istnieje.`);
        } else {
            console.error(`Błąd podczas usuwania zawartości katalogu: ${error.message}`);
        }
    }
}

async function UploadImageFromFile(req, res) {
    try {
        if (!req.files || !req.files.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const uploadPath = path.join(__dirname, `../../upload/${req.session.user_hash}/raw`);
        fs.mkdirSync(uploadPath, { recursive: true });

        await clearDirectory(uploadPath);

        const uploadedFile = req.files.file;
        const fileExtension = path.extname(uploadedFile.name); // np. ".jpg"

        const newFileName = `raw-uploaded-image${Date.now()}${fileExtension}`;
        const filePath = path.join(uploadPath, newFileName);

        await uploadedFile.mv(filePath);

        req.session.img_files = await PosterImage(filePath, req.session.user_hash);

        res.status(200).json({
            message: 'File uploaded successfully',
            url: `${process.env.EX_URL}/tempcontent/poster/poster.jpg`
        });
    }
    catch(e) {
        console.error(`ERROR UPLOAD FILE #2: \n ${e}`);
        res.status(500);
    }
}

module.exports = UploadImageFromFile;