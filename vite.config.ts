import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import istanbul from 'vite-plugin-istanbul'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    istanbul({
      include: 'src/*',
      exclude: ['node_modules', 'test/', 'src/__tests__/'],
      extension: ['.js', '.ts', '.jsx', '.tsx'],
      requireEnv: true,
    }),
  ],
  server: {
    port: 5173,
    proxy: {
      '/auth': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        configure: (proxy, options) => {
          proxy.on('error', (err, req, res) => {
            console.log('proxy error', err)
          })
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('Proxying:', req.method, req.url, '->', 'http://localhost:8080' + req.url)
          })
        },
      },
      '/users': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
      '/companies': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
      '/materials': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
      '/equipment': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
      '/warehouses': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
      '/histories': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
      '/jobs': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    sourcemap: mode === 'development',
  },
  base: './',
}))
