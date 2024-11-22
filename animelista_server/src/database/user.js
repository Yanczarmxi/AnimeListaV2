const loadsql = require('./load');
const express = require('express');
const router = express.Router();

router.get('/set', async (req, res) => {
    try {
        const sql = 'SELECT user, data_registration, avatar FROM users WHERE id = 1';
        const result = await loadsql(sql);

        const user = result[0];
        const imgBlob = user.avatar;

        req.session.user_name = user.name;
        req.session.user_regdate = user.data_registration;
        req.session.user_avatar = imgBlob.ToString('Base64');

        res.send('Załadowanie danych powiodło się');
    }
    catch(e) {
        res.send(e);
        res.status(500);
    }
});

module.exports = router;