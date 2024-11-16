<template lang="">
    <SvgIconSet />
    <!-- Menu Główne -->
    <nav class="navbar navbar-dark bg-dark nav-menu">
        <div class="logo-container">
            <img src='./../assets/img/logo.png' class="logo-img"/>
        </div>

        <div class="bt-set-container">
            <button class="btn btn-primary bt-nav-fnc">
                <svg width="16" height="16" fill="currentColor" class="bi bi-database-fill-add">
                    <use xlink:href="#ico-add-record"/>
                </svg>
                Dodaj Anime
            </button>

            <button class="btn btn-primary bt-nav-fnc">
                <svg width="16" height="16" fill="currentColor" class="bi bi-database-fill-add">
                    <use xlink:href="#ico-add-group"/>
                </svg>
                Dodaj Grupę
            </button>

            <button class="btn btn-primary bt-nav-fnc">
                <svg width="16" height="16" fill="currentColor" class="bi bi-database-fill-add">
                    <use xlink:href="#ico-edit-record"/>
                </svg>
                Edytuj
            </button>

            <button class="btn btn-danger bt-nav-fnc">
                <svg width="16" height="16" fill="currentColor" class="bi bi-database-fill-add" disabled>
                    <use xlink:href="#ico-remove-record"/>
                </svg>
                Skasuj
            </button>
        </div>

        <div class="user-container">
            <div class=".user-img-container">
                <img src='./../assets/img/user_avatar.jpg' class="user-img"/>
            </div>

            <div class="user-name-container">
                {{userName}}
            </div>

            <button class="btn btn-danger user-bt-logout">
                <svg width="16" height="16" fill="currentColor" class="bi bi-database-fill-add">
                    <use xlink:href="#ico-logout"/>
                </svg>
            </button>

        </div>
    </nav>
</template>
<script>
import SvgIconSet from './iconset.vue'

export default {
    name: 'ManuNav',
    components: {
        SvgIconSet
  },
  data() {
    return {
        userName: 'Yanczi'
    }
  }
}
</script>
<style lang="">
    
</style>