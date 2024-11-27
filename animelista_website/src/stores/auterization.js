import { defineStore } from 'pinia';
import $ from 'jquery'; 

export const useAuterizationStore = defineStore('Auterization', {
    state: () => ({
        isLogged: false,
        userName: 'NotUser',
        userRegistered: '0000-00-00',
        userAvatar: null,

        //failLogin
        failLogin: false,

        //adres do validacji
        validUrl: `${process.env.VUE_APP_USER_VALID}`
    }),
    actions: {
        async ValidLogin(email, password, remember) {
            console.log('ASYNC CALL')
            await $.ajax({
                url: this.validUrl,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    email: email,
                    password: password,
                    remember: remember
                }),
                success: function(response) {
                    console.log('Sukces:', response);

                    if(!response.isLogged){
                        this.failLogin = true;
                    }
                    else {
                        this.isLogged = response.isLogged;
                        this.userName = response.user;
                        this.userRegistered = response.regdate;
                        this.userAvatar = response.avatar;
                        this.failLogin = false;
                    }
                    console.log(this.failLogin);
                },
                error: function(error) {
                    console.error('Błąd:', error);
                    this.failLogin = true;
                    console.log(this.failLogin);
                }
            });
        }
    }
});