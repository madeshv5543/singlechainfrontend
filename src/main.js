// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'
// import cssVars from 'css-vars-ponyfill'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'

import VueAxios from 'vue-axios'
import VeeValidate from 'vee-validate';
import Vuelidate from 'vuelidate'
import VueQrcode from "@xkeshi/vue-qrcode";
import VueElementLoading from 'vue-element-loading'
import TreeView from "vue-json-tree-view"
import Datepicker from 'vuejs-datepicker';
import VueGoodTablePlugin from 'vue-good-table';
import Toasted from 'vue-toasted';
import Vuetify from 'vuetify'
 
Vue.use(Vuetify)

import VueTreeNavigation from 'vue-tree-navigation';

Vue.use(VueTreeNavigation);
import 'vue-good-table/dist/vue-good-table.css'

 

import App from './App'
import router from './router'
import Interceptors from './helpers/interceptors';
Interceptors()

// todo
// cssVars()
Vue.use(require('vue-moment'));
Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)
Vue.use(VueGoodTablePlugin);
Vue.use(Toasted)
Vue.use(VeeValidate);
Vue.component(VueQrcode.name, VueQrcode);
Vue.component('VueElementLoading', VueElementLoading)
Vue.component('Datepicker', Datepicker)
Vue.use(TreeView)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
