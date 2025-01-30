const userRepo = require('../database/UserRepository');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const crypto = require('crypto');

async function LoginProcess(req, res) {
    try {
        const {email, password, remember} = req.body;

        if(!validator.isEmail(email) && !password || typeof remember != 'boolean') {
            console.error('Process logowania: Nie prawidłowe dane logowania');
            return res.status(400).json({
                isLogged: false
            });
        }

        const valid = await userRepo.Valid(email, password);
        if(!valid) {
            console.error('Process logowania: Nie prawidłowe dane logowania');
            return res.status(401).json({
                isLogged: false
            });
        }

        const userData = await userRepo.GetForEmail(email);

        if(!userData) {
            console.error('Process logowania: Błąd pobierania danych');
            return res.status(500).json({ isLogged: false });
        }

        if (!process.env.EX_KEY) {
            console.error('Process logowania: Brak klucza JWT');
            return res.status(500).json({ isLogged: false });
        }
        
        const token = jwt.sign(
                    {id: userData.id, email: email},
                    process.env.EX_KEY,
                    { expiresIn: '1h' }
                );
  
        req.session.isLogged = true;
        req.session.user_id = userData.id;
        req.session.user_name = userData.name;
        req.session.user_regdate = userData.regdate;
        req.session.user_avatar =  userData.avatar;
        req.session.user_hash = crypto.createHash('sha256').update(
            userData.name + userData.id + userData.regdate).digest('hex');

        const data = {
            isLogged: req.session.isLogged,
            token: token,
            user: req.session.user_name,
            regdate: req.session.user_regdate,
            avatar: req.session.user_avatar
        };

        res.status(200).json(data);
    }
    catch(e) {
        console.error('Process logowania TRY FALSE:\n' + e);
        res.status(500).json({isLogged: false});
    }
}

module.exports = LoginProcess;