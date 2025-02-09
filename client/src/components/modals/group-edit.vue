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
          <button type="button" class="bt bt-normal" @click="CloseModal">Zamknij</button>
          <button type="button" class="bt bt-accept bt-space" @click="EditRecord">Edytuj</button>
        </div>
      </div>
    </div>
  </template>
  <script>
  import { useAnimeStore } from '@/stores/anime';
  import { useModeratedStore } from '@/stores/moderated';

  import { ref } from 'vue';

  import '@/assets/css/modal.css';
  
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