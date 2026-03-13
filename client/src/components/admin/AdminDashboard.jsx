import React, { useState } from 'react';
import TrendsManager from './TrendsManager';
import PromptsManager from './PromptsManager';

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('trends');
  const token = localStorage.getItem('adminToken'); // Ensure we pass token

  return (
    <div className="container mx-auto px-0 py-8">
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-neutral-800">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Dashboard Overview</h1>
          <p className="text-text-secondary mt-1">Manage your application content here.</p>
        </div>
        <button 
          onClick={onLogout}
          className="px-4 py-2 border border-neutral-700 bg-bg-secondary text-text-primary rounded-lg hover:bg-neutral-800 transition-colors"
        >
          Logout
        </button>
      </div>

      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab('trends')}
          className={`px-6 py-3 font-bold rounded-lg transition-colors ${
            activeTab === 'trends' 
              ? 'bg-brand-primary text-white' 
              : 'bg-bg-secondary border border-neutral-800 text-text-secondary hover:text-text-primary'
          }`}
        >
          Manage Trends
        </button>
        <button
          onClick={() => setActiveTab('prompts')}
          className={`px-6 py-3 font-bold rounded-lg transition-colors ${
            activeTab === 'prompts' 
              ? 'bg-brand-primary text-white' 
              : 'bg-bg-secondary border border-neutral-800 text-text-secondary hover:text-text-primary'
          }`}
        >
          Manage Prompts
        </button>
      </div>
      
      <div className="min-h-[400px]">
        {activeTab === 'trends' && <TrendsManager token={token} />}
        {activeTab === 'prompts' && <PromptsManager token={token} />}
      </div>
    </div>
  );
};

export default AdminDashboard;
