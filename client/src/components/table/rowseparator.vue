<template lang="html">
    <tr>
        <td>
            <div class="ch-separator">
                <input class="form-check-input" type="checkbox" id="flexCheckDefault" v-model="isChecked" @change="CheckboxHandle">
            </div>
        </td>

        <td colspan="3">

        <div class="row-separator">
            <div class="separate-string">{{ groupTitle }}</div>
        </div>

    </td></tr>
</template>
<script>
import { useModeratedStore } from '@/stores/moderated';

export default {
    name: 'RowSeparator',
    props: {
        grData: Object
    },

    data() {
        return {
            isChecked: false,
            
            groupTitle: '',
            groupId: 0,
        }
    },

    mounted() {
        this.groupId = this.grData.grId;
        this.groupTitle = this.grData.grTitle;
    },

    setup() {
        const moderated = useModeratedStore();
        
        return {
            AddIdToStore: moderated.AddIdToStore,
            DeleteIdFromStore: moderated.DeleteIdFromStore,
        };
    },
    
    methods: {
        CheckboxHandle() {
            console.log(`Checkbox: ${this.isChecked}`);
            if(this.isChecked) {
                console.log(`Dodano index: ${this.groupId}`);
                this.AddIdToStore(this.groupId, true);
            }
            else {
                console.log(`Usunięto index: ${this.groupId}`);
                this.DeleteIdFromStore(this.groupId, true);
            }
        }
    }
}
</script>