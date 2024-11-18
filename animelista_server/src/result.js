const GetRecords = require('./database/load');

function GetGroupsRecords(usrid) {
    const sql = "SELECT id, nazwa FROM anime_grupy WHERE user_id = " + usrid;
    return GetRecords(sql);
}

function GetAnimeRecords(usrid) {
    const sql = "SELECT " + usrid;
    return GetRecords(sql);
}