import {Podcast} from '../domain/Podcast';
import {Subtitle} from '../domain/SubtitleData';

const subtitleDummyData: Array<Subtitle> = [
  {
    id: 1,
    text: 'Заримдаа сэтгэл хөдлөл яг гaлзуу хулгана шиг болчихдог.',
    time: 0,
    comments: [],
  },
  {
    id: 2,
    text: `Нэг бол унаж нэг бол хөөрч нэг бол буцаад хэвийн болж, тэгээд ахиад үргэлжилдэг.`,
    time: 4,
    comments: [],
  },
  {
    id: 3,
    text: `Гэхдээ миний бодлоор хүн л юм чинь ийм мэдрэмж төрөх нь хэвийн үзэгдэл байх.`,
    time: 9,
    comments: [],
  },
  {
    id: 4,
    text: `Бид ихэвчлэн хий хоосон зүйлс, үйлдэл, хүмүүсээр өөрийгөө дүүргэж, өөрийгөө сатааруулж асуудлаас зутгаадаг.`,
    time: 14,
    comments: [],
  },
  {
    id: 5,
    text: `Учир нь бид хормын дотор хоосордоггүй`,
    time: 22,
    comments: [],
  },
  {
    id: 6,
    text: `Өглөө сэрэх болгондоо, шөнө унтах болгондоо тэр мэдрэмжийг дахин дахин авдаг.`,
    time: 24,
    comments: [],
  },
  {
    id: 7,
    text: `Тэгээд ганцаараа байхаас, өөрийн бодолтойгоо нүүр тулахаас айж зүгээр л өөрийгөө дүүрхэгийг хүсдэг. `,
    time: 29,
    comments: [],
  },
  {
    id: 8,
    text: `Хүмүүсийн дунд байхад яагад ч юм ганцаараа биш юм шиг санагдаад л.`,
    time: 35,
    comments: [],
  },
  {
    id: 9,
    text: `Гэхдээ харамсалтай нь дахиад л өглөө болно.`,
    time: 39,
    comments: [],
  },
  {
    id: 10,
    text: `Цаг хугацаа зүгээр болгоно гэж хүмүүс хэлдэг ч тэр тэр цаг хугацаанд байдаггүй. `,
    time: 42,
    comments: [],
  },
  {
    id: 11,
    text: `Чиний мэдэрч байгаа цаг хугацаа хамаагүй, бүр хамаагүй, хэд дахин удаан дуусашгүй, эцэс төсгөлгүй мэт мэдрэгддэг.`,
    time: 47,
    comments: [],
  },
  {
    id: 12,
    text: `Энэ үед өөртөө эдгэрэх цаг гаргаж өгөх хэрэгтэй.`,
    time: 55,
    comments: [],
  },
  {
    id: 13,
    text: `Өөртэйгөө ярилцаж, хүлээн зөвшөөрөөд, урагшлах.`,
    time: 57,
    comments: [],
  },

  {
    id: 14,
    text: `Энэ мэдээж хэзээ ч амархан байхгүй. `,
    time: 61,
    comments: [],
  },

  {
    id: 15,
    text: `Чи илүү гүн гүнзгий байх тусам урагшлах гэхлээр илүү их өвдөнө.`,
    time: 63,
    comments: [],
  },
  {
    id: 16,
    text: `Бүх зүйлс нь үзэсгэлэнтэй, үзэн ядах шалтгаан байхгүй байх тусам илүү хүчтэй өвдөнө.`,
    time: 68,
    comments: [],
  },
  {
    id: 17,
    text: `Бодохгүй байхыг хүснэ. `,
    time: 73,
    comments: [],
  },
  {
    id: 18,
    text: `Хүлээн зөвшөөрөхгүй байхыг хүснэ.`,
    time: 75,
    comments: [],
  },
  {
    id: 19,
    text: `Зугтаахыг хүснэ. `,
    time: 77,
    comments: [],
  },
  {
    id: 20,
    text: `Гэхдээ энэ бүхниийг туулахаас өөр арга байхгүй. `,
    time: 78,
    comments: [],
  },
  {
    id: 21,
    text: `Зүгээр л хүлээн зөвшөөръе гэж шийдэхгүй бол болохгүй`,
    time: 81,
    comments: [],
  },
  {
    id: 22,
    text: `Хэн нэгнээр орлуулах гэж битгий завд. `,
    time: 85,
    comments: [],
  },
  {
    id: 23,
    text: `Чи гэм хоргүй тэр хэн нэгнийг зовоох л болно.`,
    time: 88,
    comments: [],
  },
  {
    id: 24,
    text: `Тэгээд магадгүй сар, хагас жил, бүтэн жил өөртөө эдгэрэх цаг өг.`,
    time: 91,
    comments: [],
  },

  {
    id: 25,
    text: `Чамайг сатааруулах зүйлсийг биш чамайг эдгээх зүйлсийг хий.`,
    time: 95,
    comments: [],
  },
  {
    id: 26,
    text: `Би чамайг юу даван туулж, юунаас айж, юуг эсвэл хэнийг алдаж, яаж зовж байгааг мэдэхгүй ч гэсэн ирээдүйд юу болохыг таашгүй ч гэсэн бүх зүйлс сайхан болно.`,
    time: 100,
    comments: [],
  },
  {
    id: 27,
    text: `Хүссэн бүхэн чинь биелж, чи дахиад аз жаргалтай болох өдөр ирнэ.`,
    time: 111,
    comments: [],
  },
  {
    id: 28,
    text: `Магадгүй би өөрөө тэгж итгэхийг хүсэж байгаа байх.`,
    time: 115,
    comments: [],
  },
];

export const podcasts: Podcast[] = [
  {
    id: '123',
    url: `https://drive.google.com/u/0/uc?id=1dZvOLzqIyrXZmr6yNtl0-1gOo0aZ0XLu&export=download`,
    title: 'if u feeling "Lost"',
    description: 'Youtube channel "Burii University"',
    album: 'Burii University',
    date: '12.12.2022',
    artwork:
      'https://compote.slate.com/images/ea417857-5b23-47b9-9380-c1b70b33694f.jpg?crop=1180%2C842%2Cx0%2Cy0&width=1920',
    subtitleData: subtitleDummyData,
    duration: 126,
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
