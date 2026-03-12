import React from 'react';

const HeroBanner = () => {
  return (
    <div className="w-full bg-gradient-to-b from-accent-primary/20 to-bg-primary pt-20 pb-16 px-4 mb-4 rounded-b-[3rem] border-b border-white/5">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-headings font-bold text-text-primary mb-6 tracking-tight">
          Trending <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-primary to-accent-secondary">AI Poster Prompts</span>
        </h1>
        <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto">
          Browse, copy, and create stunning AI posters in seconds. Curated prompts for Midjourney, DALL·E 3, and more.
        </p>
      </div>
    </div>
  );
};

export default HeroBanner;
