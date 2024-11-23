const db = require('./db');
const bcrypt = require('bcrypt');

async function ValidLogin(email, password) {
    try {
        const sql_getuser = 'SELECT id, passwd FROM users WHERE email = ?';
        const [validrow] = await db.query(sql_getuser, [email]);

        var logOn = false;
        var userId = null;

        bcrypt.compare(password, validrow[0].passwd, (e, r) => {
            if(e) {
                console.error(e);
                return {valid: false, id: null, mess: "ERROR (valid #1): Invalid Server Error: " + e};
            }

            if(r) {
                logOn = true;
                userId = validrow[0].id;
            }
            else {
                logOn = false;
            }
        });

        return {valid: logOn, id: userId, mess: "Great cuscess"};
    }
    catch(e) {
        console.error(e);
        return {valid: false, id: null, mess: "ERROR (valid #2): Invalid Server Error: " + e};
    }
}

module.exports = ValidLogin;