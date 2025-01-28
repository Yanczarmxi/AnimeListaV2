const fs = require('fs');
const path = require('path');

async function DeleteImage(req, res) {
    try {
        if(!req.session.isLogged) {
            console.error('DESCRYPTION ERROR: Urzytkownik nie jest zalogowany');
            return res.status(401).json(null);
        }

        if(req.body.id) {
            console.log('Ta funkcja narazie jest niedostępna!');
        }
        else {
            try {
                const userUploadPath =  path.join(__dirname, '../../upload', req.session.user_hash);
                console.log('Kasowanie katalogu: ' + userUploadPath);
                if(fs.existsSync(userUploadPath)) {
                    fs.rmSync(userUploadPath, { recursive: true });
                }
            }
            catch(e) {
                console.error(`Nie udało się skasować katalogu użytkownika upload: ${e}`);
            }
        }

        res.status(204);
    }
    catch(e) {
        console.error(`Nie udało się skasować obrazu! ERROR: ${e}`);
    }
}

module.exports = DeleteImage;