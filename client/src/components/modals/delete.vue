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
        <div class="md-delete-list-box">

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
        <button type="button" class="btn btn-secondary" @click="CloseModal">Zamknij</button>
        <button type="button" class="btn btn-danger bt-space" @click="StartDeleteProcess">Skasuj</button>
      </div>
    </div>
  </div>
</template>
<script>
import { useAnimeStore } from '@/stores/anime';
import { useModeratedStore } from '@/stores/moderated';
//import { forEach } from 'core-js/core/array';

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
<style lang="css">
.md-body {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1000; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

.md-content {
  color: #fff;
  background-color: var(--bg-normal-color);
  position: relative;
  width: 800px;
  height: auto;
  border-radius: 8px 8px 8px 8px;
  -webkit-box-shadow:0px 0px 45px 23px rgba(0,0,0,0.82);
  -moz-box-shadow: 0px 0px 45px 23px rgba(0,0,0,0.82);
  box-shadow: 0px 0px 45px 23px rgba(0,0,0,0.82);
}

.md-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  width: 100%;
  height: 63px;
  padding: 1rem;
  border-bottom: 1px solid #0e0e0e;
}

.bt-md-exit {
  color: #777;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  width: 32px;
  cursor: pointer;
}

.bt-md-exit:hover {
  color: #fff;
}

.md-title {
  font-size: 18pt;
}

.md-body-content-del {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 200px;
  height: 600px;
  width: 100%;
}

.md-footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  border-top: 1px solid #0e0e0e;
}

.md-delete-list-box {
  width: 90%;
  height: 400px;
  max-width: 90%;
  max-height: 400px;
  border-radius: 8px;
  padding: 24px;
  overflow: scroll;
  color: #fff;
  background-color: var(--bg-dark-color);
}

.md-delete-info-span {
  display: flex;
  flex-direction: row;
  justify-content: start;
  width: 90%;
}

.md-span-item {
  margin-right: 64px;
  font-size: 12pt;
  color: #fff;
}

/* Ukrywanie strzałek w Chrome, Edge i Safari */
input[type="number"]::-webkit-inner-spin-button, 
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Ukrywanie strzałek w Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>