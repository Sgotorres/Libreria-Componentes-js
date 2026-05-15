// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import globals from 'globals';
import js from '@eslint/js';

export default [{
  ignores: ['dist/', 'coverage/'],
}, js.configs.recommended, {
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    globals: {
      ...globals.browser,
      ...globals.node,
      Modal: 'readonly',
      SelectDinamico: 'readonly',
      InputText: 'readonly',
      Gallery: 'readonly',
      DateRange: 'readonly',
    },
  },
  rules: {
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'no-console': 'off',
    'prefer-const': 'error',
    'no-var': 'error',
    'no-empty': ['error', { allowEmptyCatch: true }],
  },
}, ...storybook.configs["flat/recommended"]];
