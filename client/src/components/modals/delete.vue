<template lang="html">
  <div class="md-body d-flex justify-content-center align-items-center">
    <div class="md-content d-flex flex-column align-content-between">
      <div class="md-header">
        <h5>Skasuj</h5>
        <div class="bt-md-exit" @click="CloseModal">
          <svg width="32" height="32" fill="currentColor" class="bi bi-database-fill-add">
            <use xlink:href="#ico-cross"/>
          </svg>
        </div>
      </div>

      <div class="md-body-content-del p-4">
        <div class="md-delete-list-box default-border">

          <div class="md-delete-list-content" v-if="groupVisible">
            <h3>Grupy:</h3>
            <ul>
              <li v-for="item in groupDeleteData" :key="item.title">{{ item.title }}</li>
            </ul>
          </div>

          <div class="md-delete-list-content" v-if="animeVisible">
            <h3>Anime:</h3>
            <ul>
              <li v-for="item in animeDeleteData" :key="item.title">{{ item.title }}</li>
            </ul>
          </div>
        </div>

        <div class="md-delete-info-span">
          <span class="md-span-item">Elementów do usunięcia: {{ allDeleteElements }}</span>
          <span class="md-span-item" v-if="groupVisible">Grupy: {{ groupDeleteElements }}</span>
          <span class="md-span-item" v-if="animeVisible">Anime: {{ animeDeleteElements }}</span>
        </div>

      </div>

      <div class="md-footer d-flex flex-row justify-content-end p-4">
        <button type="button" class="bt bt-normal" @click="CloseModal">Zamknij</button>
        <button type="button" class="bt bt-danger bt-space" @click="StartDeleteProcess">Skasuj</button>
      </div>
    </div>
  </div>
</template>
<script>
import { useAnimeStore } from '@/stores/anime';
import { useModeratedStore } from '@/stores/moderated';

import '@/assets/css/modal.css';

import { ref } from 'vue';

export default {
  name: 'ModalDeleteWindow',
  data() {
    return {
      groupDeleteData: [],
      animeDeleteData: [],

      allDeleteElements: 0,
      groupDeleteElements: 0,
      animeDeleteElements: 0,

      groupVisible: false,
      animeVisible: false,
    }
  },

  setup() {
    const animeStore = useAnimeStore();
    const moderated = useModeratedStore();

    const groupIndex = ref(moderated.checkIdGroupStore);
    const animeIndex = ref(moderated.checkIdAnimeStore);

    const group = ref(animeStore.group_storage);
    const anime = ref(animeStore.animes_storage);

    return {
      DeleteRecords: animeStore.DeleteRecords,

      groupIndex, animeIndex, group, anime
    }
  },

  mounted() {
    this.groupDeleteData = this.GetGroupTitlesFromStore();
    this.animeDeleteData = this.GetAnimeTitlesFromStore();

    this.groupDeleteElements = this.groupDeleteData.length;
    this.animeDeleteElements = this.animeDeleteData.length;
    this.allDeleteElements = this.groupDeleteElements + this.animeDeleteElements;

    this.groupVisible = this.groupDeleteElements > 0 ? true : false;
    this.animeVisible = this.animeDeleteElements > 0 ? true : false;
  },

  inject: ['reloadTable'],

  methods: {
    CloseModal() {
      this.$emit('closeModal');
    },

    GetGroupTitlesFromStore() {
      let tmp = [];
      if(this.groupIndex.length > 0) {
        this.groupIndex.forEach(index => {
          this.group.forEach(element => {
            if(index == element.gr_id) {
              tmp.push({title: element.gr_title});
            }
          });
        });
      }

      return tmp;
    },

    GetAnimeTitlesFromStore() {
      let tmp = [];

      if(this.animeIndex.length > 0) {
        this.animeIndex.forEach(index => {
          this.anime.forEach(element => {
            if(index == element.id) {
              tmp.push({title: element.title});
            }
          });
        });
      }

      return tmp;
    },

    async StartDeleteProcess() {
      const data = {
        group: this.groupIndex,
        anime: this.animeIndex
      };

      const response = await this.DeleteRecords(data);

      if(response.complete) {
        this.reloadTable();
        this.CloseModal();
      }
    }
  }
}
</script>