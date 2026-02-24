
import React from 'react';

const BottomNav: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-10 py-3 flex justify-around items-center z-50 rounded-t-3xl shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
      <button className="flex flex-col items-center gap-1 group">
        <div className="w-10 h-10 rounded-full bg-[#333333] flex items-center justify-center mb-1">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.099l7 5.055v12.846h-5v-6h-4v6h-5v-12.846l7-5.055zm0-2.099l-12 8.667v15.333h9v-6h6v6h9v-15.333l-12-8.667z" />
          </svg>
        </div>
        <span className="text-xs font-bold text-[#333333]">首页</span>
      </button>
      
      <button className="flex flex-col items-center gap-1 group opacity-40 hover:opacity-100 transition-opacity">
        <div className="w-10 h-10 rounded-full flex items-center justify-center mb-1">
          <svg className="w-6 h-6 text-[#333333]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
             <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <span className="text-xs font-medium text-[#333333]">我的</span>
      </button>
    </nav>
  );
};

export default BottomNav;
