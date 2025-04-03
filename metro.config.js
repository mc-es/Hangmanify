const { getDefaultConfig } = require('@expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const withStorybook = require('@storybook/react-native/metro/withStorybook');
const path = require('path');

const config = getDefaultConfig(__dirname);

config.resolver.assetExts = config.resolver.assetExts.filter((ext) => ext !== 'svg');
config.resolver.sourceExts.push('svg');
config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');

const nativeWindConfig = withNativeWind(config, { input: './global.css' });

const finalConfig = withStorybook(nativeWindConfig, {
  ...nativeWindConfig,
  enabled: process.env.WITH_STORYBOOK,
  configPath: path.resolve(__dirname, '.storybook'),
});

module.exports = finalConfig;
