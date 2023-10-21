import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {usePlayMedia} from '../../src/application/playMedia';

const imageSize = 40;

interface FloatingPlayerProps {}

const FloatingPlayer = (props: FloatingPlayerProps) => {
  const {isPlaying} = usePlayMedia();
  const isPlayingMedia = isPlaying();

  return (
    <View style={[styles.container, styles.row]}>
      <View style={[styles.row, {gap: 20}]}>
        <Icon name="play" size={20} color="white" />
        <View>
          <Text style={styles.text}>Adele</Text>
          <Text style={styles.text}>Easy on me</Text>
        </View>
      </View>
      <View style={[styles.row, {gap: 20}]}>
        <Icon name="heart-outline" size={20} color="white" />
        <Icon name="close" size={23} color="white" />
      </View>
    </View>
  );
};

export default FloatingPlayer;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    padding: 10,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'space-between',
  },
  image: {
    width: imageSize,
    height: imageSize,
    borderRadius: 5,
    overflow: 'hidden',
  },
  text: {color: 'white'},
});
