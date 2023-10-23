import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from '../src/ui/screens/Main/MainScreen';
import PodcastInfoViewScreen from '../src/ui/screens/podcast/PodcastInfoViewScreen';
import PlayerScreen from '../src/ui/screens/Main/PlayerScreen';
import Words from '../src/ui/screens/training/Words';

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

function TrainingsStack() {
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
      <Stack.Screen name="Main" component={Words} />
    </Stack.Navigator>
  );
}

function SettingsStack() {
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
      <Stack.Screen name="Main" component={PlayerScreen} />
    </Stack.Navigator>
  );
}

export {MainStack, TrainingsStack, SettingsStack};
