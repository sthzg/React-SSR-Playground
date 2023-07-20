import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ ssrBuild }) => {
  return {
    plugins: [react()],
    build: {
      minify: false,
      rollupOptions: {
        input: ssrBuild ? 'src/entry-server.jsx' : 'src/entry-client.jsx',
      },
    },
  };
});
