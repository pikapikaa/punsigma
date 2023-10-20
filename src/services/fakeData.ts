import {Podcast} from '../domain/Podcast';

export const podcasts: Podcast[] = [
  {
    id: '123',
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
    url: `https://s.yimg.com/ny/api/res/1.2/NtEgwKL6Ro7gdQV.3oKKpg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTQzNA--/https://media.zenfs.com/en-us/homerun/tvline.com/035d051c00ecc1104cc20e82d4517fa6`,
  },
  {
    id: 3,
    text: 'Mr. Robot. "Eps1.1_ones-and-zer0es.mpeg"',
    url: `https://www.billboard.com/wp-content/uploads/media/Joey-Badass-in-Mr-Robot-press-photo-2017-billboard-1548.jpg?w=1024`,
  },
  {
    id: 4,
    text: 'balv',
    url: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR601_nbvoLXfF7jMnQ-N3BYhIC4ZtSiSoqXA&usqp=CAU`,
  },
  {
    id: 5,
    text: "11 'Mr. Robot' Episodes To Rewatch After That Series Finale Reveal",
    url: `https://imgix.bustle.com/uploads/image/2019/12/23/c33f7c88-073a-4d7c-bada-d272a7c8759b-screen-shot-2019-12-22-at-23740-pm-1.png?w=1200&h=630&fit=crop&crop=faces&fm=jpg`,
  },
];
