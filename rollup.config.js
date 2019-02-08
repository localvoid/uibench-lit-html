import { terser } from 'rollup-plugin-terser';
import nodeResolve from 'rollup-plugin-node-resolve';
import minifyHTML from 'rollup-plugin-minify-html-literals';

export default {
  input: `src/main.js`,
  output: { file: `docs/main.js`, format: 'iife' },
  plugins: [
    nodeResolve(),
    minifyHTML(),
    terser({ warnings: true, mangle: { module: true } })
  ]
};