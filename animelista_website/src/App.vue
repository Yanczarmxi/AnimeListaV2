<template lang="html">
  <div class="site-body-content">
    <MenuNav />
    <div class="content">
      <DataTable />
    </div>
    <WebSiteFooter />
  </div>
  <!--<PlaygroundXD />-->
</template>

<script>
import MenuNav from './components/menu.vue';
import DataTable from './components/table/table.vue';
import WebSiteFooter from './components/footer.vue';
//import PlaygroundXD from './components/playground.vue'

export default {
  name: 'App',
  components: {
    MenuNav,
    DataTable,
    WebSiteFooter
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
