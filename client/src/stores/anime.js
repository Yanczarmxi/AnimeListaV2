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
                this.group = response.data.group;
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

        //Aktualizajcja Rekordów
        async UpdateRecord(data){
            console.log('Update Record');
            try {
                await axios.post('/anime/update', data, {withCredentials: true});
                console.log('Zaktualizowano record');
            }
            catch(e){
                console.error('ERROR UPDATE: ' + e);
            }
            
        }
    },
});