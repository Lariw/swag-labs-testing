const { defineConfig } = require('cypress')

module.exports = defineConfig({
  env: {
    project: 'maintenance',
    env: 'staging',
  },
  viewportWidth: 1440,
  viewportHeight: 768,
  defaultCommandTimeout: 90000,
  video: false,
  chromeWebSecurity: false,
  e2e: {

  },
})
