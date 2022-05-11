import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  entry: ['src/index.ts'],
  outDir: 'dist',
  platform: 'browser',
  sourcemap: true,
});
