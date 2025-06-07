/**
 * @fileoverview Tests for filename-match-component rule.
 * @see https://github.com/mces58/Hangmanify/blob/master/guides/rules/filename-match-component.md
 */
import rule from 'plugins/rules/filename-match-component.mjs';

import { runTest } from './utils.js';

const validCases = [
  {
    name: 'Filename matches default export component name',
    filename: 'src/components/FooBar.tsx',
    code: `
      import { View } from 'react-native';
      export default function FooBar() {
        return <View />;
      }
    `,
  },
  {
    name: 'Filename matches identifier export',
    filename: 'src/components/MyComponent.tsx',
    code: `
      import { View } from 'react-native';
      const MyComponent = () => <View />;
      export default MyComponent;
    `,
  },
  {
    name: 'index.tsx file is ignored',
    filename: 'src/components/index.tsx',
    code: `
      import { View } from 'react-native';
      export default function Whatever() {
        return <View />;
      }
    `,
  },
  {
    name: 'Outside components directory is ignored',
    filename: 'src/screens/Foo.tsx',
    code: `
      import { View } from 'react-native';
      export default function Bar() {
        return <View />;
      }
    `,
  },
  {
    name: 'Storybook files are ignored',
    filename: 'src/components/Foo.stories.tsx',
    code: `
      import { View } from 'react-native';
      export default function Bar() {
        return <View />;
      }
    `,
  },
  {
    name: 'General JSX works without react-native',
    filename: 'src/components/SimpleBox.tsx',
    code: `
      export default function SimpleBox() {
        return <div />;
      }
    `,
  },
];

const invalidCases = [
  {
    name: 'Filename does not match component name (function)',
    filename: 'src/components/Foo.tsx',
    code: `
      import { View } from 'react-native';
      export default function Bar() {
        return <View />;
      }
    `,
    expectedErrors: 1,
  },
  {
    name: 'Filename does not match identifier name',
    filename: 'src/components/FooBar.tsx',
    code: `
      import { View } from 'react-native';
      const SomethingElse = () => <View />;
      export default SomethingElse;
    `,
    expectedErrors: 1,
  },
  {
    name: 'Filename does not match class component name',
    filename: 'src/components/Foo.tsx',
    code: `
      import React from 'react';
      import { View } from 'react-native';
      export default class Bar extends React.Component {
        render() {
          return <View />;
        }
      }
    `,
    expectedErrors: 1,
  },
  {
    name: 'Component name differs only in case',
    filename: 'src/components/FooBar.tsx',
    code: `
      import { View } from 'react-native';
      export default function foobar() {
        return <View />;
      }
    `,
    expectedErrors: 1,
  },
  {
    name: 'Unsupported default export value',
    filename: 'src/components/Foo.tsx',
    code: `
      const x = 5;
      export default x;
    `,
    expectedErrors: 1,
  },
];

runTest('filename-match-component', rule, validCases, invalidCases);
