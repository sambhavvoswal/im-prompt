import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast.error('Please enter both username and password');
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/admin/login`, {
        username,
        password
      });

      if (data.success && data.token) {
        toast.success('Login Successful');
        localStorage.setItem('adminToken', data.token);
        onLogin(data.token);
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login Error:', error);
      toast.error(error.response?.data?.message || 'Login failed. Check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="bg-bg-secondary p-8 rounded-2xl shadow-xl w-full max-w-md border border-neutral-800">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-text-primary mb-2">Admin Portal</h2>
          <p className="text-text-secondary">Sign in to manage trends and posters</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-2" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="w-full bg-bg-primary text-text-primary border border-neutral-800 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-text-secondary text-sm font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full bg-bg-primary text-text-primary border border-neutral-800 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-brand-primary text-white font-bold rounded-lg px-4 py-3 hover:bg-brand-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
