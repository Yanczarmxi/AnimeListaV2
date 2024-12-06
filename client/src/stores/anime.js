import { defineStore } from 'pinia';
import $ from 'jquery'; 

export const useAnimeStore = defineStore('Anime', {
    state: () => ({
        data: [],
        search: [],
        group: [],
        

        //adres do validacji
        validUrl: `${process.env.VUE_APP_USER_VALID}`,
        checkUrl: `${process.env.VUE_APP_USER_CHECK}`
    }),
    actions: {
        async GetAnime(){

        }
    }
});