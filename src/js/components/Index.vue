<template>
    <div class="row" v-cloak>
        <div class="col-md-8">
            <div class="form-inline form-group">
                <label>Search:</label>

                <input
                    v-model="search"
                    class="form-control"
                    debounce="500"
                > 

                <md-btn icon-text="visibility" small icon-pos="left" v-on:click="records('all')">Show All</md-btn>
                <md-btn icon-text="note" small icon-pos="left" v-on:click="records('pdf')">Only PDF</md-btn>
                <md-btn icon-text="movie" small icon-pos="left" v-on:click="records('video')">Only Videos</md-btn>

            </div>
        </div>

        <div class="col-md-4">
            <div class="dropdown form-inline pull-right">
                <label>Per Page:</label>

                <select class="form-control" v-model="perPage">
                    <option value=10>10</option>
                    <option value=25>25</option>
                    <option value=50>50</option>
                    <option value=75>75</option>
                    <option value=100>100</option>
                </select>
            </div>
        </div>

        <div class="col-md-12 text-right">
            <md-btn icon-text="add" large icon-pos="left" v-link="{ name: 'create' }">Create New Record</md-btn>
        </div>
        

    </div>

    <div class="table-responsive" v-cloak>
        <vuetable
                :api-url="url"
                :pagination-path="paginationPath"
                :per-page="perPage"
                :fields="fields"
                :sort-order="sortOrder"
                :table-class="tableClass"
                :ascending-icon="ascendingIcon"
                :descending-icon="descendingIcon"
                :item-actions="itemActions"
                :append-params="appendParams"
                :wrapper-class="wrapperClass"
                :table-wrapper="tableWrapper"
                :loading-class="loadingClass"
                :pagination-component="paginationComponent"
        ></vuetable>
    </div>    

    <notify :alert="alert"></notify>
</template>

<script>
    export default {
        data() {
            return {
                url: this.$apiUrl+'/api/students',
                paginationPath: '',
                search: '',
                perPage: 10,
                fields: [
                    {
                        title: 'Index',
                        name: '__sequence',
                        titleClass: 'text-center col-sm-1',
                        dataClass: 'text-center',
                    },
                    {
                        title: 'Name',
                        name: 'name',
                        sortField: 'name',
                        titleClass: 'text-center col-sm-3',
                        dataClass: 'text-center',
                    },
                    {
                        title: 'PDF',
                        name: '__component:pdf',
                        titleClass: 'text-center col-sm-2',
                        dataClass: 'text-center',
                    },
                    {
                        title: 'Video',
                        name: '__component:video',
                        titleClass: 'text-center col-sm-2',
                        dataClass: 'text-center',
                    },
                    {
                        title: 'Actions',
                        name: '__component:actions',
                        titleClass: 'text-center col-sm-1',
                        dataClass: 'text-center',
                    },
                ],
                sortOrder: [
                    {
                        field: 'id',
                        direction: 'desc'
                    }
                ],
                tableClass: 'table table-bordered table-hover',
                ascendingIcon: 'glyphicon glyphicon-menu-up pull-right',
                descendingIcon: 'glyphicon glyphicon-menu-down pull-right',
                appendParams: [],
                wrapperClass: 'vuetable-wrapper ',
                tableWrapper: '.vuetable-wrapper',
                paginationComponent: 'bootstrap-pagination',
                alert: {
                    show: false,
                    type: null,
                    title: null,
                    message: null,
                },
            }
        },
        watch: {
            'search'(newValue, oldValue) {
                this.setFilter()
            },
            'perPage'(newValue, oldValue) {
                this.$broadcast('vuetable:refresh')
            },
        },
        methods: {
            /**
             * Other functions
             */
             
            records(message) {
                this.appendParams = [
                    'type=' + message, 'search=' + this.search
                ];

                this.$nextTick(function () {
                    this.$broadcast('vuetable:refresh')
                })
            },
            setFilter() {
                this.appendParams = [
                    'search=' + this.search
                ];

                this.$nextTick(function () {
                    this.$broadcast('vuetable:refresh')
                })
            },
            resetFilter() {
                this.search = '';

                this.setFilter()
            },
            preg_quote(str) {
                return (str + '').replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g, "\\$1");
            },
            highlight(needle, haystack) {
                return haystack.replace(
                    new RegExp('(' + this.preg_quote(needle) + ')', 'ig'),
                    '<span class="highlight">$1</span>'
                )
            },
            paginationConfig(componentName) {
                this.$broadcast('vuetable-pagination:set-options', {
                    wrapperClass: 'pagination pull-right',
                    icons: {
                        first: '',
                        prev: '',
                        next: '',
                        last: ''
                    },
                    activeClass: 'active',
                    linkClass: '',
                    pageClass: ''
                })
            }
        },
        events: {
            'vuetable:load-success'(response) {
                let data = response.data.data;

                if (this.search !== '') {
                    for (let index in data) {
                        data[index].name = this.highlight(this.search, data[index].name);
                    }
                }
            },
            'vuetable:load-error'(response) {
                this.alert = {
                    show: true,
                    type: 'danger',
                    title: 'Error',
                    message: response.statusText
                };

                this.$broadcast('notify', this.alert);
            },
            'showData'(rowData) {
                this.$route.router.go({ name: 'show', params: { studentId: rowData.id } })
            },
            'editData'(rowData) {
                this.$route.router.go({ name: 'edit', params: { studentId: rowData.id } })
            },
            'deleteData'(rowData) {
                swal({
                    title: 'Confirmation',
                    text: 'Are you sure you want to delete this data?',
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    showLoaderOnConfirm: true
                }).then(() => {
                    swal.disableButtons();

                    let formData = new FormData();

                    formData.set('_method', 'DELETE');

                    let url = this.url + '/' + rowData.id;

                    Vue.http.post(url, formData)
                        .then(response => {
                            swal(
                                'Success',
                                'Your data has been deleted.',
                                'success'
                            );

                            this.$broadcast('vuetable:refresh');
                        }).catch(response => {
                            swal(
                                    'Error',
                                    'Failed to delete your data.',
                                    'error'
                            );
                        });
                })
            },
        }
    }
</script>
