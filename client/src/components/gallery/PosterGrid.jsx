import React from 'react';
import PosterCard from './PosterCard';
// import LoadingSpinner from '../common/LoadingSpinner';
import { PosterCardSkeleton } from '../common/Skeletons';

const PosterGrid = ({ posters, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <PosterCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!posters || posters.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4 text-center border border-white/5 rounded-2xl bg-bg-card">
        <div className="text-5xl mb-4">🖼️</div>
        <h3 className="text-xl font-headings font-bold text-text-primary mb-2">No prompts here yet</h3>
        <p className="text-text-muted">This trend is waiting for its first generative art prompts.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {posters.map((poster) => (
        <PosterCard key={poster._id || poster.id} poster={poster} />
      ))}
    </div>
  );
};

export default PosterGrid;
