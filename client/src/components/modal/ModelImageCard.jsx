import React from 'react';

const MODEL_COLORS = {
  'midjourney': 'border-purple-500 shadow-[0_0_15px_-3px_rgba(168,85,247,0.3)]',
  'dalle3': 'border-emerald-500 shadow-[0_0_15px_-3px_rgba(16,185,129,0.3)]',
  'flux': 'border-blue-500 shadow-[0_0_15px_-3px_rgba(59,130,246,0.3)]',
  'stable-diffusion': 'border-orange-500 shadow-[0_0_15px_-3px_rgba(249,115,22,0.3)]'
};

const MODEL_NAMES = {
  'midjourney': 'Midjourney v6',
  'dalle3': 'DALL·E 3',
  'flux': 'Flux.1 Pro',
  'stable-diffusion': 'SDXL'
};

const ModelImageCard = ({ output }) => {
  const colorClass = MODEL_COLORS[output.model] || 'border-white/20';
  const displayName = MODEL_NAMES[output.model] || output.model;

  return (
    <div className={`bg-bg-primary rounded-xl overflow-hidden border-t-4 border-x border-b border-x-white/5 border-b-white/5 ${colorClass} flex flex-col transition-transform hover:scale-[1.02] duration-300`}>
      <div className="relative aspect-square bg-bg-card flex-shrink-0">
        <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white/5 font-headings uppercase">
          {output.model?.charAt(0)}
        </div>
        <img 
          src={output.imageUrl} 
          alt={`Render by ${displayName}`}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </div>
      
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-start mb-2">
          <span className="font-bold text-sm text-text-primary">{displayName}</span>
          <span className="text-xs text-text-muted bg-white/5 px-1.5 py-0.5 rounded">{output.renderTime}</span>
        </div>
        
        {output.notes && (
          <p className="text-xs text-text-muted italic leading-relaxed line-clamp-2">
            "{output.notes}"
          </p>
        )}
      </div>
    </div>
  );
};

export default ModelImageCard;
