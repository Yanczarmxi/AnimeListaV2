import { defineStore } from 'pinia';

export const useAnimeIndexStore = defineStore('AnimeIndex', {
    state: () => ({
        anmIdIndex: [],
        separatorIdIndex: [],

        //Wyłączniki przycisków Edit i Remove
        editDisable: true,
        removeDisable: true
    }),

    getters: {
        anmIndexCount: (state) => state.anmIdIndex.length,
        separatorIndexCount: (state) => state.separatorIdIndex.length
    },

    actions: {
        AddIdToIndex(id) {
            this.anmIdIndex.push(id);
            this.ToggleDisablersButtons();
        },

        RemoveIdFromIndex(id) {
            for(var i=0; i<this.anmIndexCount; i++) {
                if(this.anmIdIndex[i] == id) {
                    this.anmIdIndex.splice(i, 1);
                    break;
                }
            }
            this.ToggleDisablersButtons();
        },

        ToggleDisablersButtons() {
            //if(this.anmIndexCount == 1 ^ this.separatorIndexCount == 1) {
            //    this.editDisable = false;
            //}
            //else {
            //    this.editDisable = true;
            //}

            //if(this.anmIndexCount > 0 ^ this.separatorIndexCount > 0) {
            //    this.removeDisable = false;
            //}
            //else {
            //    this.removeDisable = true;
            //}
            this.removeDisable = !this.removeDisable;
        }
    }
});