const express = require('express');
const router = express.Router();

//Funkcje zarządzania użytkownikiem
const LoginProcess= require('./user/login');

router.post('/valid', LoginProcess);
router.get('/checksession', (req, res) => {
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

module.exports = router;