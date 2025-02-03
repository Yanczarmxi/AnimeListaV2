<template lang="html">
    <div class="md-body d-flex justify-content-center align-items-center">
      <div class="md-content d-flex flex-column align-content-between">
        <div class="md-header">
          <h5>Edytuj grupę</h5>
          <div class="bt-md-exit" @click="CloseModal">
            <svg width="32" height="32" fill="currentColor" class="bi bi-database-fill-add">
              <use xlink:href="#ico-cross"/>
            </svg>
          </div>
        </div>
  
        <div class="md-body-content-gr p-4">
          <label for="inp-title">Nazwa grupy</label>
          <input 
            type="text" 
            class="lb-style m-1" 
            style="width: 100%; height: 36px;" 
            v-model="groupTitle"
            :maxlenght="maxGlyph"
            @input="handleInput"
            />
          <div class="smol-text-content"><span class="smol-text-lenght-glyph">Pozostało: {{ LenghtGlyph }}</span></div>
        </div>
  
        <div class="md-footer d-flex flex-row justify-content-end p-4">
          <button type="button" class="btn btn-secondary" @click="CloseModal">Zamknij</button>
          <button type="button" class="btn btn-primary bt-space" @click="EditRecord">Edytuj</button>
        </div>
      </div>
    </div>
  </template>
  <script>
  import { useAnimeStore } from '@/stores/anime';
  import { useModeratedStore } from '@/stores/moderated';

  import { ref } from 'vue';
  
  export default {
    name: 'ModalEditGroupWindow',
    data() {
      return {
        //Zmienna nazwy
        groupTitle: '',
        groupId: 0,
  
        //limit literków
        maxGlyph: 64,
        tmpString: '',
      }
    },
  
    setup() {
      const animeStore = useAnimeStore();
      const moderated = useModeratedStore();

      const checkIdGroupStore = ref(moderated.checkIdGroupStore);
  
      return {
        GetGroupForEditModal: animeStore.GetGroupForEditModal,
        EditGroupRecord: animeStore.EditGroupRecord,
        checkIdGroupStore,
      }
    },
  
    computed: {
      LenghtGlyph() {
        return this.maxGlyph - this.groupTitle.length;
      }
    },

    mounted() {
        this.groupId = this.checkIdGroupStore[0];
        this.groupTitle = this.GetGroupForEditModal(this.groupId);
    },

    inject: ['reloadTable'],
  
    methods: {
      CloseModal() {
        this.$emit('closeModal');
      },
  
      async EditRecord() {
        const response = await this.EditGroupRecord({
            gid: this.groupId,
            title: this.groupTitle
        });
  
        if(response){
          this.reloadTable();
          this.CloseModal();
        }
      },
  
      handleInput() {
        if (this.groupTitle.length > this.maxGlyph) {
          this.groupTitle = this.groupTitle.slice(0, this.maxGlyph);
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
  
  .md-body-content-gr {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    min-height: 200px;
    height: 224px;
    width: 100%;
  }
  
  .md-footer {
    width: 100%;
    position: absolute;
    bottom: 0;
    border-top: 1px solid #0e0e0e;
  }
  
  .bt-clr {
    color: #fff;
  }
  
  .bt-space {
    margin-left: 16px;
  }
  
  .smol-text-lenght-glyph {
    color: #fff;
    font-size: 8pt;
  }
  
  .smol-text-content {
    width: 100%;
    display: flex;
    justify-content: end;
  }
  
  .lb-style {
    background-color: var(--bg-dark-color);
    border: 0;
    border-radius: 8px 8px 8px 8px;
    color: #fff;
    padding: 7px;
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