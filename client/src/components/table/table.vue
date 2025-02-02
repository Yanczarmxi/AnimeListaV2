<template lang="html">
    <div class="anime-table">
      <div class="table-header-menu">

        <div class="filtr-state-selector">
          <select class="form-select" @change="ChangeFiltr" v-model="filterTable">
            <option value="-2">Wszystkie</option>
            <option value="-1">Wszystkie (Puste grupy)</option>
            <option value="0">Nie obejżane</option>
            <option value="1">Oglądane</option>
            <option value="2">Obejżane</option>
            <option value="3">Pożucone</option>
          </select>
        </div>

        <div class="input-group search-input">
          <input type="text" class="form-control" placeholder="Search..." aria-label="Search..." aria-describedby="basic-addon2">
          <div class="input-group-append">
            <button class="btn btn-primary" type="button">
              <svg width="16" height="16" fill="currentColor" class="bi bi-database-fill-add">
                <use xlink:href="#ico-search"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <table class="table table-dark">
        <thead>
          <tr>
            <th scope="col" class="ch-column">#</th>
            <th scope="col" class="img-column">img</th>
            <th scope="col" class="title-column">Tytuł</th>
            <th scope="col" class="ep-column">Odcinki</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="animeTableContent">
            <template v-for="(group, groupIndex) in animeData" :key="groupIndex">
              <RowSeparator :grData="{grTitle: group.gtitle, grId: group.gid}" />
              <DataRow v-for="(anime, animeIndex) in group.anime" :key="animeIndex" :data="anime" />
            </template>
          </template>
        </tbody>
      </table>
    </div>
</template>
<script>
import { useAnimeStore } from '@/stores/anime';
import { useAuterizationStore } from '@/stores/auterization';
import { useModeratedStore } from '@/stores/moderated';

import { ref } from 'vue';

import DataRow from './row.vue';
import RowSeparator from './rowseparator.vue';

export default {
    name: 'DataTable',
    components: {
      DataRow,
      RowSeparator,
    },
    data() {
      return{
        animeData: [],
        animeTableContent: true,

        filterTable: -2,
      }
    },

    inject: ['setReloadTable'],

    setup() {
      const animeStore = useAnimeStore();
      const auterization = useAuterizationStore();
      const moderated = useModeratedStore();

      const isLogged = ref(auterization.isLogged);
      const userPreference = ref(auterization.userPreference);

      return {
        GetAnime: animeStore.GetAnime,
        isLogged,
        userPreference,

        UpdateUserPref: auterization.UpdateUserPref,

        ResetIndex: moderated.ResetIndex,
      }
    },
    mounted() {
      if(this.isLogged) {
        this.LoadData();
      }
      else {
        console.log('Nie jesteś zalogowany! Brak danych do załadowania');
        this.$router.push('/login');
      }

      this.setReloadTable(this.ReloadData);

      //Filer
      if(this.userPreference?.filter) {
        this.filterTable = this.userPreference.filter;
      }
      else {
        this.filterTable = -1;
      }
    },

    methods: {
      async LoadData(){
        var data = await this.GetAnime(this.filterTable);
        this.animeData = data.anime;
        console.log('PROMISE');
        console.log(data.anime);
      },

      async ReloadData() {
        this.animeTableContent = false;
        this.ResetIndex();
        await this.LoadData();
        this.animeTableContent = true;
      },

      async ChangeFiltr() {
        const data = {filter: this.filterTable};
        await this.UpdateUserPref(data);
        this.ReloadData();
        console.log(data);
      }
    }
}
</script>
<style lang="css">
</style>