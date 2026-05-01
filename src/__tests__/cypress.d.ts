// Type definitions for Cypress
declare global {
  interface Window {
    Cypress?: any
    __cy_app_loaded__?: boolean
  }
}

export {}
