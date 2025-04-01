import type { ExpoConfig } from '@expo/config';

export default ({ config }: { config: ExpoConfig }): ExpoConfig => ({
  ...config,
  name: process.env.STORYBOOK_ENABLED ? 'Hangmanify Storybook' : config.name,
  splash: {
    image: './assets/images/splash-icon-dark.png',
    resizeMode: 'contain',
    backgroundColor: '#F5F5F5',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/icons/android/adaptive-icon.png',
      backgroundImage: './assets/icons/android/adaptive-icon.png',
      monochromeImage: './assets/icons/android/adaptive-icon.png',
      backgroundColor: '#151718',
    },
    package: 'com.mces58.hangmanify',
  },
  ios: {
    icon: {
      dark: './assets/icons/ios/dark.png',
      light: './assets/icons/ios/light.png',
      tinted: './assets/icons/ios/tinted.png',
    },
  },
  plugins: [
    [
      'expo-splash-screen',
      {
        image: './assets/images/splash-icon-dark.png',
        resizeMode: 'contain',
        backgroundColor: '#F5F5F5',
        dark: {
          image: './assets/images/splash-icon-light.png',
          backgroundColor: '#151718',
        },
      },
    ],
  ],
  extra: {
    ...config.extra,
    storybookEnabled: process.env.STORYBOOK_ENABLED as boolean,
    eas: {
      projectId: 'ce993388-e5cf-41ce-9527-7554d7de672a',
    },
  },
});
