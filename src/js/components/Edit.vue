<template>
    <div class="panel panel-default" v-cloak>
        <div class="panel-body">
            <legend>Edit Record</legend>

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
        created() {
            this.$http.get('/api/students/' + this.studentId)
                .then(response => {
                    this.student = response.data;
                })
                .catch(response => {
                    let alert = {
                        show: true,
                        type: 'danger',
                        title: 'Error',
                        message: response.statusText
                    };

                    this.$broadcast('showAlert', alert);
                });
        },
        data() {
            return {
                studentId: this.$route.params.studentId,
                url: '/api/students/',
                student: {},
            }
        },
        events: {
            'submitted'(student) {
                this.submit(student);
            },
        },
        methods: {
            submit(formData) {
                formData.set('_method', 'PUT');

                let url = this.url + this.studentId;

                this.$http.post(url, formData)
                    .then(response => {
                        let alert = {
                            show: true,
                            type: 'success',
                            title: 'Success',
                            message: 'Record successfully updated.'
                        };

                        this.$broadcast('showAlert', alert);

                        setTimeout(function(){ 
                                location.href = '/';
                            }, 1000
                        );  

                    }).catch(response => {
                        let errors = response.body;

                        this.$broadcast('formErrors', errors);
                    });
            }
        }
    }
</script>
