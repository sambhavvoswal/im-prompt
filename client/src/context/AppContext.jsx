import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedPoster, setSelectedPoster] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuggestModalOpen, setIsSuggestModalOpen] = useState(false);

  const openModal = (poster) => {
    setSelectedPoster(poster);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
    setTimeout(() => {
      setSelectedPoster(null);
    }, 300);
  };

  const openSuggestModal = () => {
    setIsSuggestModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeSuggestModal = () => {
    setIsSuggestModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <AppContext.Provider value={{ 
      selectedPoster, isModalOpen, openModal, closeModal,
      isSuggestModalOpen, openSuggestModal, closeSuggestModal
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
