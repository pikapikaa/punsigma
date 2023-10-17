import {Podcast} from './Podcast';
import {User} from './User';

export type UserPodcast = {
  id: string;
  user: User;
  podcast: Podcast;
  progress: string;
};

