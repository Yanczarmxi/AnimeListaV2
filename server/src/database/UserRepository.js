const db = require('./db2');
const bcrypt = require('bcryptjs');

class UserRepository {
    constructor() {
        this.db = db.getConnection();
        this.bcrypt = bcrypt;
    }

    //Test poprawności podanych danych logowania
    async Valid(email, password) {
        const sql = `SELECT passwd FROM users WHERE email = ?`;
        const [rows] = await this.db.query(sql, [emails]);

        if (rows.affectedRows === 0) {
            console.log("Nie znaleziono użytkowanika: " + email);
            return false;
        }

        return await this.bcrypt.compare(password, rows[0].passwd);
    }
    catch(e) {
        console.error('Validacja użytkownika:\n' + e);
        return false;
    }

    //Pobieranie danych użytkowanika na podstawie adresu email
    async GetForEmail(email) {
        try {
            const sql = `SELECT id, user, date_registration, avater FROM users WHERE email = ?`;
            const [rows] = await this.db.query(sql, [email]);

            if(rows.affectedRows === 0) {
                console.error('Nie udało się pobrać danych użytkownika :c');
                return null;
            }

            return rows[0];
        }
        catch(e) {
            console.error('Pobieranie danych użytkownika:\n' + e);
            return null;
        }
    }
}

module.exports = new UserRepository();