const express = require('express');
const session = require('express-session');
const config = require('./src/config');
const userRoute = require('./src/user_test');

const app = express();
const port = config['server']['port'];

app.use(session({
  secret: config['server']['key'],
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.get('/', (req, res) => {
  res.send(`
      <!DOCTYPE html>
        <html>
        <head>
            <title>Express HTML</title>
        </head>
        <body>
            <form action="/user/set" method-"POST">
            <label for="fname">First name:</label><br>
            <input type="text" id="fname" name="fname" value="John"><br>
            <label for="lname">Last name:</label><br>
            <input type="text" id="lname" name="lname" value="Doe"><br><br>
            <input type="submit" value="Submit">
          </form> 
        </body>
        </html>
    `);
})

app.use('/user', userRoute);

app.get('/anime', async (req, res) => {
  const r = await require('./src/database/anime');
  res.json(r);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})