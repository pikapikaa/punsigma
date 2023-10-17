import {Track} from 'react-native-track-player';
import {Podcast} from '../domain/Podcast';

export const podcasts: Track[] = [
  {
    id: '1',
    url: `https://drive.google.com/u/0/uc?id=1dZvOLzqIyrXZmr6yNtl0-1gOo0aZ0XLu&export=download`,
    title: 'if u feeling "Lost"',
    description: 'Youtube channel "Burii University"',
    album: 'Burii University',
    date: '12.12.2022',
    artwork:
      'https://compote.slate.com/images/ea417857-5b23-47b9-9380-c1b70b33694f.jpg?crop=1180%2C842%2Cx0%2Cy0&width=1920', // Load artwork from the network
  },
];
