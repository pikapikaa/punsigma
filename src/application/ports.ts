import {Progress, State} from 'react-native-track-player';
import {Podcast} from '../domain/Podcast';

export interface MediaPlayerService {
  reset(): void;
  add(podcast: Podcast): void;
  playAndPause(): void;
  pause(): void;
  seekTo(time: number): void;
  getProgress(): Progress;
  isPlaying(): boolean;
  getState(): State;
}
