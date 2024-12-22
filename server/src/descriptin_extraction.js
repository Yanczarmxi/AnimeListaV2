const GetDescription = require('./database/description');

async function GetReadyDescription(id, user) {
    const des = await GetDescription({id: id, user: user});

    if(!des) {
        return null;
        exit;
    }
}