
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { CardData, Highlight } from '../types';
import CompletionPage from './CompletionPage';

interface CardDetailProps {
  card: CardData;
  onBack: () => void;
  userHighlights: Highlight[];
  onAddHighlight: (cardId: string, text: string) => void;
  onRemoveHighlight: (cardId: string, text: string) => void;
}

interface MenuState {
  text: string;
  x: number;
  y: number;
  type: 'selection' | 'existing';
}

const CardDetail: React.FC<CardDetailProps> = ({ card, onBack, userHighlights, onAddHighlight, onRemoveHighlight }) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [isPodcastMode, setIsPodcastMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [showCompletion, setShowCompletion] = useState(false);
  
  // Menu state for both new selection and clicking existing highlights
  const [activeMenu, setActiveMenu] = useState<MenuState | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const cardUserHighlights = useMemo(() => 
    userHighlights.filter(h => h.cardId === card.id).map(h => h.text),
    [userHighlights, card.id]
  );

  // Combine hot highlights and user highlights to build a splitting regex
  const highlightRegex = useMemo(() => {
    const combined = Array.from(new Set([...(card.hotHighlights || []), ...cardUserHighlights]));
    if (combined.length === 0) return null;
    const patterns = combined
      .filter(s => s && s.trim().length > 0)
      .sort((a, b) => b.length - a.length)
      .map(s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    
    if (patterns.length === 0) return null;
    return new RegExp(`(${patterns.join('|')})`, 'g');
  }, [card.hotHighlights, cardUserHighlights]);

  // Handle outside click to close menu
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (activeMenu && !(e.target as HTMLElement).closest('.floating-menu')) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [activeMenu]);

  // Selection handling for new highlights
  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed || !contentRef.current) {
        if (activeMenu?.type === 'selection') setActiveMenu(null);
        return;
      }

      const text = selection.toString().trim();
      if (!text || text.length < 2) {
        if (activeMenu?.type === 'selection') setActiveMenu(null);
        return;
      }

      if (!contentRef.current.contains(selection.anchorNode)) return;

      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      setActiveMenu({
        text,
        x: rect.left + rect.width / 2,
        y: rect.top - 10,
        type: 'selection'
      });
    };

    document.addEventListener('selectionchange', handleSelection);
    return () => document.removeEventListener('selectionchange', handleSelection);
  }, [activeMenu]);

  const handleStartQuiz = () => {
    if (card.quiz && card.quiz.length > 0) {
      setShowQuiz(true);
      setCurrentQuestionIndex(0);
      setSelectedOptionId(null);
    } else {
      setShowCompletion(true);
    }
  };

  const handleCheckIn = () => {
    setIsPodcastMode(false);
    handleStartQuiz();
  };

  const handleHighlightClick = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    
    setActiveMenu({
      text,
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
      type: 'existing'
    });
  };

  const applyHighlight = () => {
    if (activeMenu) {
      onAddHighlight(card.id, activeMenu.text);
      window.getSelection()?.removeAllRanges();
      setActiveMenu(null);
    }
  };

  const removeHighlight = () => {
    if (activeMenu) {
      onRemoveHighlight(card.id, activeMenu.text);
      setActiveMenu(null);
    }
  };

  const handleCopy = async () => {
    if (activeMenu) {
      try {
        await navigator.clipboard.writeText(activeMenu.text);
        window.getSelection()?.removeAllRanges();
        setActiveMenu(null);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  const renderContent = () => {
    if (!card.content) return <p className="text-gray-600">暂无详细内容</p>;

    return card.content.map((paragraph, pIdx) => (
      <p key={pIdx} className="mb-4">
        {highlightRegex ? (
          paragraph.split(highlightRegex).map((part, i) => {
            const isHot = card.hotHighlights?.includes(part);
            const isActive = cardUserHighlights.includes(part);

            if (isHot || isActive) {
              return (
                <span 
                  key={i}
                  onClick={(e) => handleHighlightClick(e, part)}
                  className={`cursor-pointer transition-all duration-300 relative py-0.5 inline-block ${
                    isActive 
                      ? 'bg-[#FFD54F]/40 border-b-2 border-[#FFD54F]' 
                      : 'border-b-2 border-dashed border-[#FFC107]/40 hover:bg-[#FFC107]/10'
                  }`}
                >
                  {part}
                </span>
              );
            }
            return <span key={i}>{part}</span>;
          })
        ) : (
          <span>{paragraph}</span>
        )}
      </p>
    ));
  };

  if (showCompletion) {
    return (
      <CompletionPage 
        onBackToHome={onBack} 
        highlightsCount={cardUserHighlights.length}
        cardHighlights={cardUserHighlights}
      />
    );
  }

  const currentQuestion = card.quiz ? card.quiz[currentQuestionIndex] : null;

  return (
    <div className={`fixed inset-0 z-[100] ${isPodcastMode ? 'bg-[#FCF7F0]' : 'bg-[#E5EAF5]'} flex flex-col overflow-y-auto hide-scrollbar transition-colors duration-500`}>
      {/* Floating context menu */}
      {activeMenu && (
        <div
          style={{ 
            left: `${activeMenu.x}px`, 
            top: `${activeMenu.y}px`,
            transform: 'translate(-50%, -100%)'
          }}
          className="floating-menu fixed z-[300] bg-[#333333] text-white rounded-full text-xs font-bold shadow-2xl flex items-center overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        >
          <button
            onClick={handleCopy}
            className="px-4 py-2 hover:bg-white/10 active:bg-white/20 transition-colors flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
            </svg>
            复制
          </button>
          
          <div className="w-[1px] h-3 bg-white/20"></div>

          {cardUserHighlights.includes(activeMenu.text) ? (
            <button
              onClick={removeHighlight}
              className="px-4 py-2 hover:bg-white/10 active:bg-white/20 transition-colors flex items-center gap-1.5 text-red-300"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              取消划线
            </button>
          ) : (
            <button
              onClick={applyHighlight}
              className="px-4 py-2 hover:bg-white/10 active:bg-white/20 transition-colors flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              划线 {card.hotHighlights?.includes(activeMenu.text) ? '(12)' : ''}
            </button>
          )}
        </div>
      )}

      {/* Top Header */}
      <div className={`sticky top-0 z-[110] flex items-center justify-between px-5 py-6 ${isPodcastMode ? 'bg-[#FCF7F0]/80' : 'bg-[#E5EAF5]/80'} backdrop-blur-sm`}>
        <button 
          onClick={onBack}
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm active:scale-90 transition-transform"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-base font-bold text-gray-700 truncate max-w-[180px]">{card.title}</h1>
        
        <div className="flex items-center gap-2">
          {card.hasPodcast && (
            <button 
              onClick={() => setIsPodcastMode(!isPodcastMode)}
              className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition-all active:scale-90 ${
                isPodcastMode ? 'bg-[#333333] text-white' : 'bg-white text-gray-400'
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4z" />
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM6 10a4 4 0 018 0v1a4 4 0 01-8 0v-1z" clipRule="evenodd" fillRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="px-5 space-y-6 flex flex-col items-center pb-20 flex-grow">
        {isPodcastMode ? (
          <div className="w-full max-w-sm flex flex-col items-center justify-center mt-10 space-y-8 animate-in fade-in zoom-in-95 duration-500">
            <div className={`w-64 h-64 rounded-[40px] overflow-hidden shadow-2xl relative transition-transform duration-700 ${isPlaying ? 'scale-105' : 'scale-100'}`}>
              <img src={card.image} className="w-full h-full object-cover" />
              {isPlaying && (
                <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
                   <div className="flex gap-1">
                      <div className="w-1 bg-white h-4 animate-pulse"></div>
                      <div className="w-1 bg-white h-8 animate-pulse delay-75"></div>
                      <div className="w-1 bg-white h-6 animate-pulse delay-150"></div>
                   </div>
                </div>
              )}
            </div>

            <div className="text-center space-y-2">
              <h2 className="text-xl font-black text-[#333333] px-4">{card.title}</h2>
              <p className="text-gray-400 font-medium">{card.podcastAuthor || '知卡播客'}</p>
            </div>

            <div className="w-full px-6 space-y-2">
              <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-[#333333] h-full transition-all duration-500" 
                  style={{ width: isPlaying ? '100%' : (isFinished ? '100%' : '0%'), transitionDuration: isPlaying ? '30s' : '0.5s' }}
                  onTransitionEnd={() => {
                    if (isPlaying) {
                      setIsPlaying(false);
                      setIsFinished(true);
                    }
                  }}
                ></div>
              </div>
              <div className="flex justify-between text-[10px] text-gray-300 font-bold">
                <span>0:00</span>
                <span>{card.podcastDuration || '3:45'}</span>
              </div>
            </div>

            {!isFinished ? (
              <div className="flex items-center gap-8">
                <button className="flex flex-col items-center justify-center text-[#333333]/60 hover:text-[#333333] active:scale-90 transition-all">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                  </svg>
                  <span className="text-[10px] font-bold mt-1">15s</span>
                </button>

                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-20 h-20 bg-[#333333] rounded-full flex items-center justify-center text-white shadow-xl active:scale-90 transition-transform"
                >
                  {isPlaying ? (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                  ) : (
                    <svg className="w-8 h-8 translate-x-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>

                <button className="flex flex-col items-center justify-center text-[#333333]/60 hover:text-[#333333] active:scale-90 transition-all">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-[10px] font-bold mt-1">30s</span>
                </button>
              </div>
            ) : (
              <button 
                onClick={handleCheckIn}
                className="w-full max-w-[200px] bg-[#333333] text-white font-black py-4 rounded-3xl shadow-lg active:scale-95 transition-transform animate-in slide-in-from-bottom-4"
              >
                打卡学习
              </button>
            )}
          </div>
        ) : !showQuiz ? (
          <>
            <div ref={contentRef} className="w-full bg-white rounded-[40px] shadow-sm p-8 flex flex-col min-h-[400px]">
              <div className="space-y-4 text-gray-700 leading-relaxed text-[16px]">
                {renderContent()}
              </div>
              <div className="mt-8 w-full aspect-square rounded-3xl overflow-hidden">
                <img src={card.image} className="w-full h-full object-cover" />
              </div>
            </div>

            <div onClick={handleStartQuiz} className="w-full bg-white rounded-t-[40px] pt-4 pb-12 flex flex-col items-center cursor-pointer shadow-lg active:translate-y-1 transition-all">
                <div className="w-12 h-1 bg-gray-100 rounded-full mb-4"></div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">⚡️</span>
                  <span className="text-sm font-bold">完成学习，开启挑战</span>
                </div>
                <p className="text-[10px] text-gray-400">进行小测验，赢取积分</p>
            </div>
          </>
        ) : currentQuestion ? (
          <div className="w-full bg-white rounded-[40px] shadow-sm p-8 flex flex-col min-h-[500px]">
            <div className="mb-6 flex items-baseline">
              <span className="text-2xl font-black text-gray-800">{currentQuestionIndex + 1}</span>
              <span className="text-lg font-bold text-gray-300 ml-0.5">/{card.quiz?.length}</span>
            </div>
            <h2 className="text-xl font-bold mb-8">{currentQuestion.question}</h2>
            <div className="space-y-4">
              {currentQuestion.options.map(opt => (
                <button key={opt.id} onClick={() => setSelectedOptionId(opt.id)} className={`w-full text-left p-5 rounded-2xl border transition-all ${selectedOptionId === opt.id ? 'border-[#333333] bg-gray-50' : 'border-gray-100'}`}>
                  {opt.letter}. {opt.text}
                </button>
              ))}
            </div>
            {selectedOptionId && (
              <button onClick={() => {
                if (currentQuestionIndex < (card.quiz?.length || 0) - 1) {
                  setCurrentQuestionIndex(prev => prev + 1);
                  setSelectedOptionId(null);
                } else {
                  setShowCompletion(true);
                }
              }} className="mt-auto bg-[#333333] text-white font-bold py-4 rounded-3xl shadow-lg">
                {currentQuestionIndex < (card.quiz?.length || 0) - 1 ? '下一步' : '完成测验'}
              </button>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CardDetail;
