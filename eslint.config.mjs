import globals from 'globals';
import pluginJs from '@eslint/js';
import daStyle from 'eslint-config-dicodingacademy';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  daStyle,
  {
    ignores: [
      'jest.config.js',
      'tests/',
      'webpack.common.js',
      'webpack.dev.js',
      'webpack.prod.js',
      'dist/'
    ]
  }
];
