import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { useCounter, useGlobalText, useNavigation, useRoute } from 'src/hooks';

import Button from 'src/components/buttons/Button';
import { type NavigationNames } from 'src/navigations/RootStackParamList';

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
      <Button text="Decreasement" onPress={decrease} />
      <Button text="Home" onPress={() => navigation.goBack()} />
      <TextInput
        placeholder="input"
        style={{ borderWidth: 1, width: '50%' }}
        value={text}
        onChangeText={(input: string) => setText(input)}
      />
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    gap: 10,
    justifyContent: 'center',
  },
});
