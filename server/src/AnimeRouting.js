const express = require('express');
const router = express.Router();

//osobne pliki
const GetAnime = require('./anime/GetAnimesSerialized');
const GetReadyDescription = require('./anime/GetReadyDescription');
const UpdateState = require('./anime/UpdateState');
const GetAnimeRecord = require('./anime/GetAnimeRecord');

const AddGrouptoRecord = require('./anime/AddGroupToRecord');
const EditGroupRecord = require('./anime/EditGroupRecord');
const GetGroupList = require('./anime/GetGroupList');

//Operacje
const AddAnimeToRecord = require('./anime/AddAnimeToRecord');
const EditAnimeRecord = require('./anime/EditAnimeRecord');

//img
const UploadImageFromFile = require('./image/UploadImgFile');
const DeleteImage = require('./image/DeleteImage');

//Routing
router.get('/result', GetAnime); //Pobieranie anime
router.post('/description', GetReadyDescription); //Pobieranie opisu

router.post('/add', AddAnimeToRecord); //Dodawanie nowego anime do bazy danych

//Edycja
router.post('/getrecord', GetAnimeRecord);
router.put('/edit', EditAnimeRecord);

//Dodawanie grupy
router.post('/add-group', AddGrouptoRecord);
router.put('/edit-group', EditGroupRecord);
router.get('/get-group-list', GetGroupList);

//Kasowanie rekordów
router.delete('/delete', async (req, res) => {

});

router.put('/update', UpdateState);

//Przesyłanie obrazu i czyszczenie rekordu obrazu
router.post('/addimg', UploadImageFromFile);
router.delete('/delimg', DeleteImage);

module.exports = router;