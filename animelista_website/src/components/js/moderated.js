window.glbAnimeCheckIndex = [1,2,3];
window.glbSeparatorIndex = [];

console.log(window.glbAnimeCheckIndex);

//Indexowanie anime
window.AddAnimeIdToIndex = function(id) {
    window.glbAnimeCheckIndex.push(id);
}

window.DeleteAnimeIdFromIndex = function(id) {
    var tmp;

    for(var i; i<window.glbAnimeCheckIndex.length; i++) {
        if(window.glbAnimeCheckIndex[i] == id) {
            tmp = i;
            break;
        }
    }

    window.glbAnimeCheckIndex.splice(tmp, 1);
}