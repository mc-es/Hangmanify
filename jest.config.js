export default {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  moduleNameMapper: {
    '^plugins/(.*)$': '<rootDir>/plugins/$1',
  },
  transform: {
    '^.+\\.m?[jt]sx?$': 'babel-jest',
  },
};
