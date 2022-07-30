import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import i18n from './i18n'
import axios from 'axios'

const lang = localStorage.getItem('lang') || 'en';
axios.defaults.baseURL = 'http://localhost:3000/';
axios.defaults.headers.common['Accept-Language'] = lang;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
