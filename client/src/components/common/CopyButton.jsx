import React from 'react';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';

const CopyButton = ({ prompt, posterId, className = '' }) => {
  const [isCopied, copy] = useCopyToClipboard();

  return (
    <button
      onClick={(e) => {
        e.preventDefault(); // Prevent linking if inside a Link component
        e.stopPropagation(); // Stop opening modal
        copy(prompt, posterId);
      }}
      className={`relative w-full overflow-hidden flex items-center justify-center gap-2 py-3 px-4 font-bold text-sm transition-all duration-300 ${
        isCopied 
          ? 'bg-success text-white' 
          : 'bg-white/10 hover:bg-accent-primary text-text-primary'
      } ${className}`}
    >
      {isCopied ? (
        <>
          <svg className="w-5 h-5 animate-[ping_0.5s_cubic-bezier(0,0,0.2,1)_1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          <span className="animate-[pulse_0.5s_cubic-bezier(0.4,0,0.6,1)_1]">Copied!</span>
        </>
      ) : (
        <>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
          Copy Prompt
        </>
      )}
    </button>
  );
};

export default CopyButton;
