import resolve from 'rollup-plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import minify from 'rollup-plugin-babel-minify';
import typescript from 'rollup-plugin-typescript2';

const prod = process.env.NODE_ENV === 'production';

export default {
  input: 'src/index.ts',
  plugins: [
    typescript(),
    resolve(),
    ...(prod ? [minify({ comments: false })] : [serve('public'), livereload()])
  ],
  output: {
    file: 'public/bundle.js',
    format: 'iife'
  }
};
