import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TRENDS } from '../../data/hardcoded';
import TrendCard from './TrendCard';
// import LoadingSpinner from '../common/LoadingSpinner';
import { TrendCardSkeleton } from '../common/Skeletons';

const CATEGORIES = ['All', 'Festival', 'Sports', 'Seasonal', 'Occasion'];

const TrendGrid = () => {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        setLoading(true);
        // Add minimal delay for smooth UX transition
        await new Promise(r => setTimeout(r, 400));
        
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/trends`);
        setTrends(response.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch trends from API, using fallback data", err);
        // Fallback to hardcoded V1 data if API fails
        setTrends(TRENDS);
        // We do not set error state here fully as we have fallback data to show
      } finally {
        setLoading(false);
      }
    };

    fetchTrends();
  }, []);

  const filteredTrends = activeCategory === 'All' 
    ? trends 
    : trends.filter(t => t.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mb-20">
      
      {/* Filters */}
      <div className="flex overflow-x-auto pb-4 mb-8 gap-2 no-scrollbar hide-scroll-bar">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeCategory === cat 
                ? 'bg-accent-primary text-white shadow-lg shadow-accent-primary/20' 
                : 'bg-bg-card text-text-muted hover:bg-bg-card-hover hover:text-text-primary border border-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <TrendCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredTrends.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTrends.map(trend => (
            <TrendCard key={trend._id || trend.id} trend={trend} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-bg-card rounded-2xl border border-white/5">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-xl font-headings text-text-primary mb-2">No trends found</h3>
          <p className="text-text-muted">There are no active trends in this category right now.</p>
          <button 
            onClick={() => setActiveCategory('All')}
            className="mt-6 text-accent-secondary hover:text-white transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}
      
    </div>
  );
};

export default TrendGrid;
