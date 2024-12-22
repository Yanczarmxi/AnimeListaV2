import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuterizationStore = defineStore('Auterization', {
    state: () => ({
        isLogged: false,
        userName: 'NotUser',
        userRegistered: '0000-00-00',
        userAvatar: require('@/assets/img/user_avatar.jpg'),

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

        async LogOutUser(){
            console.log("WYLOGOWANIE");
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