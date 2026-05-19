import React from 'react';

function NewsCard({ tag, title, date }) {
  const getTagColor = (tag) => {
    switch(tag) {
      case 'ANNOUNCEMENT': return 'bg-[hsl(var(--primary))] text-white';
      case 'UPDATE': return 'bg-[hsl(var(--black))] text-white';
      case 'HIGHLIGHT': return 'bg-[hsl(var(--gray))] text-white';
      default: return 'bg-[hsl(var(--primary))] text-white';
    }
  };

  return (
    <div className="bg-[hsl(var(--true-white))] p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-[hsl(var(--white))] group cursor-pointer flex flex-col h-full">
      <div className="mb-4">
        <span className={`label-text text-xs px-2 py-1 rounded ${getTagColor(tag)}`}>{tag}</span>
      </div>
      <h3 className="text-2xl mb-4 group-hover:text-[hsl(var(--primary))] transition-colors flex-grow">{title}</h3>
      <span className="label-text text-[hsl(var(--gray))] text-sm">{date}</span>
    </div>
  );
}

export default NewsCard;