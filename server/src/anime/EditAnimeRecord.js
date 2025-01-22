const fs = require('fs');
const patch = require('path');

async function EditAnimeRecord(req, res) {
    try {
        if(!req.session.isLogged) {
            console.error('ERROR: Edit anime record request. Użytkownik nie jest zalogowany');
            return res.status(401).json({
                mess: 'Użytkownik nie jest zalogowany',
                complete: false
            });
        }

        const updateData = req.body;

        res.status(200).json({
            mess: 'Rekord został zaktualizowany',
            complete: true
        });
    }
    catch(e) {
        console.error(`ERROR: Nie udało się zaktualizować recordu: ${e}`);
        res.status(500).json({
            mess: 'Nie udało się zaktualizować rekordu',
            complete: false
        });
    }
}

module.exports = EditAnimeRecord;