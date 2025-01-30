//osobne pliki
const GetAnime = require('./GetAnimesSerialized');
const GetReadyDescription = require('./GetReadyDescription');
const UpdateState = require('./UpdateState');
const GetAnimeRecord = require('./GetAnimeRecord');

const AddGrouptoRecord = require('./AddGroupToRecord');
const EditGroupRecord = require('./EditGroupRecord');
const GetGroupList = require('./GetGroupList');

const AddAnimeToRecord = require('./AddAnimeToRecord');
const EditAnimeRecord = require('./EditAnimeRecord');

const DeleteRecords = require('./DeleteRecords');

module.exports = {
    GetAnime,
    GetReadyDescription,
    UpdateState,
    GetAnimeRecord,
    AddGrouptoRecord,
    EditGroupRecord,
    GetGroupList,
    AddAnimeToRecord,
    EditAnimeRecord,
    DeleteRecords
};