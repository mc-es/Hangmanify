import React from 'react';
import { Text, TextInput, View } from 'react-native';

import { useCounter, useGlobalText, useNavigation, useTheme } from 'src/hooks';
import { Dimensions } from 'src/utils';

import Button from 'src/components/buttons/Button';
import { NavigationNames } from 'src/navigations/RootStackParamList';

import './css/home.css';
import ExpoLogo from 'assets/svgs/expo.svg';

const Home = (): React.JSX.Element => {
  const { count, increase } = useCounter();
  const { text, setText } = useGlobalText();
  const navigation = useNavigation();
  const { theme } = useTheme();

  return (
    <View className="my_container" style={{ backgroundColor: theme.palette.background }}>
      <ExpoLogo fill={'red'} height={Dimensions.ms(60)} width={Dimensions.ms(60)} />
      <Text>Home</Text>
      <Text
        style={{
          fontFamily: theme.global.font.families.Poppins.Bold,
          fontSize: theme.global.font.sizes._24,
        }}
      >
        Poppins
      </Text>
      <Text
        className="custom_text"
        style={{
          fontFamily: theme.global.font.families.Nunito.Bold,
        }}
      >
        Nunito
      </Text>
      <Text>{count}</Text>
      <Button text="Increment" onPress={increase} />
      <Button
        text="About"
        onPress={() => navigation.navigate(NavigationNames.ABOUT, { name: 'can' })}
      />
      <TextInput
        placeholder="input"
        style={{ borderWidth: 1, width: '50%' }}
        value={text}
        onChangeText={(input: string) => setText(input)}
      />
    </View>
  );
};

export default Home;
