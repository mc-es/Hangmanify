import type { ConfigContext, ExpoConfig } from 'expo/config';

const ENVIRONMENTS = ['development', 'preview', 'production'] as const;
const rawEnv = process.env.APP_ENV as string | undefined;

if (!rawEnv) console.warn('APP_ENV is not set. Defaulting to "development".');

type Envs = (typeof ENVIRONMENTS)[number];
type PluginTuple<T = Record<string, unknown>> = [string, T];

const APP_ENV: Envs = ENVIRONMENTS.includes(rawEnv as Envs) ? (rawEnv as Envs) : 'development';
const IS_STORYBOOK = process.env.STORYBOOK_ENABLED === 'true';
const PROJECT_ID = '2d9148ce-1ff8-49fc-9eaa-257902d5499b';

const getAppMetaConfig = (
  env: Envs
): Pick<
  ExpoConfig,
  'description' | 'name' | 'runtimeVersion' | 'scheme' | 'slug' | 'updates' | 'version'
> => {
  const name =
    env === 'production'
      ? 'Hangmanify'
      : `Hangmanify (${env.charAt(0).toUpperCase() + env.substring(1, 3)})`;
  const scheme = env === 'production' ? 'hangmanify' : `hangmanify-${env}`;
  const version = env === 'production' ? '1.0.0' : `1.0.0-${env.slice(0, 3)}`;

  return {
    description: 'A React Native application built with Expo',
    name,
    runtimeVersion: { policy: 'appVersion' },
    scheme,
    slug: 'hangmanify',
    version,
    updates: {
      enabled: true,
      fallbackToCacheTimeout: 0,
      url: `https://u.expo.dev/${PROJECT_ID}`,
    },
  };
};

const getAndroidConfig = (): ExpoConfig['android'] => {
  const packageName =
    APP_ENV === 'production' ? 'com.mces.hangmanify' : `com.mces.hangmanify.${APP_ENV}`;
  const iconPath = `./assets/icons/android/icon-${APP_ENV}.png`;

  return {
    package: packageName,
    softwareKeyboardLayoutMode: 'pan',
    adaptiveIcon: {
      backgroundColor: '#151718',
      foregroundImage: iconPath,
    },
  };
};

const getIosConfig = (): ExpoConfig['ios'] => {
  const lightIconPath = './assets/icons/ios/light.png';
  const darkIconPath = './assets/icons/ios/dark.png';
  const tintedIconPath = './assets/icons/ios/tinted.png';

  return {
    supportsTablet: true,
    icon: {
      dark: darkIconPath,
      light: lightIconPath,
      tinted: tintedIconPath,
    },
  };
};

const getWebConfig = (): ExpoConfig['web'] => ({
  bundler: 'metro',
  favicon: './assets/icons/web/favicon.png',
});

const getSplashScreenConfig = (): ExpoConfig['splash'] => ({
  backgroundColor: '#F5F5F5',
  image: './assets/images/splash-icon-dark.png',
  resizeMode: 'contain',
});

const getPlugins = (): ExpoConfig['plugins'] => {
  const assetPlugin: PluginTuple<{ assets: string[] }> = [
    'expo-asset',
    {
      assets: ['./assets/videos/intro.mp4'],
    },
  ];

  const fontPlugin: PluginTuple<{ fonts: string[] }> = [
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

  const splashScreenPlugin: PluginTuple<{
    backgroundColor: string;
    dark: { backgroundColor: string; image: string };
    image: string;
    resizeMode: string;
  }> = [
    'expo-splash-screen',
    {
      backgroundColor: '#F5F5F5',
      image: './assets/images/splash-icon-dark.png',
      resizeMode: 'contain',
      dark: {
        backgroundColor: '#151718',
        image: './assets/images/splash-icon-light.png',
      },
    },
  ];

  const videoPlugin: PluginTuple<{
    supportsBackgroundPlayback: boolean;
    supportsPictureInPicture: boolean;
  }> = [
    'expo-video',
    {
      supportsBackgroundPlayback: true,
      supportsPictureInPicture: true,
    },
  ];

  return [assetPlugin, fontPlugin, splashScreenPlugin, videoPlugin];
};

export default ({ config }: ConfigContext): ExpoConfig => {
  const appMeta = getAppMetaConfig(APP_ENV);

  return {
    ...config,
    ...appMeta,
    android: getAndroidConfig(),
    ios: getIosConfig(),
    plugins: getPlugins(),
    splash: getSplashScreenConfig(),
    web: getWebConfig(),
    extra: {
      ...config.extra,
      eas: { projectId: PROJECT_ID },
      storybookEnabled: IS_STORYBOOK,
    },
  };
};
