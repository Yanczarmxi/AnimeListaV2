const userRepo = require('../database/UserRepository');
const jwt = require('jsonwebtoken');
const validator = require('validator');

async function LoginProcess(req, res) {
    try {
        const {email, password, remember} = req.body;

        if(validator.isEmail(email) && !password || typeof remember != 'boolean') {
            console.error('Process logowania: Nie prawidłowe dane logowania');
            return res.status(400).json({
                isLogged: false
            });
        }

        const valid = await userRepo.Valid(emailClean, passwordClean);
        if(!valid) {
            console.error('Process logowania: Nie prawidłowe dane logowania');
            return res.status(401).json({
                isLogged: false
            });
        }

        const userData = await userRepo.GetForEmail(emailClean);

        if (!process.env.EX_KEY) {
            console.error('Process logowania: Brak klucza JWT');
            return res.status(500).json({ isLogged: false });
        }

        const token = jwt.sign(
                    {id: validData.id, email: emailClean},
                    process.env.EX_KEY,
                    { expiresIn: '1h' }
                );

        req.session.isLogged = true;
        req.session.user_id = userData.id;
        req.session.user_name = userData.name;
        req.session.user_regdate = userData.regdate;
        req.session.user_avatar =  userData.avatar;

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