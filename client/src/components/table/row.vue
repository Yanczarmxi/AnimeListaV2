<template lang="html">
    <tr class="anime-row-container">
        <th scope="row">
            <div class="ch-container">
                <input class="form-check-input" type="checkbox" v-model="isChecked" @change="CheckboxIndex"/>
            </div>
        </th>

        <td>
            <img src="./../../assets/img/no_img_min.jpg" alt="NO-IMG" class="rounded">
        </td>

        <td>
            <div class="title-container">
                <div class="title-box">
                    <strong class="anime-title">{{ animeTitle }}</strong>
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
</template>
<script>
import { useAnimeIndexStore } from '@/stores/moderated';
import $ from 'jquery';

export default {
    name: 'DataRow',
    data() {
        return {
            epCount: 1, //Aktualny nr odcinka
            mainState: 2,

            checkActive: false,

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

            //adress do aktualizacji rekordu
            updateUrl: process.env.VUE_APP_UPDATE_RECORD
        }
    },

    setup() {
        const animeIndex = useAnimeIndexStore();

        return {
             addToIndex: animeIndex.AddIdToIndex,
             removeFromIndex: animeIndex.RemoveIdFromIndex
        };
    },

    mounted() {
        $(document).on('click', this.handleClickOutside);
    },

    beforeMount() {
        $(document).off('click', this.handleClickOutside);
    },

    methods: {
        SubstractEpisode(){
            if (this.epCount > 1){
                this.epCount--;
            }
            else {
                this.epCount = 1;
            }

            this.ArrowSvgToggler();

            this.UpdateRecord({
                id: this.animeId,
                episode: this.epCount
            });

            console.log('STATUS: ' + this.epCount);
        },

        AddEpisode(){
            if (this.epCount < 12){
                this.epCount++;
            }
            else {
                this.epCount = 12;
            }

            this.ArrowSvgToggler();

            this.UpdateRecord({
                id: this.animeId,
                episode: this.epCount
            });

            console.log('STATUS: ' + this.epCount);
        },

        ArrowSvgToggler() {
            this.nextEpBt = this.epCount == this.animeEpisodes ? this.arrEpNext[1] : this.arrEpNext[0];
            this.backEpBt = this.epCount == 1 ? this.arrEpBack[1] : this.arrEpBack[0];
        },

        //Aktualizajcja Rekordów
        async UpdateRecord(data){
            console.log('Update Record');

            $.ajax({
                url: this.updateUrl,
                type: 'POST',
                data: data,
                success: function(response) {
                    console.log(response);
                },
                error: function(error) {
                    console.log(error);
                }
            });
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
        },

        SetStateOnMenu(st){
            this.SetState(st);
            this.ToggleStateMenu();
            this.UpdateRecord({
                id: this.animeId,
                state: st
            });

            console.log('STATUS: ' + st);
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
        }
    }
}
</script>
<style lang="">
    
</style>