import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-bg-card border-t border-white/5 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-bg-primary font-bold text-xs">
              P
            </div>
            <span className="font-headings font-bold text-lg text-text-primary">
              PromptGallery
            </span>
          </div>

          <p className="text-text-muted text-sm text-center md:text-left max-w-md">
            The open-source collection of AI generative art prompts. Learn how different AI models interpret the same text.
          </p>

          <div className="flex gap-4">
            {['Midjourney', 'DALL·E 3', 'Flux', 'SDXL'].map(model => (
              <span key={model} className="text-xs text-text-muted bg-white/5 px-2 py-1 rounded">
                {model}
              </span>
            ))}
          </div>
          
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-muted">
          <p>© {new Date().getFullYear()} AI Poster Gallery. Built for the Anti-Gravity project.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Guidelines</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
