import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedPoster, setSelectedPoster] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (poster) => {
    setSelectedPoster(poster);
    setIsModalOpen(true);
    // Prevent background scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Restore background scrolling
    document.body.style.overflow = 'unset';
    // Optional: delay clearing selected poster to let out-animation finish smoothly
    setTimeout(() => {
      setSelectedPoster(null);
    }, 300);
  };

  return (
    <AppContext.Provider value={{ selectedPoster, isModalOpen, openModal, closeModal }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
