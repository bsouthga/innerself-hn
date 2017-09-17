import resolve from 'rollup-plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import typescript from 'rollup-plugin-typescript2';
import * as fs from 'fs';
import { execSync } from 'child_process';
import * as CleanCSS from 'clean-css';
import { minify } from 'uglify-es';

const prod = process.env.NODE_ENV === 'production';

function prodPlugin() {
  return {
    transformBundle(source) {
      return minify(source).code.replace(/\s+/g, ' ');
    },
    onwrite() {
      const index = fs.readFileSync('./public/index.html').toString();
      const redirect = fs.readFileSync('./public/redirect.html').toString();
      const replaced = index.replace('<!--__REDIRECT__-->', redirect);
      const input = fs.readFileSync('./public/styles.css');
      const output = new CleanCSS({}).minify(input);
      execSync('rm -rf ./public-gh-pages');
      execSync('mkdir -p ./public-gh-pages');
      execSync('cp ./public/* ./public-gh-pages');
      execSync('rm ./public-gh-pages/redirect.html');
      execSync('touch ./public-gh-pages/.nojekyll');
      fs.writeFileSync('./public-gh-pages/index.html', replaced);
      fs.writeFileSync('./public-gh-pages/styles.css', output.styles);
    }
  };
}

export default {
  input: 'src/index.ts',
  plugins: [
    typescript(),
    resolve(),
    ...(prod
      ? [prodPlugin()]
      : [
          serve({ contentBase: 'public', historyApiFallback: true }),
          livereload()
        ])
  ],
  output: {
    file: 'public/bundle.js',
    format: 'iife'
  }
};
