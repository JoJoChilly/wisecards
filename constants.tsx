
import { CardData, Category, Day } from './types';

export const DAYS: Day[] = [
  { weekday: 'Mon', date: 24, hasContent: true },
  { weekday: 'Tue', date: 25, hasContent: true },
  { weekday: 'Wed', date: 26, isToday: true },
  { weekday: 'Thu', date: 27 },
  { weekday: 'Fri', date: 28 },
  { weekday: 'Sat', date: 29 },
  { weekday: 'Sun', date: 30 },
];

export const CATEGORIES: Category[] = [
  { id: 'all', name: '全部', icon: '✨', color: 'bg-[#333333] text-white' },
  { id: 'art', name: '艺术', icon: '🎨', color: 'bg-white text-[#333333]' },
  { id: 'literature', name: '文学', icon: '📚', color: 'bg-white text-[#333333]' },
  { id: 'health', name: '健康', icon: '🥗', color: 'bg-white text-[#333333]' },
  { id: 'psychology', name: '心理', icon: '💭', color: 'bg-white text-[#333333]' },
  { id: 'efficiency', name: '效率', icon: '🎯', color: 'bg-white text-[#333333]' },
];

export const DAILY_RECOMMENDATIONS: CardData[] = [
  {
    id: 'rec1',
    title: '理智瞬间下线的真相',
    image: 'https://picsum.photos/seed/emotion/600/800',
    category: 'psychology',
    status: 'in_progress',
    progress: { current: 3, total: 12 },
    hasPodcast: true,
    content: [
      "控制情绪，不是要变得没有情绪，而是能带着情绪生活。",
      "愤怒、冲动是人的本能反应，压抑愤怒有时会适得其反。",
      "所以，下次觉得快要爆发时，试着对自己说一句：“没关系，我只是太在意了。”",
      "然后，深呼吸，你会发现，事情也没有那么严重。"
    ],
    hotHighlights: ["带着情绪生活", "压抑愤怒有时会适得其反"],
    quiz: [
      {
        id: 'q1',
        question: '如果你发现自己快要情绪失控时，以下哪种做法是正确的？',
        options: [
          { id: 'a', letter: 'A', text: '立即反击，把心里的不满全部发泄出来' },
          { id: 'b', letter: 'B', text: '强行压抑愤怒，假装自己一点也不在意' },
          { id: 'c', letter: 'C', text: '深呼吸并给自己6秒钟的空白，调整状态' },
          { id: 'd', letter: 'D', text: '摔门而出，通过拒绝沟通来惩罚对方' },
        ],
        correctOptionId: 'c'
      }
    ]
  },
  {
    id: 'rec2',
    title: '代糖真的健康吗...',
    image: 'https://picsum.photos/seed/sugar/600/800',
    category: 'health',
    status: 'completed',
    hasPodcast: false,
    content: [
      "所谓的“零度”饮料，其实包含了阿斯巴甜等人工合成代糖。",
      "虽然没有热量，但它们可能会干扰你的代谢系统。",
      "大脑在感受到甜味后，会以为有糖分进入，从而分泌胰岛素。"
    ],
    hotHighlights: ["干扰你的代谢系统"]
  },
];

export const DAILY_PODCAST: CardData = {
  id: 'pod1',
  title: '草莓味不是草莓的味道？',
  image: 'https://picsum.photos/seed/strawberry/300/300',
  category: 'psychology',
  podcastAuthor: '心理',
  podcastSeries: '趣味科普',
  podcastComments: '99+',
  podcastDuration: '05:36',
  hasPodcast: true,
  content: ["我们常喝的草莓牛奶，大部分其实是乙酸乙酯的味道。"]
};

export const LEARNED_KNOWLEDGE: CardData[] = [
  {
    id: 'lk1',
    title: 'test油画的六大“主义”',
    image: 'https://picsum.photos/seed/oil/200/200',
    category: 'art',
    status: 'in_progress',
    progress: { current: 2, total: 14 },
    hasPodcast: true
  },
  {
    id: 'lk8',
    title: '高效能人士的七个习惯',
    image: 'https://picsum.photos/seed/habits/200/200',
    category: 'efficiency',
    status: 'in_progress',
    progress: { current: 3, total: 7 }
  }
];

export const GRID_CARDS: CardData[] = [
  {
    id: 'g1',
    title: '宋词里的冬天',
    image: 'https://picsum.photos/seed/winter/400/500',
    category: 'literature',
    status: 'completed'
  },
  {
    id: 'g2',
    title: '波特五力模型',
    image: 'https://picsum.photos/seed/porter/400/500',
    category: 'efficiency',
    status: 'in_progress',
    progress: { current: 5, total: 8 }
  },
];
