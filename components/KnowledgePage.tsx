
import React, { useState, useMemo } from 'react';
import { LEARNED_KNOWLEDGE, CATEGORIES } from '../constants';
import { CardData } from '../types';

interface KnowledgePageProps {
  onBack: () => void;
  onSelectCard: (card: CardData) => void;
}

const KnowledgePage: React.FC<KnowledgePageProps> = ({ onBack, onSelectCard }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredKnowledge = useMemo(() => {
    if (selectedCategory === 'all') return LEARNED_KNOWLEDGE;
    return LEARNED_KNOWLEDGE.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

  // Helper to get category details
  const getCategoryInfo = (categoryId: string) => {
    return CATEGORIES.find(c => c.id === categoryId) || CATEGORIES[0];
  };

  return (
    <div className="fixed inset-0 z-[150] bg-[#FCF7F0] flex flex-col overflow-hidden animate-in fade-in duration-300">
      {/* Header */}
      <div className="px-5 pt-8 pb-4">
        <button 
          onClick={onBack}
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm active:scale-90 transition-transform mb-4"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-[#333333]">已学知识</h1>
      </div>

      {/* Filter Tabs */}
      <div className="flex overflow-x-auto gap-3 px-5 mb-6 hide-scrollbar flex-shrink-0">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-5 py-2 rounded-full whitespace-nowrap text-sm font-bold flex items-center gap-1.5 transition-all duration-200 border ${
              selectedCategory === cat.id 
                ? 'bg-[#333333] text-white border-[#333333] shadow-md' 
                : 'bg-white text-[#333333] border-transparent hover:border-gray-200'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Knowledge List */}
      <div className="flex-grow overflow-y-auto px-5 pb-10 space-y-3 hide-scrollbar">
        {filteredKnowledge.length > 0 ? (
          filteredKnowledge.map((item) => {
            const cat = getCategoryInfo(item.category);
            return (
              <div 
                key={item.id}
                onClick={() => onSelectCard(item)}
                className="bg-white rounded-[24px] p-3 flex items-center gap-4 shadow-sm active:scale-[0.98] transition-transform cursor-pointer group"
              >
                <div className="w-[72px] h-[72px] rounded-2xl overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex flex-col justify-center gap-1.5 flex-grow">
                  <div className="flex items-center gap-2">
                    <div className="bg-gray-50 text-[10px] px-2 py-0.5 rounded-md font-bold text-gray-400 flex items-center gap-1">
                      <span>{cat.icon}</span>
                      <span>{cat.name}</span>
                    </div>
                  </div>
                  <h3 className="text-[15px] font-bold text-[#333333] leading-tight line-clamp-1">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-medium text-gray-300">
                      进度 {item.progress ? `${item.progress.current}/${item.progress.total}` : '已完成'}
                    </p>
                    {item.status === 'completed' && (
                      <span className="text-[10px] bg-green-50 text-green-500 px-1.5 py-0.5 rounded-full font-bold">已达成</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-24 opacity-40">
            <span className="text-5xl mb-4">🏜️</span>
            <p className="text-sm font-bold">还没有学习过这个分类的内容</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KnowledgePage;
