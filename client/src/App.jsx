import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './index.css';

import HomePage from './pages/HomePage';
import TrendPage from './pages/TrendPage';
import PosterModal from './components/modal/PosterModal';

import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ScrollToTop from './components/common/ScrollToTop';

import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen app-container text-text-primary bg-bg-primary font-sans flex flex-col">
          <Toaster position="bottom-right" />
          <PosterModal />
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
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
