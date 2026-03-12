import React from 'react';
import CopyButton from '../common/CopyButton';
import { useAppContext } from '../../context/AppContext';
import { useLikePoster } from '../../hooks/useLikePoster';

const PosterCard = ({ poster }) => {
  const { openModal } = useAppContext();
  const { isLiked, likes, toggleLike } = useLikePoster(poster._id, poster.likes);

  return (
    <div className="bg-bg-card rounded-2xl overflow-hidden border border-white/5 group flex flex-col h-full hover:border-white/10 transition-colors">
      {/* Image Container */}
      <div 
        className="relative aspect-[4/5] bg-bg-card-hover overflow-hidden flex-shrink-0 cursor-pointer"
        onClick={() => openModal(poster)}
      >
        <img 
          src={poster.previewImage} 
          alt={poster.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Gradient overlay for bottom metadata */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent opacity-90 transition-opacity group-hover:opacity-80" />
        
        <div className="absolute bottom-4 left-4 right-4 transition-transform group-hover:-translate-y-1 duration-300">
          <h3 className="font-headings font-bold text-text-primary text-lg leading-tight mb-2 line-clamp-2">
            {poster.title}
          </h3>
          <div className="flex gap-2">
            <span className="inline-block bg-white/10 backdrop-blur-md border border-white/10 text-white text-xs px-2 py-1 rounded-md uppercase tracking-wider">
              {poster.style}
            </span>
          </div>
        </div>
      </div>

      {/* Copy Actions Footer */}
      <div className="mt-auto">
        <CopyButton prompt={poster.prompt} posterId={poster._id} />
        
        {/* Analytics row */}
        <div className="px-5 py-3.5 flex justify-between items-center text-xs text-text-muted border-t border-white/5 bg-bg-primary/50">
          <span className="flex items-center gap-1.5 font-medium">
            <svg className="w-4 h-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            {poster.copyCount}
          </span>
          <span 
            className={`flex items-center gap-1.5 cursor-pointer transition-all duration-300 font-medium ${
              isLiked ? 'text-red-500 scale-110 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'hover:text-red-400 hover:scale-110'
            }`}
            onClick={toggleLike}
          >
            <svg 
              className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isLiked ? 0 : 2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {likes}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PosterCard;
