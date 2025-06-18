import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const OrgSettings = () => {
  const { session, signOut } = UserAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState(session?.user?.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      await signOut();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      if (password && password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      const updates = {};
      let requiresSignOut = false;

      if (email !== session.user.email) {
        const { error: emailError } = await supabase.auth.updateUser({ email });
        if (emailError) throw emailError;
        updates.email = email;
        requiresSignOut = true;
      }

      if (password) {
        const { error: passwordError } = await supabase.auth.updateUser({ password });
        if (passwordError) throw passwordError;
        requiresSignOut = true;
      }

      if (requiresSignOut) {
        setSuccess('Settings updated successfully. Please sign in again.');
        setTimeout(() => {
          signOut();
          navigate('/signin');
        }, 2000);
      } else {
        setSuccess('No changes were made');
      }
    } catch (error) {
      console.error('Error updating settings:', error);
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-grow p-4 md:p-8">
        {/* Settings Box */}
        <div className="max-w-md mx-auto bg-gray-800 rounded-lg p-6 mb-8">
          {/* Centered Settings Heading */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-blue-400">Settings</h1>
            <p className="text-gray-400 mt-2">Manage your account details</p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-4 p-3 bg-green-900 text-green-100 rounded">
              {success}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-900 text-red-100 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium text-blue-400">
                Email Address*
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 text-white"
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-medium text-blue-400">
                New Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 text-white"
                placeholder="Leave blank to keep current"
              />
            </div>

            {/* Confirm Password Field */}
            {password && (
              <div className="space-y-1">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-blue-400">
                  Confirm New Password*
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 text-white"
                  required={!!password}
                />
              </div>
            )}

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-medium disabled:opacity-50"
              >
                {isSubmitting ? 'Updating...' : 'Update Settings'}
              </button>
            </div>
          </form>
        </div>

        {/* Sign Out Button */}
        <div className="max-w-md mx-auto">
          <button
            onClick={handleSignOut}
            className="w-full max-w-xs mx-auto block bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md transition-colors duration-200"
            type="button"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-6 bg-indigo-900 text-white mt-auto">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-2">VolUnify</h2>
          <p className="text-indigo-200">
            Have any questions or need support? Contact us at:{" "}
            <a 
              href="mailto:volunifyteam@gmail.com" 
              className="text-indigo-300 hover:text-white underline"
            >
              volunifyteam@gmail.com
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default OrgSettings;