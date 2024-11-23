const express = require('express');
const router = express.Router();
const ValidLogin = require('./database/valid');
const GetUserData = require('./database/user');
const cors = require('cors');

router.options('/valid', cors());

router.post('/valid', cors(), async (req, res) => {
    try {
        const {email, password, remember} = req.body;

        if(!email && !password && !remember) {
            return res.status(400).send('Żądanie jest puste');
        }

        const validData = await ValidLogin(email, password);

        if(!validData.valid) {
            return res.status(401).json({ message: 'Nieprawidłowe dane logowania' });
        }

        const userData = await GetUserData(validData.id);
        req.session.isLogged = validData.valid;
        req.session.user_id = validData.id;
        req.session.user_name = userData.name;
        req.session.user_regdate = userData.regdate;
        req.session.user_avatar = userData.avatar;

        res.status(200).json({ 
            mess: 'Zalogowano pomyślnie', 
            isLogged: req.session.isLogged, 
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

router.post('/checkLogged', cors(), (req, res) => {
    try {
        res.status(200).json({ 
            mess: 'Zalogowano pomyślnie', 
            isLogged: req.session.isLogged, 
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
module.exports = router;


/*
- Znajdź urzytkownika w bazie danych na podstawie nickname
- Jak występuje pobierz hash passwod
- Sprawdź podane hasło z hashem
- Potwierdzenie zgodności wydaje trigger przenoszący do dashboard
- Negawywne odrzuca zwracając komunikat o błędzie
*/