import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Pure React SPA. No SSR — the patina system reads window/localStorage directly.
export default defineConfig({
  plugins: [react()],
});
