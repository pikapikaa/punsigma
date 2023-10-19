import {Podcast} from '../domain/Podcast';

export const podcasts: Podcast[] = [
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

export const recentlyPodcasts = [
  {
    id: 1,
    text: 'Mr. Robot by Sam Esmail for USA Network',
    url: `https://images-na.ssl-images-amazon.com/images/S/pv-target-images/108517acee920b44a8679bf2dd0d9ec29f6728257513e62fd6b5610529185caf._RI_TTW_.jpg`,
  },
  {
    id: 2,
    text: 'Mr. Robot. "Eps1.1_ones-and-zer0es.mpeg"',
    url: `https://www.billboard.com/wp-content/uploads/media/Joey-Badass-in-Mr-Robot-press-photo-2017-billboard-1548.jpg?w=1024`,
  },
  {
    id: 3,
    text: 'Mr. Robot. "Eps1.1_ones-and-zer0es.mpeg"',
    url: `https://www.billboard.com/wp-content/uploads/media/Joey-Badass-in-Mr-Robot-press-photo-2017-billboard-1548.jpg?w=1024`,
  },
  {
    id: 4,
    text: 'balv',
    url: `https://www.billboard.com/wp-content/uploads/media/Joey-Badass-in-Mr-Robot-press-photo-2017-billboard-1548.jpg?w=1024`,
  },
];
