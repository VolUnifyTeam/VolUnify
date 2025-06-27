import React, { useState, useEffect } from 'react';
import { UserAuth } from "../context/AuthContext";
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import OrgCreateTile from './OrgCreateTile';
import LoadingSpinner from './LoadingSpinner';

const Dashboard = () => {
  const [fetchError, setFetchError] = useState(null);
  const [activities, setActivities] = useState(null);
  const [loading, setLoading] = useState(true);
  const { session, signOut } = UserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      try {
        if (!session?.user?.id) {
          console.log('No user session');
          return;
        }

        const { data, error } = await supabase
          .from('activities')
          .select('*')
          .eq('Org_Info', session.user.id);

        if (error) throw error;

        setActivities(data);
        setFetchError(null);
      } catch (error) {
        setFetchError("Could Not Retrieve Activities");
        setActivities(null);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [session]);

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      await signOut();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-grow mx-auto p-4 w-full pt-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-400">Welcome, {session?.user?.email}</h1>
          
          <button
            onClick={() => navigate("/OrgSearch")}
            className="hover:cursor-pointer border border-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 text-blue-400 transition-colors"
            type="button"
          >
            View All Activities
          </button>
        </div>

        <div className="border border-gray-700 rounded-lg p-4 sm:p-6 bg-gray-800 text-white mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold text-blue-400">My Activities</h1>
            <button
              onClick={() => navigate("/OrgAddPage")}
              className="hover:cursor-pointer border border-green-500 px-4 py-2 rounded-lg hover:bg-green-600 text-blue-400 transition-colors"
              type="button"
            >
              + Add New Activity
            </button>
          </div>
          
          {fetchError && (
            <p className="text-red-400">{fetchError}</p>
          )}

          {activities && activities.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400 mb-4">You haven't created any activities yet</p>
              <button
                onClick={() => navigate("/OrgAddPage")}
                className="hover:cursor-pointer border border-green-500 px-4 py-2 rounded-lg hover:bg-green-600 text-blue-400 transition-colors"
                type="button"
              >
                Add An Activity
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities?.map(activity => (
                <OrgCreateTile
                  key={activity.aid}
                  activity={activity}
                  currentUserId={session?.user?.id}
                />
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => navigate("/OrgSettings")}
          className="hover:cursor-pointer border border-purple-500 px-4 py-2 rounded-lg hover:bg-purple-600 text-blue-400 transition-colors"
          type="button"
        >
          Settings
        </button>
      </div>

      <footer className="w-screen py-6 bg-indigo-900 text-white">
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

export default Dashboard;