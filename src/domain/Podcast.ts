import {RatingType, PitchAlgorithm} from 'react-native-track-player';
import {SubtitleData} from './SubtitleData';

export type Podcast = {
  id: string;
  url: string;
  description: string;
  type?: string;
  userAgent?: string;
  contentType?: string;
  duration?: number;
  title: string;
  artist?: string;
  album?: string;
  genre?: string;
  date?: string;
  rating?: RatingType;
  artwork: string;
  pitchAlgorithm?: PitchAlgorithm;
  headers?: object;
  isLiveStream?: boolean;
  subtitleData: SubtitleData[];
};
