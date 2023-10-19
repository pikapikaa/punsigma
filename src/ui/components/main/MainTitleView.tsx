import * as React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

const imageUrl = `https://static.wikia.nocookie.net/shingekinokyojin/images/f/f0/Levi_Ackermann_%28Anime%29_character_image_%28850%29.png/revision/latest?cb=20180829121715&path-prefix=ru`;
const imageSize = 50;

interface MainTitleViewProps {}

const MainTitleView = (props: MainTitleViewProps) => {
  return (
    <View style={styles.titleContainer}>
      <View style={{gap: 3}}>
        <Text style={styles.titleText}>Hey, Batozhab! &#128075;</Text>
        <Text style={{color: 'grey'}}>Listen to your favorite podcasts</Text>
      </View>
      <Image source={{uri: imageUrl}} style={styles.image} />
    </View>
  );
};

export default MainTitleView;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
  image: {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
    overflow: 'hidden',
  },
});
