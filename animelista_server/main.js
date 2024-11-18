const express = require('express');
const config = require('./src/config');
const result = require('./src/result');

const app = express();
const port = config['server']['port'];

app.get('/', (req, res) => {
  res.send('Hello World! ');
})

app.get('/anime', async (req, res) => {
  await res.json(result);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})