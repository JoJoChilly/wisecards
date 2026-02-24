
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Calendar from './components/Calendar';
import DailyRecommendations from './components/DailyRecommendations';
import DailyPodcast from './components/DailyPodcast';
import Categories from './components/Categories';
import Grid from './components/Grid';
import FooterActions from './components/FooterActions';
import CardDetail from './components/CardDetail';
import KnowledgePage from './components/KnowledgePage';
import NotesPage from './components/NotesPage';
import { CardData, Highlight } from './types';
import { DAILY_RECOMMENDATIONS, DAILY_PODCAST } from './constants';
import StatusTag from './components/StatusTag';

const App: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [showKnowledgePage, setShowKnowledgePage] = useState(false);
  const [showNotesPage, setShowNotesPage] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'profile'>('home');
  
  // Initialize with some sample highlights to enrich the initial experience
  const [userHighlights, setUserHighlights] = useState<Highlight[]>([
    {
      id: 'h1',
      cardId: 'rec1',
      text: '控制情绪，不是要变得没有情绪，而是能带着情绪生活。',
      timestamp: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
    },
    {
      id: 'h2',
      cardId: 'rec2',
      text: '虽然没有热量，但它们可能会干扰你的代谢系统。',
      timestamp: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
    }
  ]);
  
  const [isFirstHighlight, setIsFirstHighlight] = useState(false); // Set to false since we already have samples
  const [showHighlightToast, setShowHighlightToast] = useState(false);

  const handleOpenCard = (card: CardData) => {
    setSelectedCard(card);
  };

  const handleNavClick = (tab: 'home' | 'profile') => {
    setActiveTab(tab);
    setShowKnowledgePage(tab === 'profile');
    setShowNotesPage(false);
  };

  const addHighlight = (cardId: string, text: string) => {
    if (userHighlights.some(h => h.cardId === cardId && h.text === text)) return;
    
    const newHighlight: Highlight = {
      id: Math.random().toString(36).substr(2, 9),
      cardId,
      text,
      timestamp: Date.now()
    };
    
    setUserHighlights(prev => [newHighlight, ...prev]);
    
    if (isFirstHighlight) {
      setShowHighlightToast(true);
      setIsFirstHighlight(false);
      setTimeout(() => setShowHighlightToast(false), 3000);
    }
  };

  const removeHighlight = (cardId: string, text: string) => {
    setUserHighlights(prev => prev.filter(h => !(h.cardId === cardId && h.text === text)));
  };

  return (
    <div className="min-h-screen max-w-md mx-auto relative overflow-x-hidden flex flex-col pb-20 bg-[#FCF7F0]">
      {/* Toast for first highlight */}
      {showHighlightToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[300] bg-[#333333] text-white px-6 py-3 rounded-full shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
          <p className="text-xs font-bold">已保存！在“首页-我的划线”中查看全部笔记</p>
        </div>
      )}

      {/* Detail View Overlay */}
      {selectedCard && (
        <CardDetail 
          card={selectedCard} 
          onBack={() => setSelectedCard(null)}
          userHighlights={userHighlights}
          onAddHighlight={addHighlight}
          onRemoveHighlight={removeHighlight}
        />
      )}

      {/* Already Learned Page Overlay */}
      {showKnowledgePage && (
        <KnowledgePage 
          onBack={() => {
            setShowKnowledgePage(false);
            setActiveTab('home');
          }}
          onSelectCard={handleOpenCard}
        />
      )}

      {/* Notes Page Overlay */}
      {showNotesPage && (
        <NotesPage 
          highlights={userHighlights}
          onBack={() => {
            setShowNotesPage(false);
            setActiveTab('home');
          }}
          onSelectCard={(cardId) => {
            const card = [...DAILY_RECOMMENDATIONS, DAILY_PODCAST].find(c => c.id === cardId);
            if (card) {
              setShowNotesPage(false);
              handleOpenCard(card);
            }
          }}
        />
      )}

      {/* Main Content */}
      <main className={`flex-grow ${(showKnowledgePage || showNotesPage) ? 'hidden' : 'block'}`}>
        <Header 
          checkInDays={1} 
          highlightsCount={userHighlights.length}
          onOpenNotes={() => setShowNotesPage(true)}
        />
        
        <Calendar />

        <section className="mt-8 mb-8">
          <div className="flex items-center gap-2 px-5 mb-4">
            <h2 className="text-lg font-black text-[#333333]">每日推荐</h2>
            <span className="text-sm">🌟</span>
          </div>
          <div className="flex overflow-x-auto gap-4 px-5 pb-4 hide-scrollbar snap-x">
            {DAILY_RECOMMENDATIONS.map((card) => (
              <div 
                key={card.id} 
                onClick={() => handleOpenCard(card)}
                className="flex-shrink-0 w-[48%] h-72 bg-white rounded-[32px] overflow-hidden shadow-sm snap-center relative transform transition-transform active:scale-95 cursor-pointer"
              >
                <div className="relative h-4/5 w-full">
                  <StatusTag status={card.status} progress={card.progress} hasPodcast={card.hasPodcast} />
                  <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                </div>
                <div className="px-4 py-3 bg-white h-1/5 flex items-center">
                  <h3 className="text-[13px] font-black text-[#333333] line-clamp-1">{card.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Currently Learning Section */}
        <section className="px-5 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-lg font-black text-[#333333]">在学</h2>
            <span className="text-sm">📚</span>
          </div>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
            {DAILY_RECOMMENDATIONS.filter(c => c.status === 'in_progress').map(card => (
              <div 
                key={card.id}
                onClick={() => handleOpenCard(card)}
                className="bg-white rounded-[24px] p-3 flex items-center gap-4 shadow-sm min-w-[240px] active:scale-95 transition-transform"
              >
                <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={card.image} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow min-w-0">
                  <h3 className="text-xs font-bold text-[#333333] truncate mb-2">{card.title}</h3>
                  <div className="w-full bg-gray-50 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#FFD54F] h-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <DailyPodcast onSelect={handleOpenCard} />

        <Categories />
        <Grid />
        
        <FooterActions />
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-50 px-12 py-3 flex justify-around items-center z-[160] rounded-t-[40px] shadow-[0_-8px_30px_rgba(0,0,0,0.03)]">
        <button 
          onClick={() => handleNavClick('home')}
          className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === 'home' ? 'opacity-100' : 'opacity-30'}`}
        >
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${activeTab === 'home' ? 'bg-[#333333] text-white shadow-lg' : 'text-[#333333]'}`}>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.099l7 5.055v12.846h-5v-6h-4v6h-5v-12.846l7-5.055zm0-2.099l-12 8.667v15.333h9v-6h6v6h9v-15.333l-12-8.667z" />
            </svg>
          </div>
          <span className="text-[10px] font-black">首页</span>
        </button>
        
        <button 
          onClick={() => handleNavClick('profile')}
          className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === 'profile' ? 'opacity-100' : 'opacity-30'}`}
        >
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${activeTab === 'profile' ? 'bg-[#333333] text-white shadow-lg' : 'text-[#333333]'}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
               <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-[10px] font-black">我的</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
