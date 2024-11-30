const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const cors = require('cors');
const config = require('./src/config');
const userRoute = require('./src/login');
const https = require('https');
const fs = require('fs');

const app = express();
const port = config['server']['port'];

const options = {
  key: fs.readFileSync('./ssl/server.key'),
  cert: fs.readFileSync('./ssl/server.cert')
};

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    //allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.options('*', (req, res) => {
  res.sendStatus(200);
});

app.use((req, res, next) => {
  console.log(`Otrzymano żądanie: ${req.method} ${req.url}`);
  next();
});

const dbOptions = {
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '123',
  database: 'animedb',
  createDatabaseTable: true // Automatyczne tworzenie tabeli
};

const sessionStore = new MySQLStore(dbOptions);

app.use(session({
  key: 'animu_lista_cookie_session', // Nazwa ciasteczka sesji
  secret: config['server']['key'], // Klucz tajny używany do podpisywania ciasteczek
  store: sessionStore, // Magazyn sesji
  resave: false, // Unikaj zapisywania sesji, jeśli nie zmieniły się dane
  saveUninitialized: false, // Nie zapisuj pustych sesji
  cookie: {
      maxAge: 30 * 60 * 1000, // Czas życia ciasteczka w ms (30 minut)
      secure: true, // Ustaw `true` dla HTTPS
      sameSite: 'none', // `lax` dla ochrony przed atakami CSRF
  },
  // Funkcje serializacji i deserializacji
  serialize: (session) => JSON.stringify(session), // Serializacja do JSON
  unserialize: (json) => JSON.parse(json)          // Deserializacja z JSON
}));

//app.use(session({
//  secret: config['server']['key'],
//  resave: false,
//  saveUninitialized: true,
//  cookie: {
//    secure: false, // Ustaw `true` dla HTTPS
//    sameSite: 'lax', // Dla środowiska produkcyjnego ustaw 'none'
//  }
//}));

app.get('/', (req, res) => {
  res.send(`
      Hi Mom!
    `);
})

app.use('/user', userRoute);

//app.get('/anime', async (req, res) => {
//  const r = await require('./src/database/anime');
//  res.json(r);
//})

//app.listen(port, () => {
//  console.log(`Example app listening on port ${port}`)
//})

https.createServer(options, app).listen(port, () => {
  console.log(`Serwer HTTPS działa na https://localhost:${port}`);
});