import React from 'react';

export const TrendCardSkeleton = () => {
  return (
    <div className="bg-bg-card rounded-2xl overflow-hidden border border-white/5 animate-pulse h-full flex flex-col">
      <div className="aspect-[4/3] bg-white/5 w-full"></div>
      <div className="p-3.5 sm:p-5 flex-1 flex flex-col">
        <div className="h-5 sm:h-6 bg-white/10 rounded w-3/4 mb-1 sm:mb-2"></div>
        <div className="h-3.5 sm:h-4 bg-white/5 rounded w-full mb-1 sm:mb-2 opacity-50"></div>
        <div className="h-3.5 sm:h-4 bg-white/5 rounded w-5/6 mb-3 sm:mb-4 opacity-50"></div>
        <div className="flex gap-1.5 sm:gap-2 mb-3 sm:mb-4">
          <div className="h-6 bg-white/5 rounded w-16"></div>
          <div className="h-6 bg-white/5 rounded w-20"></div>
        </div>
        <div className="mt-auto pt-4 border-t border-white/5 flex justify-between">
          <div className="h-4 bg-white/5 rounded w-20"></div>
          <div className="h-4 bg-white/5 rounded w-4"></div>
        </div>
      </div>
    </div>
  );
};

export const PosterCardSkeleton = () => {
  return (
    <div className="bg-bg-card rounded-2xl overflow-hidden border border-white/5 animate-pulse h-full flex flex-col">
      <div className="aspect-[4/5] bg-white/5 w-full relative">
        <div className="absolute bottom-4 left-4 right-4">
           <div className="h-5 bg-white/10 rounded w-3/4 mb-2"></div>
           <div className="h-4 bg-white/10 rounded w-1/2 mb-3"></div>
           <div className="h-6 bg-white/20 rounded w-20"></div>
        </div>
      </div>
      <div className="mt-auto">
        <div className="h-12 bg-white/5 w-full"></div>
        <div className="px-4 py-3 flex justify-between border-t border-white/5">
          <div className="h-3 bg-white/5 rounded w-16"></div>
          <div className="h-3 bg-white/5 rounded w-8"></div>
        </div>
      </div>
    </div>
  );
};
