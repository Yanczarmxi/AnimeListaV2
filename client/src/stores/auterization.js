import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuterizationStore = defineStore('Auterization', {
    state: () => ({
        isLogged: false,
        userName: 'NotUser',
        userRegistered: '0000-00-00',
        userAvatar: require('@/assets/img/user_avatar.jpg'),

        //Preferencje
        userPreference: {},


        //failLogin
        failLogin: false,

        //adres do validacji
        validUrl: `${process.env.VUE_APP_USER_VALID}`,
        checkUrl: `${process.env.VUE_APP_USER_CHECK}`
    }),
    actions: {
        async ValidLogin(email, password, remember) {
            try{
                const response = await axios.post('/user/valid', 
                {
                    email: email,
                    password: password,
                    remember: remember,
                }, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                console.log('Sukces:', response);

                if(!response.data.isLogged){
                    this.failLogin = true;
                    return false;
                }
                this.isLogged = response.data.isLogged;
                this.userName = response.data.user;
                this.userRegistered = response.data.regdate;
                this.failLogin = false;

                if(response.data.avatar) {
                    this.userAvatar = 'data:image/jpeg;base64,' + response.data.avatar;
                }

                return true
            }
            catch(error){
                console.error('Błąd:', error);
                this.failLogin = true;
                return false
            }
        },

        //Pobierz zalogowaną sessję o ile jest zalogowany user
        async GetLoginSession(){
            try{
                const response = await axios.get('/user/checksession', {withCredentials: true});

                console.log('Sukces:', response);

                if(!response.data.isLogged){
                    this.failLogin = true;
                    return false;
                }
                this.isLogged = response.data.isLogged;
                this.userName = response.data.user;
                this.userRegistered = response.data.regdate;
                this.failLogin = false;

                if(response.data.avatar) {
                    this.userAvatar = 'data:image/jpeg;base64,' + response.data.avatar;
                }

                return true
            }
            catch(error){
                console.error('Błąd:', error);
                this.failLogin = true;
                return false
            }
        },

        async LogoutUser(){
            try {
                const response = await axios.post('/user/logout', {withCredentials: true});
                
                if(response.data.success) {
                    this.isLogged = false;
                    this.userName = 'NotUser';
                    this.userRegistered = '0000-00-00';
                    this.userAvatar = require('@/assets/img/user_avatar.jpg');

                    return true;
                }

                return false;
            }
            catch(e){
                console.error('Błąd podczas wylogowywania:', e);
                alert('Nie udało się wylogować.');
                return false;
            }
        },

        async UpdateUserPref(pref) {
            try {
                const responce = await axios.put('/user/preference', pref, {withCredentials: true});
                this.userPreference = responce.data;
            }
            catch(e) {
                console.error(`Nie udało się zaktualizować preferencji`);
            }
        }
    },

    persist: {
        enabled: true, // Włączenie persystencji dla tego store
        strategies: [
          {
            key: 'auterization', // Klucz w localStorage
            storage: localStorage, // Możesz zmienić na sessionStorage
          },
        ],
    },
});