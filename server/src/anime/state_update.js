const faviriteRepo = require('../database/FavoritesRepository');

async function UpdateFavState(req, res) {
    if(!req.session.isLogged) {
        console.error('UPDATE STATUS ERROR: Użytkowanik nie jest zalogowany');
        res.status(401).json({mess: 'Access Deniet'});
    }

    const {id, episode, status} = req.body;

    if(isNaN(id) && isNaN(episode) && isNaN(status)) {
        console.error('Dane nie są liczbami \n ' + id + '\n' + episode + '\n' + status);
        return res.status(400).json({mess: 'Niepoprawne dane'});
    }

    var anm = id;
    var ep = episode !== undefined ? episode : null;
    var st = status !== undefined ? status : null;

    var update = await faviriteRepo.Set(ep, st, anm, req.session.user_id);
    res.status(200).json({mess: 'State update'});
}

module.exports = UpdateFavState;