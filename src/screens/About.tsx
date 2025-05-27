import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import type { RouteNames } from 'src/navigations';
import { useNavigation, useRoute } from 'src/navigations';
import { useCounter, useGlobalText } from 'src/stores';

import { Button } from 'src/components/buttons';

const About = (): React.JSX.Element => {
  const { count, decrease } = useCounter();
  const { text, setText } = useGlobalText();
  const navigation = useNavigation<RouteNames.ABOUT>();
  const route = useRoute<RouteNames.ABOUT>();

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
