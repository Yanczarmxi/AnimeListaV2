<template lang="html">
    <div>
        Animu Lista<br>
        v. 2.0.0<br>
        2024
    </div>
</template>
<script>
import {useAuterizationStore} from '@/stores/auterization';
export default {
    name: 'HomePage',

    setup() {
        const auterizationStore = useAuterizationStore();

        return{
            GetLoginSession: auterizationStore.GetLoginSession
        }
    },

    mounted() {
        this.CheckUserSession();
    },

    methods: {
        async CheckUserSession(){
            var isLogged = false;
            isLogged = await this.GetLoginSession();

            if(isLogged){
                this.$router.push('/anime');
                console.log('Zalogowany');
            }
            else{
                this.$router.push('/login');
                console.log('Nie zalogowany');
            }
        }
    }
}
</script>
<style lang="">
    
</style>