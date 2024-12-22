<template lang="html">
    <tr class="anime-row-container">
        <th scope="row">
            <div class="ch-container">
                <input class="form-check-input" type="checkbox" v-model="isChecked" @change="CheckboxIndex"/>
            </div>
        </th>

        <td>
            <img :src="animeImg" alt="NO-IMG" class="rounded">
        </td>

        <td>
            <div class="title-container">
                <div class="title-box">
                    <strong class="anime-title" @click="ShowDescryption()">{{ animeTitle }}</strong>
                    <small class="anime-add-record-date">{{ animeDate }}</small>
                </div>
                <div class="link-box">
                    <button class="btn btn-primary">
                        <svg width="16" height="16" fill="currentColor" class="bi bi-database-fill-add">
                            <use xlink:href="#ico-hyperlink"/>
                        </svg>
                    </button>
                </div>
            </div>
        </td>

        <td>
            <div class="anm-epst-container">
                <div class="anm-epbt-container">
                    <div class="dbt" type="button" @click="SubstractEpisode()">
                        <svg width="16" height="16" fill="currentColor" class="bi bi-database-fill-add">
                            <use :xlink:href="backEpBt"/>
                        </svg>
                    </div>
                    <div class="txt-ep-nuber-view">{{ epCount }}</div>
                    <div class="dbt" type="button" @click="AddEpisode()">
                        <svg width="16" height="16" fill="currentColor" class="bi bi-database-fill-add">
                            <use :xlink:href="nextEpBt"/>
                        </svg>
                    </div>
                </div>
                <div class="anm-stsl-container">

                    <div class="watch-state-selector" :class="stateMenuRadius" @click="ToggleStateMenu"  ref="rfStateMenu">
                        <div class="watch-txt-content">
                            <svg width="16" height="16" fill="currentColor" :class="stateColor">
                                <use :xlink:href="stateIcon"/>
                            </svg>

                            <div class="state-select-txt">{{ stateName }}</div>
                        </div>

                        <svg width="16" height="16" fill="currentColor" class="bi bi-database-fill-add">
                            <use xlink:href="#ico-down"/>
                        </svg>
                    </div>

                    <div class="watch-state-hover-menu" v-show="isVisible">

                        <div class="state-select" @click="SetStateOnMenu(0)">
                            <div class="state-select-content">
                                <svg width="16" height="16" fill="currentColor" class="svg-nowatched">
                                    <use xlink:href="#ico-nowatch"/>
                                </svg>

                                <div class="state-select-txt">Planuję</div>
                            </div>
                        </div>

                        <div class="state-select" @click="SetStateOnMenu(1)">
                            <div class="state-select-content">
                                <svg width="16" height="16" fill="currentColor" class="svg-watch">
                                    <use xlink:href="#ico-watch"/>
                                </svg>

                                <div class="state-select-txt">Oglądam</div>
                            </div>
                        </div>

                        <div class="state-select" @click="SetStateOnMenu(2)">
                            <div class="state-select-content">
                                <svg width="16" height="16" fill="currentColor" class="svg-watched">
                                    <use xlink:href="#ico-watched"/>
                                </svg>

                                <div class="state-select-txt">Obejżane</div>
                            </div>
                        </div>

                        <div class="state-select" @click="SetStateOnMenu(3)">
                            <div class="state-select-content">
                                <svg width="16" height="16" fill="currentColor" class="svg-canceled">
                                    <use xlink:href="#ico-canceled"/>
                                </svg>

                                <div class="state-select-txt">Porzucone</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </td>

    </tr>
    <template v-if="desActive">
        <RowDescription :data="desData" @desRow="CloseDescryption"/>
    </template>
</template>
<script>
import { useAnimeIndexStore } from '@/stores/moderated';
import { useAnimeStore } from '@/stores/anime'

import RowDescription from './rowinfo.vue';

