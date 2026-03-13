import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import PosterGrid from '../components/gallery/PosterGrid';
import { POSTERS } from '../data/hardcoded';
import trendsData from '../data/trends.json';

const TrendPage = () => {
  const { slug } = useParams();
  const [trend, setTrend] = useState(null);
  const [posters, setPosters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    const fetchTrendData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Load Trend Details locally
        const localTrend = trendsData.find(t => t.slug === slug);
        
        if (!localTrend) {
          setError(true);
          setLoading(false);
          return;
        }
        
        setTrend(localTrend);

        // Fetch Posters for this Trend from API
        const postersRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/posters?trendId=${localTrend.id}`);
        setPosters(postersRes.data);

      } catch (err) {
        console.warn("Failed to load posters from API. Attempting fallback data.", err);
        
        // Fallback Logic for posters
        const localTrend = trendsData.find(t => t.slug === slug);
        if (localTrend) {
          const fallbackPosters = POSTERS.filter(p => p.trendId === localTrend.id);
          setPosters(fallbackPosters);
        }
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchTrendData();
    }
  }, [slug]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <div className="text-6xl mb-6">🌌</div>
        <h1 className="text-3xl font-headings font-bold text-text-primary mb-4">Lost in the AI multiverse</h1>
        <p className="text-text-muted mb-8">We couldn't find the trend you're looking for.</p>
        <Link to="/" className="bg-accent-primary hover:bg-accent-secondary text-white px-6 py-3 rounded-full font-bold transition-colors">
          Back to Homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary pb-20">
      
      {/* Hero Section */}
      <div className="relative w-full h-[50vh] min-h-[400px] flex items-end pb-12 overflow-hidden border-b border-white/5">
        {/* Background Image with Blur */}
        {/* Background Image with Blur */}
        {trend && (
          <div className="absolute inset-0">
            <img 
              src={trend.coverImage} 
              alt="" 
              className="w-full h-full object-cover blur-[100px] scale-125 opacity-20"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div className="absolute inset-0 bg-bg-primary/60 backdrop-blur-3xl" />
          </div>
        )}
        
        <div className="relative max-w-7xl mx-auto px-4 w-full">
          <Link to="/" className="inline-flex items-center text-text-muted hover:text-white mb-6 transition-colors font-medium text-sm bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            All Trends
          </Link>
          
          {trend ? (
            <div className="max-w-3xl">
              <div className="text-6xl mb-4 drop-shadow-lg">{trend.emoji}</div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-headings font-bold text-text-primary mb-4">
                {trend.title}
              </h1>
              <p className="text-lg text-text-muted">
                {trend.description}
              </p>
            </div>
          ) : (
            <div className="animate-pulse flex flex-col gap-4">
              <div className="w-16 h-16 bg-white/10 rounded-full"></div>
              <div className="h-12 bg-white/10 rounded-lg w-3/4 max-w-md"></div>
              <div className="h-6 bg-white/10 rounded-lg w-full max-w-xl"></div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 mt-12">
        <div className="flex justify-between items-end mb-8 border-b border-white/5 pb-4">
          <h2 className="text-2xl font-headings text-text-primary font-bold">
            Curated Prompts <span className="text-text-muted font-normal text-lg ml-2">({posters.length})</span>
          </h2>
        </div>
        
        {/* Excluded FilterBar per V1 requirements. Passed right to PosterGrid */}
        <PosterGrid posters={posters} loading={loading} />
      </div>
      
    </div>
  );
};

export default TrendPage;
