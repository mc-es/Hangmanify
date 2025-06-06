/**
 * @fileoverview Tests for jsx-sort-props rule.
 * @see https://github.com/mces58/Hangmanify/blob/master/guides/rules/jsx-sort-props.md
 */
import parser from '@typescript-eslint/parser';
import { Linter } from 'eslint';

import rule from 'plugins/rules/jsx-sort-props.mjs';

const config = {
  files: ['**/*.tsx'],
  languageOptions: {
    parser,
    parserOptions: {
      ecmaFeatures: { jsx: true },
      ecmaVersion: 2020,
      sourceType: 'module',
    },
  },
  plugins: {
    '@custom-typescript-eslint': {
      rules: {
        'jsx-sort-props': rule,
      },
    },
  },
  rules: {
    '@custom-typescript-eslint/jsx-sort-props': 'error',
  },
};

const validCases = [
  {
    name: 'Props in correct order',
    code: `<Component a="1" b="2" />`,
  },
  {
    name: 'Single prop',
    code: `<Component a="1" />`,
  },
  {
    name: 'No props',
    code: `<Component />`,
  },
  {
    name: 'Spread only',
    code: `<Component {...props} />`,
  },
  {
    name: 'Spread followed by sorted props',
    code: `<Component {...props} a="1" b="2" />`,
  },
  {
    name: 'Sorted with spread between',
    code: `<Component a="1" {...props} b="2" />`,
  },
  {
    name: 'Similar starting letters, correct order',
    code: `<Component a="2" aa="1" />`,
  },
];

const invalidCases = [
  {
    name: 'Props in wrong order',
    code: `<Component b="2" a="1" />`,
    expectedErrors: 1,
  },
  {
    name: 'Spread followed by unsorted props',
    code: `<Component {...props} b="2" a="1" />`,
    expectedErrors: 1,
  },
  {
    name: 'Unsorted with spread between',
    code: `<Component b="1" {...props} a="2" />`,
    expectedErrors: 1,
  },
  {
    name: 'Similar starting letters, wrong order',
    code: `<Component aa="1" a="2" />`,
    expectedErrors: 1,
  },
  {
    name: 'Multiline props wrong order',
    code: `
      <Component
        z="1"
        a="2"
      />`,
    expectedErrors: 1,
  },
  {
    name: 'Multiple unsorted props',
    code: `<Component c="3" b="2" a="1" />`,
    expectedErrors: 2,
  },
  {
    name: 'Boolean shorthand props unsorted',
    code: `<Component b a />`,
    expectedErrors: 1,
  },
];

let linter;

beforeEach(() => {
  linter = new Linter();
});

function verify(code) {
  return linter.verify(code, [config], { filename: 'test.tsx' });
}

describe('jsx-sort-props rule', () => {
  describe('valid cases', () => {
    test.each(validCases)('$name', ({ code }) => {
      const messages = verify(code);
      expect(messages.length).toBe(0);
    });
  });

  describe('invalid cases', () => {
    test.each(invalidCases)('$name', ({ code, expectedErrors }) => {
      const messages = verify(code);
      expect(messages.length).toBe(expectedErrors);
      expect(messages).toMatchSnapshot();
    });
  });
});
