const fs = require('fs');

async function LoadImgToBlob(pathFile) {
    try {
        if(!pathFile) {
            console.log('To ma się tu wyjebać');
            return null;
        }

        console.log('Tego mam nie widzieć jak ciąg jest pusty');

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