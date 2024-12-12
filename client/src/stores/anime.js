import { defineStore } from 'pinia';
import $ from 'jquery'; 

export const useAnimeStore = defineStore('Anime', {
    state: () => ({
        data,
        search,
        group,
        

        //adres do validacji
        validUrl: `${process.env.VUE_APP_USER_VALID}`,
        checkUrl: `${process.env.VUE_APP_USER_CHECK}`
    }),
    actions: {
        async GetAnime(){
            try{
                const response = await $.ajax({
                    url: '/user/checksession',
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
            }
            catch(e){
                console.error('Nie udało się pobrać danych')
            }
        }
    }
});