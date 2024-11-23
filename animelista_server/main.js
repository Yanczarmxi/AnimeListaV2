const express = require('express');
const session = require('express-session');
const cors = require('cors');
const config = require('./src/config');
const userRoute = require('./src/login');

const app = express();
const port = config['server']['port'];

app.use(express.json());

app.use(cors({
    origin: 'http://127.0.0.1:8080',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use((req, res, next) => {
  console.log(`Otrzymano żądanie: ${req.method} ${req.url}`);
  next();
});

app.use(session({
  secret: config['server']['key'],
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // Ustaw `true` dla HTTPS
    sameSite: 'lax', // Dla środowiska produkcyjnego ustaw 'none'
  }
}));

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})