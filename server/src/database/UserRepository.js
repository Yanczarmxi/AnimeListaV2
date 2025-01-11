const db = require('./DataBaseConnection');
const bcrypt = require('bcryptjs');

class UserRepository {
    constructor() {
        this.db = db.getConnection();
    }

    //Test poprawności podanych danych logowania
    async Valid(email, password) {
        const sql = `SELECT passwd FROM users WHERE email = ?`;
        const [rows] = await this.db.query(sql, [email]);

        if (rows.affectedRows === 0) {
            console.log("Nie znaleziono użytkowanika: " + email);
            return false;
        }

        return await bcrypt.compare(password, rows[0].passwd);
    }
    catch(e) {
        console.error('Validacja użytkownika:\n' + e);
        return false;
    }

    //Pobieranie danych użytkowanika na podstawie adresu email
    async GetForEmail(email) {
        try {
            const sql = `SELECT id, user, date_registration, avatar FROM users WHERE email = ?`;
            const [rows] = await this.db.query(sql, [email]);

            if(rows.affectedRows === 0) {
                console.error('Nie udało się pobrać danych użytkownika :c');
                return null;
            }

            const avBlob = rows[0].avatar 

            const user = {
                id: rows[0].id,
                name: rows[0].user,
                regdate: rows[0].date_registation,
                avatar: avBlob ? avBlob.toString('base64') : null
            }

            return user;
        }
        catch(e) {
            console.error('Pobieranie danych użytkownika:\n' + e);
            return null;
        }
    }
}

module.exports = new UserRepository();