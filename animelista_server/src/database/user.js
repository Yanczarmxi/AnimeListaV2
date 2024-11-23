const db = require('./db');

async function GetUserData(id) {
    if(isNaN(id)) {
        return {mess: "ERROR: Przekazana liczba id nie jest liczbą całkowitą"}
    }

    try {
        const sql = `
        SELECT
            user,
            date_registration,
            avatar
        FROM users
        WHERE id = ?`;

        const [row] = await db.query(sql, [id]);

        if(row.length === 0) {
            return {mess: "ERROR: Nie znaleziono użytkownika w bazie danych"};
        }

        const avBlob = row[0].avatar 

        const user = {
            name: row[0].user,
            regdate: row[0].date_registation,
            avatar: avBlob ? avBlob.toString('base64') : null
        };

        return user;
    }
    catch(e) {
        console.error(e);
        return {mess: "ERROR: Invalid Server Error: " + e};
    }
}

module.exports = GetUserData;