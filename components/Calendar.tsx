
import React from 'react';
import { DAYS } from '../constants';

const Calendar: React.FC = () => {
  return (
    <div className="mx-5 my-2 bg-white rounded-[32px] p-6 flex justify-between items-center shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      {DAYS.map((day, idx) => (
        <div 
          key={idx} 
          className={`flex flex-col items-center justify-center transition-all ${
            day.isToday ? 'scale-110' : ''
          }`}
        >
          <span className="text-[10px] font-bold text-gray-300 mb-2 uppercase tracking-tight">
            {day.weekday}
          </span>
          <span className="text-sm font-black text-[#333333] mb-2">
            {day.date}
          </span>
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
            day.hasContent 
              ? 'bg-[#FFD54F]/20' 
              : day.isToday 
                ? 'bg-[#FCF7F0] border border-gray-100' 
                : ''
          }`}>
            {day.hasContent ? (
              <span className="text-sm">😊</span>
            ) : day.isToday ? (
              <div className="w-1.5 h-1.5 bg-gray-200 rounded-full"></div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Calendar;
