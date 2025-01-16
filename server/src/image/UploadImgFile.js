const fs = require('fs');
const path = require('path');
const ImageManipulate = require('./ImageManipulate');

async function Resize(im) {
    const resPoster = await im.Poster();
    const resMiniature = await im.Miniature();

    return {poster: resPoster, miniature: resMiniature};
}

async function UploadImageFromFile(req, res) {
    try {
        if (!req.files || !req.files.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const uploadPath = path.join(__dirname, `../../upload/${req.session.user_hash}/raw`);
        fs.mkdirSync(uploadPath, { recursive: true });

        const uploadedFile = req.files.file;
        const filePath = path.join(uploadPath, uploadedFile.name);

        
        await uploadedFile.mv(filePath);
        
        const imageManipulate = new ImageManipulate(uploadedFile.name, req.session.user_hash);
        req.session.img_files = await Resize(imageManipulate);

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