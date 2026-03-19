import React, { useState, useEffect } from 'react';
import TrendCard from './TrendCard';
import { TrendCardSkeleton } from '../common/Skeletons';
import axios from 'axios';

const CATEGORIES = ['All', 'Festival', 'Sports', 'Seasonal', 'Occasion'];

const TrendGrid = () => {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTrends = async () => {
      setLoading(true);
      // Small delay for smooth skeleton UX transition
      await new Promise(r => setTimeout(r, 300));
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const { data } = await axios.get(`${apiUrl}/api/trends`);
        setTrends(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching trends:', err);
        setError('Failed to load trends. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadTrends();
  }, []);

  const filteredTrends = activeCategory === 'All' 
    ? [...trends] 
    : trends.filter(t => t.category.toLowerCase() === activeCategory.toLowerCase());

  // Sort: trending first, then rest
  filteredTrends.sort((a, b) => {
    if (a.isTrending && !b.isTrending) return -1;
    if (!a.isTrending && b.isTrending) return 1;
    return 0;
  });

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
                ? 'bg-white text-black shadow-lg shadow-white/20' 
                : 'bg-bg-card text-text-muted hover:bg-bg-card-hover hover:text-text-primary border border-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 w-full">
          {[...Array(8)].map((_, i) => (
            <TrendCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredTrends.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 w-full">
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
