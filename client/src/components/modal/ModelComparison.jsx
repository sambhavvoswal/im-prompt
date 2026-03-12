import React from 'react';
import ModelImageCard from './ModelImageCard';

const ModelComparison = ({ poster }) => {
  const outputs = poster.modelOutputs || [];

  if (outputs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <div className="text-4xl mb-4 opacity-50">🤖</div>
        <h3 className="text-lg font-bold text-text-primary mb-2">No Comparisons Available</h3>
        <p className="text-sm text-text-muted">This prompt hasn't been tested across multiple models yet.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full right-panel-scroll overflow-y-auto pb-6">
      <div className="mb-6">
        <h2 className="text-xl font-headings font-bold text-text-primary mb-1">
          Same prompt. Different AI. You decide.
        </h2>
        <p className="text-sm text-text-muted">
          See how each model interprets this exact prompt
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {outputs.map((output, idx) => (
          <ModelImageCard key={idx} output={output} />
        ))}
      </div>
    </div>
  );
};

export default ModelComparison;
