import resolve from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import typescript from 'rollup-plugin-typescript2';
import * as fs from 'fs';
import { execSync } from 'child_process';
import * as csso from 'csso';
import uglify from 'uglify-es';

const prod = process.env.NODE_ENV === 'production';
const DEPLOY_DIR = 'docs';

function prodPlugin() {
  return {
    buildEnd() {
      const index = fs.readFileSync('./public/index.html').toString();
      const inject = fs.readFileSync('./public/inject.html').toString();
      const input = fs.readFileSync('./public/styles.css').toString();
      const bundle = fs.readFileSync('./public/bundle.js').toString();

      const output = csso.minify(input).css;

      const replaced = index
        .replace(
          '<script src="./bundle.js"></script>',
          `<script>${uglify.minify(bundle).code}</script>`
        )
        .replace(
          '<link rel="stylesheet" href="./styles.css">',
          `<style>${output}</style>`
        )
        .replace('<!--__INJECT__-->', inject);

      execSync(`rm -rf ./public/bundle.js ./${DEPLOY_DIR}`);
      execSync(`mkdir -p ./${DEPLOY_DIR}`);
      execSync(`cp ./public/* ./${DEPLOY_DIR}`);
      execSync(`rm ./${DEPLOY_DIR}/inject.html ./${DEPLOY_DIR}/styles.css`);
      fs.writeFileSync(`./${DEPLOY_DIR}/index.html`, replaced);
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
        ])
  ],
  output: {
    file: 'public/bundle.js',
    format: 'iife'
  }
};
