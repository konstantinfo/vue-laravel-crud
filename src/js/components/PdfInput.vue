<template>
    
            <label :title="pdfName">Upload PDF</label>
            <input @change="pdf_preview($event)" name="pdffile" type="file" accept="pdf/*">

<notify :alert="alert"></notify>

</template>

<script>
    export default {
        props: {
            pdfSrc: {
                type: String,
                default: ''
            },
        },
        data() {
            return {
                pdfName: null,
                alert: {
                    show: false,
                    type: null,
                    title: null,
                    message: null,
                },
            }
        },
        methods: {
            pdf_preview(event) {
                let input = event.target;
                let files = input.files;

                if (files && files[0]) {
                    if(files[0].type.match('pdf.*')) {                        
                        let reader = new FileReader();

                        reader.onload = (e) => {    
                            this.pdfSrc = files[0].name;
                            this.pdfName = files[0].name;
                        };

                        reader.readAsDataURL(files[0]);

                        this.$dispatch('pdfUpdated', files[0]);
                    }
                    else{     
                        this.alert = {
                            show: true,
                            type: 'danger',
                            title: 'Error',
                            message: '.pdf format allowed only!'
                        };
                        this.$broadcast('notify', this.alert);
                    }
                }
            }
        }
    }
</script>
