import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // any request that starts with /api will be forwarded...
      '/api': {
        target: 'http://localhost:8000',  // <-- your backend
        changeOrigin: true,                // needed for virtual hosted sites
        secure: false,                     // if you’re using self‑signed SSL
        // rewrite removes the `/api` prefix when sending to the target
        // if your backend endpoint is also /api/tags, you can omit rewrite
        // rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
})