/**
 * @fileoverview Tests for jsx-sort-props rule.
 * @see https://github.com/mces58/Hangmanify/blob/master/guides/rules/jsx-sort-props.md
 */
import rule from 'plugins/rules/jsx-sort-props.mjs';

import { TEST_FILENAME_PATH } from './Test';
import { runTest } from './utils.js';

const validCases = [
  {
    name: 'props in correct order',
    filename: TEST_FILENAME_PATH,
    code: `<Component a="1" b="2" />;`,
  },
  {
    name: 'single prop',
    filename: TEST_FILENAME_PATH,
    code: `<Component a="1" />;`,
  },
  {
    name: 'no props',
    filename: TEST_FILENAME_PATH,
    code: `<Component />;`,
  },
  {
    name: 'spread only',
    filename: TEST_FILENAME_PATH,
    code: `<Component {...props} />;`,
  },
  {
    name: 'spread followed by sorted props',
    filename: TEST_FILENAME_PATH,
    code: `<Component {...props} a="1" b="2" />;`,
  },
  {
    name: 'sorted with spread between',
    filename: TEST_FILENAME_PATH,
    code: `<Component a="1" {...props} b="2" />;`,
  },
  {
    name: 'similar starting letters, correct order',
    filename: TEST_FILENAME_PATH,
    code: `<Component a="2" aa="3" />;`,
  },
  {
    name: 'similar long names in correct order',
    filename: TEST_FILENAME_PATH,
    code: `<Component app="1" apple="2" />;`,
  },
];

const invalidCases = [
  {
    name: 'props in wrong order',
    filename: TEST_FILENAME_PATH,
    code: `<Component b="2" a="1" />;`,
    expectedErrors: 1,
  },
  {
    name: 'spread followed by unsorted props',
    filename: TEST_FILENAME_PATH,
    code: `<Component {...props} b="2" a="1" />;`,
    expectedErrors: 1,
  },
  {
    name: 'unsorted with spread between',
    filename: TEST_FILENAME_PATH,
    code: `<Component b="1" {...props} a="2" />;`,
    expectedErrors: 1,
  },
  {
    name: 'similar starting letters, wrong order',
    filename: TEST_FILENAME_PATH,
    code: `<Component aa="1" a="2" />;`,
    expectedErrors: 1,
  },
  {
    name: 'similar long names, wrong order',
    filename: TEST_FILENAME_PATH,
    code: `<Component apple="1" app="2" />;`,
    expectedErrors: 1,
  },
  {
    name: 'multiline props wrong order',
    filename: TEST_FILENAME_PATH,
    code: `
      <Component
        z="1"
        a="2"
      />;
    `,
    expectedErrors: 1,
  },
  {
    name: 'multiple unsorted props',
    filename: TEST_FILENAME_PATH,
    code: `<Component c="3" b="2" a="1" />;`,
    expectedErrors: 2,
  },
  {
    name: 'boolean shorthand props unsorted',
    filename: TEST_FILENAME_PATH,
    code: `<Component b a />;`,
    expectedErrors: 1,
  },
  {
    name: 'duplicate props in wrong order',
    filename: TEST_FILENAME_PATH,
    code: `<Component b="1" a="2" b="3" />;`,
    expectedErrors: 1,
  },
];

runTest('jsx-sort-props', rule, validCases, invalidCases);
