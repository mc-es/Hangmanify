/**
 * @fileoverview Tests for match-navigation-route rule.
 * @see https://github.com/mces58/Hangmanify/blob/master/guides/rules/match-navigation-route.md
 */
import rule from 'plugins/rules/match-navigation-route.mjs';

import { TEST_FILENAME_PATH } from './Test';
import { runTest } from './utils.js';

const validCases = [
  {
    name: 'passes with correct generic for useNavigation',
    filename: TEST_FILENAME_PATH,
    code: `
      import { useNavigation } from 'src/navigations';
      const nav = useNavigation<RouteNames.TEST>();
    `,
  },
  {
    name: 'passes with correct generic for useRoute',
    filename: TEST_FILENAME_PATH,
    code: `
      import { useRoute, } from 'src/navigations';
      const route = useRoute<RouteNames.TEST>();
    `,
  },
  {
    name: 'passes with correct generics for both hooks',
    filename: TEST_FILENAME_PATH,
    code: `
      import { useNavigation, useRoute } from 'src/navigations';
      const nav = useNavigation<RouteNames.TEST>();
      const route = useRoute<RouteNames.TEST>();
    `,
  },
];

const invalidCases = [
  {
    name: 'fails with mismatched generic in useNavigation',
    filename: TEST_FILENAME_PATH,
    code: `
      import { useNavigation } from 'src/navigations';
      const nav = useNavigation<RouteNames.PROFILE>();
    `,
    expectedErrors: 1,
  },
  {
    name: 'fails with mismatched generic in useRoute',
    filename: TEST_FILENAME_PATH,
    code: `
      import { useRoute } from 'src/navigations';
      const route = useRoute<RouteNames.SETTINGS>();
    `,
    expectedErrors: 1,
  },
  {
    name: 'fails when generics are missing in both hooks',
    filename: TEST_FILENAME_PATH,
    code: `
      import { useNavigation, useRoute } from 'src/navigations';
      const nav = useNavigation();
      const route = useRoute();
    `,
    expectedErrors: 2,
  },
  {
    name: 'fails when importing from @react-navigation/native',
    filename: TEST_FILENAME_PATH,
    code: `import { useNavigation } from '@react-navigation/native';`,
    expectedErrors: 1,
  },
];

runTest('match-navigation-route', rule, validCases, invalidCases);
