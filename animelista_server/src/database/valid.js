const db = require('./db');
const bcrypt = require('bcrypt');

async function ValidLogin(user, password) {
    try {
        const sql_getuser = 'SELECT id, passwd FROM users WHERE user = ?';
        [validrow] = await db.query(sql_getuser, user);

        const l = false;

        bcrypt.compare(password, validrow[0].passwd, (e, r) => {
            if(e) {
                console.error(e);
                return false;
            }

            if(r) {
                logOn = true;
            }
            else {
                logOn = false;
            }
        });

        return {valid: logOn, id: validrow[0].id};
    }
    catch(e) {
        console.error(e);
        return {mess: "ERROR: Invalid Server Error: " + e};
    }
}

module.exports = ValidLogin;