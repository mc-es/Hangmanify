/**
 * @fileoverview Tests for filename-match-component rule.
 * @see https://github.com/mces58/Hangmanify/blob/master/guides/rules/filename-match-component.md
 */
import rule from 'plugins/rules/filename-match-component.mjs';

import { TEST_FILENAME_PATH } from './Test';
import { runTest } from './utils.js';

const validCases = [
  {
    name: 'ignores file when default export matches function name',
    filename: TEST_FILENAME_PATH,
    code: `
      import { View } from 'react-native';
      export default function Test() {
        return <View />;
      }
    `,
  },
  {
    name: 'matches identifier assignment export with filename',
    filename: TEST_FILENAME_PATH,
    code: `
      import { View } from 'react-native';
      const Test = () => <View />;
      export default Test;
    `,
  },
  {
    name: 'matches class component name with filename',
    filename: TEST_FILENAME_PATH,
    code: `
      import React from 'react';
      class Test extends React.Component {
        render() {
          return <div />;
        }
      }
      export default Test;
    `,
  },
];

const invalidCases = [
  {
    name: 'reports mismatch when function name differs from filename',
    filename: TEST_FILENAME_PATH,
    code: `
      import { View } from 'react-native';
      export default function Mismatch() {
        return <View />;
      }
    `,
    expectedErrors: 1,
  },
  {
    name: 'reports mismatch when identifier export differs from filename',
    filename: TEST_FILENAME_PATH,
    code: `
      const Wrong = () => <div />;
      export default Wrong;
    `,
    expectedErrors: 1,
  },
  {
    name: 'reports mismatch when class component name differs from filename',
    filename: TEST_FILENAME_PATH,
    code: `
      import React from 'react';
      class Mismatch extends React.Component {
        render() {
          return <div />;
        }
      }
      export default Mismatch;
    `,
    expectedErrors: 1,
  },
  {
    name: 'reports mismatch when casing differs',
    filename: TEST_FILENAME_PATH,
    code: `
      export default function test() {
        return <div />;
      }
    `,
    expectedErrors: 1,
  },
  {
    name: 'reports when default export is not a component',
    filename: TEST_FILENAME_PATH,
    code: `
      const x = 42;
      export default x;
    `,
    expectedErrors: 1,
  },
];

runTest('filename-match-component', rule, validCases, invalidCases);
