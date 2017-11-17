const Vuetable = require('vuetable/src/components/Vuetable.vue');
const VuetablePagination = require('vuetable/src/components/VuetablePagination.vue');
const VuetablePaginationDropdown = require('vuetable/src/components/VuetablePaginationDropdown.vue');

const BootstrapPagination = require('./components/BootstrapPagination.vue');

const VuestrapDatepicker = require('vue-strap').datepicker;
const VuestrapAlert = require('vue-strap').alert;

const Pdf = require('./components/Pdf.vue');
const Video = require('./components/Video.vue');
const Actions = require('./components/Actions.vue');
const Notify = require('./components/Notify.vue');
const PdfInput = require('./components/PdfInput.vue');
const VideoInput = require('./components/VideoInput.vue');
const CRUDForm = require('./components/CRUDForm.vue');

Vue.component('vuetable', Vuetable);
Vue.component('vuetable-pagination', VuetablePagination);
Vue.component('vuetable-pagination-dropdown', VuetablePaginationDropdown);

Vue.component('bootstrap-pagination', BootstrapPagination);

Vue.component('datepicker', VuestrapDatepicker);
Vue.component('alert', VuestrapAlert);

Vue.component('pdf', Pdf);
Vue.component('video', Video);
Vue.component('actions', Actions);
Vue.component('notify', Notify);
Vue.component('pdf-input', PdfInput);
Vue.component('video-input', VideoInput);
Vue.component('crud-form', CRUDForm);