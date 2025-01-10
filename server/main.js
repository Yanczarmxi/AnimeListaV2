const express = require('express');
require('dotenv').config();
const session = require('./src/session')
const cors = require('./src/cors');
const fileUpload = require('express-fileupload');
const userRoute = require('./src/UserRouting');
const animeRoute = require('./src/AnimeRouting');
const app = express();

app.use(express.json());
app.use(cors);
app.use(fileUpload());

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