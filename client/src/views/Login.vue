<template lang="html">
    <div class="sign-in-body d-flex justify-content-center align-items-center">
        <div class="sign-in-container p-4">

            <div class="img-site-box d-flex justify-content-center align-items-center">
                <img src="./../assets/img/logo.png" alt="Anime Lista" class="img-logo">
            </div>

            <div class="sign-in-imput-box d-flex flex-column p-3 mt-5">
                <div class="mb-3">
                  <label for="sin-emial-input" class="form-label">Email address</label>
                  <input type="email" class="form-control" id="sin-emial-input" aria-describedby="emailHelp" v-model="email">
                  <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                  <label for="sin-pass-input" class="form-label">Password</label>
                  <input type="password" class="form-control" id="sin-pass-input" v-model="password">
                </div>
            </div>

            <div class="sign-in-btcb p-3">
                <div class="form-check mr-4 ml-4 mb-4">
                  <input class="form-check-input" type="checkbox" value="" id="sig-rememerme-chb" v-model="remembersin">
                  <label class="form-check-label" for="sig-rememerme-chb">
                    Pozostań zalogowany
                  </label>
                </div>
                <button class="btn btn-primary mr-4 ml-4 bt-sin" @click="SignInUser" @ref="btnLogin">Zaloguj</button>
            </div>

            <div class="sin-mess mt-3 d-flex flex-row justify-content-center align-items-center" v-if="!success">
                <div class="mess-string">Nie prawidłowe dane logowania</div>
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
        width: 420px;
        height: 620px;
        background-color: var(--bg-normal-color);
        border-radius: 8px 8px 8px 8px;
        -webkit-box-shadow:0px 0px 45px 23px rgba(0,0,0,0.82);
        -moz-box-shadow: 0px 0px 45px 23px rgba(0,0,0,0.82);
        box-shadow: 0px 0px 45px 23px rgba(0,0,0,0.82);
    }

    .img-site-box {
        width: 100%;
        height: 112px;
    }

    .img-logo {
        width: auto;
        height: 72px;
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
</style>