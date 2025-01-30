const fs = require('fs');

async function LoadImgToBlob(pathFile) {
    try {
        if(!pathFile) {
            return null;
        }

        if(!fs.existsSync(pathFile)){
            return null;
        }
        return fs.readFileSync(pathFile);
    }
    catch(e) {
        console.error(`ERROR! Nie udalo się załadować pliku jako blob: ${e}`);
        return null;
    }
}

module.exports = LoadImgToBlob;