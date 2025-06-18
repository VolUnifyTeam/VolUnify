import React from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const OrgCreateTile = ({ activity, currentUserId }) => {
  const isOwner = activity.Org_Info === currentUserId;
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from('activities')
        .delete()
        .eq('aid', activity.aid);
      
      if (error) throw error;
      window.location.reload(); // Refresh to update the list
    } catch (error) {
      console.error('Error deleting activity:', error.message);
    }
  };

  if (!isOwner) return null; // Don't render if not owner

  return (
    <div className="relative border rounded-lg p-4 bg-gray-700 text-white h-full flex flex-col hover:shadow-lg transition-shadow">
      {/* Owner indicator badge */}
      <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
      
      <h2 className="text-lg font-bold mb-2 ">Activity: {activity.aname}</h2>
      <div className="border-t border-gray-600 pt-2 mb-4 flex-grow">
        <h3 className="font-semibold ">Activity Description</h3>
        <p className="mt-1 ">{activity.adesc}</p>
      </div>
      
      {/* Action buttons */}
      <div className="flex space-x-2 mt-auto">
        <button
          onClick={() => navigate(`/edit-activity/${activity.aid}`)}
          className="text-blue-400 hover:cursor-pointer border px-4 py-2 rounded hover:bg-gray-100"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className=" text-blue-400 text-xs bg-red-600 hover:bg-red-500 px-3 py-1 rounded flex-grow"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default OrgCreateTile;