import { defineStore } from 'pinia';
import axios from 'axios';

export const useAnimeStore = defineStore('Anime', {
    state: () => ({
        search: {},
        group: {},
        animedata: [],
        isLoaded: false,

        //adres do validacji
        serverUrl: `${process.env.VUE_APP_SERVER}`
    }),
    actions: {
        async GetAnime(){
            try{
                const response = await axios.get('/anime/result', {withCredentials: true});

                this.PrepareAnimeData(response.data.segregated, response.data.others);

                this.search = response.data.search;
                this.group = response.data.groups;
                this.isLoaded = true;

                return {
                    isLoaded: this.isLoaded,
                    data: this.animedata,
                    search: this.search,
                    group: this.group          
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

        PrepareAnimeData(grd, ohd){
            this.animedata = grd;
            this.animedata.push({
                gid: 0,
                gtitle: 'Pozostałe',
                anime: ohd
            });
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

                return respornse.data.complete;
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
                return response.data.complete;
            }
            catch(e) {
                console.error(`Nie udało się wykodać operazji edycji anime: ${e}`);
                return false
            }
        },

        //Pobieranie danych do edycji
        async GetAnimeForEditModal(anime) {
            try {
                const response = await axios.post('/anime/getrecord', {anime: anime}, {withCredentials: true});
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

            this.animedata.forEach(element => {
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
                const response = await axios.get('/anime/get-group-list');
                this.group = response.data.complete;
            }
            catch(e) {
                console.error(`Nie udało się zaktualizować listy gróp: ${e}`);
            }
        },

        async DeleteRecords() {
            try {
                const data = {
                    group: [],
                    anime: []
                };

                const response = await axios.delete('/anime/delete', data, {withCredentials: true});
                return response.data.complete;
            }
            catch(e) {
                console.error(`Nie udało się skasować wpisów: ${e}`);
                return false
            }
        }
    },
});