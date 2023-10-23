import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CustomBottomTabBar} from './tabBar/CustomBottomTabBar';
import {MainStack, OtherStack} from './stack';

const Tab = createBottomTabNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarLabelStyle: {fontFamily: 'RobotoSlab-Medium'},
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'other') {
              iconName = focused ? 'barbell' : 'barbell-outline';
            } else if (route.name === 'settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBar={props => <CustomBottomTabBar {...props} />}>
        <Tab.Screen
          name="home"
          component={MainStack}
          options={{title: 'Главная'}}
        />
        <Tab.Screen
          name="other"
          component={OtherStack}
          options={{title: 'Тренировки'}}
        />
        <Tab.Screen
          name="settings"
          component={OtherStack}
          options={{title: 'Настройка'}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
