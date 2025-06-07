/**
 * @fileoverview Tests for jsx-sort-props rule.
 * @see https://github.com/mces58/Hangmanify/blob/master/guides/rules/jsx-sort-props.md
 */
import rule from 'plugins/rules/jsx-sort-props.mjs';

import { runTest } from './utils.js';

const validCases = [
  {
    name: 'Props in correct order',
    filename: 'src/components/CorrectOrder.tsx',
    code: `<Component a="1" b="2" />`,
  },
  {
    name: 'Single prop',
    filename: 'src/screens/SingleProp.tsx',
    code: `<Component a="1" />`,
  },
  {
    name: 'No props',
    filename: 'src/pages/NoProps.tsx',
    code: `<Component />`,
  },
  {
    name: 'Spread only',
    filename: 'shared/elements/SpreadOnly.tsx',
    code: `<Component {...props} />`,
  },
  {
    name: 'Spread followed by sorted props',
    filename: 'app/ui/SpreadSorted.tsx',
    code: `<Component {...props} a="1" b="2" />`,
  },
  {
    name: 'Sorted with spread between',
    filename: 'src/screens/SpreadMiddleSorted.tsx',
    code: `<Component a="1" {...props} b="2" />`,
  },
  {
    name: 'Similar starting letters, correct order',
    filename: 'src/components/SimilarStartCorrect.tsx',
    code: `<Component a="2" aa="3" />`,
  },
  {
    name: 'Similar long names in correct order',
    filename: 'shared/elements/LongNamesCorrect.tsx',
    code: `<Component app="1" apple="2" />`,
  },
];

const invalidCases = [
  {
    name: 'Props in wrong order',
    filename: 'src/pages/WrongOrder.tsx',
    code: `<Component b="2" a="1" />`,
    expectedErrors: 1,
  },
  {
    name: 'Spread followed by unsorted props',
    filename: 'src/screens/SpreadUnsorted.tsx',
    code: `<Component {...props} b="2" a="1" />`,
    expectedErrors: 1,
  },
  {
    name: 'Unsorted with spread between',
    filename: 'app/ui/SpreadMiddleUnsorted.tsx',
    code: `<Component b="1" {...props} a="2" />`,
    expectedErrors: 1,
  },
  {
    name: 'Similar starting letters, wrong order',
    filename: 'shared/elements/SimilarStartWrong.tsx',
    code: `<Component aa="1" a="2" />`,
    expectedErrors: 1,
  },
  {
    name: 'Similar long names, wrong order',
    filename: 'src/components/LongNamesWrong.tsx',
    code: `<Component apple="1" app="2" />`,
    expectedErrors: 1,
  },
  {
    name: 'Multiline props wrong order',
    filename: 'src/screens/MultilineWrong.tsx',
    code: `
      <Component
        z="1"
        a="2"
      />`,
    expectedErrors: 1,
  },
  {
    name: 'Multiple unsorted props',
    filename: 'src/pages/MultipleUnsorted.tsx',
    code: `<Component c="3" b="2" a="1" />`,
    expectedErrors: 2,
  },
  {
    name: 'Boolean shorthand props unsorted',
    filename: 'src/components/BooleanUnsorted.tsx',
    code: `<Component b a />`,
    expectedErrors: 1,
  },
  {
    name: 'Duplicate props in wrong order',
    filename: 'app/ui/DuplicateProps.tsx',
    code: `<Component b="1" a="2" b="3" />`,
    expectedErrors: 1,
  },
];

runTest('jsx-sort-props', rule, validCases, invalidCases, /should come before/);
