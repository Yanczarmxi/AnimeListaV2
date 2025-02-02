import { defineStore } from 'pinia';
import axios from 'axios';

export const useAnimeStore = defineStore('Anime', {
    state: () => ({
        search: {},
        group_storage: [],
        animes_storage: [],
        isLoaded: false,

        filter: -2,

        //adres do validacji
        serverUrl: `${process.env.VUE_APP_SERVER}`
    }),

    actions: {
        async GetAnime(filter){
            try{
                this.filter = filter;
                const response = await axios.get('/anime/result', {withCredentials: true});

                this.animes_storage = response.data.animes;
                this.group_storage = response.data.groups;


                this.isLoaded = true;

                return {
                    isLoaded: this.isLoaded,
                    anime: this.SerializedData(this.group_storage, this.animes_storage),
                    search: this.search,
                    group: this.group_storage         
                };
            }
            catch(e){
                console.error('Nie udało się pobrać danych');
                return {
                    isLoaded: false,
                    mess: 'Nie udało się pobrać animu :c'
                };
            }
        },

        //Grupuje i filtruje dane
        SerializedData(group, anime) {
            let tmp_group = [...group];
            tmp_group.push({
                gr_id: 0,
                gr_title: 'Pozostałe',
            });

            let tmp = [];
            let data = [];

            tmp_group.forEach(gelm => {
                anime.forEach(aelm => {
                    if(this.filter > -1){
                        if(gelm.gr_id == aelm.group && aelm.fav.status == this.filter) {
                            tmp.push(aelm);
                        }
                    }
                    else {
                        if(gelm.gr_id == aelm.group) {
                            tmp.push(aelm);
                        }
                    }
                });

                if(this.filter > -2) {
                    if(tmp.length > 0) {
                        data.push({
                            gid: gelm.gr_id,
                            gtitle: gelm.gr_title,
                            anime: tmp
                        });
                    }
                }
                else {
                    data.push({
                        gid: gelm.gr_id,
                        gtitle: gelm.gr_title,
                        anime: tmp
                    });
                }
                
                tmp = []; //Czyszczenie
            });
            
            return data;
        },

        GetFilteringData(filter) {
            this.filter = filter;
            return this.SerializedData(this.group_storage, this.animes_storage);
        },

        //Pobranie opisu

        async GetDescription(id){
            try {
                console.log('fn pinia id: ' + id)
                const response = await axios.post('/anime/description', {anime_id: id}, 
                    {withCredentials: true, 
                    headers: {
                    'Content-Type': 'application/json'},
                });
                return response.data;
            }
            catch(e){
                console.error('ERROR GET DESCRIPTION: ' + e);
                return null;
            }
        },

        //Aktualizajcja Rekordów
        async UpdateRecord(data){
            console.log('Update Record');
            try {
                if(await axios.put('/anime/update', data, {withCredentials: true})) {
                    console.log("Zaktualizowano Status");
                }
                else {
                    console.error("Nie udało się zaktualizować statusu");
                }
            }
            catch(e){
                console.error('ERROR UPDATE: ' + e);
            }
            
        },

        //Przesyłanie grafiki na server
        async UploadImage(data) {
            try {
                const response = await axios.post('/anime/addimg', data, {withCredentials: true});
                if(!response) {
                    return null;
                }
                return {url: response.data.url, status: response.status};
            }
            catch(e) {
                console.error('ERROR IMAGE UPLOAD: ' + e);
                return null;
            }
        },

        //Kasowanie przesłanej grafiki
        async DeleteImage(data) {
            try {
                await axios.delete('/anime/delimg', data, {withCredentials: true});
            }
            catch (e) {
                console.error(`Nie udało się skasować grafiki: ${e}`);
            }
        },

        //Dodawanie rekordu
        async AddAnimeToDataBase(data) {
            try {
                const respornse = await axios.post('/anime/add', data, {withCredentials: true});

                return respornse.data;
            }
            catch(e) {
                console.error(`Nie udało się wykodać operazji dodania anime: ${e}`);
                return false
            }
        },

        //Edytowanie rekordu
        async UpdateAnimeInDataBase(data) {
            try {
                const response = await axios.put('/anime/edit', data, {withCredentials: true});
                return response.data;
            }
            catch(e) {
                console.error(`Nie udało się wykodać operazji edycji anime: ${e}`);
                return false
            }
        },

        //Pobieranie danych do edycji
        async GetAnimeForEditModal(anime) {
            try {
                const response = await axios.get('/anime/getrecord', {params: {anime: anime}, withCredentials: true});
                console.log(response);
                return response.data;
            }
            catch(e) {
                console.error(`Nie udało się pobrać recordu: ${e}`);
                return null;
            }
        },

        //Pobierz grupę do edycji
        GetGroupForEditModal(group) {
            let result = {};

            this.group_storage.forEach(element => {
                if(element.gid === group) {
                    result = element.gtitle;
                }
            });

            return result;
        },

        //Dodaj nową grupę
        async AddGroupRecord(data) {
            try {
                const response = await axios.post('/anime/add-group', data, {withCredentials: true});
                if(response.data.complete) {
                    await this.UpdateGroupList();
                }
                return response.data.complete;
            }
            catch(e) {
                console.error(`Nie udało się wykonać operacji ${e}`);
                return false;
            }
        },

        //Edytuj grupę
        async EditGroupRecord(data) {
            try {
                const response = await axios.put('/anime/edit-group', data, {withCredentials: true});
                if(response.data.complete) {
                    await this.UpdateGroupList();
                }
                return response.data.complete;
            }
            catch(e) {
                console.error(`Nie udało się wykonać operacji ${e}`);
                return false;
            }
        },

        //Aktualizacja listy grup
        async UpdateGroupList(){
            try {
                const response = await axios.get('/anime/get-group-list', {withCredentials: true});
                this.group_storage = response.data.complete;
            }
            catch(e) {
                console.error(`Nie udało się zaktualizować listy gróp: ${e}`);
            }
        },

        async DeleteRecords(data) {
            try {
                console.log(`TEST ${data.anime}`);
                const response = await axios.delete('/anime/delete', {params: data, withCredentials: true});
                return response.data;
            }
            catch(e) {
                console.error(`Nie udało się skasować wpisów: ${e}`);
                return false
            }
        }
    },
});