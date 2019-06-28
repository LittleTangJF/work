import Vue from 'vue'
import App from './App.vue'
import './plugins/axios'
import router from './router'
import store from './store/index.js'
import './plugins/element.js'
import API from './api/api';
import  './assets/jquery-1.8.0'
import  './assets/css/common.css'
Vue.prototype.$API = API;
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
