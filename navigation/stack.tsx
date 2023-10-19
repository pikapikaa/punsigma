import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PodcastInfoViewScreen from '../src/ui/screens/podcast/PodcastInfoViewScreen';
import MainScreen from '../src/ui/screens/Main/MainScreen';
import PlayerScreen from '../src/ui/screens/Main/PlayerScreen';

const Stack = createNativeStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={() => {
        return {
          headerShadowVisible: false,
          headerStyle: {backgroundColor: 'white'},
          headerTintColor: 'black',
          headerShown: false,
        };
      }}>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen
        name="PodcastInfoView"
        component={PodcastInfoViewScreen}
        options={{
          headerStyle: {backgroundColor: '#F3F7FC'},
          headerShown: true,
          title: '',
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  return (
    <NavigationContainer>
      <MainStack />
      {/* <PlayerScreen /> */}
    </NavigationContainer>
  );
}

export default Navigation;
