const fs = require('fs');
const path = require('path');
const axios = require('axios');
const ImageManipulate = require('./ImageManipulate');

async function Resize(im) {
    const resPoster = await im.Poster();
    const resMiniature = await im.Miniature();

    return {poster: resPoster, miniature: resMiniature};
}

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

async function UploadImage(req, res) {
    try {
        if ((!req.files || !req.files.file) && !req.body.url) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const uploadPath = path.join(__dirname, `../../upload/${req.session.user_hash}/raw`);
        fs.mkdirSync(uploadPath, { recursive: true });

        var fileName = '';

        if(req.files && req.files.file){
            const uploadedFile = req.files.file;
            const filePath = path.join(uploadPath, uploadedFile.name);

            await uploadedFile.mv(filePath);

            fileName = uploadedFile.name;
        }
        else {
            if(req.body.url) {
                const url = req.body.url;
                fileName = await UploadUrl(url, uploadPath) ;
            }
            else {
                return res.status(400).json({ error: 'No file uploaded' });
            }
        }
        
        const imageManipulate = new ImageManipulate(fileName, req.session.user_hash);
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

module.exports = UploadImage;