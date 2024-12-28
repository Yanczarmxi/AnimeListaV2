const faviriteRepo = require('./database/FavoritesRepository');

async function UpdateFavState(req) {
    const {id, episode, status} = req.body;

    console.log('STATE: ' + status);

    if(isNaN(id) && isNaN(episode) && isNaN(status)) {
        console.error('Dane nie są liczbami \n ' + id + '\n' + episode + '\n' + status);
        return false;
    }

    var anm = id;
    var ep = episode !== undefined ? episode : null;
    var st = status !== undefined ? status : null;

    console.log('ST: ' + st);

    var update = await faviriteRepo.Set(ep, st, anm, req.session.user_id);
    return update;
}

module.exports = UpdateFavState;