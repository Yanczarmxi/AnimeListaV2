import { defineStore } from 'pinia';
import $ from 'jquery'; 

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
                const response = await $.ajax({
                    url: '/anime/result',
                    type: 'GET',
                    xhrFields: {
                        withCredentials: true
                    }
                });

                this.data = {
                    segregated: response.segregated,
                    others: response.others
                };

                this.search = response.search;
                this.group = response.group;

                console.log(response); //DEBUG
            }
            catch(e){
                console.error('Nie udało się pobrać danych')
            }
        }
    }
});