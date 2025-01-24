import { defineStore } from 'pinia';

export const useModeratedStore = defineStore('Moderated', {
    state: () => ({
        //editButton: true,
        //deleteButton: true,

        checkIdAnimeStore: [],
        checkIdGroupStore: [],
    }),

    getters: {
        editButton(state) {
            const groupLen = state.checkIdGroupStore.length;
            const animeLen = state.checkIdAnimeStore.length;
      
            if(animeLen > 0 || groupLen > 0) {
                if(animeLen > 0 && groupLen > 0) {
                    return true;
                }

                if(animeLen > 1 || groupLen > 1) {
                    return true;
                }

                return false;
            }
            return true;
        },

        deleteButton(state) {
            const gouprLen = state.checkIdGroupStore.length;
            const animeLen = state.checkIdAnimeStore.length;
            
            // Przyciski usuwania aktywny tylko gdy oba length są 0
            return !(gouprLen > 0 || animeLen > 0);
        }
    },

    actions: {
        AddIdToStore(data, isGroup = false) {
            if(isGroup) {
                this.checkIdGroupStore.push(data);
                console.log(this.checkIdGroupStore);
            }
            else {
                this.checkIdAnimeStore.push(data);
                console.log(this.checkIdAnimeStore);
            }
            //this.ActiveTogglerButton();
        },

        DeleteIdFromStore(data, isGroup = false) {
            if(isGroup) {
                for(var i=0; i < this.checkIdGroupStore.length; i++) {
                    if(this.checkIdGroupStore[i] === data) {
                        this.checkIdGroupStore.splice(i, 1);
                        i--;
                    }
                }
                console.log(this.checkIdGroupStore);
            }
            else {
                for(var j=0; j < this.checkIdAnimeStore.length; j++) {
                    if(this.checkIdAnimeStore[j] === data) {
                        this.checkIdAnimeStore.splice(j, 1);
                        j--;
                    }
                }
                console.log(this.checkIdAnimeStore);
            }

            //this.ActiveTogglerButton();
        },

        ActiveTogglerButton(){
            const gouprLen = this.checkIdGroupStore.length;
            const animeLen = this.checkIdAnimeStore.length;
    
            if(gouprLen > 0 || animeLen > 0) {
                this.deleteButton = false;
                
                if((gouprLen > 0 && animeLen > 0) || (gouprLen > 1 || animeLen > 1)) {
                    this.editButton = true;
                }
                else {
                    this.editButton = false;
                }
            }
            else {
                this.deleteButton = true;
                this.editButton = true;
            }
        },

        ResetIndex() {
            console.log("Zresetowano index");
            this.checkIdAnimeStore = [];
            this.checkIdGroupStore = [];
        }
    }
});