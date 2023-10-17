import * as React from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';

interface MainScreenProps {}

const MainScreen = (props: MainScreenProps) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>MainScreen</Text>
      <Button
        onPress={() => {
          navigation.navigate('PodcastInfoView');
        }}
        title="onPress"
      />
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: 'white',
  },
});
