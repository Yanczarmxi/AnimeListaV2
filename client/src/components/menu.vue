<template lang="html">
    <SvgIconSet />
    <ModalWindow />
    <!-- Menu Główne -->
    <nav class="navbar navbar-dark bg-dark nav-menu d-flex flex-row align-content-center align-items-center">
        <div class="logo-container p-2 bd-highlight">
            <img src='./../assets/img/logo.png' class="logo-img"/>
        </div>

        <div class="bt-set-container d-flex flex-row justicy-content-start align-items-center p-2 bd-highlight">
            <button class="btn btn-primary bt-nav-fnc" data-bs-toggle="modal" data-bs-target="#modal-window">
                <svg width="16" height="16" fill="currentColor" class="bi bi-database-fill-add">
                    <use xlink:href="#ico-add-record"/>
                </svg>
                Dodaj Anime
            </button>

            <button class="btn btn-primary bt-nav-fnc" data-bs-toggle="modal" data-bs-target="#modal-window">
                <svg width="16" height="16" fill="currentColor" class="bi bi-database-fill-add">
                    <use xlink:href="#ico-add-group"/>
                </svg>
                Dodaj Grupę
            </button>

            <button class="btn btn-primary bt-nav-fnc" data-bs-toggle="modal" data-bs-target="#modal-window" :disabled="editDis">
                <svg width="16" height="16" fill="currentColor" class="bi bi-database-fill-add">
                    <use xlink:href="#ico-edit-record"/>
                </svg>
                Edytuj
            </button>

            <button class="btn btn-danger bt-nav-fnc" data-bs-toggle="modal" data-bs-target="#modal-window" :disabled="removeDis">
                <svg width="16" height="16" fill="currentColor" class="bi bi-database-fill-add" disabled>
                    <use xlink:href="#ico-remove-record"/>
                </svg>
                Skasuj
            </button>
        </div>

        <div class="user-container d-flex align-items-center justicy-content-between ms-auto p-2 bd-highlight">
            <div class="user-box">
                <img :src='userAvatar' class="user-img"/>
                <div class="user-name-container">
                    {{userName}}
                </div>
            </div>

            <button class="btn btn-danger user-bt-logout" @click="LogoutUser">
                <svg width="16" height="16" fill="currentColor" class="bi bi-database-fill-add">
                    <use xlink:href="#ico-logout"/>
                </svg>
            </button>

        </div>
    </nav>
</template>
<script>
import SvgIconSet from './iconset.vue';
import { useAnimeIndexStore } from '@/stores/moderated';
import { useAuterizationStore } from '@/stores/auterization';
import { ref, watch } from 'vue';

import ModalWindow from './modal.vue';

export default {
    name: 'ManuNav',
    components: {
        SvgIconSet,
        ModalWindow
  },

  setup() {
    //User
    const auterization = useAuterizationStore();

    const userName = ref(auterization.userName);
    const userAvatar = ref(auterization.userAvatar);


    //Storrage zmiennych kontrolnych
    const animeIndex = useAnimeIndexStore();

    //Aktywatory przycisków edit i remove
    const editDis = ref(animeIndex.editDistable);
    const removeDis = ref(animeIndex.removeDistable);

    watch (
        () => animeIndex.editDistable,
        (newValue, oldValue) => {
            editDis.value = newValue;
            console.log("editToggle: " + newValue + " - " + oldValue);
        },
        
        () => animeIndex.removeDistable,
        (newValue, oldValue) => {
            removeDis.value = newValue;
            console.log("removeToggle: " + newValue + " - " + oldValue);
        }
    );

    return {
        editDis,
        removeDis,

        userName,
        userAvatar,
        
        LogoutUser: auterization.LogoutUser,
    };
  },

  methods: {
    async LogoutProcess() {
        const res = await this.LogoutUser();
        if(res){
            this.$router.push('/login');
        } 
    }
  }
}
</script>