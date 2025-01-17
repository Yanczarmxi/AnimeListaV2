<template lang="html">
    <div class="site-body-content">
    <MenuNav />
    <div class="content">
      <DataTable />
    </div>
    <WebSiteFooter />
  </div>
</template>
<script>
import MenuNav from './../components/menu.vue';
import DataTable from './../components/table/table.vue';
import WebSiteFooter from './../components/footer.vue';

export default {
    name: 'AnimePage',
    components: {
        MenuNav,
        DataTable,
        WebSiteFooter
    },
    provide(){
      return {
        setReloadTable: (fn) => (this.reloadTable = fn),
        reloadTable: () => {
          if(this.reloadTable) {
            this.reloadTable();
          }
          else {
            console.error('ReloadTable nie zostało zdefiniowane');
          }
        }
      }
    },
    data() {
      return {
        reloadTable: null
      }
    }
}
</script>
<style lang="">
    
</style>