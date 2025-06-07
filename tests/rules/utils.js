import parser from '@typescript-eslint/parser';
import { Linter } from 'eslint';

/**
 * Creates a standard ESLint config for a given rule.
 */
function createConfig(ruleName, rule) {
  return {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
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
          [ruleName]: rule,
        },
      },
    },
    rules: {
      [`@custom-typescript-eslint/${ruleName}`]: 'error',
    },
  };
}

/**
 * Runs ESLint rule tests with Jest using valid and invalid test cases.
 */
function runTest(ruleName, rule, validCases, invalidCases) {
  describe(`${ruleName} rule`, () => {
    let linter;
    const config = createConfig(ruleName, rule);

    beforeEach(() => {
      linter = new Linter();
    });

    const verify = (code, filename) => linter.verify(code, [config], { filename });

    describe('valid cases', () => {
      test.each(validCases)('$name', ({ code, filename }) => {
        const messages = verify(code, filename);
        expect(messages.length).toBe(0);
      });
    });

    describe('invalid cases', () => {
      test.each(invalidCases)('$name', ({ code, filename, expectedErrors }) => {
        const messages = verify(code, filename);
        expect(messages.length).toBe(expectedErrors);
        expect(messages).toMatchSnapshot();
      });
    });
  });
}

export { runTest };
