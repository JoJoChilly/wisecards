
import React from 'react';
import { DAILY_PODCAST, CATEGORIES } from '../constants';
import { CardData } from '../types';

interface DailyPodcastProps {
  onSelect: (card: CardData) => void;
}

const DailyPodcast: React.FC<DailyPodcastProps> = ({ onSelect }) => {
  const category = CATEGORIES.find(c => c.id === DAILY_PODCAST.category);

  return (
    <section className="px-5 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-lg font-bold text-[#333333]">每日播客</h2>
        <span className="text-sm">🎧</span>
      </div>
      
      <div 
        onClick={() => onSelect(DAILY_PODCAST)}
        className="bg-white rounded-[32px] p-4 shadow-sm flex items-center gap-4 active:scale-[0.98] transition-transform cursor-pointer overflow-hidden group"
      >
        {/* Podcast Image with Decoration */}
        <div className="relative w-[100px] h-[100px] flex-shrink-0">
          <div className="absolute inset-0 bg-[#A61B1B] rounded-xl flex items-center justify-center overflow-hidden">
            <img 
              src={DAILY_PODCAST.image} 
              alt="cover" 
              className="w-4/5 h-4/5 object-cover rounded shadow-lg translate-y-2 -translate-x-2"
            />
            {/* Quote decoration */}
            <div className="absolute top-2 left-2 text-white/40 font-serif text-2xl leading-none">“</div>
          </div>
          {/* Small thumbnail overlay */}
          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-lg border-2 border-white overflow-hidden shadow-sm">
            <img src="https://picsum.photos/seed/person/50/50" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow min-w-0 pr-10 relative">
          <div className="text-[11px] text-[#4A90E2] font-bold truncate mb-1 flex items-center gap-1">
            <span>{category?.icon || '💭'}</span>
            <span>{category?.name || '心理'}</span>
          </div>
          <h3 className="text-sm font-bold text-[#333333] leading-snug line-clamp-2 mb-2">
            {DAILY_PODCAST.title}
          </h3>
          <div className="flex items-center gap-1 text-gray-300">
            <span className="text-[10px] font-bold tracking-wider">{DAILY_PODCAST.podcastDuration || '05:36'}</span>
          </div>
          
          {/* Play Button */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2">
            <div className="w-10 h-10 bg-[#E8F8FD] rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
              <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-[#4FC3F7] border-b-[6px] border-b-transparent translate-x-0.5"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyPodcast;
