import {Progress, Track} from 'react-native-track-player';

export interface MediaPlayerService {
  reset(): void;
  add(podcast: Track): void;
  playAndPause(): void;
  pause(): void;
  seekTo(time: number): void;
  getProgress(): Progress;
  isPlaying(): boolean;
}
