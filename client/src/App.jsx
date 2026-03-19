import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ReactGA from 'react-ga4/src/index.js';
import './index.css';

import HomePage from './pages/HomePage';
import TrendPage from './pages/TrendPage';
import AdminPage from './pages/AdminPage';
import PosterModal from './components/modal/PosterModal';
import SuggestPromptModal from './components/modal/SuggestPromptModal';

import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ScrollToTop from './components/common/ScrollToTop';

import { AppProvider } from './context/AppContext';
import { useFaviconAnimation } from './hooks/useFaviconAnimation';

function PageTracker() {
  const location = useLocation();
  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: location.pathname + location.search });
  }, [location]);
  return null;
}

function App() {
  useFaviconAnimation();
  return (
    <AppProvider>
      <Router>
        <ScrollToTop />
        <PageTracker />
        <div className="min-h-screen app-container text-text-primary bg-bg-primary font-sans flex flex-col">
          <Toaster position="bottom-right" />
          <PosterModal />
          <SuggestPromptModal />
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/manage" element={<AdminPage />} />
              <Route path="/trend/:slug" element={<TrendPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
