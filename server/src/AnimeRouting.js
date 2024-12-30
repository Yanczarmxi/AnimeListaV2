const express = require('express');
const router = express.Router();

//osobne pliki
const GetAnime = require('./anime/extraction');
const GetReadyDescription = require('./anime/descryption');
const UpdateState = require('./anime/UpdateState');

//Routing
router.get('/result', GetAnime); //Pobieranie anime
router.post('/description', GetReadyDescription); //Pobieranie opisu

router.post('/add', async (req, res) => {

});

router.put('/edit', async (req, res) => {

});

router.delete('/delete', async (req, res) => {

});

router.put('/update', UpdateState);

module.exports = router;