const express = require('express');
require('dotenv').config();
const session = require('./src/session')
const cors = require('./src/cors');
const userRoute = require('./src/login');
const animeRoute = require('./src/sites');
const app = express();

app.use(express.json());

app.use(cors);

app.use((req, res, next) => {
  console.log(`Otrzymano żądanie: ${req.method} ${req.url}`);
  next();
});

app.use(session);

app.get('/', (req, res) => {
  res.send(`
      Hi Mom!
    `);
})

app.use('/user', userRoute);
app.use('/anime', animeRoute);

app.listen(process.env.EX_PORT, () => {
  console.log(`Serwer HTTP działa na http://localhost:${process.env.EX_PORT}`);
});