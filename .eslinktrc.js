module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
  sourceType: 'module',
  "allowImportExportEverywhere": true  //ignore eslint error: 'import' and 'export' may only appear at the top level
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: 'eslint:recommended',
  // required to lint *.vue files
  plugins: [
    'html',
    'vue'
  ],
  // add your custom rules here
  //it is base on https://github.com/vuejs/eslint-config-vue
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'prettier/prettier': 'off',

  }
}