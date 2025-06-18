import React from 'react'

const OrgCreateAdmin = ({ activity }) => {

  return (
     <div className="max-w-4xl mx-auto p-2 sm:p-4">
            {/* Main container for each organization */}
            <div className="hover:cursor-pointer border rounded-lg p-4 sm:p-6 bg-gray-800 text-white mb-3 sm:mb-4">
                {/* Organization name - responsive text size */}
                <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
                    Organization: {activity.aname}
                </h2>
                
                {/* Activity description box - full width on mobile */}
                <div className="border rounded-lg p-3 sm:p-4 bg-gray-700">
                    <h3 className="font-semibold text-sm sm:text-base">Activity Description</h3>
                    <p className="text-sm sm:text-base">{activity.adesc}</p>
                </div>
            </div>
        </div>
    );
}

export default OrgCreateAdmin