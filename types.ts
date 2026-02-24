
export interface QuizQuestion {
  id: string;
  question: string;
  options: {
    id: string;
    letter: string;
    text: string;
  }[];
  correctOptionId: string;
}

export interface Highlight {
  id: string;
  cardId: string;
  text: string;
  isHot?: boolean;
  timestamp: number;
}

export interface CardData {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  category: string;
  status?: 'not_started' | 'in_progress' | 'completed';
  progress?: {
    current: number;
    total: number;
  };
  quiz?: QuizQuestion[];
  hasPodcast?: boolean;
  podcastUrl?: string;
  podcastAuthor?: string;
  podcastSeries?: string;
  podcastComments?: string;
  podcastDuration?: string;
  content?: string[]; // Content broken down by paragraphs/sentences for highlighting
  hotHighlights?: string[]; // Array of strings that are "hot"
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Day {
  weekday: string;
  date: number;
  isToday?: boolean;
  hasContent?: boolean;
}
