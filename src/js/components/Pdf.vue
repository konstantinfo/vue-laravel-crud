<template>
    <div v-if="pdf !== false">
        <a :href="pdflink" target="_blank">
            <img
                :src="pdf"
                :alt="rowData.pdf"
                :title="rowData.pdf"
                class="img-thumbnail img-responsive pdf">
        </a>
    </div>
    <div v-else>
        <label>No PDF</label>
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
        computed: {
            pdf() {
                if(! this.rowData.pdf) {
                    return false;
                }
                else{
                    return '/img/pdf.png';
                }
            },
            pdflink() {
                return this.$apiUrl+'/storage/pdfs/' + this.rowData.pdf;
            },
        }
    }
</script>
