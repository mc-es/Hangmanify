import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from 'src/components/buttons/Button';
import type { ScreenNRProps } from 'src/navigations/RootStackParamList';

const About: React.FC<ScreenNRProps['About']> = ({
  navigation,
  route,
}): React.JSX.Element => (
  <View style={styles.container}>
    <Text>About</Text>
    <Text>{route.params.count}</Text>
    <Button onPress={() => navigation.goBack()} text="Home" />
  </View>
);

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
});
