async function GroupsDataTable(){
    //const animes = await GetAnime();
    const GetGroups = require('./database/groups');

    const groups = await GetGroups(1);
    var data = [];

    console.log(groups);

    console.log(groups.length);
    
    for(var i=0; i < groups.length; i++){
        data.push({
            gid: groups[i].gr_id,
            gtitle: groups[i].gr_title,
            anime: []
        });
    }

    console.log(data);

    return data;
}

async function AnimeDataTable(params) {
    
}

module.exports = GroupsDataTable;