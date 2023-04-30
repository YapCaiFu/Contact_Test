import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import Providers from './src/Providers';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@screen/HomeScreen';
import DetailScreen from '@screen/DetailScreen';

export type RootStackParamList = {
  Home: undefined;
  Detail: { id?: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainApp = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  )
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <Providers>
          <MainApp />
        </Providers>
      </NavigationContainer>
    </SafeAreaView>
  );
}


export default App;
