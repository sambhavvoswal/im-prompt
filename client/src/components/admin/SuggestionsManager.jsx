import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const STATUS_FILTERS = ['all', 'pending', 'approved', 'rejected'];
const STATUS_COLORS = {
  pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  approved: 'bg-green-500/20 text-green-400 border-green-500/30',
  rejected: 'bg-red-500/20 text-red-400 border-red-500/30',
};

const SuggestionsManager = ({ token, onUnreadCountChange }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedId, setExpandedId] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };

  const fetchSuggestions = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${apiUrl}/api/admin/suggestions?status=${statusFilter}`,
        axiosConfig
      );
      if (data.success) {
        setSuggestions(data.data);
        if (onUnreadCountChange) onUnreadCountChange(data.unreadCount);
      }
    } catch (error) {
      toast.error('Failed to fetch suggestions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, [statusFilter]);

  const handleMarkRead = async (id) => {
    try {
      await axios.put(`${apiUrl}/api/admin/suggestions/${id}`, { isRead: true }, axiosConfig);
      fetchSuggestions();
    } catch {
      toast.error('Failed to mark as read');
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await axios.put(`${apiUrl}/api/admin/suggestions/${id}`, { status, isRead: true }, axiosConfig);
      toast.success(`Suggestion ${status}`);
      fetchSuggestions();
    } catch {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this suggestion permanently?')) return;
    try {
      await axios.delete(`${apiUrl}/api/admin/suggestions/${id}`, axiosConfig);
      toast.success('Suggestion deleted');
      fetchSuggestions();
    } catch {
      toast.error('Failed to delete');
    }
  };

  const handleConvert = async (id) => {
    if (!window.confirm('Convert this suggestion into a poster? It will be created as inactive so you can add images first.')) return;
    try {
      const { data } = await axios.post(`${apiUrl}/api/admin/suggestions/${id}/convert`, {}, axiosConfig);
      toast.success(data.message || 'Converted to poster!');
      fetchSuggestions();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to convert');
    }
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  if (loading) return <div className="text-text-secondary py-8 text-center">Loading suggestions…</div>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-text-primary">Prompt Suggestions</h2>
        
        {/* Status Filters */}
        <div className="flex gap-2">
          {STATUS_FILTERS.map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg capitalize transition-colors ${
                statusFilter === s
                  ? 'bg-brand-primary text-white'
                  : 'bg-bg-primary border border-neutral-700 text-text-secondary hover:text-text-primary'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {suggestions.length === 0 ? (
        <div className="text-center py-16 bg-bg-secondary rounded-xl border border-neutral-800">
          <div className="text-4xl mb-3">📭</div>
          <p className="text-text-secondary">No {statusFilter !== 'all' ? statusFilter : ''} suggestions yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {suggestions.map(s => {
            const isExpanded = expandedId === s._id;
            return (
              <div
                key={s._id}
                className={`bg-bg-secondary border rounded-xl overflow-hidden transition-all ${
                  !s.isRead ? 'border-accent-primary/40 shadow-sm shadow-accent-primary/10' : 'border-neutral-800'
                }`}
              >
                {/* Header Row */}
                <div
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-neutral-800/30 transition-colors"
                  onClick={() => {
                    setExpandedId(isExpanded ? null : s._id);
                    if (!s.isRead) handleMarkRead(s._id);
                  }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {!s.isRead && (
                      <div className="w-2.5 h-2.5 rounded-full bg-accent-primary flex-shrink-0 animate-pulse" />
                    )}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-text-primary truncate">{s.title}</h3>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full border capitalize ${STATUS_COLORS[s.status]}`}>
                          {s.status}
                        </span>
                      </div>
                      <p className="text-sm text-text-muted truncate mt-0.5">
                        by <span className="text-accent-primary font-medium">{s.submitterName}</span>
                        {' · '}
                        {s.trendId ? `${s.trendId.emoji || ''} ${s.trendId.title}` : `New trend: "${s.suggestedTrendName}"`}
                        {' · '}
                        {formatDate(s.createdAt)}
                      </p>
                    </div>
                  </div>
                  <svg
                    className={`w-5 h-5 text-text-muted transition-transform flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-neutral-800">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="text-xs text-text-muted uppercase tracking-wider">Prompt</label>
                        <div className="mt-1 p-3 bg-bg-primary rounded-lg border border-neutral-800 font-mono text-xs text-text-primary whitespace-pre-wrap max-h-40 overflow-y-auto">
                          {s.prompt}
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-text-muted uppercase tracking-wider">Negative Prompt</label>
                        <div className="mt-1 p-3 bg-bg-primary rounded-lg border border-neutral-800 font-mono text-xs text-text-primary whitespace-pre-wrap max-h-40 overflow-y-auto">
                          {s.negativePrompt || '—'}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                      <div>
                        <label className="text-xs text-text-muted uppercase tracking-wider">Style</label>
                        <p className="text-sm text-text-primary capitalize mt-0.5">{s.style}</p>
                      </div>
                      <div>
                        <label className="text-xs text-text-muted uppercase tracking-wider">Aspect Ratio</label>
                        <p className="text-sm text-text-primary mt-0.5">{s.aspectRatio}</p>
                      </div>
                      <div>
                        <label className="text-xs text-text-muted uppercase tracking-wider">Tags</label>
                        <p className="text-sm text-text-primary mt-0.5">{s.tags?.length > 0 ? s.tags.join(', ') : '—'}</p>
                      </div>
                      <div>
                        <label className="text-xs text-text-muted uppercase tracking-wider">Email</label>
                        <p className="text-sm text-text-primary mt-0.5 truncate">{s.submitterEmail || '—'}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-neutral-800">
                      {s.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleUpdateStatus(s._id, 'approved')}
                            className="px-4 py-2 text-sm font-medium rounded-lg bg-green-600/20 text-green-400 border border-green-600/30 hover:bg-green-600/30 transition-colors"
                          >
                            ✓ Approve
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(s._id, 'rejected')}
                            className="px-4 py-2 text-sm font-medium rounded-lg bg-red-600/20 text-red-400 border border-red-600/30 hover:bg-red-600/30 transition-colors"
                          >
                            ✗ Reject
                          </button>
                        </>
                      )}
                      {s.status === 'approved' && s.trendId && (
                        <button
                          onClick={() => handleConvert(s._id)}
                          className="px-4 py-2 text-sm font-bold rounded-lg bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20 text-accent-primary border border-accent-primary/30 hover:from-accent-primary/30 hover:to-accent-secondary/30 transition-colors"
                        >
                          🔄 Convert to Poster
                        </button>
                      )}
                      {s.status !== 'pending' && s.status !== 'approved' && null}
                      <button
                        onClick={() => handleDelete(s._id)}
                        className="px-4 py-2 text-sm font-medium rounded-lg bg-neutral-800 text-text-muted border border-neutral-700 hover:text-red-400 hover:border-red-600/30 transition-colors ml-auto"
                      >
                        🗑 Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SuggestionsManager;
