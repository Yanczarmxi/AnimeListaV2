const UpdateFavorite = require('./database/update_fav');

async function UpdateFavState(req) {
    const {id, episode, status} = req.body;

    var update = {
        anime: id,
        episode: episode ? episode : null,
        status: status ? status : null,
        user: req.session.user_id
    };

    return UpdateFavorite(update);
}

module.exports = UpdateFavState;