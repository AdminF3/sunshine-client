'use strict';

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  plugins: ['react'],
  rules: {
    'react/jsx-uses-vars': 1,
    'react/jsx-uses-react': 1,
    'react/react-in-jsx-scope': 1,
    'camelcase': 0,
    'complexity': ['error', 15]
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2019,
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: 'eslint-config-stageai',
};
