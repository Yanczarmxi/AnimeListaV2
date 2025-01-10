const fs = require('fs');
const path = require('path');
const imageManipulate = require('./ImageManipulate');

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function WaitForFile(file) {
    for(var i=0; i < 10; i++) {
        if(fs.existsSync(file)) {
            return true;
        }
        await sleep(1000);
    }

    return false;
}

async function UploadImage(req, res) {
    try {
        if (!req.files || !req.files.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const uploadPath = path.join(__dirname, `../../upload/${req.session.user_hash}/raw`);

        fs.mkdirSync(uploadPath, { recursive: true });

        const uploadedFile = req.files.file;
        const filePath = path.join(uploadPath, uploadedFile.name);

        await uploadedFile.mv(filePath, (err) => {
            if (err) {
                console.error(`ERROR UPLOAD FILE #1: ${err}`);
                return res.status(500);
            }
        });

        if(!WaitForFile(uploadPath + `/${uploadedFile.name}`)) {
            console.error(`ERROR UPLOAD FILE #3: Time out!`);
            res.status(500);
        }

        const resPoster = await imageManipulate.Poster(uploadedFile.name, req.session.user_hash);

        res.status(200).json({
            message: 'File uploaded successfully',
            filePath: filePath
        });
    }
    catch(e) {
        console.error(`ERROR UPLOAD FILE #2: \n ${e}`);
        res.status(500);
    }
}

module.exports = UploadImage;