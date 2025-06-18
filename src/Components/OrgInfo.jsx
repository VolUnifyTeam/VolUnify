import React from 'react';

const OrgInfo = ({ org }) => {
  if (!org) return null;

  return (


    
    <div className="space-y-4 w-full transition-all duration-300">

  
      <div className="bg-gray-700 p-4 rounded-lg w-full min-w-0 break-words">
        <h3 className="font-semibold mb-2">Location Specifics</h3>
        <p>State: {org.alocstate || 'Not provided'}</p>
        <p>City: {org.aloccity || 'Not provided'}</p>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
         <div className="bg-gray-700 p-4 rounded-lg min-w-0 break-words">
          <h3 className="font-semibold mb-2">Contact Information</h3>
          <p>Email: {org.aemail || 'Not provided'}</p>
          <p>Phone: {org.aphonenum || 'Not provided'}</p>
        </div>
        
        <div className="bg-gray-700 p-4 rounded-lg min-w-0 break-words">
          <h3 className="font-semibold mb-2">Activity Time-Info</h3>
          <p>Date: {org.adate || 'Flexible'}</p>
          <p>Duration: {org.aduration || 'Not specified'}</p>
        </div>
      </div>

      <div className="bg-gray-700 p-4 rounded-lg w-full min-w-0 break-words">
        <h3 className="font-semibold mb-2">Full Description</h3>
        <p className="whitespace-pre-line">
          {org.adesc || 'No description available.'}
        </p>
      </div>

      <div className="bg-gray-700 p-4 rounded-lg w-full min-w-0 break-words">
        <h3 className="font-semibold mb-2">Requirements</h3>
        <p className="whitespace-pre-line">
          {org.areq || 'No requirements provided.'}
        </p>
      </div>

      <div className="bg-gray-700 p-4 rounded-lg w-full min-w-0 break-words">
        <h3 className="font-semibold mb-2">Address</h3>
        <p className="whitespace-pre-line">
          {org.alocation || 'No address provided.'}
        </p>
      </div>

      
    </div>
  );
};

export default OrgInfo;