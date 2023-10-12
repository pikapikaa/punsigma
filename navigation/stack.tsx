import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PodcastInfoViewScreen from '../screens/podcast/PodcastInfoViewScreen';
import MainScreen from '../screens/main/MainScreen';

const Stack = createNativeStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={() => {
        return {
          headerShadowVisible: false,
          headerTintColor: 'black',
        };
      }}>
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{title: 'Главная'}}
      />
      <Stack.Screen
        name="PodcastInfoView"
        component={PodcastInfoViewScreen}
        options={{title: 'Подкаст'}}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}

export default Navigation;