import React from 'react';
import { View } from 'react-native';

import type { Meta, StoryObj } from '@storybook/react';

import Button from './Button';

const meta = {
  component: Button,
  title: 'Button',
  args: {
    text: 'Hello world',
  },
  argTypes: {
    onPress: { action: 'pressed the button' },
  },
  decorators: [
    (Story): React.JSX.Element => (
      <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const AnotherExample: Story = {
  args: {
    text: 'Another example',
  },
};
