const express = require('express');
const session = require('./src/session')
const cors = require('./src/cors');
const config = require('./src/config');
const userRoute = require('./src/login');
const animeRoute = require('./src/sites');
const app = express();
const port = config['server']['port'];

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

app.listen(port, () => {
  console.log(`Serwer HTTP działa na http://localhost:${port}`);
});