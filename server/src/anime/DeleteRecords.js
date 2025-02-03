const AnimeRepo = require('../database/AnimeRepository');
const GroupRepo = require('../database/GroupRepository');
const SegregatedRepo = require('../database/SegregatedRepository');
const FavoritesRepo = require('../database/FavoritesRepository');

async function DeleteAnimeRecords(anime, user) {
    try {
        const result = await AnimeRepo.Delete(anime, user);
        if(result > 0) {
            await FavoritesRepo.Delete(anime, user);
            await SegregatedRepo.DeleteByAnime(anime, user);
        }
    }
    catch(e) {
        console.error(`ERROR: Nie udało się skasować anime: ${e}`);
    }
}

async function DeleteGroupRecords(group, user) {
    try {
        const result = await GroupRepo.Delete(group, user);
        if(result > 0) {
            await SegregatedRepo.DeleteByGroup(group, user);
        }
    }
    catch(e) {
        console.error(`ERROR: Nie udało się skasować grupy: ${e}`);
    }
}

async function DeleteRecords(req, res) {
    try {
        if(!req.session.isLogged) {
            console.error('DESCRYPTION ERROR: Urzytkownik nie jest zalogowany');
            return res.status(401).json({
                mess: 'Użytkownik nie jest zalogowany',
                complete: false
            });
        }

        const group = req.query.group;
        const anime = req.query.anime;
        const userId = req.session.user_id;

        if(group) {
            await DeleteGroupRecords(group, userId);
        }

        if(anime) {
            await DeleteAnimeRecords(anime, userId);
        }

        res.status(200).json({mess: 'Pomyślnie skasowano rekordy', complete: true});
    }
    catch(e) {
        console.error(`ERROR: Nie udało się skasować anime: ${e}`);
        res.status(500).json({
            mess: 'Nie udało się wykoniac operacji kasowania',
            complete: false
        });
    }
}

module.exports = DeleteRecords;