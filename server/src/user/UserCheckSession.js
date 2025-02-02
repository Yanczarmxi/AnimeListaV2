function UserCheckSession(req, res) {
    try {
        if(!req.session.isLogged) {
            return res.status(401).json({
                mess: 'Brak zalogowanej sessji użytkownika',
                isLogged: false,
                user: null,
                regdate: null,
                avatar: null
            });
        }

        res.status(200).json({ 
            mess: 'Pobrano dane użytkownika', 
            isLogged: req.session.isLogged, 
            user: req.session.user_name,
            regdate: req.session.user_regdate,
            preference: req.session.user_preference,
            avatar: req.session.user_avatar ? req.session.user_avatar : null
        });

        console.log(req.session.isLogged);
    }

    catch(e) {
        console.error(e);
        res.status(500).json({mess: 'Brak aktywnej sessji', isLogged: false});
    }
}

module.exports = UserCheckSession;