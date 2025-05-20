import React from 'react';
import { Text, TextInput, View } from 'react-native';

import { useTheme } from 'src/contexts';
import { RouteNames, useNavigation } from 'src/navigations';
import { useCounter, useGlobalText } from 'src/stores';
import { dimensions } from 'src/utils';

import { Button } from 'src/components/buttons';

import './css/home.css';
import ExpoLogo from 'assets/svgs/expo.svg';

const Home = (): React.JSX.Element => {
  const { count, increase } = useCounter();
  const { text, setText } = useGlobalText();
  const navigation = useNavigation();
  const { theme } = useTheme();

  return (
    <View className="my_container" style={{ backgroundColor: theme.palette.background }}>
      <ExpoLogo fill={'red'} height={dimensions.ms(60)} width={dimensions.ms(60)} />
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
        onPress={() => navigation.navigate(RouteNames.ABOUT, { name: 'can' })}
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
