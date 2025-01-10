const multer = require('multer');

const StorageFile = require('../multer');

async function UploadImage(req, res, next) {
    try {
        const uploadFile = multer({storage: StorageFile(req.session.user_hash)});

        uploadFile(req, res, (err) => {
            if(err) {
                console.error(`ERROR UPLOAD FILE: \n ${err}`);
                return res.status(500);
            }

            console.log(req.file.path);
            res.status(200).json({img_path: req.file.path});
        });
    }
    catch(e) {
        console.error(`ERROR UPLOAD FILE: \n ${e}`);
        res.status(500);
    }

}

module.exports = UploadImage;