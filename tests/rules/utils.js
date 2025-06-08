import parser from '@typescript-eslint/parser';
import { ESLint } from 'eslint';

const pluginName = '__test_plugin__';

/**
 * Creates a standard ESLint config for a given rule.
 * Used in isolated rule testing with Jest.
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
      [pluginName]: {
        rules: {
          [ruleName]: rule,
        },
      },
    },
    rules: {
      // enable only the rule under test
      [`${pluginName}/${ruleName}`]: 'error',

      // disable potentially conflicting custom rules
      [`@custom-typescript-eslint/${ruleName}`]: 'off',

      // disable noise from base ESLint + TypeScript rules
      '@typescript-eslint/consistent-type-imports': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-undef': 'off',
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-deprecated': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',

      // disable React-specific rules
      'react/react-in-jsx-scope': 'off',
      'react/jsx-no-undef': 'off',
      'react/jsx-no-duplicate-props': 'off',

      // disable stylistic sorting rules
      'perfectionist/sort-union-types': 'off',
      'perfectionist/sort-jsx-props': 'off',

      // disable miscellaneous rules
      'func-names': 'off',
    },
  };
}

/**
 * Runs ESLint on given code with the provided config and filename.
 */
async function runEslint(code, filename, config) {
  const eslint = new ESLint({
    overrideConfig: config,
    ignore: false, // Don't ignore any file during rule testing
  });

  const results = await eslint.lintText(code, { filePath: filename });
  return results[0].messages;
}

/**
 * Jest test runner for ESLint rules.
 * Accepts valid and invalid test cases and validates ESLint messages.
 */
function runTest(ruleName, rule, validCases, invalidCases) {
  describe(`${ruleName} rule ->`, () => {
    const config = createConfig(ruleName, rule);

    describe('valid cases ->', () => {
      test.each(validCases)('$name', async ({ code, filename }) => {
        const messages = await runEslint(code, filename, config);
        expect(messages.length).toBe(0);
      });
    });

    describe('invalid cases ->', () => {
      test.each(invalidCases)('$name', async ({ code, filename, expectedErrors }) => {
        const messages = await runEslint(code, filename, config);
        expect(messages.length).toBe(expectedErrors);
        expect(messages).toMatchSnapshot();
      });
    });
  });
}

export { runTest };
