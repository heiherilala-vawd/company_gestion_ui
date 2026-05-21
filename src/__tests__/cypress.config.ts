import { defineConfig } from 'cypress'

export default defineConfig({
  numTestsKeptInMemory: 10,
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || 'http://localhost:5174',
    supportFile: 'src/__tests__/support/e2e.ts',
    specPattern: 'src/__tests__/e2e/**/*.cy.{js,jsx,ts,tsx}',
    video: process.env.CYPRESS_VIDEO === 'true',
    screenshotOnRunFailure: true,
    viewportWidth: Number(process.env.CYPRESS_VIEWPORT_WIDTH) || 1280,
    viewportHeight: Number(process.env.CYPRESS_VIEWPORT_HEIGHT) || 720,
    defaultCommandTimeout: Number(process.env.CYPRESS_DEFAULT_COMMAND_TIMEOUT) || 10000,
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config)
      return config
    },
  },
})
