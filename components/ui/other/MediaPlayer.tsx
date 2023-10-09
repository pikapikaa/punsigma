import * as React from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface MediaPlayerProps {
  onPress(): void;
  isPlay: Boolean;
  duration: number;
  progress: number;
}

const MediaPlayer = ({
  onPress,
  isPlay = false,
  duration = 0,
  progress = 0,
}: MediaPlayerProps) => {
  function msToHMS(ms: number) {
    let seconds: number | string = Math.floor((ms / 1000) % 60);
    let minutes: number | string = Math.floor((ms / (1000 * 60)) % 60);
    let hours: number | string = Math.floor((ms / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return hours + ':' + minutes + ':' + seconds;
  }

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <Text style={styles.durationText}>{msToHMS(progress * 1000)}</Text>
        <View style={styles.line}></View>
        <Text style={styles.durationText}>{msToHMS(duration)}</Text>
      </View>

      <View style={styles.playerContainer}>
        <View style={{justifyContent: 'flex-end'}}>
          <Icon name="play-back-outline" size={20} color="#4E67BF" />
        </View>
        <Pressable onPress={onPress}>
          <Icon
            name={isPlay ? 'pause-circle-outline' : 'play-circle-outline'}
            size={70}
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
  },
  progressContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  line: {
    height: 4,
    backgroundColor: '#4E67BF',
    width: '70%',
    borderRadius: 10,
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
