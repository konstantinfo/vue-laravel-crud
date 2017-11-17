/**
 * custom packages/plugins
 */
window.VueRouter = require('vue-router');
Vue.use(VueRouter);

window.moment = require('moment');

window.swal = require('sweetalert2');

import Material from 'vue-material';
Material.regAll(Vue);