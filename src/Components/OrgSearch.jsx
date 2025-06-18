import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Modal from 'react-modal';
import OrgSearchTile from './OrgSearchTile';
import OrgInfo from './OrgInfo';

Modal.setAppElement('#root');

const OrgSearch = () => {
  const navigate = useNavigate();
  const [fetchError, setFetchError] = useState(null);
  const [activities, setActivities] = useState(null);
  const [filteredActivities, setFilteredActivities] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState(null);
  
  // Filter states
  const [selectedState, setSelectedState] = useState('none');
  const [selectedCity, setSelectedCity] = useState('none');
  const [selectedType, setSelectedType] = useState('none');
  const [availableCities, setAvailableCities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      const { data, error } = await supabase
        .from('activities')
        .select('*');

      if (error) {
        setFetchError("Could Not Retrieve Activity Error");
        setActivities(null);
      }
      if (data) {
        setActivities(data);
        setFilteredActivities(data);
        setFetchError(null);
      }
    };

    fetchActivities();
  }, []);

  // Update available cities when state changes
  useEffect(() => {
    if (selectedState !== 'none' && activities) {
      const cities = [...new Set(
        activities
          .filter(activity => activity.alocstate === selectedState)
          .map(activity => activity.aloccity)
      )].filter(city => city); // Filter out empty/null cities
      setAvailableCities(cities);
      setSelectedCity('none'); // Reset city when state changes
    } else {
      setAvailableCities([]);
      setSelectedCity('none');
    }
  }, [selectedState, activities]);

  // Apply filters when any filter changes
  useEffect(() => {
    if (activities) {
      let filtered = [...activities];
      
      if (selectedState !== 'none') {
        filtered = filtered.filter(activity => activity.alocstate === selectedState);
      }
      
      if (selectedCity !== 'none') {
        filtered = filtered.filter(activity => activity.aloccity === selectedCity);
      }
      
      if (selectedType !== 'none') {
        filtered = filtered.filter(activity => activity.atype === selectedType);
      }
      
      setFilteredActivities(filtered);
    }
  }, [selectedState, selectedCity, selectedType, activities]);

  const handleTileClick = (activity) => {
    setSelectedOrg(activity);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOrg(null);
  };

  // Get unique states and types from activities, filtering out empty/null values
  const allStates = activities 
    ? [...new Set(activities.map(activity => activity.alocstate))]
        .filter(state => state) // Remove empty/null states
    : [];
    
  const allTypes = activities 
    ? [...new Set(activities.map(activity => activity.atype))]
        .filter(type => type) // Remove empty/null types
    : [];

  const modalRef = useRef(null);

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#1f2937',
      border: 'none',
      borderRadius: '0.5rem',
      padding: '0',
      width: 'auto',
      minWidth: 'min(50vw, 400px)',
      maxWidth: 'min(80vw, 1000px)',
      transition: 'all 0.3s ease-out',
      overflow: 'visible'
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      zIndex: 50,
      transition: 'all 0.3s ease-out'
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-center mx-auto max-w-md mb-8 text-blue-400">Browse Volunteer Opportunities!</h1>

        {/* Filter Dropdowns */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* State Filter */}
          <div className="space-y-1">
            <label htmlFor="state-filter" className="text-blue-400 block text-sm font-medium">
              Filter by State
            </label>
            <select
              id="state-filter"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 text-white"
            >
              <option value="none">Any</option>
              {allStates.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          {/* City Filter */}
          <div className="space-y-1">
            <label htmlFor="city-filter" className="block text-sm font-medium text-blue-400">
              Filter by City
            </label>
            <select
              id="city-filter"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 text-white"
              disabled={selectedState === 'none'}
            >
              <option value="none">All Cities</option>
              {availableCities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            {selectedState === 'none' && (
              <p className="text-xs text-blue-400 mt-1">Select a state first</p>
            )}
          </div>

          {/* Type Filter */}
          <div className="space-y-1">
            <label htmlFor="type-filter" className="block text-sm font-medium text-blue-400">
              Filter by Activity Type
            </label>
            <select
              id="type-filter"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 text-white"
            >
              <option value="none">All Types</option>
              {allTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="min-h-[60vh]">
          {fetchError && (<p className="text-red-500">{fetchError}</p>)}

          {filteredActivities && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {filteredActivities.map(activity => (
                <OrgSearchTile 
                  key={activity.aid} 
                  activity={activity} 
                  onClick={() => handleTileClick(activity)}
                />
              ))}
            </div>
          )}

          {filteredActivities && filteredActivities.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No activities match your filters</p>
              <button
                onClick={() => {
                  setSelectedState('none');
                  setSelectedCity('none');
                  setSelectedType('none');
                }}
                className="mt-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 text-white"
              >
                Clear All Filters
              </button>
            </div>
          )}

          <Modal
            isOpen={showModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Organization Details"
            ariaHideApp={false}
          >
            <div 
              ref={modalRef}
              className="bg-gray-800 rounded-lg p-6 w-auto transition-all duration-300"
            >
              <div className="flex justify-between items-center mb-4 min-w-[300px]">
                <h2 className="text-xl font-bold break-words max-w-[70%]">
                  {selectedOrg?.aname} - {selectedOrg?.atype}
                </h2>
              </div>
              
              <div className="transition-all duration-300">
                <OrgInfo org={selectedOrg} />
              </div>
              
              <div className="mt-6 flex justify-between items-center gap-4">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors whitespace-nowrap text-white"
                >
                  Close
                </button>

                <button 
                  onClick={() => window.open(selectedOrg?.alink, '_blank')}
                  className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition-colors whitespace-nowrap text-white"
                  disabled={!selectedOrg?.alink}
                >
                  SIGN UP HERE
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </div>

      {/* Footer - full width and at bottom */}
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

export default OrgSearch;