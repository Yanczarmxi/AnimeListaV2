const loadsql = require('./load');

const sql = 'SELECT id, user, data_registration, avatar FROM users';
const result = loadsql(sql);

module.exports = result;


/*
- Znajdź urzytkownika w bazie danych na podstawie nickname
- Jak występuje pobierz hash passwod
- Sprawdź podane hasło z hashem
- Potwierdzenie zgodności wydaje trigger przenoszący do dashboard
- Negawywne odrzuca zwracając komunikat o błędzie
*/