import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// The build is bundled into ONE file (dist/index.html) so it can be opened
// straight from a folder by double-clicking, or uploaded to any web host.
export default defineConfig({
  base: './',
  plugins: [react(), viteSingleFile()],
  build: { assetsInlineLimit: 100000000 },
});
