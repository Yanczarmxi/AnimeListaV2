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

                console.log(response); //DEBUG
                this.isLoaded = true;

                return true;
            }
            catch(e){
                console.error('Nie udało się pobrać danych');
                return false;
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

        GetAnimeData(){
            if(this.isLoaded){
                return {
                    data: this.animedata,
                    search: this.search,
                    group: this.group          
                };
            }
            else{
                if(GetAnime()){
                    return {
                        data: this.animedata,
                        search: this.search,
                        group: this.group          
                    };
                }
                return {mess: 'Nie udało się pobrać animu :c'};
            }
        }
    },

    persist: {
        enabled: true,
        strategies: [
          {
            key: 'store_anime',
            storage: localStorage,
          },
        ],
    },
});