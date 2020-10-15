import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript';
import pkg from './package.json';

const dependencies = pkg.dependencies;
const external = Object.keys(dependencies);

export default [
  {
    input: 'src/index.ts',
    external,
    plugins: [typescript(), terser()],
    output: [
      { banner: '#! /usr/bin/env node', file: pkg.main, format: 'cjs' },
      { banner: '#! /usr/bin/env node', file: pkg.module, format: 'es' },
    ],
  },
];
