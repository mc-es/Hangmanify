/**
 * @fileoverview Tests for require-usestate-type rule.
 * @see https://github.com/mc-es/Hangmanify/blob/master/guides/rules/require-usestate-type.md
 */
import rule from 'plugins/rules/require-usestate-type.mjs';

import { TEST_FILENAME_PATH } from './Test';
import { runTest } from './utils.js';

const validCases = [
  {
    name: 'allows string type explicitly set',
    filename: TEST_FILENAME_PATH,
    code: `const [val, setVal] = useState<string>('');`,
  },
  {
    name: 'allows boolean type with React namespace',
    filename: TEST_FILENAME_PATH,
    code: `const [flag, setFlag] = React.useState<boolean>(true);`,
  },
  {
    name: 'allows number type explicitly set',
    filename: TEST_FILENAME_PATH,
    code: `const [count, setCount] = useState<number>(0);`,
  },
  {
    name: 'allows array type explicitly set',
    filename: TEST_FILENAME_PATH,
    code: `const [items, setItems] = useState<string[]>([]);`,
  },
  {
    name: 'allows object type via type alias',
    filename: TEST_FILENAME_PATH,
    code: `
      type User = { id: number; name: string };
      const [user, setUser] = useState<User>({ id: 1, name: 'Alice' });
    `,
  },
  {
    name: 'allows union literal via type alias',
    filename: TEST_FILENAME_PATH,
    code: `
      type Status = 'done' | 'loading';
      const [status, setStatus] = useState<Status>('loading');
    `,
  },
];

const invalidCases = [
  {
    name: 'disallows missing type for string value',
    filename: TEST_FILENAME_PATH,
    code: `const [val, setVal] = useState('');`,
    expectedErrors: 1,
  },
  {
    name: 'disallows missing type with React.useState',
    filename: TEST_FILENAME_PATH,
    code: `const [flag, setFlag] = React.useState(true);`,
    expectedErrors: 1,
  },
  {
    name: 'disallows missing type for number value',
    filename: TEST_FILENAME_PATH,
    code: `const [count, setCount] = useState(0);`,
    expectedErrors: 1,
  },
  {
    name: 'disallows missing type for array value',
    filename: TEST_FILENAME_PATH,
    code: `const [items, setItems] = useState([]);`,
    expectedErrors: 1,
  },
  {
    name: 'disallows missing type for object literal',
    filename: TEST_FILENAME_PATH,
    code: `const [user, setUser] = useState({ id: 1, name: 'Alice' });`,
    expectedErrors: 1,
  },
  {
    name: 'disallows missing type for union literal value',
    filename: TEST_FILENAME_PATH,
    code: `const [status, setStatus] = useState('loading');`,
    expectedErrors: 1,
  },
];

runTest('require-usestate-type', rule, validCases, invalidCases);
