import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import Button from 'src/components/buttons/Button';
import {
  type NavigationNames,
  useNavigation,
  useRoute,
} from 'src/navigations/RootStackParamList';
import { useCounter, useGlobalText } from 'src/stores/useStore';

const About = (): React.JSX.Element => {
  const { count, decrease } = useCounter();
  const { text, setText } = useGlobalText();
  const navigation = useNavigation();
  const route = useRoute<NavigationNames.ABOUT>();

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
