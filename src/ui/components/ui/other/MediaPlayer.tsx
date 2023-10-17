import * as React from 'react';
import {View, StyleSheet, Pressable, Text, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import {usePlayMedia} from '../../../../application/playMedia';

interface MediaPlayerProps {
  onPress(): void;
  seekTo(position: number): void;
}

const MediaPlayer = ({onPress, seekTo}: MediaPlayerProps) => {
  const {getProgress, isPlaying} = usePlayMedia();
  const {position, duration} = getProgress();

  function fancyTimeFormat(seconds: number) {
    const hrs = ~~(seconds / 3600);
    const mins = ~~((seconds % 3600) / 60);
    const secs = ~~seconds % 60;

    let ret = '';
    if (hrs > 0) {
      ret += '' + hrs + ':' + (mins < 10 ? '0' : '');
    }
    ret += '' + mins + ':' + (secs < 10 ? '0' : '');
    ret += '' + secs;
    return ret;
  }

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <Text style={styles.durationText}>{fancyTimeFormat(position)}</Text>
        <Slider
          style={styles.line}
          minimumValue={0}
          maximumValue={Math.floor(duration)}
          value={Math.floor(position)}
          minimumTrackTintColor="#4E67BF"
          maximumTrackTintColor="#bacee8"
          thumbTintColor="#4E67BF"
          onValueChange={ms => seekTo(Math.floor(ms))}
        />
        <Text style={styles.durationText}>{fancyTimeFormat(duration)}</Text>
      </View>

      <View style={styles.playerContainer}>
        <View style={{justifyContent: 'flex-end'}}>
          <Icon name="play-back-outline" size={20} color="#4E67BF" />
        </View>
        <Pressable onPress={onPress}>
          <Icon
            name={isPlaying() ? 'pause-circle-outline' : 'play-circle-outline'}
            size={80}
            color="#4E67BF"
          />
        </Pressable>
        <View style={{justifyContent: 'flex-end'}}>
          <Icon name="play-forward-outline" size={20} color="#4E67BF" />
        </View>
      </View>
    </View>
  );
};

export default MediaPlayer;

const styles = StyleSheet.create({
  container: {
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    padding: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
    backgroundColor: Platform.OS === 'ios' ? 'white' : undefined,
  },
  progressContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  line: {
    height: 30,
    backgroundColor: 'trasnparent',
    width: '80%',
  },
  playerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 25,
  },
  durationText: {
    fontSize: 12,
  },
});
