
import React from 'react';

interface HeaderProps {
  checkInDays?: number;
  highlightsCount?: number;
  onOpenNotes: () => void;
}

const Header: React.FC<HeaderProps> = ({ checkInDays = 1, highlightsCount = 0, onOpenNotes }) => {
  return (
    <header className="flex items-center justify-between p-5 pt-8">
      <div className="flex items-center gap-3">
        {/* Character Icon */}
        <div className="w-12 h-12 bg-[#FFC552] rounded-xl flex items-center justify-center shadow-sm relative overflow-hidden">
          <div className="flex gap-1.5 mb-1">
            <div className="w-2.5 h-2.5 bg-[#333333] rounded-full"></div>
            <div className="w-2.5 h-2.5 bg-[#333333] rounded-full"></div>
          </div>
          <div className="absolute bottom-2 w-4 h-0.5 bg-[#333333] rounded-full opacity-40"></div>
        </div>

        {/* Check-in Badge */}
        <div className="bg-white px-4 py-2.5 rounded-2xl shadow-sm border border-gray-50 flex items-center gap-1.5">
          <span className="text-gray-400 text-[11px] font-bold">连续打卡</span>
          <span className="text-[#333333] font-black text-xl leading-none">{checkInDays}</span>
          <span className="text-gray-400 text-[11px] font-bold">天</span>
        </div>
      </div>

      {/* My Highlights Button - Relocated from Tab Nav */}
      <button 
        onClick={onOpenNotes}
        className="bg-white px-4 py-2.5 rounded-2xl shadow-sm border border-gray-50 flex items-center gap-2 active:scale-95 transition-transform"
      >
        <span className="text-base">📝</span>
        <div className="flex flex-col items-start">
          <span className="text-[#333333] font-bold text-[11px]">我的划线</span>
          {highlightsCount > 0 && (
            <span className="text-[9px] text-gray-400 font-bold leading-none">{highlightsCount} 条笔记</span>
          )}
        </div>
      </button>
    </header>
  );
};

export default Header;
