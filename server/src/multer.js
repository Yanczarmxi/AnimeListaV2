const multer = require('multer');
const path = require('path');
const fs = require('fs');

function StorageFile(hash) {
    return multer.diskStorage({
        destination: async (req, file, cb) => {
            const uploadPath = path.join(__dirname, `/upload/${hash}/raw`);
            fs.mkdirSync(uploadPath, {recursive: true});
            cb(null, uploadPath);
        }
    });
}

module.exports = StorageFile;