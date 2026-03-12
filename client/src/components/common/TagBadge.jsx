import React from 'react';

const TagBadge = ({ text, className = '' }) => {
  return (
    <span className={`inline-block bg-white/5 hover:bg-white/10 border border-white/10 text-text-muted text-xs px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${className}`}>
      #{text}
    </span>
  );
};

export default TagBadge;
