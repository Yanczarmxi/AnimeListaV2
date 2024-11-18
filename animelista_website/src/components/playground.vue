<template lang="html">
    <div>
        <button class="btn btn-primary" @click="ink">Klik</button>
        <div>{{ localcnf }}</div>
    </div>
</template>
<script>
import { useCounterStore } from '@/stores/cntstore';
import { ref, watch } from 'vue';

export default {
    name: 'PlaygroundXD',

    data() {
        return {
            licznik: 0
        };
    },

    setup() {
        const coun = useCounterStore();

        const localcnf = ref(coun.counter);

        watch (
            () => coun.counter,
            (newValue, oldValue) => {
                console.log(newValue + " - " + oldValue);
                localcnf.value = newValue;
            }
        );

        return {
            localcnf,
            cnf: coun.counter,
            ink: coun.increment
        };
    },

    methods: {
        SetLicznik(lc) {
            this.licznik = lc;
        }
    }
}
</script>
<style lang="">

</style>