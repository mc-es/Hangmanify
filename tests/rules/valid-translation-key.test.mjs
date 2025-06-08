/**
 * @fileoverview Tests for valid-translation-key rule.
 * @see https://github.com/mces58/Hangmanify/blob/master/guides/rules/valid-translation-key.md
 *
 * TranslationKeys structure used in tests (from src/constants/localization/translation-keys.d.ts):
 */
import rule from 'plugins/rules/valid-translation-key.mjs';

import { TEST_FILENAME_PATH } from './Test';
import { runTest } from './utils.js';

const validCases = [
  {
    name: 'valid key - greetings.hi',
    filename: TEST_FILENAME_PATH,
    code: `t('greetings.hi');`,
  },
  {
    name: 'valid nested key - greetings.welcome',
    filename: TEST_FILENAME_PATH,
    code: `t('greetings.welcome');`,
  },
  {
    name: 'valid usage - variable argument',
    filename: TEST_FILENAME_PATH,
    code: `
      const key = 'greetings.hi';
      t(key);
    `,
  },
];

const invalidCases = [
  {
    name: 'invalid key - greetings.bye',
    filename: TEST_FILENAME_PATH,
    code: `t('greetings.bye');`,
    expectedErrors: 1,
  },
  {
    name: 'invalid partial key - greetings',
    filename: TEST_FILENAME_PATH,
    code: `t('greetings');`,
    expectedErrors: 1,
  },
  {
    name: 'invalid nested key - login.email',
    filename: TEST_FILENAME_PATH,
    code: `t('login.email');`,
    expectedErrors: 1,
  },
  {
    name: 'invalid deep key - profile.avatar.update',
    filename: TEST_FILENAME_PATH,
    code: `t('profile.avatar.update');`,
    expectedErrors: 1,
  },
  {
    name: 'non-existent root key',
    filename: TEST_FILENAME_PATH,
    code: `t('nonexistent.key');`,
    expectedErrors: 1,
  },
];

runTest('valid-translation-key', rule, validCases, invalidCases);
