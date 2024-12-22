const express = require('express');
const router = express.Router();

router.get('/result', async (req, res) => {
    if(req.session.isLogged){
      const r = await require('./extraction');
      res.status(200).json(await r(req));
    }
    else{
      res.json({mess: 'Brak zalogowanej sessji użytkownika'});
    }
});

router.post('/description', async (req, res) => {
  if(req.session.isLogged){
    const GetReadyDescription = await require('./descriptin_extraction');
    res.status(200).json(await GetReadyDescription(req));
  }
  else{
    res.json({mess: 'Brak zalogowanej sessji użytkownika'});
  }
});

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