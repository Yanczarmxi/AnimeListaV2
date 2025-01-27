const AnimeRepo = require('../database/AnimeRepository');
const GroupRepo = require('../database/GroupRepository');
const SegregatedRepo = require('../database/SegregatedRepository');

async function DeleteAnimeRecords(anime, user) {
    try {
        await AnimeRepo.Delete(anime, user);
    }
    catch(e) {
        console.error(`ERROR: Nie udało się skasować anime: ${e}`);
    }
}

async function DeleteGroupRecords(group, user) {
    try {
        await SegregatedRepo.DeleteByGroup(group, user);
        await GroupRepo.Delete(group, user);
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

        const group = req.body.group;
        const anime = req.body.anime;
        const userId = req.session.user_id;

        if(group.lenght > 0) {
            await DeleteGroupRecords(group, userId);
        }

        if(anime.lenght > 0) {
            await DeleteAnimeRecords(anime, userId);
        }
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