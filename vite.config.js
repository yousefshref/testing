import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// The API key is read from .env and added by the dev-server proxy,
// so it never ends up in the browser bundle.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        '/api/send-whatsapp': {
          target: 'https://api.ycloud.com',
          changeOrigin: true,
          rewrite: () => '/v2/whatsapp/messages',
          headers: { 'X-API-Key': env.YCLOUD_API_KEY || '' },
        },
      },
    },
  }
})
