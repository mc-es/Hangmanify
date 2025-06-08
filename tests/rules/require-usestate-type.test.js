/**
 * @fileoverview Tests for require-usestate-type rule.
 * @see https://github.com/mces58/Hangmanify/blob/master/guides/rules/require-usestate-type.md
 */
import rule from 'plugins/rules/require-usestate-type.mjs';

import { runTest } from './utils.js';

const validCases = [
  {
    name: 'useState with string type',
    filename: 'utils/useUnion.tsx',
    code: `const [val, setVal] = useState<string>('');`,
  },
  {
    name: 'useState with number type',
    filename: 'src/hooks/useNumber.tsx',
    code: `const [count, setCount] = useState<number>(0);`,
  },
  {
    name: 'React.useState with boolean type',
    filename: 'Button.tsx',
    code: `const [flag, setFlag] = React.useState<boolean>(true);`,
  },
  {
    name: 'useState with union type',
    filename: 'src/screen/Home.tsx',
    code: `const [status, setStatus] = useState<'loading' | 'done'>('loading');`,
  },
  {
    name: 'useState with array type',
    filename: 'useArray.tsx',
    code: `const [items, setItems] = useState<Array<string>>([]);`,
  },
];

const invalidCases = [
  {
    name: 'useState without type',
    filename: 'src/screens/Main.tsx',
    code: `const [value, setValue] = useState('');`,
    expectedErrors: 1,
  },
  {
    name: 'React.useState without type',
    filename: 'src/hooks/reactNoType.tsx',
    code: `const [value, setValue] = React.useState('');`,
    expectedErrors: 1,
  },
  {
    name: 'useState with inferred array',
    filename: 'inferredArray.tsx',
    code: `const [list, setList] = useState([]);`,
    expectedErrors: 1,
  },
  {
    name: 'useState with object but no type',
    filename: 'navigations/objectNoType.tsx',
    code: `const [settings, setSettings] = useState({ dark: true });`,
    expectedErrors: 1,
  },
  {
    name: 'useState with union but no type',
    filename: 'theme/unionNoType.tsx',
    code: `const [mode, setMode] = useState('light');`,
    expectedErrors: 1,
  },
];

runTest('require-usestate-type', rule, validCases, invalidCases);
