const fs = require('fs');
const path = require('path');
const axios = require('axios');
const ImageManipulate = require('./ImageManipulate');

async function UploadUrl(url, uploadPath) {
    try {
        const response = await axios({
          url: url,
          method: 'GET',
          responseType: 'stream',
        });
    
        const filename = path.basename(url);
        const outputPath = path.join(uploadPath, filename);
    
        const fileStream = fs.createWriteStream(outputPath);
        response.data.pipe(fileStream);
    
        console.log(`Obraz zapisano w: ${outputPath}`);
        return outputPath;
      } 
      catch (e) {
        console.error('Błąd podczas pobierania obrazu:', e);
        return null;
      }
}

async function UploadImageFromUrl(req, res) {
    try {
        const {url} = req.body;

        if (!url) {
            return res.status(400).json({ error: 'No url image uploaded' });
        }

        const uploadPath = path.join(__dirname, `../../upload/${req.session.user_hash}/raw`);
        fs.mkdirSync(uploadPath, { recursive: true });

        const uploadedFile = await UploadUrl(url, uploadPath);

        const imageManipulate = new ImageManipulate(uploadedFile, req.session.user_hash);
        req.session.img_files = imageManipulate.ResizePoster();

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

module.exports = UploadImageFromUrl;