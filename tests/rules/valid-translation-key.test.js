/**
 * @fileoverview Tests for valid-translation-key rule.
 * @see https://github.com/mces58/Hangmanify/blob/master/guides/rules/valid-translation-key.md
 */
import { vol } from 'memfs';

import rule from 'plugins/rules/valid-translation-key.mjs';

import { runTest } from './utils.js';

// Mock the built-in 'fs' module with 'memfs' to simulate a virtual in-memory file system.
// This prevents tests from relying on the real file system.
jest.mock('fs', () => require('memfs').fs);

// Before each test, populate the virtual file system with a fake translation-keys.d.ts file.
// This simulates the TranslationKeys type structure that the ESLint rule depends on.
beforeEach(() => {
  vol.fromJSON({
    'src/constants/localization/translation-keys.d.ts': `
      export type TranslationKeys = {
        greetings: {
          hi: string;
          welcome: string;
        };
        login: {
          username: string;
          password: string;
        };
        profile: {
          avatar: {
            upload: string;
            delete: string;
          };
        };
      };
    `,
  });
});

afterEach(() => {
  // After each test, reset the virtual file system to ensure isolation between tests.
  // This prevents state from leaking across tests.
  vol.reset();
});

const validCases = [
  {
    name: 'Valid key - greetings.hi',
    filename: 'src/screens/Greetings.tsx',
    code: `t('greetings.hi')`,
  },
  {
    name: 'Valid key - nested avatar.upload',
    filename: 'src/screens/Profile.tsx',
    code: `t('profile.avatar.upload')`,
  },
  {
    name: 'Valid key - login.username',
    filename: 'src/screens/Login.tsx',
    code: `t('login.username')`,
  },
  {
    name: 'Valid deeply nested key - profile.avatar.delete',
    filename: 'src/screens/Profile.tsx',
    code: `t('profile.avatar.delete')`,
  },
  {
    name: 'Valid key with single level - greetings.welcome',
    filename: 'src/screens/Greetings.tsx',
    code: `t('greetings.welcome')`,
  },
  {
    name: 'Valid call with other arguments',
    filename: 'src/screens/Login.tsx',
    code: `t('login.password', { fallback: 'pass' })`,
  },
  {
    name: 'Valid usage in JSX expression',
    filename: 'src/screens/Login.tsx',
    code: `<Text>{t('login.username')}</Text>`,
  },
  {
    name: 'Valid usage - variable argument',
    filename: 'src/screens/Dynamic.tsx',
    code: `const key = 'login.username'; t(key);`,
  },
  {
    name: 'Valid usage - template literal',
    filename: 'src/screens/Dynamic.tsx',
    code: 't(`login.${field}`);',
  },
];

const invalidCases = [
  {
    name: 'Invalid key - greetings.bye',
    filename: 'src/screens/Greetings.tsx',
    code: `t('greetings.bye')`,
    expectedErrors: 1,
  },
  {
    name: 'Invalid key - profile.avatar.remove (not defined)',
    filename: 'src/screens/Profile.tsx',
    code: `t('profile.avatar.remove')`,
    expectedErrors: 1,
  },
  {
    name: 'Invalid key - completely unknown section',
    filename: 'src/screens/Settings.tsx',
    code: `t('settings.theme')`,
    expectedErrors: 1,
  },
  {
    name: 'Invalid key - profile.avatar',
    filename: 'src/screens/Profile.tsx',
    code: `t('profile.avatar')`,
    expectedErrors: 1,
  },
  {
    name: 'Invalid nested key - profile.avatar.upload.icon',
    filename: 'src/screens/Profile.tsx',
    code: `t('profile.avatar.upload.icon')`,
    expectedErrors: 1,
  },
  {
    name: 'Invalid partial key - login',
    filename: 'src/screens/Login.tsx',
    code: `t('login')`,
    expectedErrors: 1,
  },
];

runTest('valid-translation-key', rule, validCases, invalidCases);
