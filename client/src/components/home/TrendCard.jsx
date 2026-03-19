import React from 'react';
import { Link } from 'react-router-dom';
import TagBadge from '../common/TagBadge';

const TrendCard = ({ trend }) => {
  return (
    <Link to={`/trend/${trend.slug}`} className="block group">
      <div className="bg-bg-card rounded-2xl overflow-hidden border border-white/5 transition-all duration-300 group-hover:border-accent-primary/50 group-hover:shadow-[0_0_30px_-5px_var(--tw-shadow-color)] shadow-accent-primary/20 group-hover:-translate-y-1">
        
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {/* Use fallback color and initial if image fails or isn't there */}
          <div className="absolute inset-0 bg-bg-card-hover flex items-center justify-center text-4xl text-white/10 font-bold">
            {trend.title.charAt(0)}
          </div>
          
          <img 
            src={trend.coverImage} 
            alt={trend.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              e.target.style.display = 'none'; // Hide broken image to show letter fallback
            }}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-bg-card/90 to-transparent" />
          
          <div className="absolute top-3 left-3 bg-white text-black rounded-full px-2 py-1 text-sm shadow-lg leading-none">
            {trend.emoji}
          </div>
          
          {trend.isTrending && (
            <div className="absolute top-3 right-3 bg-red-500/90 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)] flex items-center gap-1">
              <span>🔥</span> Trending
            </div>
          )}
        </div>
        
        {/* Content Container */}
        <div className="p-3.5 sm:p-5">
          <h3 className="text-lg sm:text-xl font-bold font-headings text-text-primary mb-1 sm:mb-2 group-hover:text-accent-secondary transition-colors line-clamp-1">
            {trend.title}
          </h3>
          
          <p className={`text-text-muted text-[13px] sm:text-sm line-clamp-2 mb-2 sm:mb-4 ${trend.description ? 'h-auto min-h-0 sm:h-10' : 'h-0 sm:h-10 opacity-0'}`}>
            {trend.description}
          </p>
          
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
            {trend.tags?.slice(0, 3).map((tag, i) => (
              <TagBadge key={i} text={tag} />
            ))}
            {trend.tags?.length > 3 && (
              <span className="text-xs text-text-muted flex items-center">
                +{trend.tags.length - 3}
              </span>
            )}
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-white/5 text-sm text-text-muted">
            <div className="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
              {trend.posterCount} prompts
            </div>
            
            <div className="text-accent-primary flex items-center group-hover:translate-x-1 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        
      </div>
    </Link>
  );
};

export default TrendCard;
