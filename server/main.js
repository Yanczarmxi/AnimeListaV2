const express = require('express');
require('dotenv').config();
const session = require('./src/session')
const cors = require('./src/cors');
const fileUpload = require('express-fileupload');
const userRoute = require('./src/UserRouting');
const animeRoute = require('./src/AnimeRouting');
const path = require('path');
const fs = require('fs');
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

app.use('/tempcontent', (req, res, next) => {
  if (!req.session || !req.session.user_hash) {
      return res.status(403).send('Unauthorized: No user hash available');
  }

  const uploadsPath = path.join(__dirname, 'upload');
  const userUploadsPath = path.join(uploadsPath, req.session.user_hash);
  
  // Sprawdź, czy katalog użytkownika istnieje
  if (!fs.existsSync(userUploadsPath)) {
      return res.status(404).send('Directory not found');
  }

  // Udostępnij katalog dynamicznie
  express.static(userUploadsPath)(req, res, next);
});

app.listen(process.env.EX_PORT, () => {
  console.log(`Serwer HTTP działa na http://localhost:${process.env.EX_PORT}`);
});