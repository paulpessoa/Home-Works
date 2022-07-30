const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],

  pwa: {
    themeColor: '#6557F5',
    name: 'Home Works',
    msTileColor: '#6557F5',
    manifestOptions: {
      background_color: '#6557F5'
    }
  },

  pluginOptions: {
    i18n: {
      locale: undefined,
      fallbackLocale: undefined,
      localeDir: undefined,
      enableInSFC: undefined,
      enableBridge: undefined
    }
  }
})
