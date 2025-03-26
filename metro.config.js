const { getDefaultConfig } = require('@react-native/metro-config');
const path = require('path');
const withStorybook = require('@storybook/react-native/metro/withStorybook');

const defaultConfig = getDefaultConfig(__dirname);

module.exports = withStorybook(defaultConfig, {
  enabled: process.env.WITH_STORYBOOK,
  configPath: path.resolve(__dirname, './.storybook'),
});
