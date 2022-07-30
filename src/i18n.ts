import Vue from 'vue'
import VueI18n from 'vue-i18n'

import en from './assets/i18n/en.json'
import es from './assets/i18n/es.json'
import pt from './assets/i18n/pt.json'


Vue.use(VueI18n)

// function loadLocaleMessages (): LocaleMessages {
//   const locales = require.context('./', true, /[A-Za-z0-9-_,\s]+\.json$/i)
//   const messages: LocaleMessages = {}
//   locales.keys().forEach(key => {
//     const matched = key.match(/([A-Za-z0-9-_]+)\./i)
//     if (matched && matched.length > 1) {
//       const locale = matched[1]
//       messages[locale] = locales(key)
//     }
//   })
//   return messages
// }

export default new VueI18n({
  //locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  locale: localStorage.getItem('lang') || 'en',
  //fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: {
    en: en,
    es: es,
    pt: pt
  }
})
