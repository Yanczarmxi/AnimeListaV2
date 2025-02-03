const UserRepo = require('../database/UserRepository');

async function UpdateUserPreference(req, res) {
    try {
        if(!req.session.isLogged) {
            console.error(`ERROR: Użytkownik nie jest zalogowany!`);
            return res.status(401).json({
                mess: 'Nie udało się edytować nazwy grupy'
            });
        }

        const preference = req.body;
        const userId = req.session.user_id;
    
        req.session.user_preference = {...preference};
        await UserRepo.UpdatePreference(preference, userId);
    
        res.status(200).json({mess: 'Zaktualizowano'});
    }
    catch(e) {
        console.error(`ERROR: Nie udało się zaktualizować preferencji`);
        res.status(500).json({mess: 'Nie udało się zaktualizować preferencji'});
    }
}

module.exports = UpdateUserPreference;