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
          <div class="img-md-box"></div>
          <div class="content-md-box">
            <div class="md-data-box">
              
              <input type="text" class="lb-style lb-title m-1" id="exampleInputEmail1">
              
              <div class="md-ep-x-gr-box">
              <input type="number" class="lb-style lb-episodes m-1" id="exampleInputEmail1" pattern="\d*" oninput="this.value = this.value.replace(/[^0-9]/g, '')">
              <select class="md-select-group-menu">
                <option value=null>Pozostałe</option>
                <option v-for="option in groups" :key="option.gr_id" :value="option.gr_id">
                  {{ option.gr_title }}
                </option>
              </select>
            </div>

            <input type="text" class="lb-style lb-title m-1" id="exampleInputEmail1">

            <textarea id="w3review" name="w3review" rows="4" cols="50">
              At w3schools.com you will learn how to make a website. They offer free tutorials in all web development technologies.
            </textarea>

            </div>
          </div>
        </div>

        <div class="md-footer d-flex flex-row justify-content-end p-4">
          <button type="button" class="btn btn-secondary" @click="CloseModal">Zamknij</button>
          <button type="button" class="btn btn-primary bt-space">Dodaj</button>
        </div>
      </div>
    </div>
</template>
<script>
import { useAnimeStore } from '@/stores/anime';

export default {
    name: 'ModalAddWindow',
    data() {
      return {
        //Dane animu do przesłania
        title: "",
        group: 0,
        episodes: 0,
        url: "",
        description: "",

        //SAMLE
        options: [
          { gid: 1, gtitle: "Opcja 1" },
          { gid: 2, gtitle: "Opcja 2" },
          { gid: 3, gtitle: "Opcja 3" },
        ],
      }
    },
    setup() {
      const animeStore = useAnimeStore();

      return {
        groups: animeStore.group
      }
    },
    methods: {
      CloseModal() {
        this.$emit('closeModal');
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

.md-body-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 200px;
  height: 400px;
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
  width: 64px;
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