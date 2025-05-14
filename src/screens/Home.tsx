import React from 'react';
import { Text, TextInput, View } from 'react-native';

import { useCounter, useGlobalText, useNavigation, useTheme } from 'src/hooks';

import Button from 'src/components/buttons/Button';
import { NavigationNames } from 'src/navigations/RootStackParamList';
import { Dimensions } from 'src/utils/dimensions';

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
