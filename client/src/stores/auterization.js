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
        validUrl: `${process.env.VUE_APP_USER_VALID}`,
        checkUrl: `${process.env.VUE_APP_USER_CHECK}`
    }),
    actions: {
        async ValidLogin(email, password, remember) {
            console.log('ASYNC CALL')
            await $.ajax({
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
                }),
                success: function(response){
                    console.log('Sukces:', response);

                    if(!response.isLogged){
                        this.failLogin = true;
                        return false;
                    }
                    else {
                        this.isLogged = response.isLogged;
                        this.userName = response.user;
                        this.userRegistered = response.regdate;
                        this.userAvatar = response.avatar;
                        this.failLogin = false;
                        return true
                    }
                },
                error: function(error) {
                    console.error('Błąd:', error);
                    this.failLogin = true;
                    return false
                }
            });
        },

        //Pobierz zalogowaną sessję o ile jest zalogowany user
        async GetLoginSession(){
            await $.ajax({
                url: '/user/checksession',
                type: 'GET',
                xhrFields: {
                    withCredentials: true
                },
                success: function(response){
                    console.log(response);
                    if(!response.isLogged){
                        this.failLogin = true;
                        return false;
                    }
                    else {
                        this.isLogged = response.isLogged;
                        this.userName = response.user;
                        this.userRegistered = response.regdate;
                        this.userAvatar = response.avatar;
                        this.failLogin = false;
                        return true
                    }
                },
                error: function(error) {
                    console.error('Błąd:', error);
                    this.failLogin = true;
                    return false
                }
            });
        }
    }
});