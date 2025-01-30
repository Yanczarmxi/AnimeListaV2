const GroupRepository = require('../database/GroupRepository');

async function AddGroupToRecord(req, res) {
    try {
        if(!req.session.isLogged) {
            console.error(`ERROR: Nowa grupa nie dodana. Użytkownik nie zalogowany`);
            return res.status(401).json({
                mess: 'Użytkownik nie zalogowany',
                complete: false
            });
        }

        const group = req.body.group;

        if(!group) {
            console.error(`ERROR: AddGroupToRecord: Zapyanie jest puste!`);
            return res.status(400).json({
                mess: 'Brak danych',
                complete: false
            });
        }

        const userId = req.session.user_id;

        await GroupRepository.Add(group, userId);

        res.status(200).json({
            mess: 'Record dodany',    
            complete: true
        });
    }
    catch(e) {
        console.error(`ERROR: Function AddGroupToRecord: ${e}`);
        res.status(500).json({
            mess: 'Błąd wewnętrzny',
            complete: false
        });
    }
}

module.exports = AddGroupToRecord;