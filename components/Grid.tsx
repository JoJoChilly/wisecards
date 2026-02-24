
import React from 'react';
import { GRID_CARDS } from '../constants';
import StatusTag from './StatusTag';

const Grid: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-3 px-5 pb-4">
      {GRID_CARDS.map((card) => (
        <div key={card.id} className="bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col relative">
          <div className="aspect-[3/4] w-full overflow-hidden relative">
            <StatusTag status={card.status} progress={card.progress} />
            <img 
              src={card.image} 
              alt={card.title} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-2">
            <p className="text-[11px] font-medium text-[#333333] line-clamp-1 leading-tight">
              {card.title}
            </p>
          </div>
        </div>
      ))}
      {/* Placeholder for visual balance */}
      <div className="bg-white/40 border border-dashed border-gray-200 rounded-2xl aspect-[3/4] flex items-center justify-center">
        <span className="text-gray-400 text-[10px]">更多...</span>
      </div>
    </div>
  );
};

export default Grid;
