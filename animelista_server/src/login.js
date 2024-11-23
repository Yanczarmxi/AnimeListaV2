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

        res.json(validData);

        //if(!validData['valid']) {
        //    return res.status(401).json({ message: 'Nieprawidłowe dane logowania' });
        //}

        //const userData = GetUserData(validData['id']);
        //req.session.user_name = userData['name'];
        //req.session.user_regdate = userData['regdate'];
        //req.session.user_avatar = userData['avatar'];

        //res.send({
        //    valid: validData['valid'],
        //    user: userData['name'],
        //    regdate: userData['regdate'],
        //    avata: userData['avatar']
        //});

        //res.status(200).json({ message: 'Zalogowano pomyślnie', user: userData });
    }
    catch(e) {
        console.error(e);
        res.status(500).send('Bład 500');
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