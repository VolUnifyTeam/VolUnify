import React from 'react';

const OrgSearchTile = ({ activity, onClick }) => {
  return (
    <div 
      className="max-w-4xl mx-auto p-2 sm:p-4 hover:cursor-pointer"
      onClick={onClick}
    >
      <div className="border rounded-lg p-4 sm:p-6 bg-gray-800 text-white mb-3 sm:mb-4 hover:bg-gray-700 transition-colors">
        <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
          Organization: {activity.aname}
        </h2>
        
        <div className="border rounded-lg p-3 sm:p-4 bg-gray-700 mb-3">
          <h3 className="font-semibold text-sm sm:text-base">State: {activity.alocstate}</h3>
          <h3 className="font-semibold text-sm sm:text-base">City: {activity.aloccity}</h3>
        </div>

        <div className="border rounded-lg p-3 sm:p-4 bg-gray-700 mb-3">
          <h3 className="font-semibold text-sm sm:text-base">Activity Type:</h3>
          <p className="text-sm sm:text-base">{activity.atype}</p>
        </div>

        <div className="border rounded-lg p-3 sm:p-4 bg-gray-700">
          <h3 className="font-semibold text-sm sm:text-base">Activity Requirements:</h3>
          <p className="text-sm sm:text-base">{activity.areq}</p>
        </div>

      </div>
    </div>
  );
};

export default OrgSearchTile;