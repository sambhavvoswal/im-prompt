import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const PromptsManager = ({ token }) => {
  const [posters, setPosters] = useState([]);
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [filterTrendId, setFilterTrendId] = useState('all');
  
  // Form State
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    trendId: '',
    title: '',
    prompt: '',
    negativePrompt: '',
    style: 'photorealistic',
    aspectRatio: '1:1',
    primaryModel: 'midjourney',
    tags: '',
    previewImage: '',
    isActive: true
  });

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };

  const fetchData = async () => {
    try {
      setLoading(true);
      const [posterRes, trendRes] = await Promise.all([
        axios.get(`${apiUrl}/api/admin/posters`, axiosConfig),
        axios.get(`${apiUrl}/api/admin/trends`, axiosConfig) // Needs trend to select
      ]);
      if (posterRes.data.success) setPosters(posterRes.data.data);
      if (trendRes.data.success) {
        setTrends(trendRes.data.data);
        if (trendRes.data.data.length > 0 && !formData.trendId) {
            setFormData(prev => ({ ...prev, trendId: trendRes.data.data[0]._id }));
        }
      }
    } catch (error) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('image', file);

    try {
      setUploading(true);
      const response = await axios.post(`${apiUrl}/api/upload`, data, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setFormData(prev => ({ ...prev, previewImage: response.data.url }));
        toast.success('Image uploaded successfully');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (poster) => {
    setEditingId(poster._id);
    setFormData({
      trendId: poster.trendId?._id || poster.trendId,
      title: poster.title,
      prompt: poster.prompt,
      negativePrompt: poster.negativePrompt || '',
      style: poster.style || 'photorealistic',
      aspectRatio: poster.aspectRatio || '1:1',
      primaryModel: poster.primaryModel || 'midjourney',
      tags: poster.tags ? poster.tags.join(', ') : '',
      previewImage: poster.previewImage || '',
      isActive: poster.isActive
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this prompt?')) {
      try {
        await axios.delete(`${apiUrl}/api/admin/posters/${id}`, axiosConfig);
        toast.success('Prompt deleted successfully');
        fetchData();
      } catch (error) {
        toast.error('Failed to delete prompt');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
      };

      if (editingId) {
        await axios.put(`${apiUrl}/api/admin/posters/${editingId}`, payload, axiosConfig);
        toast.success('Prompt updated successfully');
      } else {
        await axios.post(`${apiUrl}/api/admin/posters`, payload, axiosConfig);
        toast.success('Prompt created successfully');
      }
      
      setFormData({
        trendId: trends.length > 0 ? trends[0]._id : '',
        title: '', prompt: '', negativePrompt: '', style: 'photorealistic',
        aspectRatio: '1:1', primaryModel: 'midjourney', tags: '', previewImage: '', isActive: true
      });
      setEditingId(null);
      setShowForm(false);
      fetchData();
    } catch (error) {
      console.error(error);
      toast.error('Failed to save prompt');
    }
  };

  if (loading) return <div>Loading Prompts...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-text-primary">Prompts Management</h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            if (!showForm) {
              setEditingId(null);
              setFormData({
                trendId: trends.length > 0 ? trends[0]._id : '',
                title: '', prompt: '', negativePrompt: '', style: 'photorealistic',
                aspectRatio: '1:1', primaryModel: 'midjourney', tags: '', previewImage: '', isActive: true
              });
            }
          }}
          className="bg-brand-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-secondary transition-colors"
        >
          {showForm ? 'Cancel' : 'Add New Prompt'}
        </button>
      </div>

      {showForm && (
        <div className="bg-bg-secondary p-6 rounded-xl border border-neutral-800 mb-8">
          <h3 className="text-xl font-bold mb-4">{editingId ? 'Edit Prompt' : 'Create New Prompt'}</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1 text-text-secondary">Related Trend</label>
              <select name="trendId" value={formData.trendId} onChange={handleInputChange} required className="w-full bg-bg-primary border border-neutral-700 rounded p-2 text-text-primary">
                {trends.map(t => <option key={t._id} value={t._id}>{t.emoji} {t.title}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1 text-text-secondary">Title</label>
              <input required name="title" value={formData.title} onChange={handleInputChange} className="w-full bg-bg-primary border border-neutral-700 rounded p-2 text-text-primary" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm mb-1 text-text-secondary">Main Prompt</label>
              <textarea required name="prompt" value={formData.prompt} onChange={handleInputChange} className="w-full bg-bg-primary border border-neutral-700 rounded p-2 text-text-primary font-mono text-xs" rows="3"></textarea>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm mb-1 text-text-secondary">Negative Prompt</label>
              <textarea name="negativePrompt" value={formData.negativePrompt} onChange={handleInputChange} className="w-full bg-bg-primary border border-neutral-700 rounded p-2 text-text-primary font-mono text-xs" rows="2"></textarea>
            </div>
            <div>
              <label className="block text-sm mb-1 text-text-secondary">Style</label>
              <select name="style" value={formData.style} onChange={handleInputChange} className="w-full bg-bg-primary border border-neutral-700 rounded p-2 text-text-primary">
                <option value="photorealistic">Photorealistic</option>
                <option value="illustration">Illustration</option>
                <option value="3d">3D</option>
                <option value="watercolor">Watercolor</option>
                <option value="cinematic">Cinematic</option>
                <option value="anime">Anime</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1 text-text-secondary">Aspect Ratio</label>
              <select name="aspectRatio" value={formData.aspectRatio} onChange={handleInputChange} className="w-full bg-bg-primary border border-neutral-700 rounded p-2 text-text-primary">
                <option value="1:1">1:1</option>
                <option value="16:9">16:9</option>
                <option value="9:16">9:16</option>
                <option value="4:5">4:5</option>
                <option value="3:2">3:2</option>
                <option value="2:3">2:3</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1 text-text-secondary">Primary Model</label>
              <select name="primaryModel" value={formData.primaryModel} onChange={handleInputChange} className="w-full bg-bg-primary border border-neutral-700 rounded p-2 text-text-primary">
                <option value="midjourney">Midjourney</option>
                <option value="dalle3">DALL-E 3</option>
                <option value="flux">FLUX</option>
                <option value="stable-diffusion">Stable Diffusion</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1 text-text-secondary">Tags (comma separated)</label>
              <input name="tags" value={formData.tags} onChange={handleInputChange} className="w-full bg-bg-primary border border-neutral-700 rounded p-2 text-text-primary" />
            </div>
            <div className="md:col-span-2 border border-neutral-700 p-4 rounded-lg">
              <label className="block text-sm mb-2 text-text-secondary">Preview Image Upload</label>
              <div className="flex items-center gap-4">
                <input type="file" onChange={handleImageUpload} accept="image/*" disabled={uploading} className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-brand-primary file:text-white hover:file:bg-brand-secondary text-text-secondary cursor-pointer" />
                {uploading && <span className="text-yellow-500 text-sm animate-pulse">Uploading...</span>}
              </div>
              {formData.previewImage && (
                <div className="mt-4">
                  <p className="text-xs text-text-secondary mb-1">Preview:</p>
                  <img src={formData.previewImage} alt="Cover Preview" className="h-48 w-auto rounded border border-neutral-700 object-contain" />
                </div>
              )}
            </div>
            <div className="md:col-span-2 mt-4 flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleInputChange} className="w-4 h-4" />
              <span>Is Active (Public)</span>
            </div>
            <div className="md:col-span-2 mt-4">
              <button type="submit" disabled={uploading} className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold disabled:opacity-50">
                {editingId ? 'Update Prompt' : 'Save New Prompt'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="flex justify-between items-center mb-4 mt-6">
        <div className="flex items-center gap-2">
            <span className="text-text-secondary text-sm">Filter by Trend:</span>
            <select 
                value={filterTrendId} 
                onChange={(e) => setFilterTrendId(e.target.value)}
                className="bg-bg-primary border border-neutral-700 rounded p-2 text-text-primary text-sm"
            >
                <option value="all">All Trends</option>
                {trends.map(t => <option key={t._id} value={t._id}>{t.emoji} {t.title}</option>)}
            </select>
        </div>
      </div>

      <div className="overflow-x-auto border border-neutral-800 rounded-xl bg-bg-secondary">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-neutral-800/50">
              <th className="p-4 border-b border-neutral-800">Preview</th>
              <th className="p-4 border-b border-neutral-800">Title</th>
              <th className="p-4 border-b border-neutral-800">Trend</th>
              <th className="p-4 border-b border-neutral-800">Style/AR</th>
              <th className="p-4 border-b border-neutral-800">Status</th>
              <th className="p-4 border-b border-neutral-800">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posters.filter(p => filterTrendId === 'all' || (p.trendId?._id || p.trendId) === filterTrendId).map(poster => (
              <tr key={poster._id} className="border-b border-neutral-800/50 hover:bg-neutral-800/20">
                <td className="p-4">
                  {poster.previewImage ? (
                    <img src={poster.previewImage} alt={poster.title} className="w-16 h-16 object-cover rounded" />
                  ) : <div className="w-16 h-16 bg-neutral-800 rounded flex items-center justify-center text-xs">N/A</div>}
                </td>
                <td className="p-4 font-medium max-w-[200px] truncate" title={poster.prompt}>
                  {poster.title} <br/>
                  <span className="text-xs text-text-secondary font-mono truncate block mt-1">{poster.prompt}</span>
                </td>
                <td className="p-4 capitalize">{poster.trendId?.title || 'Unknown'}</td>
                <td className="p-4">
                  <div className="text-sm">{poster.style}</div>
                  <div className="text-xs text-text-secondary">{poster.aspectRatio}</div>
                </td>
                <td className="p-4">
                  <span className={poster.isActive ? "text-green-500 text-xs" : "text-red-500 text-xs"}>{poster.isActive ? "Active" : "Inactive"}</span>
                </td>
                <td className="p-4">
                  <button onClick={() => handleEdit(poster)} className="text-blue-500 hover:underline mr-4">Edit</button>
                  <button onClick={() => handleDelete(poster._id)} className="text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
            {posters.filter(p => filterTrendId === 'all' || (p.trendId?._id || p.trendId) === filterTrendId).length === 0 && (
              <tr><td colSpan="6" className="p-8 text-center text-text-secondary">No prompts found. Create one above!</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PromptsManager;
