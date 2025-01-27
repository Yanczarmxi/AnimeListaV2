const express = require('express');
const router = express.Router();

//Funkcje zarządzania użytkownikiem
const LoginProcess = require('./user/LoginProcess');
const UserCheckSession = require('./user/UserCheckSession');

//preferencje
const UpdateUserPreference = require('./user/UpdateUserPreference');

router.post('/valid', LoginProcess);
router.get('/checksession', UserCheckSession);

router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
          console.error(err);
          return res.status(500).send({ success: false, message: 'Wylogowanie nie powiodło się.' });
        }
        res.clearCookie('connect.sid'); // Usunięcie ciasteczka sesji
        res.send({ success: true, message: 'Wylogowano pomyślnie.' });
    });
});

router.put('/preferencess', UpdateUserPreference);

module.exports = router;