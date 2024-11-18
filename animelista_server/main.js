const express = require('express');
const config = require('./src/config');
const db = require('./src/database/db');

const app = express();
const port = config['server']['port'];

app.get('/', (req, res) => {
  res.send('Hello World! ');
})

app.get('/anime', async (req, res) => {
  try {
    const [rows, fields] = await db.query(
        'SELECT * FROM anime_grupy'
    );

    res.json(rows);
  }
  catch {
      console.log("error");
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})