
import React from 'react';
import { DAILY_RECOMMENDATIONS } from '../constants';
import StatusTag from './StatusTag';

const DailyRecommendations: React.FC = () => {
  return (
    <section className="mt-6 mb-8">
      <div className="flex items-center gap-2 px-5 mb-4">
        <h2 className="text-lg font-bold text-[#333333]">每日推荐</h2>
        <span className="text-sm">🌟</span>
      </div>
      
      <div className="flex overflow-x-auto gap-4 px-5 pb-4 hide-scrollbar snap-x">
        {DAILY_RECOMMENDATIONS.map((card) => (
          <div 
            key={card.id} 
            className="flex-shrink-0 w-[45%] h-64 bg-white rounded-3xl overflow-hidden shadow-sm snap-center relative transform transition-transform active:scale-95"
          >
            <div className="relative h-4/5 w-full">
              <StatusTag status={card.status} progress={card.progress} hasPodcast={card.hasPodcast} />
              <img 
                src={card.image} 
                alt={card.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="px-3 py-2 bg-white h-1/5 flex items-center">
              <h3 className="text-sm font-bold text-[#333333] line-clamp-1">{card.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DailyRecommendations;
