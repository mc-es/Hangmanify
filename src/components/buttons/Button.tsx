import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export type ButtonProps = {
  onPress?: () => void;
  text: string;
};

const Button = ({ onPress, text }: ButtonProps): React.JSX.Element => (
  <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.container}>
    <Text style={styles.text}>{text}</Text>
  </TouchableOpacity>
);

export default Button;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'purple',
    borderRadius: 8,
  },
  text: { color: 'white' },
});
