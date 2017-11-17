<template>
    <div class="panel panel-default" v-cloak>
        <div class="panel-body">
            <div class="row">
                <div class="col-md-6">
                    <p>
                        <label>Name:</label>
                        {{ student.name }}
                    </p>                   

                    <p>
                        <label>PDF:</label>
                        <span v-if="student.pdf != false">
                            <a :href="student.pdf" target="_blank">
                                <img
                                    width="50"
                                    src="/img/pdf.png"
                                    :alt="student.pdf"
                                    :title="student.pdf"
                                    class="img-thumbnail img-responsive pdf">
                            </a>
                        </span>
                        <span v-else>
                            No PDF Uploaded
                        </span>
                    </p>

                    <p>
                        <label>Video:</label>
                        <span v-if="student.video !== false">
                            <a :href="student.video" target="_blank">
                                <img
                                    width="50"
                                    src="/img/video.png"
                                    :alt="student.video"
                                    :title="student.video"
                                    class="img-thumbnail img-responsive video">
                            </a>
                        </span>
                        <span v-else>
                            No Video Uploaded   
                        </span>
                    </p>
                    
                </div>
            </div>
        </div>
    </div>

    <div class="text-center">
        <md-btn icon-text="arrow_back" small icon-pos="left" v-link="{ name: 'index' }">            
            Back
        </md-btn>
    </div>

    <notify :alert="alert"></notify>
</template>

<script>
    export default {
        created() {
            this.$http.get('/api/students/' + this.$route.params.studentId)
                .then(response => {
                    this.student = response.data;

                    if(! this.student.pdf) {
                        this.student.pdf = false;
                    }
                    else{
                        this.student.pdf = '/storage/pdfs/' + this.student.pdf; 
                    }

                    if(! this.student.video) {
                        this.student.video = false;
                    }
                    else{
                        this.student.video = '/storage/videos/' + this.student.video; 
                    }
                })
                .catch(response => {
                    this.alert = {
                        show: true,
                        type: 'danger',
                        title: 'Error',
                        message: response.statusText
                    };

                    this.$broadcast('notify', this.alert);
                });
        },
        data() {
            return {
                student: {},
                alert: {
                    show: false,
                    type: null,
                    title: null,
                    message: null,
                },
            };
        }
    }
</script>
