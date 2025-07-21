import { helpers } from 'src/utils/helpers';

const interpolateCases = [
  {
    name: 'replaces placeholders with provided values',
    code: () => helpers.interpolate('Hello, {{name}}!', { name: 'Can' }),
    expected: 'Hello, Can!',
  },
  {
    name: 'leaves unmatched placeholders empty',
    code: () =>
      helpers.interpolate('Hello, {{name}}, you are {{age}} years old.', {
        name: 'Can',
      }),
    expected: 'Hello, Can, you are  years old.',
  },
  {
    name: 'trims spaces in placeholders',
    code: () => helpers.interpolate('Hi, {{  name  }}!', { name: 'Can' }),
    expected: 'Hi, Can!',
  },
  {
    name: 'returns original string if no placeholders',
    code: () => helpers.interpolate('Hello world!', {}),
    expected: 'Hello world!',
  },
];

describe('interpolate', () => {
  interpolateCases.forEach(({ name, code, expected }) => {
    it(name, () => {
      const result = code();
      expect(result).toBe(expected);
      expect(result).toMatchSnapshot();
    });
  });
});
