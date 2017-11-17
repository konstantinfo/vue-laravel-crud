<template>
    <div class="panel panel-default" v-cloak>
        <div class="panel-body">
            <legend>Create Record</legend>

            <crud-form :student="student"></crud-form>

            <div class="text-center mrg-top-1em">                
                <md-btn icon-text="arrow_back" small icon-pos="left" v-link="{ name: 'index' }">            
                    Back
                </md-btn>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                url: '/api/students',
                student: {
                    pdf: '',
                    video: '',
                    name: ''
                }
            }
        },
        events: {
            'submitted'(student) {
                this.submit(student);
            },
        },
        methods: {
            submit(formData) {
                this.$http.post(this.url, formData)
                    .then(response => {
                        let alert = {
                            show: true,
                            type: 'success',
                            title: 'Success',
                            message: 'Record successfully created.'
                        };

                        this.$broadcast('showAlert', alert);

                        this.resetForm();
                        setTimeout(function(){ 
                                location.href = '/';
                            }, 1000
                        );                        

                    }).catch(response => {
                        let errors = response.body;

                        this.$broadcast('formErrors', errors);
                    });
            },
            resetForm() {
                this.student = {
                    pdf: '',
                    video: '',
                    name: ''
                }
            }
        }
    }
</script>
