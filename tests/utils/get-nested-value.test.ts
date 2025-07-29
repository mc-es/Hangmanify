import { helpers } from 'src/utils/helpers';

const getNestedValueCases = [
  {
    name: 'retrieves a nested value correctly',
    code: () => {
      const obj = { user: { profile: { name: 'Alice' } } };
      return helpers.getNestedValue(obj, 'user.profile.name');
    },
    expected: 'Alice',
  },
  {
    name: 'returns null for missing keys',
    code: () => {
      const obj = { user: { profile: { name: 'Alice' } } };
      return helpers.getNestedValue(obj, 'user.profile.age');
    },
    expected: null,
  },
  {
    name: 'returns null if object is null',
    code: () => helpers.getNestedValue(null, 'user.name'),
    expected: null,
  },
  {
    name: 'returns root object if key is empty',
    code: () => {
      const obj = { something: 42 };
      return helpers.getNestedValue(obj, '');
    },
    expected: { something: 42 },
  },
];

describe('getNestedValue', () => {
  getNestedValueCases.forEach(({ name, code, expected }) => {
    it(name, () => {
      const result = code();
      expect(result).toEqual(expected);
      expect(result).toMatchSnapshot();
    });
  });
});
