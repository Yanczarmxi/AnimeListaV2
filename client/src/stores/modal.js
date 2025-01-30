import { defineStore } from "pinia";
import axios from 'axios';

const useModalStore = defineStore('Modal', {
    state: {
        mdType: '',
        mdMessage: {
            add: [
                'Dodanie Anime zakończone',
                'Dodanie Anime nie powiodło się',
                'Anime o tym tytule już istnieje',
            ],
            edit: [
                'Dodanie Rekordu zakończone',
                'Dodanie Rekordu nie powiodło się'
            ],
            group: [
                'Dodanie Grupy zakończone',
                'Dodanie Grupy nie powiodło się',
            ],
            delete: [
                'Kasacja zakończona sukcesem',
                'Nie udało się skasować'
            ]
        }
    },

    actions: {
        SetModalType(tp){
            this.mdType = tp;
        },

        GetModalType(){
            return this.mdType;
        },

        async AddAnime(data){
            try {
                response = await axios.post('/anime/add', data, {withCredentials: true});
                return mdMessage.add[response];
            }
            catch(e){
                return mdMessage.add[1];
            }
        }
    }
});