import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from 'src/components/buttons/Button';
import type { ScreenNRProps } from 'src/navigations/RootStackParamList';
import { RootNavigations } from 'src/navigations/RootStackParamList';

const Home: React.FC<ScreenNRProps['Home']> = ({ navigation }): React.JSX.Element => {
  const [count, setCount] = useState<number>(0);

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Text>{count}</Text>
      <Button onPress={() => setCount(count + 1)} text="Increment" />
      <Button
        onPress={() => navigation.navigate(RootNavigations.ABOUT, { count })}
        text="About"
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
