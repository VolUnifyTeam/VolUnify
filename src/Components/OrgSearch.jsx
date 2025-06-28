import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Modal from 'react-modal';
import OrgSearchTile from './OrgSearchTile';
import OrgInfo from './OrgInfo';
import { UserAuth } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';
import starDesign from '../realassets/images/stardesign.png';

Modal.setAppElement('#root');

const OrgSearch = () => {
  const navigate = useNavigate();
  const { session } = UserAuth();
  const [fetchError, setFetchError] = useState(null);
  const [activities, setActivities] = useState(null);
  const [filteredActivities, setFilteredActivities] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);
  
  // Filter states
  const [selectedState, setSelectedState] = useState('none');
  const [selectedCity, setSelectedCity] = useState('none');
  const [selectedType, setSelectedType] = useState('none');
  const [selectedField, setSelectedField] = useState('none');
  const [availableCities, setAvailableCities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('activities')
          .select('*');

        if (error) {
          setFetchError("Could not load activities");
          setActivities(null);
        } else {
          setActivities(data);
          setFilteredActivities(data);
        }
      } catch (err) {
        setFetchError("Network error occurred");
      } finally {
        setIsLoading(false);
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
      )].filter(city => city);
      setAvailableCities(cities);
      setSelectedCity('none');
    } else {
      setAvailableCities([]);
      setSelectedCity('none');
    }
  }, [selectedState, activities]);

  // Apply filters when any filter changes
  useEffect(() => {
    if (activities) {
      setIsFiltering(true);
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
      
      if (selectedField !== 'none') {
        filtered = filtered.filter(activity => activity.afield === selectedField);
      }
      
      setFilteredActivities(filtered);
      setIsFiltering(false);
    }
  }, [selectedState, selectedCity, selectedType, selectedField, activities]);

  const handleTileClick = (activity) => {
    setSelectedOrg(activity);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOrg(null);
  };

  // Get unique states and types from activities
  const allStates = activities 
    ? [...new Set(activities.map(activity => activity.alocstate))]
        .filter(state => state)
    : [];
    
  const allTypes = activities 
    ? [...new Set(activities.map(activity => activity.atype))]
        .filter(type => type)
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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 relative">
      {/* Return to Dashboard Button */}
      {session && (
        <button 
          onClick={() => navigate('/Dashboard')}
          className="absolute top-4 left-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-md transition-colors duration-200 z-10 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Dashboard
        </button>
      )}

      <div className="flex-grow pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        {/* Updated heading with larger stars and text */}
        <div className="flex items-center justify-center max-w-md mx-auto mb-8">
          {/* Left star - increased size */}
          <div className="hidden lg:block mr-4">
            <img 
              src={starDesign} 
              alt="Decorative star" 
              className="w-24 opacity-70" 
            />
          </div>
          
          {/* Larger heading text */}
          <h1 className="text-center text-blue-400 text-2xl font-bold">Browse Volunteer Opportunities!</h1>
          
          {/* Right star - increased size */}
          <div className="hidden lg:block ml-4">
            <img 
              src={starDesign} 
              alt="Decorative star" 
              className="w-24 opacity-70" 
            />
          </div>
        </div>

        {/* Filter Dropdowns */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {/* State Filter */}
          <div className="space-y-1">
            <label htmlFor="state-filter" className="text-blue-400 block text-sm font-medium">
              Filter by County
            </label>
            <select
              id="state-filter"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 text-white"
              disabled={isFiltering}
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
              disabled={selectedState === 'none' || isFiltering}
            >
              <option value="none">All Cities</option>
              {availableCities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            {selectedState === 'none' && (
              <p className="text-xs text-blue-400 mt-1">Select a county first</p>
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
              disabled={isFiltering}
            >
              <option value="none">All Types</option>
              {allTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Field Filter */}
          <div className="space-y-1">
            <label htmlFor="field-filter" className="block text-sm font-medium text-blue-400">
              Filter by Field
            </label>
            <select
              id="field-filter"
              value={selectedField}
              onChange={(e) => setSelectedField(e.target.value)}
              className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 text-white"
              disabled={isFiltering}
            >
              <option value="none">All Fields</option>
              <option value="Medical">Medical</option>
              <option value="Tech">Tech</option>
              <option value="Education">Education</option>
              <option value="Social">Social</option>
              <option value="Animal-Related">Animal-Related</option>
              <option value="Environmental">Environmental</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="min-h-[60vh]">
          {fetchError && (
            <p className="text-red-500 text-center py-4">{fetchError}</p>
          )}

          {isFiltering ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredActivities && filteredActivities.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {filteredActivities.map(activity => (
                <OrgSearchTile 
                  key={activity.aid} 
                  activity={activity} 
                  onClick={() => handleTileClick(activity)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                {filteredActivities ? "No activities match your filters" : "No activities found"}
              </p>
              <button
                onClick={() => {
                  setSelectedState('none');
                  setSelectedCity('none');
                  setSelectedType('none');
                  setSelectedField('none');
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
          {selectedOrg && (
            <>
              {console.log('Selected Org Data:', selectedOrg)}
              <OrgInfo org={selectedOrg} onClose={closeModal} />
            </>
          )}
        </div>
      </Modal>

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

export default OrgSearch;