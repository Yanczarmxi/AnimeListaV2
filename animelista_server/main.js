const express = require('express');
const config = require('./src/config');

const app = express();
const port = config['server']['port'];

app.get('/', (req, res) => {
  res.send('Hello World! ');
})

app.get('/anime', async (req, res) => {
  const r = await require('./src/database/anime');
  res.json(r);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})