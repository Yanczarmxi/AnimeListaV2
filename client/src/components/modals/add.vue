<template lang="html">
    <div class="md-body d-flex justify-content-center align-items-center">
      <div class="md-content d-flex flex-column align-content-between">
        <div class="md-header">
          <h5>Dodaj animu</h5>
          <div class="bt-md-exit" @click="CloseModal">
            <svg width="32" height="32" fill="currentColor" class="bi bi-database-fill-add">
              <use xlink:href="#ico-cross"/>
            </svg>
          </div>
        </div>

        <div class="md-body-content d-flex align-items-stretch p-4">
          <div class="img-md-box">
            <div class="img-file-upload-box">
              <label for="img-input-form" style="cursor: pointer;">
                <div class="img-placeholder" v-if="!imgShow">

                  <div class="waiting-on-click-to-upload-image" v-if="imgEmpty">
                    <img src="../../assets/img/upload_img.svg" width="64" height="64">
                    <p style=" user-select: none;">Załaduj obraz</p>
                  </div>

                  <LoadingWheel width="64" height="64" v-if="uploading" />

                  <img src="../../assets/img/fail_img.svg" width="64" height="64" v-if="imgFall">
                </div>
                <img :src="imageUrlWithTimestamp" alt="" width="200" height="285" v-if="imgShow">
              </label>
              <input type="file" @change="HandleFileUpload" id="img-input-form" style="display: none;" accept="image/*" maxlength="1">
            </div>

            <button class="bt bt-danger" style="margin-top: 8px;" @click="DeleteImageUpload">Skasuj obraz</button>
          </div>
          <div class="content-md-box">
            <div class="md-data-box">
              
              <div class="md-form-box">
                <label for="inp-title">Tytuł</label>
                <input type="text" class="in in-default lb-title m-1" id="inp-title" v-model="title">
              </div>
              
              <div class="md-ep-x-gr-box">
                <div class="md-form-box">
                  <label for="inp-episodes">Odcinki</label>
                  <input type="number" class="in in-default lb-episodes m-1" id="inp-episodes" v-model="episodes" pattern="\d*" oninput="this.value = this.value.replace(/[^0-9]/g, '')">
                </div>
                
                <div class="md-form-box">
                  <label for="slc-group">Grupa</label>
                  <select class="md-select-group-menu sl-default" id="slc-group" v-model="group">
                    <option value=0>Pozostałe</option>
                    <option v-for="option in groups" :key="option.gr_id" :value="option.gr_id">
                      {{ option.gr_title }}
                    </option>
                  </select>
                </div>
            </div>

            <div class="md-form-box">
              <label for="inp-url">Link</label>
              <input type="text" class="in in-default lb-title m-1" id="inp-url" v-model="url">
            </div>

            <div class="md-form-box">
              <label for="txa-description">Opis</label>
              <textarea class="md-description-textbox tx tx-default" id="txa-description" v-model="description"></textarea>
            </div>

            </div>
          </div>
        </div>

        <div class="md-footer d-flex flex-row justify-content-end p-4">
          <button type="button" class="bt bt-normal" @click="CloseModal">Zamknij</button>
          <button type="button" class="bt bt-accept bt-space" @click="AddAnime">Dodaj</button>
        </div>
      </div>
    </div>
</template>
<script>
import { useAnimeStore } from '@/stores/anime';
import LoadingWheel from '../ui/loading.vue';

import '@/assets/css/modal.css';

export default {
    name: 'ModalAddWindow',
    components: {
      LoadingWheel,
    },
    data() {
      return {
        //Dane animu do przesłania
        title: '',
        group: 0,
        episodes: 1,
        url: '',
        description: '',

        //obrazek
        imageUrl: '',
        timestamp: Date.now(),

        //UPLOAD
        uploading: false,

        //Stany uploadowanej grafiki
        imgShow: false,
        imgEmpty: true,
        imgFall: false,

      }
    },
    setup() {
      const animeStore = useAnimeStore();

      return {
        groups: animeStore.group_storage,
        UploadImage: animeStore.UploadImage,
        DeleteImage: animeStore.DeleteImage,
        AddAnimeToDataBase: animeStore.AddAnimeToDataBase,
      }
    },
    
    computed: {
      imageUrlWithTimestamp() {
        return `${this.imageUrl}?t=${this.timestamp}`;
      },

      //validIsNumber() {
      //  let tmp;  
      //}
    },

    inject: ['reloadTable'],

    methods: {
      CloseModal() {
        this.$emit('closeModal');
      },

      async HandleFileUpload(event) {
        const file = event.target.files[0];

        if (!file) {
          this.error = "No file selected.";
          return;
        }

        this.uploading = true;
        this.imgShow = false;
        this.imgEmpty = false;

        const formData = new FormData();
        formData.append("file", file);

        const response = await this.UploadImage(formData);

        console.log(response.status);

        if(response.status === 200) {
          if(response.url) {
            this.imageUrl = response.url;
            this.timestamp = Date.now();
            this.imgShow = true;
          }
          else {
            this.imgFail = true;
          }
        }
        else {
          this.imgFall = true;
        }

        this.uploading = false;
      },

      async DeleteImageUpload(data) {
        this.imgShow = false;
        this.imgEmpty = true;
        this.imageUrl = null;
        await this.DeleteImage({id: data});
      },

      async AddAnime() {
        const data = {
          title: this.title,
          group: this.group,
          episodes: this.episodes,
          url: this.url,
          description: this.description
        };

        const response = await this.AddAnimeToDataBase(data);
        if(response.complete) {
          this.reloadTable();
          this.CloseModal();
        }
      },

      ApplyAndClose() {
        this.reloadTable();
        this.CloseModal();
      }
    }
}
</script>