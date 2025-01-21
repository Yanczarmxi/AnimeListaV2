const express = require('express');
const router = express.Router();

//osobne pliki
const GetAnime = require('./anime/GetAnimesSerialized');
const GetReadyDescription = require('./anime/GetReadyDescription');
const UpdateState = require('./anime/UpdateState');
const GetAnimeRecord = require('./anime/GetAnimeRecord');

//Operacje
const AddAnimeToRecord = require('./anime/AddAnimeToRecord');

//img
const UploadImageFromFile = require('./image/UploadImgFile');
const DeleteImage = require('./image/DeleteImage');

//Routing
router.get('/result', GetAnime); //Pobieranie anime
router.post('/description', GetReadyDescription); //Pobieranie opisu

router.post('/add', AddAnimeToRecord); //Dodawanie nowego anime do bazy danych

router.get('/getrecord', GetAnimeRecord);
router.put('/edit', async (req, res) => {

});

router.delete('/delete', async (req, res) => {

});

router.put('/update', UpdateState);

//Przesyłanie obrazu i czyszczenie rekordu obrazu
router.post('/addimg', UploadImageFromFile);
router.delete('/delimg', DeleteImage);

module.exports = router;