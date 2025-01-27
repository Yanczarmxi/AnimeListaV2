const GroupRepository = require('../database/GroupRepository');

async function GetGroupList(req, res) {
    try {
        if(!req.session.isLogged) {
            console.error(`ERROR: Użytkownik nie jest zalogowany!`);
            return res.status(401).json({
                mess: 'Nie jesteś zalogowany',
                complete: false
            });
        }

        const userId = req.session.user_id;
        const result = await GroupRepository.Get(userId);

        res.status(200).json(result);

    }
    catch(e) {
        console.error(`ERROR: Nie udało się pobrać listy grup: ${e}`);
        res.status(500).json({
            mess: 'Nie udało się pobrac listy grup',
            complete: false
        });
    }
}

module.exports = GetGroupList;