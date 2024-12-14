<template lang="html">
    <div class="anime-table">
      <div class="table-header-menu">

        <div class="filtr-state-selector">
          <select class="form-select" aria-label="Default select example">
            <option value="1" selected>Wszystkie</option>
            <option value="2">Nie obejżane</option>
            <option value="3">Oglądane</option>
            <option value="3">Obejżane</option>
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
          <DataRow id="1" />
          <RowSeparator />
          <DataRow id="2" />
          <RowDescription />
          <DataRow id="3" />
          <DataRow id="4" />
          <DataRow id="5" />
          <DataRow id="6" />
          <DataRow id="7" />
          <DataRow id="8" />
        </tbody>
      </table>
    </div>
</template>
<script>
//import $ from 'jquery'

import DataRow from './row.vue';
import RowDescription from './rowinfo.vue';
import RowSeparator from './rowseparator.vue';

import { useAnimeStore } from '@/stores/anime';
//import { ref } from 'vue';

export default {
    name: 'DataTable',
    components: {
      DataRow,
      RowDescription,
      RowSeparator
    },

    setup() {
      const animeStore = useAnimeStore();

      return {
        GetAnime: animeStore.GetAnime
      }
    },

    mounted() {
      this.GetAnime();
    },

    methods: {

    }
}
</script>
<style lang="">
</style>