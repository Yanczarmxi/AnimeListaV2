const loadsql = require('./database/load');
const express = require('express');
const router = express.Router();

router.get('/set', async (req, res) => {
    try {
        const sql = 'SELECT user, data_registration, avatar FROM users WHERE id = 1';
        const result = await loadsql(sql);

        if (result.length === 0) {
            return res.status(404).send('Użytkownik nie został znaleziony.');
        }

        const user = result[0];
        const imgBlob = user.avatar;

        req.session.user_name = user.user;
        req.session.user_regdate = user.data_registration;
        req.session.user_avatar = imgBlob ? imgBlob.toString('base64') : null;

        res.send('Załadowanie danych powiodło się');
    }
    catch(e) {
        console.error(e);
        res.status(500).send('Bład 500');
    }
});

router.get('/session', (req, res) => {
    res.json(req.session || {});
});

module.exports = router;