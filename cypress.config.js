const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportWidth: 1440,
  viewportHeight: 768,
  defaultCommandTimeout: 10000,
  video: false,
  chromeWebSecurity: false,
  e2e: {

  },
})
