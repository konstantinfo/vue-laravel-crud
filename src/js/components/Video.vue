<template>
    <div v-if="video !== false">
        <a :href="videolink" target="_blank">
            <img
                :src="video"
                :alt="rowData.video"
                :title="rowData.video"
                class="img-thumbnail img-responsive video">
        </a>
    </div>
    <div v-else>
        <label>No Video</label>
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
            video() {
                if(! this.rowData.video) {
                    return false;
                }
                else{
                    return '/img/video.png';
                }
            },
            videolink() {
                return this.$apiUrl+'/storage/videos/' + this.rowData.video;
            },
        }
    }
</script>
