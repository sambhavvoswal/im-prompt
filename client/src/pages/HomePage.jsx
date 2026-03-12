import React from 'react';
import HeroBanner from '../components/home/HeroBanner';
import TrendGrid from '../components/home/TrendGrid';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-bg-primary">
      <HeroBanner />
      <TrendGrid />
    </div>
  );
};

export default HomePage;
