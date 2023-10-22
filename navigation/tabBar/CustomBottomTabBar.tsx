import {BottomTabBar, BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {View} from 'react-native';
import FloatingPlayer from './FloatingPlayer';

export const CustomBottomTabBar = (props: BottomTabBarProps) => {
  return (
    <View>
      <FloatingPlayer />
      <BottomTabBar {...props} />
    </View>
  );
};
