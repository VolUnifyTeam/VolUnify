import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import starDesign from '../realassets/images/stardesign.png';

const OrgSettings = () => {
  const { session, signOut } = UserAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState(session?.user?.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsPageLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

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
    setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  if (isPageLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Main content with stars */}
      <div className="flex-grow flex items-start justify-between p-8 relative">
        {/* Left side stars */}
        <div className="hidden lg:flex flex-col w-1/6 h-full justify-start items-start space-y-16">
          <div className="w-full flex justify-end pr-8 pt-16">
            <img src={starDesign} alt="Decorative star" className="w-32 opacity-70" />
          </div>
          <div className="w-full flex justify-start pl-8">
            <img src={starDesign} alt="Decorative star" className="w-28 opacity-70" />
          </div>
          <div className="w-full flex justify-end pr-16">
            <img src={starDesign} alt="Decorative star" className="w-24 opacity-70" />
          </div>
        </div>

        {/* Center content */}
        <div className="flex-grow flex flex-col items-center justify-center pt-16">
          <div className="max-w-md w-full bg-gray-800 rounded-lg p-6 mb-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-blue-400">Settings</h1>
              <p className="text-gray-400 mt-2">Manage your account details</p>
            </div>

            {success && (
              <div className="mb-4 p-3 bg-green-900 text-green-100 rounded">
                {success}
              </div>
            )}

            {error && (
              <div className="mb-4 p-3 bg-red-900 text-red-100 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
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
                  disabled={isLoading}
                  className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-medium disabled:opacity-50 flex justify-center items-center"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : 'Update Settings'}
                </button>
              </div>
            </form>
          </div>

          <div className="w-full max-w-md">
            <button
              onClick={handleSignOut}
              className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md transition-colors duration-200"
              type="button"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Right side stars */}
        <div className="hidden lg:flex flex-col w-1/6 h-full justify-start items-end space-y-16">
          <div className="w-full flex justify-start pl-8 pt-16">
            <img src={starDesign} alt="Decorative star" className="w-32 opacity-70" />
          </div>
          <div className="w-full flex justify-end pr-8">
            <img src={starDesign} alt="Decorative star" className="w-28 opacity-70" />
          </div>
          <div className="w-full flex justify-start pl-16">
            <img src={starDesign} alt="Decorative star" className="w-24 opacity-70" />
          </div>
        </div>
      </div>

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