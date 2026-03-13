import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const TrendsManager = ({ token }) => {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // Form State
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    description: '',
    emoji: '',
    coverImage: '',
    category: 'occasion',
    tags: '',
    isActive: true,
    isTrending: false
  });

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const fetchTrends = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${apiUrl}/api/admin/trends`, axiosConfig);
      if (data.success) {
        setTrends(data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch trends');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrends();
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
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setFormData(prev => ({ ...prev, coverImage: response.data.url }));
        toast.success('Image uploaded successfully');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (trend) => {
    setEditingId(trend._id);
    setFormData({
      slug: trend.slug,
      title: trend.title,
      description: trend.description || '',
      emoji: trend.emoji || '',
      coverImage: trend.coverImage || '',
      category: trend.category || 'occasion',
      tags: trend.tags ? trend.tags.join(', ') : '',
      isActive: trend.isActive,
      isTrending: trend.isTrending || false
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this trend?')) {
      try {
        await axios.delete(`${apiUrl}/api/admin/trends/${id}`, axiosConfig);
        toast.success('Trend deleted successfully');
        fetchTrends();
      } catch (error) {
        toast.error('Failed to delete trend');
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
        await axios.put(`${apiUrl}/api/admin/trends/${editingId}`, payload, axiosConfig);
        toast.success('Trend updated successfully');
      } else {
        await axios.post(`${apiUrl}/api/admin/trends`, payload, axiosConfig);
        toast.success('Trend created successfully');
      }
      
      setFormData({
        slug: '', title: '', description: '', emoji: '', coverImage: '',
        category: 'occasion', tags: '', isActive: true, isTrending: false
      });
      setEditingId(null);
      setShowForm(false);
      fetchTrends();
    } catch (error) {
      console.error(error);
      toast.error('Failed to save trend');
    }
  };

  if (loading) return <div>Loading Trends...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-text-primary">Trends Management</h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            if (!showForm) {
              setEditingId(null);
              setFormData({
                slug: '', title: '', description: '', emoji: '', coverImage: '',
                category: 'occasion', tags: '', isActive: true, isTrending: false
              });
            }
          }}
          className="bg-brand-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-secondary transition-colors"
        >
          {showForm ? 'Cancel' : 'Add New Trend'}
        </button>
      </div>

      {showForm && (
        <div className="bg-bg-secondary p-6 rounded-xl border border-neutral-800 mb-8">
          <h3 className="text-xl font-bold mb-4">{editingId ? 'Edit Trend' : 'Create New Trend'}</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1 text-text-secondary">Title</label>
              <input required name="title" value={formData.title} onChange={handleInputChange} className="w-full bg-bg-primary border border-neutral-700 rounded p-2 text-text-primary" />
            </div>
            <div>
              <label className="block text-sm mb-1 text-text-secondary">Slug (unique)</label>
              <input required name="slug" value={formData.slug} onChange={handleInputChange} className="w-full bg-bg-primary border border-neutral-700 rounded p-2 text-text-primary" />
            </div>
            <div>
              <label className="block text-sm mb-1 text-text-secondary">Emoji</label>
              <input name="emoji" value={formData.emoji} onChange={handleInputChange} className="w-full bg-bg-primary border border-neutral-700 rounded p-2 text-text-primary" />
            </div>
            <div>
              <label className="block text-sm mb-1 text-text-secondary">Category</label>
              <select name="category" value={formData.category} onChange={handleInputChange} className="w-full bg-bg-primary border border-neutral-700 rounded p-2 text-text-primary">
                <option value="festival">Festival</option>
                <option value="sports">Sports</option>
                <option value="news">News</option>
                <option value="seasonal">Seasonal</option>
                <option value="occasion">Occasion</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm mb-1 text-text-secondary">Description</label>
              <textarea name="description" value={formData.description} onChange={handleInputChange} className="w-full bg-bg-primary border border-neutral-700 rounded p-2 text-text-primary" rows="2"></textarea>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm mb-1 text-text-secondary">Tags (comma separated)</label>
              <input name="tags" value={formData.tags} onChange={handleInputChange} className="w-full bg-bg-primary border border-neutral-700 rounded p-2 text-text-primary" placeholder="e.g. spring, colors, india" />
            </div>
            <div className="md:col-span-2 border border-neutral-700 p-4 rounded-lg">
              <label className="block text-sm mb-2 text-text-secondary">Cover Image Upload</label>
              <div className="flex items-center gap-4">
                <input type="file" onChange={handleImageUpload} accept="image/*" disabled={uploading} className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-brand-primary file:text-white hover:file:bg-brand-secondary text-text-secondary cursor-pointer" />
                {uploading && <span className="text-yellow-500 text-sm animate-pulse">Uploading...</span>}
              </div>
              {formData.coverImage && (
                <div className="mt-4">
                  <p className="text-xs text-text-secondary mb-1">Preview:</p>
                  <img src={formData.coverImage} alt="Cover Preview" className="h-24 w-auto rounded border border-neutral-700" />
                </div>
              )}
            </div>
            <div className="flex items-center gap-6 mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleInputChange} className="w-4 h-4" />
                <span>Is Active (Public)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="isTrending" checked={formData.isTrending} onChange={handleInputChange} className="w-4 h-4" />
                <span>Is Trending (Hero featured)</span>
              </label>
            </div>
            <div className="md:col-span-2 mt-4">
              <button type="submit" disabled={uploading} className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold disabled:opacity-50">
                {editingId ? 'Update Trend' : 'Save New Trend'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-x-auto border border-neutral-800 rounded-xl bg-bg-secondary">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-neutral-800/50">
              <th className="p-4 border-b border-neutral-800">Image</th>
              <th className="p-4 border-b border-neutral-800">Title</th>
              <th className="p-4 border-b border-neutral-800">Category</th>
              <th className="p-4 border-b border-neutral-800">Posters</th>
              <th className="p-4 border-b border-neutral-800">Status</th>
              <th className="p-4 border-b border-neutral-800">Actions</th>
            </tr>
          </thead>
          <tbody>
            {trends.map(trend => (
              <tr key={trend._id} className="border-b border-neutral-800/50 hover:bg-neutral-800/20">
                <td className="p-4">
                  {trend.coverImage ? (
                    <img src={trend.coverImage} alt={trend.title} className="w-12 h-12 object-cover rounded" />
                  ) : <div className="w-12 h-12 bg-neutral-800 rounded flex items-center justify-center text-xs">N/A</div>}
                </td>
                <td className="p-4 font-medium">{trend.emoji} {trend.title} <br/><span className="text-xs text-text-secondary font-normal">{trend.slug}</span></td>
                <td className="p-4 capitalize">{trend.category}</td>
                <td className="p-4 font-bold text-brand-primary">{trend.posterCount}</td>
                <td className="p-4">
                  <div className="flex flex-col gap-1 text-xs">
                    <span className={trend.isActive ? "text-green-500" : "text-red-500"}>{trend.isActive ? "Active" : "Inactive"}</span>
                    {trend.isTrending && <span className="text-yellow-500">Trending</span>}
                  </div>
                </td>
                <td className="p-4">
                  <button onClick={() => handleEdit(trend)} className="text-blue-500 hover:underline mr-4">Edit</button>
                  <button onClick={() => handleDelete(trend._id)} className="text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
            {trends.length === 0 && (
              <tr><td colSpan="6" className="p-8 text-center text-text-secondary">No trends found. Create one above!</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrendsManager;
