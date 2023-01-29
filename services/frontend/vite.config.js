import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: process.env.FRONTEND_PORT,
    host: true,
    watch: {
      usePolling: true,
    }
  },
  build: {
    target: 'esnext',
  },
  chokidarWatchOptions: {
    usePolling: true
  },
  define: {
    'config.API_DOMAIN': JSON.stringify(`${process.env.BACKEND_URL}`),
  }
});
