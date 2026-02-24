
import React from 'react';
import { CATEGORIES } from '../constants';

const Categories: React.FC = () => {
  return (
    <div className="flex overflow-x-auto gap-3 px-5 mb-6 hide-scrollbar">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          className={`${cat.color} px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium flex items-center gap-1 shadow-sm border border-transparent active:scale-95 transition-transform`}
        >
          <span>{cat.icon}</span>
          <span>{cat.name}</span>
        </button>
      ))}
    </div>
  );
};

export default Categories;
