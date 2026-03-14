import React, { useState } from 'react';

const BeforeAfterComparison = ({ poster }) => {
  const { beforeImage, previewImage } = poster;
  const [showBefore, setShowBefore] = useState(false);

  if (!beforeImage) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8 border border-neutral-800 rounded-lg bg-bg-secondary mt-4">
        <div className="text-4xl mb-4 opacity-50">📷</div>
        <h3 className="text-lg font-bold text-text-primary mb-2">No Before Image</h3>
        <p className="text-sm text-text-muted">This poster does not have a "before" image to compare against.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full right-panel-scroll overflow-y-auto pb-6">
      <div className="mb-6">
        <h2 className="text-xl font-headings font-bold text-text-primary mb-1">
          Before vs. After
        </h2>
        <p className="text-sm text-text-muted">
          Compare the original image with the AI-generated result
        </p>
      </div>

      <div className="flex justify-center mb-6">
        <div className="bg-neutral-800 p-1 rounded-full flex gap-1">
          <button 
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${!showBefore ? 'bg-primary text-white' : 'text-neutral-400 hover:text-white'}`}
            onClick={() => setShowBefore(false)}
          >
            After (AI)
          </button>
          <button 
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${showBefore ? 'bg-primary text-white' : 'text-neutral-400 hover:text-white'}`}
            onClick={() => setShowBefore(true)}
          >
            Before (Original)
          </button>
        </div>
      </div>

      <div className="relative aspect-auto flex justify-center w-full rounded-lg overflow-hidden border border-neutral-700 bg-black">
        <img 
          src={showBefore ? beforeImage : previewImage} 
          alt={showBefore ? "Original Before Image" : "AI Generated After Image"} 
          className="max-w-full max-h-[60vh] object-contain"
        />
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-medium text-white shadow-lg border border-white/10">
          {showBefore ? "Before" : "After"}
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterComparison;