export default {
    name: 'DataRow',
    components: {
        RowDescription
    },
    props: {
        data: Object
    },
    data() {
        return {
            epCount: 1, //Aktualny nr odcinka
            mainState: 2,

            checkActive: false,

            desActive: false, //Wyświetla opis
            desData: {},

            stateName: 'Planuję',
            stateIcon: '#ico-nowatch',
            stateColor: 'svg-nowatched',

            //Przewijanie epizodów
            nextEpBt: '#ico-next',
            backEpBt: '#ico-back',

            arrEpNext: ['#ico-next', '#ico-next-border'],
            arrEpBack: ['#ico-back', '#ico-back-border'],

            //menu border
            stateMenuRadius: 'watch-state-selector-radius-hidden-menu',
            stateRadius: ['watch-state-selector-radius-hidden-menu', 'watch-state-selector-radius-visible-menu'],


            //Tablica Ustawień statusów
            arrName: ['Planuję', 'Oglądam', 'Obejżane', 'Porzucone'],
            arrSvgIcon: ['#ico-nowatch', '#ico-watch', '#ico-watched', '#ico-canceled'],
            arrSvgColor: ['svg-nowatched', 'svg-watch', 'svg-watched', 'svg-canceled'],

            //menu statusu
            isVisible: false,

            //checkbox status
            isChecked: false,

            //stałe
            animeId: 1, //ID klucza rekordu
            animeEpisodes: 12,   //Liczba odcinków
            animeTitle: 'Hi mom!',  //Tytuł anime
            animeDate: '1970-01-01',    //Data dodania do bazydanych
            animeLink: 'https://example.com',   //Link do odcinka
            animeState: 3,   //Status oglądania 0-Nie obejżane, 1-Oglądam, 2-Obejżane, 3-Porzucone
            animeImg: require('@/assets/img/no_img_min.jpg'), //Link do obrazka

            //adress do aktualizacji rekordu
            updateUrl: process.env.VUE_APP_UPDATE_RECORD
        }
    },

    setup() {
        const animeIndex = useAnimeIndexStore();
        const animeStore = useAnimeStore();

        return {
             addToIndex: animeIndex.AddIdToIndex,
             removeFromIndex: animeIndex.RemoveIdFromIndex,

             UpdateRecord: animeStore.UpdateRecord,
             GetDescription: animeStore.GetDescription,
        };
    },

    mounted() {
        document.addEventListener('click', this.handleClickOutside);

        //Ustawianie danych
        this.animeId = this.data.id;
        this.animeTitle = this.data.title;
        this.animeDate = this.data.date;
        this.animeLink = this.data.url;


        if(this.data.img) {
            this.animeImg = 'data:image/jpeg;base64,' + this.data.img;
        }


        this.SetState(this.data.fav.status);
        this.SetEpisode(this.data.fav.episode);
    },

    beforeMount() {
        document.removeEventListener('click', this.handleClickOutside)
    },

    methods: {
        SubstractEpisode(){
            if (this.epCount > 1){
                this.epCount--;

                this.ArrowSvgToggler();
                this.UpdateRecord({
                    id: this.animeId,
                    episode: this.epCount
                });
            }
            else {
                this.epCount = 1;
            }

            console.log('STATUS: ' + this.epCount);
        },

        AddEpisode(){
            if (this.epCount < 12){
                this.epCount++;

                this.ArrowSvgToggler();
                this.UpdateRecord({
                    id: this.animeId,
                    episode: this.epCount
                });
            }
            else {
                this.epCount = 12;
            }

            console.log('STATUS: ' + this.epCount);
        },

        SetEpisode(ep){
            this.epCount = ep;
            this.ArrowSvgToggler();
        },

        ArrowSvgToggler() {
            this.nextEpBt = this.epCount == this.animeEpisodes ? this.arrEpNext[1] : this.arrEpNext[0];
            this.backEpBt = this.epCount == 1 ? this.arrEpBack[1] : this.arrEpBack[0];
        },

        //Status oglądania
        ToggleStateMenu(){
            this.isVisible = !this.isVisible;
            this.stateMenuRadius = this.stateRadius[Number(this.isVisible)];

        },

        SetState(st){
            this.stateName = this.arrName[st];
            this.stateIcon = this.arrSvgIcon[st];
            this.stateColor = this.arrSvgColor[st];
            this.animeState = st;
        },

        SetStateOnMenu(st){
            this.SetState(st);
            this.ToggleStateMenu();
            this.UpdateRecord({
                id: this.animeId,
                status: st
            });
        },

        //Zamknij menu
        handleClickOutside(event){
            if(this.isVisible && this.$refs.rfStateMenu && !this.$refs.rfStateMenu.contains(event.target)) {
                this.isVisible = false;
                this.stateMenuRadius = this.stateRadius[0];
            }
        },

        //Dodanie lub usunięcie id z indexu checkbox
        CheckboxIndex() {
            if(this.isChecked) {
                this.addToIndex(this.animeId);
            }
            else {
                this.removeFromIndex(this.animeId);
            }
        },

        async ShowDescryption(){
            //this.desActive = !this.desActive;
            if(!this.desActive){
                this.desData = await this.GetDescription(this.animeId);
                if(this.desData) {
                    this.desActive = true;
                }
                else {
                    console.log('NIE UDAŁO SIĘ POBRAĆ DANYCH DESCRIPTION :C');
                }
            }
            else {
                this.CloseDescryption();
            }
        },

        CloseDescryption(){
            this.desActive = false;
        }
    }
}
</script>