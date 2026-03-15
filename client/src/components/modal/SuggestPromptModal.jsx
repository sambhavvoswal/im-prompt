import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAppContext } from '../../context/AppContext';

const STYLES = [
  { value: 'photorealistic', label: 'Photorealistic' },
  { value: 'illustration', label: 'Illustration' },
  { value: '3d', label: '3D' },
  { value: 'watercolor', label: 'Watercolor' },
  { value: 'cinematic', label: 'Cinematic' },
  { value: 'anime', label: 'Anime' },
  { value: 'other', label: 'Other' },
];

const ASPECT_RATIOS = ['1:1', '16:9', '9:16', '4:5', '3:2', '2:3'];

const SuggestPromptModal = () => {
  const { isSuggestModalOpen, closeSuggestModal } = useAppContext();
  const [trends, setTrends] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isNewTrend, setIsNewTrend] = useState(false);

  const [formData, setFormData] = useState({
    trendId: '',
    suggestedTrendName: '',
    title: '',
    prompt: '',
    negativePrompt: '',
    style: 'photorealistic',
    aspectRatio: '1:1',
    tags: '',
    submitterName: '',
    submitterEmail: '',
  });

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    if (isSuggestModalOpen) {
      // Fetch trends for dropdown
      axios.get(`${apiUrl}/api/trends`)
        .then(res => {
          setTrends(res.data || []);
          if (res.data && res.data.length > 0) {
            setFormData(prev => ({ ...prev, trendId: res.data[0]._id }));
          }
        })
        .catch(err => console.error('Failed to load trends:', err));
    }
  }, [isSuggestModalOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTrendChange = (e) => {
    const value = e.target.value;
    if (value === '__new__') {
      setIsNewTrend(true);
      setFormData(prev => ({ ...prev, trendId: '', suggestedTrendName: '' }));
    } else {
      setIsNewTrend(false);
      setFormData(prev => ({ ...prev, trendId: value, suggestedTrendName: '' }));
    }
  };

  const resetForm = () => {
    setFormData({
      trendId: trends.length > 0 ? trends[0]._id : '',
      suggestedTrendName: '',
      title: '',
      prompt: '',
      negativePrompt: '',
      style: 'photorealistic',
      aspectRatio: '1:1',
      tags: '',
      submitterName: '',
      submitterEmail: '',
    });
    setIsNewTrend(false);
    setSubmitted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      };
      // Remove empty optional fields
      if (!payload.trendId) delete payload.trendId;
      if (!payload.suggestedTrendName) delete payload.suggestedTrendName;
      if (!payload.submitterEmail) delete payload.submitterEmail;

      await axios.post(`${apiUrl}/api/suggestions`, payload);
      setSubmitted(true);

      setTimeout(() => {
        closeSuggestModal();
        resetForm();
      }, 2500);
    } catch (error) {
      console.error('Submission error:', error);
      alert(error.response?.data?.message || 'Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    closeSuggestModal();
    setTimeout(resetForm, 300);
  };

  if (!isSuggestModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-bg-card border border-white/10 rounded-2xl shadow-2xl shadow-black/50 animate-[slideUp_0.3s_ease-out]">
        
        {/* Submitted success state */}
        {submitted ? (
          <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
            <div className="text-6xl mb-4 animate-bounce">🎉</div>
            <h2 className="text-2xl font-headings font-bold text-text-primary mb-2">Thank you!</h2>
            <p className="text-text-muted">Your prompt suggestion is under review. We'll get back to you soon!</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="sticky top-0 bg-bg-card/95 backdrop-blur-sm border-b border-white/10 px-6 py-4 flex items-center justify-between z-10">
              <div>
                <h2 className="text-xl font-headings font-bold text-text-primary flex items-center gap-2">
                  <span className="text-2xl">💡</span> Suggest a Prompt
                </h2>
                <p className="text-sm text-text-muted mt-0.5">Share your AI prompt idea with the community</p>
              </div>
              <button
                onClick={handleClose}
                className="p-2 text-text-muted hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              
              {/* Trend Selection */}
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1.5">Trend *</label>
                <select
                  value={isNewTrend ? '__new__' : formData.trendId}
                  onChange={handleTrendChange}
                  className="w-full bg-bg-primary border border-white/10 rounded-lg px-3 py-2.5 text-text-primary focus:outline-none focus:border-accent-primary/50 focus:ring-1 focus:ring-accent-primary/30 transition-colors"
                >
                  {trends.map(t => (
                    <option key={t._id} value={t._id}>{t.emoji} {t.title}</option>
                  ))}
                  <option value="__new__">✨ Suggest a new trend…</option>
                </select>
                {isNewTrend && (
                  <input
                    name="suggestedTrendName"
                    value={formData.suggestedTrendName}
                    onChange={handleChange}
                    placeholder="e.g. World Cup 2026, Diwali Templates…"
                    required
                    className="mt-2 w-full bg-bg-primary border border-white/10 rounded-lg px-3 py-2.5 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent-primary/50 focus:ring-1 focus:ring-accent-primary/30 transition-colors"
                  />
                )}
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1.5">Prompt Title *</label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="A short, descriptive title"
                  className="w-full bg-bg-primary border border-white/10 rounded-lg px-3 py-2.5 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent-primary/50 focus:ring-1 focus:ring-accent-primary/30 transition-colors"
                />
              </div>

              {/* Main Prompt */}
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1.5">AI Prompt *</label>
                <textarea
                  name="prompt"
                  value={formData.prompt}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Write your full AI image generation prompt here…"
                  className="w-full bg-bg-primary border border-white/10 rounded-lg px-3 py-2.5 text-text-primary placeholder:text-text-muted/50 font-mono text-sm focus:outline-none focus:border-accent-primary/50 focus:ring-1 focus:ring-accent-primary/30 transition-colors resize-none"
                />
              </div>

              {/* Negative Prompt */}
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1.5">
                  Negative Prompt <span className="text-text-muted/60 font-normal">(optional)</span>
                </label>
                <textarea
                  name="negativePrompt"
                  value={formData.negativePrompt}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Things to exclude from the generation…"
                  className="w-full bg-bg-primary border border-white/10 rounded-lg px-3 py-2.5 text-text-primary placeholder:text-text-muted/50 font-mono text-sm focus:outline-none focus:border-accent-primary/50 focus:ring-1 focus:ring-accent-primary/30 transition-colors resize-none"
                />
              </div>

              {/* Style & Aspect Ratio — commented out, defaults will be used */}
              {/* <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1.5">Style</label>
                  <select
                    name="style"
                    value={formData.style}
                    onChange={handleChange}
                    className="w-full bg-bg-primary border border-white/10 rounded-lg px-3 py-2.5 text-text-primary focus:outline-none focus:border-accent-primary/50 focus:ring-1 focus:ring-accent-primary/30 transition-colors"
                  >
                    {STYLES.map(s => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1.5">Aspect Ratio</label>
                  <div className="grid grid-cols-3 gap-2">
                    {ASPECT_RATIOS.map(ratio => {
                      const [w, h] = ratio.split(':').map(Number);
                      const maxDim = 28;
                      const scale = maxDim / Math.max(w, h);
                      const displayW = Math.round(w * scale);
                      const displayH = Math.round(h * scale);
                      return (
                        <button
                          key={ratio}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, aspectRatio: ratio }))}
                          className={`flex flex-col items-center gap-1 p-2 rounded-lg border transition-all ${
                            formData.aspectRatio === ratio
                              ? 'border-accent-primary bg-accent-primary/10 text-accent-primary'
                              : 'border-white/10 text-text-muted hover:border-white/20'
                          }`}
                        >
                          <div
                            className={`border-2 rounded-sm ${
                              formData.aspectRatio === ratio ? 'border-accent-primary' : 'border-text-muted/40'
                            }`}
                            style={{ width: displayW, height: displayH }}
                          />
                          <span className="text-xs font-medium">{ratio}</span>
                        </button>
                      );
                    })}
                  </div>
                  <select
                    name="aspectRatio"
                    value={formData.aspectRatio}
                    onChange={handleChange}
                    className="w-full bg-bg-primary border border-white/10 rounded-lg px-3 py-2.5 text-text-primary focus:outline-none focus:border-accent-primary/50 focus:ring-1 focus:ring-accent-primary/30 transition-colors"
                  >
                    {ASPECT_RATIOS.map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
              </div> */}

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1.5">
                  Tags <span className="text-text-muted/60 font-normal">(comma-separated, optional)</span>
                </label>
                <input
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="e.g. portrait, fantasy, neon"
                  className="w-full bg-bg-primary border border-white/10 rounded-lg px-3 py-2.5 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent-primary/50 focus:ring-1 focus:ring-accent-primary/30 transition-colors"
                />
              </div>

              {/* Divider */}
              <div className="border-t border-white/5 pt-4">
                <p className="text-xs text-text-muted mb-3 uppercase tracking-wider font-medium">Your Info</p>
              </div>

              {/* Submitter Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1.5">
                    Your Name * <span className="text-accent-primary/80 font-normal text-xs">(for credits)</span>
                  </label>
                  <input
                    name="submitterName"
                    value={formData.submitterName}
                    onChange={handleChange}
                    required
                    placeholder="How should we credit you?"
                    className="w-full bg-bg-primary border border-white/10 rounded-lg px-3 py-2.5 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent-primary/50 focus:ring-1 focus:ring-accent-primary/30 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1.5">
                    Email <span className="text-text-muted/60 font-normal">(optional)</span>
                  </label>
                  <input
                    type="email"
                    name="submitterEmail"
                    value={formData.submitterEmail}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full bg-bg-primary border border-white/10 rounded-lg px-3 py-2.5 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent-primary/50 focus:ring-1 focus:ring-accent-primary/30 transition-colors"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-xl font-bold text-black bg-gradient-to-r from-accent-primary to-accent-secondary hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-accent-primary/20 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Submitting…
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Submit Suggestion
                  </>
                )}
              </button>

              <p className="text-xs text-text-muted/60 text-center">
                Your suggestion will be reviewed by our team. Images will be added by our curators.
              </p>
            </form>
          </>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default SuggestPromptModal;
