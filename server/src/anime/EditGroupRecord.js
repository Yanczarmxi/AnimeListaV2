const GroupRepository = require('../database/GroupRepository');7

async function EditGroupRecord(req, res) {
    try {
        if(!req.session.isLogged) {
            console.error(`ERROR: Użytkownik nie jest zalogowany!`);
            return res.status(401).json({
                mess: 'Nie udało się edytować nazwy grupy',
                complete: false
            });
        }

        const grTitle = req.body.title;
        const grId = req.body.gid;

        await GroupRepository.Edit(grId, grTitle);

        res.status(200).json({
            mess: 'Nazwa grupy edytowana',
            complete: true
        });
    }
    catch(e) {
        console.error(`ERROR: Nie udało sie edytować grupy: ${e}`);
        res.status(500).json({
            mess: 'Nie udało się edytować nazwy grupy',
            complete: false
        });
    }
}

module.exports = EditGroupRecord;