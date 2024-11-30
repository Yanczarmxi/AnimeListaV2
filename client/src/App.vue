<template lang="html">
  <!--<PlaygroundXD />-->
  <router-view />
</template>

<script>
//import PlaygroundXD from './components/playground.vue'

export default {
  name: 'App',
  components: {
    //PlaygroundXD
  },
  data(){
    return {
      serverResponse: 'Hi mom!',
    }
  }
};
</script>

<style lang="css">
</style>
