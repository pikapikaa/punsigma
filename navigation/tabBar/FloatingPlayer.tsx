import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {usePlayMedia} from '../../src/application/playMedia';

const imageSize = 40;

interface FloatingPlayerProps {}

const FloatingPlayer = (props: FloatingPlayerProps) => {
  const {isPlaying} = usePlayMedia();
  const isPlayingMedia = isPlaying();

  if (!isPlayingMedia) return;
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
        <Icon name="play" size={20} color="white" />
        <View>
          <Text style={{color: 'white'}}>Adele</Text>
          <Text style={{color: 'white'}}>Easy on me</Text>
        </View>
      </View>
      <Icon name="heart" size={20} color="white" />
    </View>
  );
};

export default FloatingPlayer;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  image: {
    width: imageSize,
    height: imageSize,
    borderRadius: 5,
    overflow: 'hidden',
  },
});
