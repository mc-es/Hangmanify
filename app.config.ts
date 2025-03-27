import type { ExpoConfig } from '@expo/config';

export default ({ config }: { config: ExpoConfig }): ExpoConfig => ({
  ...config,
  name: process.env.STORYBOOK_ENABLED ? 'Hangmanify Storybook' : config.name,
  extra: {
    ...config.extra,
    storybookEnabled: process.env.STORYBOOK_ENABLED as boolean,
    eas: {
      projectId: 'ce993388-e5cf-41ce-9527-7554d7de672a',
    },
  },
});
