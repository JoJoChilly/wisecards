
import React from 'react';

const FooterActions: React.FC = () => {
  return (
    <div className="mt-12 mb-24 px-8 flex justify-between items-center">
      <button 
        onClick={() => alert('知卡的内容由专业团队与AI协同生成，旨在提供最优质的学习体验。')}
        className="text-[11px] text-gray-400 hover:text-gray-600 font-bold transition-colors py-2 flex items-center gap-1"
      >
        <span>知卡的内容从哪来？</span>
      </button>
      
      <button 
        onClick={() => window.open('https://wj.qq.com/s2/example', '_blank')}
        className="text-[11px] text-gray-400 hover:text-gray-600 font-bold transition-colors py-2 flex items-center gap-1"
      >
        <span>想学点其他的？</span>
      </button>
    </div>
  );
};

export default FooterActions;
