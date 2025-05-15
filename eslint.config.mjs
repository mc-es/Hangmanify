import js from '@eslint/js';
import perfectionist from 'eslint-plugin-perfectionist';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import customTsRules from './plugins/rules/index.mjs';

export default defineConfig([
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: { project: 'tsconfig.json', tsconfigRootDir: import.meta.dirname },
    },
  },
  {
    extends: ['js/recommended'],
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    plugins: { '@custom-typescript': customTsRules, js, perfectionist },
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    ignores: [
      'docs',
      'node_modules',
      'plugins',
      '.docz',
      '.storybook',
      'babel.config.js',
      'gatsby-node.js',
      'metro.config.js',
      'tailwind.config.js',
      'postcss.config.mjs',
    ],
  },
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    rules: {
      //* custom rules
      '@custom-typescript/filename-match-component': 'error',
      // '@custom-typescript/jsx-sort-props': 'error',
      '@custom-typescript/require-try-catch-async': 'error',
      '@custom-typescript/require-usestate-type': 'error',
      '@custom-typescript/valid-translation-key': 'error',

      //- typescript rules
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/no-deprecated': 'error',
      '@typescript-eslint/no-duplicate-enum-values': 'error',
      '@typescript-eslint/no-duplicate-type-constituents': 'error',
      '@typescript-eslint/no-empty-object-type': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/no-mixed-enums': 'error',
      '@typescript-eslint/no-require-imports': 'error',
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      'arrow-body-style': ['error', 'as-needed'],

      //+ native eslint rules
      'block-scoped-var': 'error',
      'capitalized-comments': ['error', 'never'],
      'consistent-return': 'error',
      curly: ['error', 'multi-or-nest'],
      'default-case': 'error',
      'default-case-last': 'error',
      'default-param-last': ['error'],
      eqeqeq: 'error',
      'for-direction': 'error',
      'func-name-matching': ['error', 'never'],
      'func-names': ['error', 'as-needed'],
      'guard-for-in': 'error',
      'id-length': ['error', { exceptions: ['x', 'y', 'z', 'i', 't'], max: 30, min: 2 }],
      'logical-assignment-operators': ['error', 'always'],
      'no-alert': 'error',
      'no-array-constructor': 'error',
      'no-await-in-loop': 'error',
      'no-bitwise': 'error',
      'no-case-declarations': 'error',
      'no-compare-neg-zero': 'error',
      'no-cond-assign': 'error',
      'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
      'no-constant-binary-expression': 'error',
      'no-delete-var': 'error',
      'no-dupe-else-if': 'error',
      'no-duplicate-case': 'error',
      'no-else-return': ['error', { allowElseIf: true }],
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-empty-function': ['error', { allow: ['arrowFunctions'] }],
      'no-eq-null': 'error',
      'no-eval': 'error',
      'no-ex-assign': 'error',
      'no-extra-bind': 'error',
      'no-extra-boolean-cast': 'error',
      'no-labels': 'error',
      'no-lonely-if': 'error',
      'no-loss-of-precision': 'error',
      'no-multi-str': 'error',
      'no-nested-ternary': 'error',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-octal': 'error',
      'no-param-reassign': 'error',
      'no-shadow': 'error',
      'no-shadow-restricted-names': 'error',
      'no-sparse-arrays': 'error',
      'no-template-curly-in-string': 'error',
      'no-throw-literal': 'error',
      'no-undef-init': 'error',
      'no-undefined': 'error',
      'no-unneeded-ternary': 'error',
      'no-unsafe-finally': 'error',
      'no-var': 'error',
      'prefer-exponentiation-operator': 'error',
      'prefer-object-has-own': 'error',
      'prefer-object-spread': 'error',
      'prefer-promise-reject-errors': 'error',
      'prefer-regex-literals': 'error',
      'prefer-spread': 'error',
      'prefer-template': 'error',
      'require-await': 'error',
      semi: ['error', 'always'],
      'sort-vars': 'error',
      'use-isnan': 'error',
      'valid-typeof': 'error',
      yoda: 'error',
      '@custom-typescript/no-direct-hook-imports': [
        'error',
        {
          allowedImports: [
            'react',
            'react-native',
            'zustand/shallow',
            '@react-navigation/native',
          ],
        },
      ],
      camelcase: [
        'error',
        {
          ignoreDestructuring: true,
          ignoreGlobals: true,
          ignoreImports: true,
          properties: 'always',
        },
      ],
      'perfectionist/sort-enums': [
        'error',
        {
          fallbackSort: { type: 'unsorted' },
          order: 'asc',
          type: 'natural',
        },
      ],
      'perfectionist/sort-interfaces': [
        'error',
        {
          fallbackSort: { type: 'unsorted' },
          groupKind: 'required-first',
          groups: ['unknown', 'method', 'multiline-member'],
          order: 'asc',
          type: 'alphabetical',
        },
      ],
      'perfectionist/sort-jsx-props': [
        'error',
        {
          fallbackSort: { type: 'unsorted' },
          groups: ['shorthand-prop', 'unknown', 'multiline-prop', 'callback'],
          order: 'asc',
          type: 'alphabetical',
          customGroups: [
            {
              elementNamePattern: '^on.+',
              groupName: 'callback',
            },
          ],
        },
      ],
      'perfectionist/sort-modules': [
        'error',
        {
          fallbackSort: { type: 'unsorted' },
          newlinesBetween: 'always',
          order: 'asc',
          type: 'alphabetical',
          groups: [
            'enum',
            'export-enum',
            'type',
            'export-type',
            'interface',
            'export-interface',
            'function',
            'export-function',
          ],
        },
      ],
      'perfectionist/sort-object-types': [
        'error',
        {
          fallbackSort: { type: 'unsorted' },
          groupKind: 'required-first',
          groups: ['unknown', 'method', 'multiline-member'],
          order: 'asc',
          type: 'alphabetical',
        },
      ],
      'perfectionist/sort-objects': [
        'error',
        {
          fallbackSort: { type: 'unsorted' },
          groups: ['unknown', 'method', 'multiline-member', 'state'],
          order: 'asc',
          type: 'alphabetical',
          customGroups: [
            {
              elementNamePattern: '^set[A-Z].*$',
              groupName: 'state',
              selector: 'property',
            },
          ],
        },
      ],
      'perfectionist/sort-switch-case': [
        'error',
        {
          fallbackSort: { type: 'unsorted' },
          order: 'asc',
          type: 'alphabetical',
        },
      ],
      'perfectionist/sort-union-types': [
        'error',
        {
          fallbackSort: { type: 'unsorted' },
          order: 'asc',
          type: 'alphabetical',
          groups: [
            'conditional',
            'function',
            'import',
            'intersection',
            'keyword',
            'literal',
            'named',
            'object',
            'operator',
            'tuple',
            'union',
            'nullish',
            'unknown',
          ],
        },
      ],
    },
  },
]);
