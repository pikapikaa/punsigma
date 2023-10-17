import TrackPlayer, {
  State,
  Track,
  useProgress,
  usePlaybackState,
} from 'react-native-track-player';
import {MediaPlayerService} from '../application/ports';

export function useMediaPlayer(): MediaPlayerService {
  return {
    async add(podcast: Track) {
      await TrackPlayer.add([podcast]);
    },
    async reset() {
      await TrackPlayer.reset();
    },
    async playAndPause() {
      const state = await TrackPlayer.getState();
      if (state === State.Playing) {
        await TrackPlayer.pause();
      } else {
        await TrackPlayer.play();
      }
    },
    async pause() {
      await TrackPlayer.pause();
    },
    async seekTo(time: number) {
      await TrackPlayer.seekTo(time);
    },

    getProgress() {
      return useProgress();
    },

    isPlaying() {
      const playerState = usePlaybackState();
      return playerState === State.Playing;
    },
  };
}
