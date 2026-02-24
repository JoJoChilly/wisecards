
import React from 'react';
import { Highlight, CardData } from '../types';
import { DAILY_RECOMMENDATIONS, DAILY_PODCAST, CATEGORIES } from '../constants';

interface NotesPageProps {
  highlights: Highlight[];
  onBack: () => void;
  onSelectCard: (cardId: string) => void;
}

const NotesPage: React.FC<NotesPageProps> = ({ highlights, onBack, onSelectCard }) => {
  const allCards = [...DAILY_RECOMMENDATIONS, DAILY_PODCAST];

  const getCardById = (id: string) => allCards.find(c => c.id === id);
  const getCategoryInfo = (categoryId: string) => CATEGORIES.find(c => c.id === categoryId) || CATEGORIES[0];

  return (
    <div className="fixed inset-0 z-[150] bg-[#FCF7F0] flex flex-col overflow-hidden animate-in fade-in duration-300">
      {/* Header */}
      <div className="px-5 pt-8 pb-4 sticky top-0 bg-[#FCF7F0]/80 backdrop-blur-md z-10 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm active:scale-90 transition-transform"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-black text-[#333333]">我的划线</h1>
        <div className="w-10 h-10"></div> {/* Spacer for balance */}
      </div>

      {/* Content List */}
      <div className="flex-grow overflow-y-auto px-5 pb-24 space-y-4 hide-scrollbar">
        {highlights.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 opacity-30 text-center">
            <span className="text-6xl mb-6">🏜️</span>
            <p className="font-bold text-lg">还没有任何划线笔记</p>
            <p className="text-sm mt-2">在学习卡片时，长按文字即可划线保存</p>
          </div>
        ) : (
          highlights.map((note) => {
            const card = getCardById(note.cardId);
            const category = card ? getCategoryInfo(card.category) : CATEGORIES[0];
            
            return (
              <div 
                key={note.id}
                onClick={() => onSelectCard(note.cardId)}
                className="bg-white rounded-[32px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] active:scale-[0.98] transition-all cursor-pointer border border-white hover:border-gray-100 group"
              >
                {/* Card Header Info */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
                    <img src={card?.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[10px] bg-gray-50 text-gray-400 font-bold px-1.5 py-0.5 rounded uppercase">
                        {category.name}
                      </span>
                      <span className="text-[10px] text-gray-300">•</span>
                      <span className="text-[10px] text-gray-300 font-bold">
                        {new Date(note.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-xs font-bold text-gray-400 truncate tracking-tight">{card?.title}</h3>
                  </div>
                  <div className="flex-shrink-0 opacity-20">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>

                {/* The Highlight Content */}
                <div className="relative pl-4 border-l-4 border-[#FFD54F]">
                  <p className="text-[15px] font-bold text-[#333333] leading-relaxed relative z-10 italic">
                    “{note.text}”
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default NotesPage;
