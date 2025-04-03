import type { ExpoConfig } from '@expo/config';

const getSplashConfig = (): ExpoConfig['splash'] => ({
  image: './assets/images/splash-icon-dark.png',
  resizeMode: 'contain',
  backgroundColor: '#F5F5F5',
});

const getAndroidConfig = (): ExpoConfig['android'] => ({
  adaptiveIcon: {
    foregroundImage: './assets/icons/android/adaptive-icon.png',
    backgroundImage: './assets/icons/android/adaptive-icon.png',
    monochromeImage: './assets/icons/android/adaptive-icon.png',
    backgroundColor: '#151718',
  },
  package: 'com.mces58.hangmanify',
});

const getIosConfig = (): ExpoConfig['ios'] => ({
  icon: {
    dark: './assets/icons/ios/dark.png',
    light: './assets/icons/ios/light.png',
    tinted: './assets/icons/ios/tinted.png',
  },
});

const getWebConfig = (): ExpoConfig['web'] => ({
  favicon: './assets/icons/web/favicon.png',
  bundler: 'metro',
});

const splashScreenPlugin: [string, Record<string, unknown>] = [
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
];

const fontPlugin: [string, Record<string, unknown>] = [
  'expo-font',
  {
    fonts: [
      './assets/fonts/nunito/Nunito-Bold.ttf',
      './assets/fonts/nunito/Nunito-Light.ttf',
      './assets/fonts/nunito/Nunito-Medium.ttf',
      './assets/fonts/nunito/Nunito-Regular.ttf',
      './assets/fonts/nunito/Nunito-SemiBold.ttf',
      './assets/fonts/poppins/Poppins-Bold.ttf',
      './assets/fonts/poppins/Poppins-Light.ttf',
      './assets/fonts/poppins/Poppins-Medium.ttf',
      './assets/fonts/poppins/Poppins-Regular.ttf',
      './assets/fonts/poppins/Poppins-SemiBold.ttf',
    ],
  },
];

export default ({ config }: { config: ExpoConfig }): ExpoConfig => ({
  ...config,
  name: process.env.STORYBOOK_ENABLED ? 'Hangmanify Storybook' : config.name,
  splash: getSplashConfig(),
  android: getAndroidConfig(),
  ios: getIosConfig(),
  web: getWebConfig(),
  plugins: ['expo-localization', splashScreenPlugin, fontPlugin],
  extra: {
    ...config.extra,
    storybookEnabled: process.env.STORYBOOK_ENABLED as boolean,
    eas: {
      projectId: 'ce993388-e5cf-41ce-9527-7554d7de672a',
    },
  },
});
