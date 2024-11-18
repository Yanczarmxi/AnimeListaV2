import { defineStore } from 'pinia';

export const useAnimeIndexStore = defineStore('AnimeIndex', {
    state: () => ({
        anmIdIndex: [],
        separatorIdIndex: [],
        counter: 0,

        //Wyłączniki przycisków Edit i Remove
        editDistable: true,
        removeDistable: true
    }),

    getters: {
        anmIndexCount: (state) => state.anmIdIndex.length,
        separatorIndexCount: (state) => state.separatorIdIndex.length
    },

    actions: {
        AddIdToIndex() {
            this.anmIdIndex.push(22);
            this.counter++
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
            this.counter++
        },

        ToggleDisablersButtons() {
            if(this.anmIndexCount == 1) {
                this.editDistable = false;
            }
            else {
                this.editDistable = true;
            }

            if(this.anmIndexCount > 0) {
                this.removeDistable = false;
            }
            else {
                this.removeDistable = true;
            }
        }
    }
});