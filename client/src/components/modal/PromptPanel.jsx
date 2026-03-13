import React, { useState } from 'react';
import CopyButton from '../common/CopyButton';
import TagBadge from '../common/TagBadge';

const PromptPanel = ({ poster }) => {
  const [showNegative, setShowNegative] = useState(false);

  return (
    <div className="flex flex-col h-full right-panel-scroll overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-headings font-bold text-text-primary mb-3">
          {poster.title}
        </h2>
        <div className="flex flex-wrap gap-2">
          {poster.tags?.map((tag, i) => (
            <TagBadge key={i} text={tag} />
          ))}
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-end mb-2">
          <label className="text-xs uppercase tracking-widest text-text-muted font-bold">
            AI Prompt
          </label>
        </div>
        
        <div className="bg-bg-primary p-4 rounded-xl border border-white/5 relative group">
          <pre className="font-mono text-sm text-text-primary whitespace-pre-wrap font-medium leading-relaxed max-h-52 overflow-y-auto custom-scrollbar">
            {poster.prompt}
          </pre>
        </div>
      </div>

      <div className="mb-6">
        <CopyButton prompt={poster.prompt} posterId={poster._id} className="rounded-xl py-4 text-base" />
      </div>

      {poster.negativePrompt && (
        <div className="mb-8 border border-white/5 rounded-xl overflow-hidden bg-white/5">
          <button 
            onClick={() => setShowNegative(!showNegative)}
            className="w-full flex justify-between items-center p-3 text-sm font-medium text-text-muted hover:text-text-primary transition-colors"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Negative Prompt
            </span>
            <svg 
              className={`w-4 h-4 transition-transform duration-200 ${showNegative ? 'rotate-180' : ''}`} 
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <div 
            className={`transition-all duration-300 ease-in-out ${
              showNegative ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
            } overflow-hidden`}
          >
            <div className="p-4 pt-0 text-sm text-text-muted font-mono bg-bg-primary/50 border-t border-white/5">
              {poster.negativePrompt}
            </div>
          </div>
        </div>
      )}

      {/* Metadata visually represented */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-auto pt-6 border-t border-white/5">
        
        {/* <div className="bg-bg-primary/50 p-3 rounded-lg border border-white/5 flex flex-col items-center justify-center text-center">
          <span className="text-xs text-text-muted mb-1">Style</span>
          <span className="text-sm font-bold uppercase tracking-wider text-accent-secondary">
            {poster.style}
          </span>
        </div> */}
        
        <div className="bg-bg-primary/50 p-3 rounded-lg border border-white/5 flex flex-col items-center justify-center text-center">
          <span className="text-xs text-text-muted mb-1">Primary Model</span>
          <span className="text-sm font-bold text-accent-primary capitalize">
            {poster.primaryModel?.replace('-', ' ')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PromptPanel;
