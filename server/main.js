const express = require('express');
const session = require('./src/session')
const cors = require('./src/cors');
const config = require('./src/config');
const userRoute = require('./src/login');

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

app.get('/anime', async (req, res) => {
  if(req.session.isLogged){
    const r = await require('./src/extraction');
    res.json(await r(req));
  }
  else{
    res.json({mess: 'Brak zalogowanej sessji użytkownika'});
  }
})

//app.listen(port, () => {
//  console.log(`Example app listening on port ${port}`)
//})

app.listen(port, () => {
  console.log(`Serwer HTTP działa na http://localhost:${port}`);
});