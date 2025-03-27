const { getDefaultConfig } = require('@expo/metro-config');
const path = require('path');
const withStorybook = require('@storybook/react-native/metro/withStorybook');

const defaultConfig = getDefaultConfig(__dirname);

module.exports = withStorybook(defaultConfig, {
  ...defaultConfig,
  enabled: process.env.WITH_STORYBOOK,
  configPath: path.resolve(__dirname, '.storybook'),
});
