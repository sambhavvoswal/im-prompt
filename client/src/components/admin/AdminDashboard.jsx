import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TrendsManager from './TrendsManager';
import PromptsManager from './PromptsManager';
import SuggestionsManager from './SuggestionsManager';
import NotificationBell from './NotificationBell';

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('trends');
  const [unreadCount, setUnreadCount] = useState(0);
  const token = localStorage.getItem('adminToken');

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Fetch initial unread count
  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/api/admin/suggestions?status=all`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (data.success) {
          setUnreadCount(data.unreadCount);
        }
      } catch (err) {
        // silently fail — not critical
      }
    };
    if (token) fetchUnreadCount();
  }, [token]);

  return (
    <div className="container mx-auto px-0 py-8">
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-neutral-800">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Dashboard Overview</h1>
            <p className="text-text-secondary mt-1">Manage your application content here.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <NotificationBell
            count={unreadCount}
            onClick={() => setActiveTab('suggestions')}
          />
          <button 
            onClick={onLogout}
            className="px-4 py-2 border border-neutral-700 bg-bg-secondary text-text-primary rounded-lg hover:bg-neutral-800 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex gap-3 mb-8 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('trends')}
          className={`px-5 py-2.5 font-bold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'trends' 
              ? 'bg-brand-primary text-white' 
              : 'bg-bg-secondary border border-neutral-800 text-text-secondary hover:text-text-primary'
          }`}
        >
          Manage Trends
        </button>
        <button
          onClick={() => setActiveTab('prompts')}
          className={`px-5 py-2.5 font-bold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'prompts' 
              ? 'bg-brand-primary text-white' 
              : 'bg-bg-secondary border border-neutral-800 text-text-secondary hover:text-text-primary'
          }`}
        >
          Manage Prompts
        </button>
        <button
          onClick={() => setActiveTab('suggestions')}
          className={`px-5 py-2.5 font-bold rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'suggestions' 
              ? 'bg-brand-primary text-white' 
              : 'bg-bg-secondary border border-neutral-800 text-text-secondary hover:text-text-primary'
          }`}
        >
          Suggestions
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-[10px] font-bold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </button>
      </div>
      
      <div className="min-h-[400px]">
        {activeTab === 'trends' && <TrendsManager token={token} />}
        {activeTab === 'prompts' && <PromptsManager token={token} />}
        {activeTab === 'suggestions' && (
          <SuggestionsManager
            token={token}
            onUnreadCountChange={setUnreadCount}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
