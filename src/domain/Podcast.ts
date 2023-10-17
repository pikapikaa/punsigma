import {RatingType, PitchAlgorithm} from 'react-native-track-player';

export type Podcast = {
  id: string;
  url: string;
  type?: string;
  userAgent?: string;
  contentType?: string;
  duration?: number;
  title: string;
  artist?: string;
  album?: string;
  description: string;
  genre?: string;
  date?: string;
  rating?: RatingType;
  artwork: string;
  pitchAlgorithm?: PitchAlgorithm;
  headers?: object;
  isLiveStream?: boolean;
};
