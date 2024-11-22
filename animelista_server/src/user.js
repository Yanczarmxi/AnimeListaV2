const loadsql = require('./database/load');
const express = require('express');
const router = express.Router();

router.post('/valid', async (req, res) => {
    try {
        const {login} = req.body;

        if(!login) {
            return res.status(400).send('Żądanie jest puste');
        }

        res.send(login);
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