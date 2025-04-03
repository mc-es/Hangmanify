import React from 'react';
import { Text, TextInput, View } from 'react-native';

import {
  useAppCounter,
  useAppGlobalText,
  useAppNavigation,
  useAppTheme,
} from 'src/hooks';

import Button from 'src/components/buttons/Button';
import { NavigationNames } from 'src/navigations/RootStackParamList';

import './css/home.css';
import ExpoLogo from 'assets/svgs/expo.svg';

const Home = (): React.JSX.Element => {
  const { count, increase } = useAppCounter();
  const { text, setText } = useAppGlobalText();
  const navigation = useAppNavigation();
  const { theme } = useAppTheme();

  return (
    <View className="my_container" style={{ backgroundColor: theme.palette.background }}>
      <ExpoLogo fill={'red'} height={60} width={60} />
      <Text>Home</Text>
      <Text
        style={{
          fontFamily: theme.global.font.families.poppins.bold,
          fontSize: theme.global.font.sizes._24,
        }}
      >
        Poppins
      </Text>
      <Text
        className="custom_text"
        style={{
          fontFamily: theme.global.font.families.nunito.bold,
        }}
      >
        Nunito
      </Text>
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
