const express = require('express');
const router = express.Router();
const user = require('./user');

router.post('/valid', user.LoginProcess);
router.get('/checksession', user.UserCheckSession);

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

router.put('/preferencess', user.UpdateUserPreference);

module.exports = router;