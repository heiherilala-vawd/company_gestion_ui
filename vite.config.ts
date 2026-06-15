import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import istanbul from 'vite-plugin-istanbul'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const PROXY_TARGET = env.VITE_PROXY_TARGET || 'http://localhost:8080'
  const NGROK_HOST = env.VITE_NGROK_HOST || ''

  const allowedHosts: string[] = []
  if (NGROK_HOST) {
    allowedHosts.push(NGROK_HOST, `.${NGROK_HOST.replace(/^\.?/, '')}`)
  }

  return {
  plugins: [
    react(),
    // Only enable istanbul when VITE_COVERAGE is set (for coverage builds)
    ...(env.VITE_COVERAGE
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
        target: PROXY_TARGET,
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on('error', (err, req, res) => {
            console.log('proxy error', err)
          })
          proxy.on('proxyReq', (proxyReq, req) => {
            console.log('Proxying:', req.method, req.url, '->', PROXY_TARGET + req.url)
          })
        },
      },
      '/users': {
        target: PROXY_TARGET,
        changeOrigin: true,
        secure: false,
      },
      '/companies': {
        target: PROXY_TARGET,
        changeOrigin: true,
        secure: false,
      },
      '/materials': {
        target: PROXY_TARGET,
        changeOrigin: true,
        secure: false,
      },
      '/equipment': {
        target: PROXY_TARGET,
        changeOrigin: true,
        secure: false,
      },
      '/warehouses': {
        target: PROXY_TARGET,
        changeOrigin: true,
        secure: false,
      },
      '/histories': {
        target: PROXY_TARGET,
        changeOrigin: true,
        secure: false,
      },
      '/jobs': {
        target: PROXY_TARGET,
        changeOrigin: true,
        secure: false,
      },
    },
    allowedHosts: allowedHosts.length > 0 ? allowedHosts : undefined,
  },
  build: {
    sourcemap: mode === 'development',
    minify: env.VITE_COVERAGE ? false : 'esbuild',
  },
  base: '/',
  }
})
