<template lang="html">
    <SvgIconSet />
    <!-- Menu Główne -->
    <nav class="navbar navbar-dark bg-dark nav-menu d-flex flex-row align-content-center align-items-center">
        <div class="logo-container p-2 bd-highlight">
            <img src='./../assets/img/logo.png' class="logo-img"/>
        </div>

        <div class="bt-set-container d-flex flex-row justicy-content-start align-items-center p-2 bd-highlight">
            <button class="btn btn-primary bt-nav-fnc" @click="ShowModalAddWindow">
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

            <button class="btn btn-primary bt-nav-fnc" @click="ShowModalEditWindow" :disabled="editButton">
                <svg width="16" height="16" fill="currentColor" class="bi bi-database-fill-add">
                    <use xlink:href="#ico-edit-record"/>
                </svg>
                Edytuj
            </button>

            <button class="btn btn-danger bt-nav-fnc" data-bs-toggle="modal" data-bs-target="#modal-window" :disabled="deleteButton">
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
    <ModalAddWindow v-if="modalAddVisible" @closeModal="HiddeModalAddWindow"/>
    <ModalEditWindow v-if="modalEditVisible" @closeModal="HiddeModalEditWindow" />
</template>
<script>
import SvgIconSet from './iconset.vue';
import { useAuterizationStore } from '@/stores/auterization';
import { useModeratedStore } from '@/stores/moderated';
import { ref, watch } from 'vue';

import ModalAddWindow from './modals/add.vue';
import ModalEditWindow from './modals/edit.vue';

export default {
    name: 'ManuNav',
    components: {
        SvgIconSet,
        ModalAddWindow,
        ModalEditWindow,
  },

  data() {
    return {
        //Modale
        modalAddVisible: false,
        modalAddGroupVisible: false,
        modalEditVisible: false,
        modalDeleteVisible: false,
    }
  },

  setup() {
    //User
    const auterization = useAuterizationStore();

    const userName = ref(auterization.userName);
    const userAvatar = ref(auterization.userAvatar);


    //Moderated
    const moderated = useModeratedStore();

    const editButton = ref(moderated.editButton);
    const deleteButton = ref(moderated.deleteButton);

    watch(
        () => moderated.editButton, (newValue) => {
            editButton.value = newValue;
        }
    );

    watch(
        () => moderated.deleteButton, (newValue) => {
            deleteButton.value = newValue;
        }
    );

    return {
        userName,
        userAvatar,
        
        LogoutUser: auterization.LogoutUser,

        //Moderated
        editButton,
        deleteButton 
    };
  },

  methods: {
    async LogoutProcess() {
        const res = await this.LogoutUser();
        if(res){
            console.log("TEST WYLOGOWANIA");
            this.$router.push('/login');
        }
        else {
            console.log("TEST NIE WYSZEDŁ");
        }
    },

    //Modal dodawanie
    ShowModalAddWindow() {
        this.modalAddVisible = true;
    },

    HiddeModalAddWindow() {
        this.modalAddVisible = false;
    },

    //Modal edycja
    ShowModalEditWindow() {
        this.modalEditVisible = true;
    },

    HiddeModalEditWindow() {
        this.modalEditVisible = false;
    }
  }
}
</script>