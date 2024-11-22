const db = require('./db');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

async function ValidLogin(user, password) {
    try {
        const sql_getuser = 'SELECT passwd FROM users WHERE user = ?';
        [validrow] = await db.query(sql_getuser, user);

        bcrypt.compare(password, validrow[0].passwd, (e, r) => {
            if(e) {
                console.error(e);
                return false;
            }

            if(r) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    catch(e) {
        console.error(e);
    }
}

module.exports = ValidLogin;