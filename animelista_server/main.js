const express = require('express');
const session = require('express-session');
const config = require('./src/config');
const userRoute = require('./src/database/user');

const app = express();
const port = config['server']['port'];

app.use(session({
  secret: config['server']['key'],
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.get('/', (req, res) => {
  //res.send('Hello World! ');
  if (!req.session.views) {
    req.session.views = 1;
  } else {
      req.session.views++;
  }
  res.send(`Odwiedziłeś tę stronę ${req.session.views} razy`);
})

app.get('/user', userRoute);

app.get('/anime', async (req, res) => {
  const r = await require('./src/database/anime');
  res.json(r);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})