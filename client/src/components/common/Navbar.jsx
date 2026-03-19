import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import LogoAnimation from './LogoAnimation ';

const Navbar = () => {
  const { openSuggestModal } = useAppContext();

  return (
    <nav className="sticky top-0 z-40 w-full backdrop-blur-xl bg-bg-primary/80 border-b border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          {/* <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-white to-zinc-400 flex items-center justify-center text-bg-primary font-bold text-lg group-hover:scale-105 transition-transform">
              P
            </div>
            <span className="font-headings font-bold text-xl tracking-tight hidden sm:block text-text-primary">
              <span className="text-accent-primary italic underline text-2xl">Prompt</span> <span className="text-white font-caveat">Gallery</span>
            </span>
          </Link> */}
          
          {/*logo2*/}
          <Link to='/' className='flex items-center gap-2 group'>
            <LogoAnimation />
          </Link>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <button 
              onClick={openSuggestModal}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary text-black hover:shadow-lg hover:shadow-accent-primary/30 hover:scale-105 transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span className="hidden sm:inline">Suggest a Prompt</span>
              <span className="sm:hidden">Suggest</span>
            </button>
            
            <a 
              href="https://github.com/sambhavvoswal/im-prompt" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-text-muted hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors border border-white/5"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.4); }
          50% { box-shadow: 0 0 12px 4px rgba(212, 175, 55, 0.2); }
        }
        .suggest-btn {
          animation: pulse-glow 2s ease-in-out 3;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
