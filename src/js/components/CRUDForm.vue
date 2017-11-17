<template>
    <form @submit.prevent="submit" novalidate v-cloak>
        <div class="row">
            <div class="col-md-6">
                <div
                    class="form-group"
                    :class="{ 'has-error': errors['name'] }">
                    <label class="control-label" for="name">
                        Name
                    </label>

                    <input
                        v-model="student.name"
                        type="text"
                        class="form-control"
                        id="name"
                        placeholder="Name...">

                    <span class="help-block" v-for="error of errors['name']">
                        {{ error }}
                    </span>
                </div>

                    <div class="form-group">
                        
                        <pdf-input :pdf-src="pdfSrc"></pdf-input>

                        <div class="mrg-top-1em text-danger" v-for="error of errors['pdf']">
                            {{ error }}
                        </div>
                    </div>

                    <div class="form-group">
                        
                        <video-input :video-src="videoSrc"></video-input>

                        <div class="mrg-top-1em text-danger" v-for="error of errors['video']">
                            {{ error }}
                        </div>
                    </div>


            </div>
        </div>

        <div class="row mrg-top-1em">
            <div class="col-md-12 text-center">
                <button class="btn btn-primary">
                    <i class="material-icons right">send</i>
                    Save
                </button>
            </div>
        </div>
    </form>

    <notify :alert="alert"></notify>
</template>

<script>
    export default {
        props: {
            student: {
                type: Object,
                required: true
            },
        },
        created() {},
        data() {
            return {
                alert: {
                    show: false,
                    type: null,
                    title: null,
                    message: null,
                },
                errors: {}
            }
        },
        computed: {
            pdfSrc() {
                if(this.student.pdf instanceof File === false) {
                    if(this.student.pdf !== undefined) {
                        let pdf = this.student.pdf;

                        if(! pdf) {
                            pdf = '';
                        }

                        return pdf;
                    }
                }
            },
            videoSrc() {
                if(this.student.video instanceof File === false) {
                    if(this.student.video !== undefined) {
                        let video = this.student.video;

                        if(! video) {
                            video = '';
                        }

                        return video;
                    }
                }
            }
        },
        methods: {
            submit() {
                let formData = new FormData();

                if(this.student.pdf instanceof File) {
                    formData.set('pdf', this.student.pdf);
                }

                if(this.student.video instanceof File) {
                    formData.set('video', this.student.video);
                }

                formData.set('name', this.student.name);
                
                this.$dispatch('submitted', formData);
            }
        },
        events: {
            'pdfUpdated'(pdfFile) {
                this.student.pdf = pdfFile;
            },
            'videoUpdated'(videoFile) {
                this.student.video = videoFile;
            },
            'formErrors'(errors) {
                this.errors = errors;
            },
            'showAlert'(alert) {
                this.alert = alert;

                this.$broadcast('notify', this.alert);

                this.errors = {};
            },
        },
    }
</script>
