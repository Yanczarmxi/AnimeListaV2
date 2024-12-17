const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const dbOptions = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    createDatabaseTable: true // Automatyczne tworzenie tabeli
};

module.exports = session({
    key: 'animu_lista_cookie_session', // Nazwa ciasteczka sesji
    secret: process.env.EX_KEY, // Klucz tajny używany do podpisywania ciasteczek
    store: new MySQLStore(dbOptions), // Magazyn sesji
    resave: false, // Unikaj zapisywania sesji, jeśli nie zmieniły się dane
    saveUninitialized: false, // Nie zapisuj pustych sesji
    cookie: {
        maxAge: 30 * 60 * 1000, // Czas życia ciasteczka w ms (30 minut)
        secure: false, // Ustaw `true` dla HTTPS
        sameSite: 'lax', // `lax` dla ochrony przed atakami CSRF
    },
    // Funkcje serializacji i deserializacji
    serialize: (session) => JSON.stringify(session), // Serializacja do JSON
    unserialize: (json) => JSON.parse(json)          // Deserializacja z JSON
  })