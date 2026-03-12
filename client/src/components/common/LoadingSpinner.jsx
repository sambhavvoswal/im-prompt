import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-20 w-full">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-white/10"></div>
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-accent-primary border-t-transparent animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-accent-secondary animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
