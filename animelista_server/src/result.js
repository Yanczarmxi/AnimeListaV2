const GetRecords = require('./database/load');

function GetGroupsRecords(usrid) {
    const sql = "SELECT id, nazwa FROM anime_grupy WHERE user_id = " + usrid;
    return GetRecords(sql);
}

function GetAnimeRecords() {
    const sql = 'SELECT id, added, title, url, episodes FROM anm_animes';
    return GetRecords(sql);
}

module.exports = GetAnimeRecords;