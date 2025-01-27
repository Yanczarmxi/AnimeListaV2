<template lang="html">
    <div class="anime-table">
      <div class="table-header-menu">

        <div class="filtr-state-selector">
          <select class="form-select" aria-label="Default select example">
            <option value="-1" selected>Wszystkie</option>
            <option value="-2">Wszystkie (Puste grupy)</option>
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
      }
    },

    inject: ['setReloadTable'],

    setup() {
      const animeStore = useAnimeStore();
      const auterization = useAuterizationStore();
      const moderated = useModeratedStore();

      return {
        GetAnime: animeStore.GetAnime,
        isLogged: auterization.isLogged,

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
    },

    methods: {
      async LoadData(){
        var data = await this.GetAnime();
        this.animeData = data.data;
        console.log('PROMISE');
        console.log(data);
      },

      async ReloadData() {
        this.animeTableContent = false;
        this.ResetIndex();
        await this.LoadData();
        this.animeTableContent = true;
      }
    }
}
</script>
<style lang="">
</style>