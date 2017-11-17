<template>
    <div class="btn-group-vertical" role="group" aria-label="Actions" v-cloak>
        <md-btn
            type="floating"  
            icon-text="visibility" 
            class="green"            
            title="Show"
            @click="showData(rowData)">            
        </md-btn>

        <md-btn
            type="floating"  
            icon-text="create" 
            class="yellow darken-2" 
            title="Edit"
            @click="editData(rowData)">
        </md-btn>

        <md-btn
            type="floating"  
            icon-text="delete" 
            class="red" 
            title="Update"
            @click="deleteData(rowData)">
            <i class="glyphicon glyphicon-trash"></i>
        </md-btn>
    </div>
</template>

<script>
    export default {
        props: {
            rowData: {
                type: Object,
                required: true
            }
        },
        methods: {
            showData(rowData) {
                this.$dispatch('showData', rowData);
            },
            editData(rowData) {
                this.$dispatch('editData', rowData);
            },
            deleteData(rowData) {
                this.$dispatch('deleteData', rowData);
            },
        }
    }
</script>
