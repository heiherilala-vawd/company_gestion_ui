import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { App } from './core/App'

// Marqueur pour Cypress - signale que l'app est chargée
if (typeof window !== 'undefined' && (window as any).Cypress) {
  ;(window as any).__cy_app_loaded__ = true
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
