const express = require('express');
const router = express.Router();
const ValidLogin = require('./database/valid');
const GetUserData = require('./database/user');
const jwt = require('jsonwebtoken');
const config = require('./config');

router.post('/valid', async (req, res) => {
    try {
        const {email, password, remember} = req.body;

        console.log(email + ' - ' + password + ' - ' + remember);

        if(!email && !password && !remember) {
            return res.status(200).json({
                mess: 'Żądanie jest puste',
                isLogged: false
            });
        }

        const validData = await ValidLogin(email, password);

        if(!validData.valid) {
            return res.status(200).json({
                mess: 'Nieprawidłowe dane logowania',
                isLogged: false
            });
        }

        const userData = await GetUserData(validData.id);

        const token = jwt.sign(
            {id: validData.id, email: email},
            config['server']['key'],
            { expiresIn: '1h' }
        );

        req.session.isLogged = validData.valid;
        req.session.user_id = validData.id;
        req.session.user_name = userData.name;
        req.session.user_regdate = userData.regdate;
        req.session.user_avatar =  userData.avatar;

        res.status(200).json({ 
            mess: 'Zalogowano pomyślnie', 
            isLogged: req.session.isLogged,
            token: token, 
            user: req.session.user_name,
            regdate: req.session.user_regdate,
            avatar: req.session.user_avatar
        });
    }
    catch(e) {
        console.error(e);
        res.status(500).send({mess: 'Błąd 500: Błąd wewnętrzny', isLogged: false});
    }
});

router.get('/checkActivSession', (req, res) => {
    try {
        res.status(200).json({ 
            mess: 'Pobrano dane użytkownika', 
            isLogged: req.session.isLogged ? req.session.isLogged : false, 
            user: req.session.user_name ? req.session.user_name : null,
            regdate: req.session.user_regdate ? req.session.user_regdate : null,
            avatar: req.session.user_avatar ? req.session.user_avatar : null
        });

        console.log(req.session.isLogged);
    }

    catch(e) {
        console.error(e);
        res.status(200).json({mess: 'Brak aktywnej sessji', isLogged: false});
    }
});
module.exports = router;


/*
- Znajdź urzytkownika w bazie danych na podstawie nickname
- Jak występuje pobierz hash passwod
- Sprawdź podane hasło z hashem
- Potwierdzenie zgodności wydaje trigger przenoszący do dashboard
- Negawywne odrzuca zwracając komunikat o błędzie
*/