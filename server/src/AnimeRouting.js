const express = require('express');
const router = express.Router();

//osobne pliki
const GetAnime = require('./anime/extraction');
const GetReadyDescription = require('./anime/descryption');
const UpdateState = require('./anime/state_update');
const { Update } = require('./database/AnimeRepository');

//Routing
router.get('/result', GetAnime); //Pobieranie anime
router.post('/description', GetReadyDescription); //Pobieranie opisu

router.post('/add', async (req, res) => {

});

router.post('/edit', async (req, res) => {

});

router.post('/delete', async (req, res) => {

});

router.post('/update', UpdateState);

module.exports = router;