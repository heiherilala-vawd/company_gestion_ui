import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import istanbul from 'vite-plugin-istanbul'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    // Only enable istanbul when NYC_CAFEOBJECT_COVERAGE is set (for coverage builds)
    ...(process.env.NYC_CAFEOBJECT_COVERAGE
      ? [
          istanbul({
            include: 'src/**/*',
            exclude: ['node_modules/**', 'src/gen-ts/**', 'src/__tests__/**'],
            extension: ['.js', '.ts', '.jsx', '.tsx'],
            requireEnv: false,
            forceBuildInstrument: true,
          }),
        ]
      : []),
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
    allowedHosts: [
      'faceted-banked-outthink.ngrok-free.dev',
      '.ngrok-free.dev', // autorise tous les sous-domaines ngrok
    ],
  },
  build: {
    sourcemap: mode === 'development',
  },
  base: './',
}))
