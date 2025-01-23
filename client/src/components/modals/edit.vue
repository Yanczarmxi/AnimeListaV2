<template lang="html">
  <div class="md-body d-flex justify-content-center align-items-center">
    <div class="md-content d-flex flex-column align-content-between">
      <div class="md-header">
        <h5>Edytuj animu</h5>
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
              <img :src="imageContent" alt="" width="200" height="285" v-if="imgShow">
            </label>
            <input type="file" @change="HandleFileUpload" id="img-input-form" style="display: none;" accept="image/*" maxlength="1">
          </div>

          <button class="btn btn-danger" style="width: 128px; margin-top: 8px;" @click="DeleteImageUpload">Skasuj obraz</button>
        </div>
        <div class="content-md-box">
          <div class="md-data-box">
            
            <div class="md-form-box">
              <label for="inp-title">Tytuł</label>
              <input type="text" class="lb-style lb-title m-1" id="inp-title" v-model="title">
            </div>
            
            <div class="md-ep-x-gr-box">
              <div class="md-form-box">
                <label for="inp-episodes">Odcinki</label>
                <input type="number" class="lb-style lb-episodes m-1" id="inp-episodes" v-model="episodes" pattern="\d*" oninput="this.value = this.value.replace(/[^0-9]/g, '')">
              </div>
              
              <div class="md-form-box">
                <label for="slc-group">Grupa</label>
                <select class="md-select-group-menu" id="slc-group" v-model="group">
                  <option value=0>Pozostałe</option>
                  <option v-for="option in groups" :key="option.gr_id" :value="option.gr_id">
                    {{ option.gr_title }}
                  </option>
                </select>
              </div>
          </div>

          <div class="md-form-box">
            <label for="inp-url">Link</label>
            <input type="text" class="lb-style lb-title m-1" id="inp-url" v-model="url">
          </div>

          <div class="md-form-box">
            <label for="txa-description">Opis</label>
            <textarea class="md-description-textbox" id="txa-description" v-model="description"></textarea>
          </div>

          </div>
        </div>
      </div>

      <div class="md-footer d-flex flex-row justify-content-end p-4">
        <button type="button" class="btn btn-secondary" @click="CloseModal">Zamknij</button>
        <button type="button" class="btn btn-primary bt-space" @click="AddAnime">Dodaj</button>
      </div>
    </div>
  </div>
</template>
<script>
import { useAnimeStore } from '@/stores/anime';
import { useModeratedStore } from '@/stores/moderated';
import LoadingWheel from '../ui/loading.vue';
import { ref } from 'vue';

export default {
  name: 'ModalEditWindow',
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
      imageContent: '',

      //UPLOAD
      uploading: false,

      //image delete record
      deleteBlob: false,

      //Stany uploadowanej grafiki
      imgShow: false,
      imgEmpty: true,
      imgFall: false,
    }
  },

  setup() {
    const animeStore = useAnimeStore();
    const moderated = useModeratedStore();

    const checkIdAnimeStore = ref(moderated.checkIdAnimeStore);
    const GetAnimeForEditModal = ref(animeStore.GetAnimeForEditModal);

    const groups = ref(animeStore.group);

    return {
      groups,
      UploadImage: animeStore.UploadImage,
      DeleteImage: animeStore.DeleteImage,
      UpdateAnimeInDataBase: animeStore.UpdateAnimeInDataBase,

      checkIdAnimeStore,
      GetAnimeForEditModal,
    };
  },

  computed: {
      //validIsNumber() {
      //  let tmp;  
      //}
  },

  inject: ['reloadTable'],

  async mounted() {
    const id = this.checkIdAnimeStore[0];
    const response = await this.GetAnimeForEditModal(id);

    this.title = response.title;
    this.group = response.group;
    this.episodes = response.episodes;
    this.url = response.url;
    this.description = response.description;

    //Wyświetlenie obrazu
    if(response.image) {
      this.imgEmpty = false;
      this.imgShow = true;

      this.imageContent = 'data:image/jpeg;base64,' + response.image;
    }
  },

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
          this.imageContent = `${response.url}?t=${Date.now()}`;
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

    async EditAnime() {
      const data = {
          title: this.title,
          group: this.group,
          episodes: this.episodes,
          url: this.url,
          description: this.description,
          deleteImage: this.deleteBlob
        };

        const response = await this.UpdateAnimeInDataBase(data);

        if(response.complete) {
          this.reloadTable();
          this.CloseModal();
        }
    },

    ApplyAndClose() {
      this.reloadTable();
      this.CloseModal();
    }
  },
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

.md-body-content {
  display: flex;
  flex-direction: row;
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

.bt-clr {
  color: #fff;
}

.bt-space {
  margin-left: 16px;
}

.img-md-box {
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 480px;
}

.content-md-box {
  width: 70%;
  display: flex;
  justify-content: center;
}

.md-data-box {
  width: 85%;
}

.lb-style {
  background-color: var(--bg-dark-color);
  border: 0;
  border-radius: 8px 8px 8px 8px;
  color: #fff;
  padding: 7px;
}

input:focus {
  outline: none;
}

.lb-title {
  width: 100%;
}

.lb-episodes {
  width: 96px;
}

.md-select-group-menu {
  width: 320px;
  max-width: 320px;
  padding: 12px;
  background-color: var(--bg-dark-color);
  border: 0;
  border-radius: 8px 8px 8px 8px;
  color: #fff;
}

.md-ep-x-gr-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.md-description-textbox {
  width: 100%;
  height: 200px;
  background-color: var(--bg-dark-color);
  color: #fff;
  border: 0;
  border-radius: 8px 8px 8px 8px;
  padding: 8px;
  resize: none;
}

.md-description-textbox:focus {
  border: none;
  outline: none;
}

.md-form-box {
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
}

.md-img-url {
  margin-top: 16px;
}

.img-file-upload-box {
  margin-bottom: 16px;
}

.img-placeholder {
  background-color: var(--bg-dark-color);
  color: #fff;
  width: 200px;
  height: 285px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  border-radius: 8px 8px 8px 8px;
}

.waiting-on-click-to-upload-image {
  display: flex;
  flex-direction: column;
  align-items: center;
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