import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import Button from 'src/components/buttons/Button';
import { NavigationNames, useNavigation } from 'src/navigations/RootStackParamList';
import { useCounter, useGlobalText } from 'src/stores/useStore';

const Home = (): React.JSX.Element => {
  const { count, increase } = useCounter();
  const { text, setText } = useGlobalText();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Text>{count}</Text>
      <Button onPress={increase} text="Increment" />
      <Button
        onPress={() => navigation.navigate(NavigationNames.ABOUT, { name: 'can' })}
        text="About"
      />
      <TextInput
        onChangeText={(input: string) => setText(input)}
        placeholder="input"
        style={{ borderWidth: 1, width: '50%' }}
        value={text}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
});
