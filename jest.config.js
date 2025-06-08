export default {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.mjs'],
  moduleNameMapper: {
    '^plugins/(.*)$': '<rootDir>/plugins/$1',
  },
  transform: {
    '^.+\\.m?[jt]sx?$': 'babel-jest',
  },
};
