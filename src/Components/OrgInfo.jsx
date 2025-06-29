import React, { useState } from 'react';
import PropTypes from 'prop-types';

const OrgInfo = ({ org, onClose }) => {
  if (!org) return null;

  // State to track which fields are expanded
  const [expandedFields, setExpandedFields] = useState({});

  // Toggle expanded state for a field
  const toggleExpand = (field) => {
    setExpandedFields(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  // Function to truncate text to 50 characters
  const truncateText = (text, field) => {
    if (!text) return 'Not provided';
    if (expandedFields[field] || text.length <= 50) return text;
    return `${text.substring(0, 50)}...`;
  };

  // List of fields that should have the expandable behavior
  const textFields = [
    { key: 'adesc', label: 'Full Description', defaultText: 'No description available.' },
    { key: 'afield', label: 'Activity Field', defaultText: 'No field specified.' },
    { key: 'areq', label: 'Requirements', defaultText: 'No requirements provided.' },
    { key: 'alocation', label: 'Address', defaultText: 'No address provided.' }
  ];

  return (
    <div className="space-y-4 w-full transition-all duration-300 max-h-[80vh] overflow-y-auto pr-2">
      {/* Custom scrollbar styling */}
      <style jsx>{`
        div::-webkit-scrollbar {
          width: 8px;
        }
        div::-webkit-scrollbar-track {
          background: #374151;
          border-radius: 4px;
        }
        div::-webkit-scrollbar-thumb {
          background: #4B5563;
          border-radius: 4px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: #6B7280;
        }
      `}</style>

      <div className="flex justify-between items-start sticky top-0 bg-gray-800 pt-4 pb-2 z-10">
        <h2 className="text-xl font-bold mb-4">{org.aname || 'Organization'}</h2>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>

      <div className="bg-gray-700 p-4 rounded-lg w-full min-w-0">
        <h3 className="font-semibold mb-2">Location Specifics</h3>
        <p>County: {org.alocstate || 'Not provided'}</p>
        <p>City: {org.aloccity || 'Not provided'}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <div className="bg-gray-700 p-4 rounded-lg min-w-0">
          <h3 className="font-semibold mb-2">Contact Information</h3>
          <p>Email: {org.aemail || 'Not provided'}</p>
          <p>Phone: {org.aphonenum || 'Not provided'}</p>
        </div>
        
        <div className="bg-gray-700 p-4 rounded-lg min-w-0">
          <h3 className="font-semibold mb-2">Activity Time-Info</h3>
          <p>Date: {org.adate || 'Flexible'}</p>
          <p>Duration: {org.aduration || 'Not specified'}</p>
        </div>
      </div>

      {/* Dynamic rendering of expandable text fields */}
      {textFields.map(({ key, label, defaultText }) => (
        <div 
          key={key}
          className="bg-gray-700 p-4 rounded-lg w-full min-w-0 cursor-pointer"
          onClick={() => toggleExpand(key)}
        >
          <h3 className="font-semibold mb-2">{label}</h3>
          <p className="whitespace-pre-line">
            {truncateText(org[key] || defaultText, key)}
          </p>
          {org[key] && org[key].length > 50 && (
            <button 
              className="text-blue-400 hover:text-blue-300 text-sm mt-2 focus:outline-none"
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand(key);
              }}
            >
              {expandedFields[key] ? 'Show Less' : 'Show More'}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

OrgInfo.propTypes = {
  org: PropTypes.shape({
    aname: PropTypes.string,
    alocstate: PropTypes.string,
    aloccity: PropTypes.string,
    aemail: PropTypes.string,
    aphonenum: PropTypes.string,
    adate: PropTypes.string,
    aduration: PropTypes.string,
    adesc: PropTypes.string,
    afield: PropTypes.string,
    areq: PropTypes.string,
    alocation: PropTypes.string,
    atype: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
};


export default OrgInfo;