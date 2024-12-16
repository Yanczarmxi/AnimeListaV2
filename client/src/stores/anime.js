import { defineStore } from 'pinia';
import axios from 'axios';

export const useAnimeStore = defineStore('Anime', {
    state: () => ({
        data: {},
        search: {},
        group: {},
        

        //adres do validacji
        serverUrl: `${process.env.VUE_APP_SERVER}`
    }),
    actions: {
        async GetAnime(){
            try{
                const response = await axios.get('/anime/result', {withCredentials: true});

                this.data = {
                    segregated: response.data.segregated,
                    others: response.data.others
                };

                this.search = response.data.search;
                this.group = response.data.group;

                console.log(response); //DEBUG
            }
            catch(e){
                console.error('Nie udało się pobrać danych')
            }
        }
    }
});