import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import {
  useAppCounter,
  useAppGlobalText,
  useAppNavigation,
  useAppRoute,
} from 'src/hooks';

import Button from 'src/components/buttons/Button';
import { type NavigationNames } from 'src/navigations/RootStackParamList';

const About = (): React.JSX.Element => {
  const { count, decrease } = useAppCounter();
  const { text, setText } = useAppGlobalText();
  const navigation = useAppNavigation();
  const route = useAppRoute<NavigationNames.ABOUT>();

  return (
    <View style={styles.container}>
      <Text>About</Text>
      <Text>{count}</Text>
      <Text>{route.params.name}</Text>
      <Button onPress={decrease} text="Decreasement" />
      <Button onPress={() => navigation.goBack()} text="Home" />
      <TextInput
        onChangeText={(input: string) => setText(input)}
        placeholder="input"
        style={{ borderWidth: 1, width: '50%' }}
        value={text}
      />
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
});
