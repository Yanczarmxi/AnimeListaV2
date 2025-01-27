const express = require('express');
const router = express.Router();
const anime = require('./anime');
const image = require('./image');

//Routing
router.get('/result', anime.GetAnime); //Pobieranie anime
router.post('/description', anime.GetReadyDescription); //Pobieranie opisu

router.post('/add', anime.AddAnimeToRecord); //Dodawanie nowego anime do bazy danych

//Edycja
router.post('/getrecord', anime.GetAnimeRecord);
router.put('/edit', anime.EditAnimeRecord);

//Dodawanie grupy
router.post('/add-group', anime.AddGrouptoRecord);
router.put('/edit-group', anime.EditGroupRecord);
router.get('/get-group-list', anime.GetGroupList);

//Kasowanie rekordów
//router.delete('/delete', async (req, res) => {
//
//});

router.put('/update', anime.UpdateState);

//Przesyłanie obrazu i czyszczenie rekordu obrazu
router.post('/addimg', image.UploadImageFromFile);
router.delete('/delimg', image.DeleteImage);

module.exports = router;