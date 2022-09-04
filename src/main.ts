import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import i18n from './i18n'
import axios from 'axios'

const accessToken = sessionStorage.getItem('accessToken') || 'null';
const lang = localStorage.getItem('lang') || 'en';
axios.defaults.baseURL = 'https://homeworks-api.me/';
axios.defaults.headers.common['Accept-Language'] = lang;
axios.defaults.headers.common['x-access-token'] = accessToken;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
