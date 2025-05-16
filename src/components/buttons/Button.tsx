import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export type ButtonProps = {
  text: string;
  onPress?: () => void;
};

const Button = ({ onPress, text }: ButtonProps): React.JSX.Element => (
  <TouchableOpacity activeOpacity={0.8} style={styles.container} onPress={onPress}>
    <Text style={styles.text}>{text}</Text>
  </TouchableOpacity>
);

export default Button;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'purple',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  text: {
    color: 'white',
  },
});
