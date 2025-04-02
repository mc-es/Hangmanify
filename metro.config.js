const { getDefaultConfig } = require('@expo/metro-config');
const path = require('path');
const withStorybook = require('@storybook/react-native/metro/withStorybook');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.assetExts = defaultConfig.resolver.assetExts.filter(
  (ext) => ext !== 'svg'
);
defaultConfig.resolver.sourceExts.push('svg');
defaultConfig.transformer.babelTransformerPath = require.resolve(
  'react-native-svg-transformer'
);

module.exports = withStorybook(defaultConfig, {
  ...defaultConfig,
  enabled: process.env.WITH_STORYBOOK,
  configPath: path.resolve(__dirname, '.storybook'),
});
