<template lang="html">
    <div class="sign-in-body d-flex justify-content-center align-items-center">
        <div class="sign-in-container">

            <div class="sign-in-segment sin-bg-window">
                <img src="./../assets/img/logov2.png" alt="Anime Lista" class="img-logo">
            </div>

            <div class="sign-in-segment p-4">
                <div class="img-site-box">
                    <h2>Logowanie</h2>
                </div>

                <div class="sign-in-imput-box d-flex flex-column p-3 mt-5">
                    <div class="lgn-input-box">
                      <label for="sin-emial-input" class="form-label">Email address</label>
                      <input type="email" class="in in-default" style="width: 100%;" id="sin-emial-input" aria-describedby="emailHelp" v-model="email">
                      <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div class="lgn-input-box">
                      <label for="sin-pass-input" class="form-label">Password</label>
                      <input type="password" class="in in-default" style="width: 100%;" id="sin-pass-input" v-model="password">
                    </div>
                </div>

                <div class="sign-in-btcb p-3">
                    <div class="form-check mr-4 ml-4 mb-4">
                      <input class="form-check-input" type="checkbox" value="" id="sig-rememerme-chb" v-model="remembersin">
                      <label class="form-check-label" for="sig-rememerme-chb">
                        Pozostań zalogowany
                      </label>
                    </div>
                    <button class="bt bt-normal mr-4 ml-4 bt-sin" @click="SignInUser" @ref="btnLogin">Zaloguj</button>
                </div>

                <div class="sin-mess mt-3 d-flex flex-row justify-content-center align-items-center" v-if="!success">
                    <div class="mess-string">Nie prawidłowe dane logowania</div>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
import { useAuterizationStore } from '@/stores/auterization';
import { watch } from 'vue';

export default {
    name: 'LoginPage',
    data() {
        return {
            email: "",
            password: "",
            remembersin: false,

            //stanLogowania
            success: false,

            //Adres do validacji
            validUrl: process.env.VUE_APP_USER_VALID
        }
    },

    setup() {
        const auterizationStore = useAuterizationStore();

        watch(
            () => auterizationStore.failLogin,
            (newValue) => {
                console.log('failLogin zmieniono na:', newValue);
            }
        );

        return {
            auterizationStore,
            ValidLogin: auterizationStore.ValidLogin,
        }
    },

    mounted() {
        document.addEventListener('keydown', this.handleKeyEven);
    },

    unmounted() {
        document.removeEventListener('keydown', this.handleKeyEven);
    },

    methods: {
        async SignInUser() {
            console.log(this.email + ' - ' + this.password + ' - ' + this.remembersin);

            this.success = await this.ValidLogin(this.email, this.password, this.remembersin);

            if (this.success) {
                this.$router.push('/anime');
                console.log('ZALOGOWANY');
            }
            else{
                console.log('NIE DZIAŁA :C');
            }
        },

        handleKeyEvent(event) {
            if(event.key === 'Enter') {
                this.$refs.btnLogin.click();
            }
        }
    }
}
</script>
<style lang="css">
    .sign-in-body {
        width: 100vw;
        height: 100vh;
        background-image: url("./../assets/img/bg.jpg");
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
    }

    .sign-in-container {
        width: 840px;
        height: 620px;
        border: 2px solid var(--default-border-color);
        border-radius: 32px;
        overflow: hidden;
        display: flex;
        flex-direction: row;
        background-color: var(--bg-normal-color);
        border-radius: 8px 8px 8px 8px;
        -webkit-box-shadow:0px 0px 45px 23px rgba(0,0,0,0.82);
        -moz-box-shadow: 0px 0px 45px 23px rgba(0,0,0,0.82);
        box-shadow: 0px 0px 45px 23px rgba(0,0,0,0.82);
    }

    .sign-in-segment {
        width: 50%;
        height: 100%;
        background-color: var(--bg-normal-color);
    }

    .sin-bg-window {
        background-image: url('../assets/img/signin_window.jpg');
        background-position: center;
        background-size:cover;
        display: flex;
        justify-content: center;
        align-items: start;
        padding: 32px
    }

    .img-site-box {
        width: 100%;
        height: 72px;
        display: flex;
        justify-content: start;
        align-items: center;
    }

    .img-logo {
        width: 300px;
        height: autopx;
    }

    .bt-sin {
        width: 100%;
    }

    .in-email {
        height: 64px;
    }

    .sin-mess {
        width: 100%;
        height: 48px;
        border-radius: 8px 8px 8px 8px;
        background-color: brown;
    }

    .sin-mess-visible {
        visibility: visible;
    }

    .sin-mess-hidden {
        visibility: hidden;
    }

    .lgn-input-box {
        display: flex;
        flex-direction: column;
    }
</style>