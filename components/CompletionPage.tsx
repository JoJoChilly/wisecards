
import React, { useState } from 'react';
import { DAYS } from '../constants';

interface CompletionPageProps {
  onBackToHome: () => void;
  highlightsCount?: number;
  cardHighlights?: string[];
}

const CompletionPage: React.FC<CompletionPageProps> = ({ onBackToHome, highlightsCount = 0, cardHighlights = [] }) => {
  const [showShareOverlay, setShowShareOverlay] = useState(false);

  const handleAction = (type: string) => {
    alert(`正在${type}...`);
    setShowShareOverlay(false);
  };

  return (
    <div className="fixed inset-0 z-[200] bg-[#FCF7F0] flex flex-col overflow-y-auto hide-scrollbar animate-in fade-in duration-500">
      {/* Header with Share Icon */}
      <div className="flex items-center justify-between px-5 py-6 sticky top-0 bg-[#FCF7F0]/80 backdrop-blur-md z-[210]">
        <button 
          onClick={onBackToHome}
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm active:scale-90 transition-transform"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button 
          onClick={() => setShowShareOverlay(true)}
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm active:scale-90 transition-transform"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>
      </div>

      <div className="flex-grow flex flex-col items-center px-6 pb-40">
        {/* Title */}
        <h1 className="text-3xl font-black text-[#333333] mb-4 mt-2 tracking-tight">
          今日学习已完成!
        </h1>

        {/* Happy Card Illustration SVG */}
        <div className="w-full max-w-[320px] mb-8 animate-in zoom-in-95 duration-700 delay-100">
          <svg width="100%" height="auto" viewBox="0 0 300 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
            <rect x="73.0002" y="22" width="158" height="158" rx="32" fill="#FFC552"/>
            <ellipse cx="132.64" cy="78.5041" rx="18.6401" ry="20.5041" fill="white"/>
            <ellipse cx="169.921" cy="78.5041" rx="18.6401" ry="20.5041" fill="white"/>
            <circle cx="12.5" cy="12.5" r="12.5" transform="matrix(1 0 0 -1 121 90)" fill="#333333"/>
            <circle cx="13" cy="13" r="13" transform="matrix(1 0 0 -1 157 90)" fill="#333333"/>
            <path d="M168.527 70.3885C168.681 69.9369 169.32 69.9369 169.474 70.3884L171.052 75.0187C171.1 75.159 171.207 75.2708 171.345 75.3241L175.788 77.0334C176.215 77.1978 176.215 77.8022 175.788 77.9666L171.345 79.6759C171.207 79.7292 171.1 79.841 171.052 79.9813L169.474 84.6115C169.32 85.0631 168.681 85.0631 168.527 84.6116L166.949 79.9813C166.901 79.841 166.793 79.7292 166.655 79.6759L162.213 77.9666C161.786 77.8022 161.786 77.1978 162.213 77.0334L166.655 75.3241C166.793 75.2708 166.901 75.159 166.949 75.0187L168.527 70.3885Z" fill="white"/>
            <path d="M130.03 70.2981C130.189 69.8584 130.811 69.8584 130.97 70.2981L132.68 75.02C132.731 75.1594 132.841 75.2693 132.98 75.3198L137.702 77.0299C138.142 77.1891 138.142 77.8109 137.702 77.9701L132.98 79.6802C132.841 79.7307 132.731 79.8406 132.68 79.98L130.97 84.7019C130.811 85.1416 130.189 85.1416 130.03 84.7019L128.32 79.98C128.27 79.8406 128.16 79.7307 128.02 79.6802L123.298 77.9701C122.859 77.8109 122.859 77.1891 123.298 77.0299L128.02 75.3198C128.16 75.2693 128.27 75.1594 128.32 75.02L130.03 70.2981Z" fill="white"/>
            <path d="M176.215 69.8815C176.304 69.6047 176.696 69.6047 176.786 69.8815L177.403 71.7892C177.43 71.872 177.492 71.9391 177.572 71.9731L179.347 72.7237C179.591 72.827 179.591 73.173 179.347 73.2763L177.572 74.0269C177.492 74.0609 177.43 74.128 177.403 74.2108L176.786 76.1185C176.696 76.3953 176.304 76.3953 176.215 76.1185L175.597 74.2108C175.57 74.128 175.509 74.0609 175.429 74.0269L173.654 73.2763C173.409 73.173 173.409 72.827 173.654 72.7237L175.429 71.9731C175.509 71.9391 175.57 71.872 175.597 71.7892L176.215 69.8815Z" fill="white"/>
            <path d="M138.719 69.7604C138.816 69.4992 139.185 69.4992 139.282 69.7604L140.033 71.7903C140.063 71.8724 140.128 71.9371 140.21 71.9675L142.24 72.7186C142.501 72.8153 142.501 73.1847 142.24 73.2814L140.21 74.0325C140.128 74.0629 140.063 74.1276 140.033 74.2097L139.282 76.2396C139.185 76.5008 138.816 76.5008 139.282 76.2396L137.968 74.2097C137.937 74.1276 137.873 74.0629 137.791 74.0325L135.761 73.2814C135.499 73.1847 135.499 72.8153 135.761 72.7186L137.791 71.9675C137.873 71.9371 137.937 71.8724 137.968 71.7903L138.719 69.7604Z" fill="white"/>
            <path d="M143.824 110.192C153.003 114.726 162.447 111.578 163.628 105.282" stroke="#333333" stroke-width="7.45603" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M269.178 7.2579C270.101 4.76477 273.627 4.76477 274.55 7.2579L277.852 16.1834C278.142 16.9672 278.76 17.5852 279.544 17.8752L288.47 21.178C290.963 22.1005 290.963 25.6268 288.47 26.5493L279.544 29.852C278.76 30.1421 278.142 30.7601 277.852 31.5439L274.55 40.4694C273.627 42.9625 270.101 42.9625 269.178 40.4694L265.875 31.5439C265.585 30.7601 264.967 30.1421 264.184 29.852L255.258 26.5493C252.765 25.6268 252.765 22.1005 255.258 21.178L264.184 17.8752C264.967 17.5852 265.585 16.9672 265.875 16.1834L269.178 7.2579Z" fill="#FFC552"/>
            <path d="M21.1781 54.9852C22.1006 52.492 25.6269 52.492 26.5494 54.9852L29.8521 63.9106C30.1422 64.6945 30.7602 65.3125 31.544 65.6025L40.4695 68.9052C42.9626 69.8278 42.9626 73.354 40.4695 74.2766L31.544 77.5793C30.7602 77.8693 30.1422 78.4873 29.8521 79.2712L26.5494 88.1966C25.6269 90.6898 22.1006 90.6898 21.1781 88.1966L17.8754 79.2712C17.5853 78.4873 16.9673 77.8693 16.1835 77.5793L7.25802 74.2766C4.76489 73.354 4.76489 69.8278 7.25803 68.9052L16.1835 65.6025C16.9673 65.3125 17.5853 64.6945 17.8754 63.9106L21.1781 54.9852Z" fill="#FFC552"/>
            <circle cx="57.2732" cy="19.0909" r="9.54545" fill="#FFC552"/>
            <circle cx="262.501" cy="100.227" r="4.77273" fill="#FFC552"/>
          </svg>
        </div>

        {/* Calendar Card Section */}
        <div className="w-full bg-white rounded-[40px] p-6 shadow-sm mb-8 animate-in slide-in-from-bottom-4 duration-500 delay-200">
           <div className="flex justify-between items-center mb-6">
              {DAYS.map((day, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1.5">
                   <span className="text-[10px] font-bold text-gray-300">{day.weekday}</span>
                   <span className="text-[13px] font-black text-[#333333]">{day.date}</span>
                   <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
                     day.isToday 
                       ? 'bg-[#FFD54F] shadow-sm' 
                       : 'bg-gray-50'
                   }`}>
                     {day.isToday ? (
                       <span className="text-xl">😃</span>
                     ) : day.hasContent ? (
                       <div className="w-4 h-4 border-2 border-gray-100 rounded-lg"></div>
                     ) : null}
                   </div>
                </div>
              ))}
           </div>
           
           {/* Summary Text Display */}
           {cardHighlights.length > 0 && (
             <div className="border-t border-gray-50 pt-5 space-y-3">
               <h3 className="text-xs font-bold text-gray-400 flex items-center gap-2">
                 <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                   <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                 </svg>
                 我的划线内容
               </h3>
               <div className="space-y-3">
                 {cardHighlights.map((text, i) => (
                   <div key={i} className="bg-[#FFD54F]/10 border-l-4 border-[#FFD54F] px-4 py-2.5 rounded-r-xl">
                     <p className="text-[13px] font-bold text-[#333333] leading-relaxed line-clamp-3 italic">
                       “{text}”
                     </p>
                   </div>
                 ))}
               </div>
             </div>
           )}
        </div>

        {/* Stats Section */}
        <div className="w-full grid grid-cols-3 gap-4 mb-8">
           <div className="flex flex-col items-center">
              <span className="text-2xl font-black text-[#333333]">3</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">连续打卡</span>
           </div>
           <div className="flex flex-col items-center border-x border-gray-100">
              <span className="text-2xl font-black text-[#333333]">12</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">学习分钟</span>
           </div>
           <div className="flex flex-col items-center">
              <span className="text-2xl font-black text-[#333333]">{highlightsCount}</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">热门划线</span>
           </div>
        </div>

        {/* Recommendation Section */}
        <div className="w-full space-y-4 mb-8">
          <h2 className="text-base font-bold text-[#333333]">推荐你继续学</h2>
          <div className="bg-white rounded-[32px] p-4 flex items-center gap-4 shadow-sm active:scale-[0.98] transition-transform cursor-pointer">
            <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
              <img src="https://picsum.photos/seed/art-gallery/200/200" className="w-full h-full object-cover" />
            </div>
            <div className="flex-grow min-w-0">
              <h3 className="text-[15px] font-bold text-[#333333] mb-3 truncate">读懂画廊的价值密码</h3>
              <div className="flex items-center justify-between">
                <span className="bg-gray-50 text-[10px] px-2 py-1 rounded-lg text-gray-400 font-bold flex items-center gap-1">
                  🖼️ 艺术
                </span>
                <button className="bg-[#333333] text-white text-[10px] px-4 py-2 rounded-full font-bold active:scale-90 transition-transform">
                  加入卡组
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Primary Action */}
        <div className="fixed bottom-10 left-0 right-0 px-6 max-w-md mx-auto z-10">
          <button 
            onClick={onBackToHome}
            className="w-full bg-[#333333] text-white font-black py-5 rounded-[30px] shadow-2xl text-lg active:scale-95 transition-transform"
          >
            回到首页
          </button>
        </div>
      </div>

      {/* Share Overlay */}
      {showShareOverlay && (
        <div className="fixed inset-0 z-[300] flex items-end justify-center animate-in fade-in duration-300">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowShareOverlay(false)}
          ></div>
          <div className="relative w-full max-w-md bg-white rounded-t-[40px] p-8 pb-12 shadow-2xl animate-in slide-in-from-bottom-full duration-500">
            <div className="w-12 h-1 bg-gray-100 rounded-full mx-auto mb-8"></div>
            
            <h3 className="text-center text-lg font-black text-[#333333] mb-8">分享你的学习成就</h3>
            
            <div className="grid grid-cols-4 gap-4">
              <button 
                onClick={() => handleAction('保存图片')}
                className="flex flex-col items-center gap-3 active:scale-90 transition-transform"
              >
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>
                <span className="text-[11px] font-bold text-gray-500">保存图片</span>
              </button>

              <button 
                onClick={() => handleAction('分享到微信')}
                className="flex flex-col items-center gap-3 active:scale-90 transition-transform"
              >
                <div className="w-14 h-14 bg-[#07C160]/10 rounded-2xl flex items-center justify-center text-[#07C160]">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.5 9c-.83 0-1.5-.67-1.5-1.5S15.67 8 16.5 8 18 8.67 18 9.5 17.33 11 16.5 11zm-9 0c-.83 0-1.5-.67-1.5-1.5S6.67 8 7.5 8 9 8.67 9 9.5 8.33 11 7.5 11zM12 18c-3.31 0-6-2.69-6-6h12c0 3.31-2.69 6-6 6z" />
                  </svg>
                </div>
                <span className="text-[11px] font-bold text-gray-500">微信</span>
              </button>

              <button 
                onClick={() => handleAction('分享到QQ')}
                className="flex flex-col items-center gap-3 active:scale-90 transition-transform"
              >
                <div className="w-14 h-14 bg-[#12B7F5]/10 rounded-2xl flex items-center justify-center text-[#12B7F5]">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.01 16.48c-1.35 0-2.45-1.1-2.45-2.45s1.1-2.45 2.45-2.45 2.45 1.1 2.45 2.45-1.1 2.45-2.45 2.45zm3.43-5.22c-.17.32-.47.54-.83.62-.25.05-.51.05-.76 0l-.82-.16-.32 1.48c-.05.25-.23.44-.47.49-.07.02-.15.02-.22.02-.18 0-.35-.08-.45-.23l-.93-1.4-.41.34c-.23.19-.57.17-.77-.04s-.17-.57.04-.77l.63-.53-.63-.53c-.21-.18-.24-.51-.06-.72s.51-.24.72-.06l.41.34.93-1.4c.15-.22.45-.3.7-.2s.38.35.33.61l-.32 1.48.82-.16c.33-.07.67.06.87.32.2.27.22.62.06.94z" />
                  </svg>
                </div>
                <span className="text-[11px] font-bold text-gray-500">QQ</span>
              </button>

              <button 
                onClick={() => handleAction('分享到小红书')}
                className="flex flex-col items-center gap-3 active:scale-90 transition-transform"
              >
                <div className="w-14 h-14 bg-[#FF2442]/10 rounded-2xl flex items-center justify-center text-[#FF2442]">
                  <span className="text-lg font-black italic">书</span>
                </div>
                <span className="text-[11px] font-bold text-gray-500">小红书</span>
              </button>
            </div>
            
            <button 
              onClick={() => setShowShareOverlay(false)}
              className="w-full mt-10 bg-gray-50 text-gray-400 font-bold py-4 rounded-3xl active:scale-95 transition-transform"
            >
              取消
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompletionPage;
