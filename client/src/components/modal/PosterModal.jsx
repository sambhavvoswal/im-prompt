import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';
import PromptPanel from './PromptPanel';
import BeforeAfterComparison from './BeforeAfterComparison';

const PosterModal = () => {
  const { isModalOpen, closeModal, selectedPoster } = useAppContext();
  const [activeTab, setActiveTab] = useState('prompt'); // 'prompt' | 'compare'

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeModal]);

  // Reset tab when new poster opens
  useEffect(() => {
    if (isModalOpen) setActiveTab('prompt');
  }, [isModalOpen, selectedPoster]);

  if (!selectedPoster) return null;

  return (
    <AnimatePresence>
      {isModalOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-bg-card w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row pointer-events-auto h-[90vh] md:h-[80vh] border border-white/10"
            >
              
              {/* Close Button Mobile/Tablet absolute */}
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 md:hidden bg-black/50 text-white p-2 rounded-full backdrop-blur-md"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="w-full md:w-[55%] bg-bg-primary relative flex-shrink-0 flex items-center justify-center p-4 md:p-8 border-b md:border-b-0 md:border-r border-white/10">
                <img 
                  src={selectedPoster.previewImage} 
                  alt={selectedPoster.title}
                  className="w-full h-full object-contain max-h-[40vh] md:max-h-none rounded-xl shadow-2xl"
                />
              </div>

              {/* Right Side - Content (45%) */}
              <div className="w-full md:w-[45%] flex flex-col h-full bg-bg-card">
                
                {/* Header / Tabs */}
                <div className="flex items-center justify-between border-b border-white/5 px-6 pt-6 pb-0">
                  <div className="flex gap-6">
                    <button 
                      onClick={() => setActiveTab('prompt')}
                      className={`pb-4 px-1 font-bold text-sm transition-colors relative ${
                        activeTab === 'prompt' ? 'text-accent-secondary' : 'text-text-muted hover:text-text-primary'
                      }`}
                    >
                      Prompt Details
                      {activeTab === 'prompt' && (
                        <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-secondary" />
                      )}
                    </button>
                    <button 
                      onClick={() => setActiveTab('compare')}
                      className={`pb-4 px-1 font-bold text-sm transition-colors relative ${
                        activeTab === 'compare' ? 'text-accent-secondary' : 'text-text-muted hover:text-text-primary'
                      }`}
                    >
                      Before & After
                      {activeTab === 'compare' && (
                        <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-secondary" />
                      )}
                    </button>
                  </div>

                  {/* Desktop Close Button */}
                  <button 
                    onClick={closeModal}
                    className="hidden md:flex mb-4 text-text-muted hover:text-white transition-colors p-1"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Tab Content Area */}
                <div className="flex-1 overflow-hidden p-6">
                  <AnimatePresence mode="wait">
                    {activeTab === 'prompt' ? (
                      <motion.div
                        key="prompt"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.2 }}
                        className="h-full"
                      >
                        <PromptPanel poster={selectedPoster} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="compare"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="h-full"
                      >
                        <BeforeAfterComparison poster={selectedPoster} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PosterModal;
