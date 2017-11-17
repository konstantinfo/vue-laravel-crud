<template>
   
            <label :title="videoName">Upload Video</label>
            <input @change="video_preview($event)" name="videofile" type="file" accept="video/*">

<notify :alert="alert"></notify>

</template>

<script>
    export default {
        props: {
            videoSrc: {
                type: String,
                default: ''
            },
        },
        data() {
            return {
                videoName: null,
                alert: {
                    show: false,
                    type: null,
                    title: null,
                    message: null,
                },
            }
        },
        methods: {
            video_preview(event) {
                let input = event.target;
                let files = input.files;

                if (files && files[0]) {
                    if(files[0].type.match('video.*')) {
                        let reader = new FileReader();

                        reader.onload = (e) => {    
                            this.videoSrc = files[0].name;
                            this.videoName = files[0].name;
                        };

                        reader.readAsDataURL(files[0]);

                        this.$dispatch('videoUpdated', files[0]);
                    }
                    else{     
                        this.alert = {
                            show: true,
                            type: 'danger',
                            title: 'Error',
                            message: '.mp4, webm and ogg formats allowed only!'
                        };
                        this.$broadcast('notify', this.alert);
                    }
                }
            }
        }
    }
</script>
