const express = require('express');
const router = express.Router();
const anime = require('./anime');
const imm = require('./image');

//Routing
//Pobieranie anime
router.get('/result', anime.GetAnime);

//Pobieranie opisu
router.post('/description', anime.GetReadyDescription);

//Dodawanie nowego anime do bazy danych
router.post('/add', anime.AddAnimeToRecord);

//Edycja
router.post('/getrecord', anime.GetAnimeRecord);
router.put('/edit', anime.EditAnimeRecord);

//Dodawanie grupy
router.post('/add-group', anime.AddGrouptoRecord);
router.put('/edit-group', anime.EditGroupRecord);
router.get('/get-group-list', anime.GetGroupList);

//Kasowanie rekordów
router.delete('/delete', anime.DeleteRecords);

router.put('/update', anime.UpdateState);

//Przesyłanie obrazu i czyszczenie rekordu obrazu
router.post('/addimg', imm.UploadImageFromFile);
router.delete('/delimg', imm.DeleteImage);

module.exports = router;