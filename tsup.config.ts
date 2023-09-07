import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  outDir: 'dist',
  platform: 'browser',
  sourcemap: true,
});
