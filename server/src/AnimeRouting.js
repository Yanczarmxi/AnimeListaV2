const express = require('express');
const router = express.Router();

//osobne pliki
const GetAnime = require('./extraction');
const GetReadyDescription = require('./descriptin_extraction');

//Routing
router.get('/result', GetAnime); //Pobieranie anime
router.post('/description', GetReadyDescription); //Pobieranie opisu

router.post('/add', async (req, res) => {

});

router.post('/edit', async (req, res) => {

});

router.post('/delete', async (req, res) => {

});

router.post('/update', async (req, res) => {
  if(req.session.isLogged){
    const UpdateFavState = await require('./state_update');
    res.status(200).json(await UpdateFavState(req));
  }
  else{
    res.json({mess: 'Brak zalogowanej sessji użytkownika'});
  }
});

module.exports = router;