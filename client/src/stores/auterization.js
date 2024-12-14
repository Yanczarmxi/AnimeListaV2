import { defineStore } from 'pinia';
import $ from 'jquery'; 

export const useAuterizationStore = defineStore('Auterization', {
    state: () => ({
        isLogged: false,
        userName: 'NotUser',
        userRegistered: '0000-00-00',
        userAvatar: './../assets/img/user_avatar.jpg',

        //failLogin
        failLogin: false,

        //adres do validacji
        validUrl: `${process.env.VUE_APP_USER_VALID}`,
        checkUrl: `${process.env.VUE_APP_USER_CHECK}`
    }),
    actions: {
        async ValidLogin(email, password, remember) {
            try{
                const response = await $.ajax({
                    url: '/user/valid',
                    type: 'POST',
                    xhrFields: {
                        withCredentials: true
                    },
                    contentType: 'application/json',
                    data: JSON.stringify({
                        email: email,
                        password: password,
                        remember: remember
                    })
                });

                console.log('Sukces:', response);

                if(!response.isLogged){
                    this.failLogin = true;
                    return false;
                }
                this.isLogged = response.isLogged;
                this.userName = response.user;
                this.userRegistered = response.regdate;
                //this.userAvatar = response.avatar;
                this.failLogin = false;

                if(response.avatar) {
                    this.userAvatar = 'data:image/jpeg;base64,' + response.avatar;
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
                const response = await $.ajax({
                    url: '/user/checksession',
                    type: 'GET',
                    xhrFields: {
                        withCredentials: true
                    }
                });

                console.log('Sukces:', response);

                if(!response.isLogged){
                    this.failLogin = true;
                    return false;
                }
                this.isLogged = response.isLogged;
                this.userName = response.user;
                this.userRegistered = response.regdate;
                this.userAvatar = response.avatar;
                this.failLogin = false;
                return true
            }
            catch(error){
                console.error('Błąd:', error);
                this.failLogin = true;
                return false
            }
        },

        async LogOutSser(){
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