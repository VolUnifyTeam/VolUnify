import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useNavigation } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';
import starDesign from '../realassets/images/stardesign.png';

const LandingPage = () => {
  const { session } = UserAuth();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsPageLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isPageLoading || navigation.state === 'loading') {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Dashboard Return Button (only shows when signed in) */}
      {session && (
        <div className="absolute top-4 left-4 z-10">
          <button 
            onClick={() => navigate('/Dashboard')}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow transition-colors duration-200 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Dashboard
          </button>
        </div>
      )}

      {/* Main content with stars */}
      <div className="flex-grow flex items-start justify-between p-8">
        {/* Left stars - descending to the right */}
        <div className="hidden lg:flex flex-col w-1/6 h-full justify-start items-start pt-16 space-y-16">
          <img 
            src={starDesign} 
            alt="Decorative star" 
            className="w-32 opacity-70" 
          />
          <img 
            src={starDesign} 
            alt="Decorative star" 
            className="w-28 opacity-70 ml-8" 
          />
          <img 
            src={starDesign} 
            alt="Decorative star" 
            className="w-24 opacity-70 ml-16" 
          />
        </div>

        {/* Center content */}
        <div className="flex-grow flex flex-col items-center justify-center max-w-6xl">
          {/* Volunteer Button */}
          <div className="mb-8 w-full max-w-2xl mx-auto">
            <div className="border border-gray-600 rounded-lg p-6 bg-gray-800 hover:border-green-500 transition-colors shadow-lg">
              <h2 className="text-xl font-bold text-green-400 mb-4">Volunteers: Find Opportunities!</h2>
              <p className="text-gray-300 mb-6">
                Browse and sign up for volunteer opportunities in your area.
              </p>
              <Link to="/OrgSearch" className="no-underline">
                <button className="w-full border border-blue-500 bg-blue-600 hover:bg-blue-700 hover:!border-green-500 text-white text-center py-3 px-4 rounded-lg transition-colors duration-200">
                  Volunteer Now!
                </button>
              </Link>
            </div>
          </div>

          {/* Organization Sign Up/Sign In */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
            {/* Sign Up Button */}
            <div className="border border-gray-600 rounded-lg p-6 bg-gray-800 hover:border-blue-400 transition-colors shadow-lg">
              <h2 className="text-xl font-bold text-blue-400 mb-4">Organizations: Sign Up!</h2>
              <p className="text-gray-300 mb-6">
                Create an account to post volunteer opportunities.
              </p>
              <Link to="/signup" className="no-underline">
                <button className="w-full border border-blue-500 bg-blue-600 hover:bg-blue-700 text-white text-center py-3 px-4 rounded-lg transition-colors duration-200">
                  Sign Up
                </button>
              </Link>
            </div>

            {/* Sign In Button */}
            <div className="border border-gray-600 rounded-lg p-6 bg-gray-800 hover:border-blue-400 transition-colors shadow-lg">
              <h2 className="text-xl font-bold text-blue-400 mb-4">Organizations: Sign In!</h2>
              <p className="text-gray-300 mb-6">
                Access your volunteer management dashboard.
              </p>
              <Link to="/signin" className="no-underline">
                <button className="w-full border border-blue-500 bg-blue-600 hover:bg-blue-700 text-white text-center py-3 px-4 rounded-lg transition-colors duration-200">
                  Sign In
                </button>
              </Link>
            </div>
          </div>

          {/* Mission Statement */}
          <div className="mt-16 text-center max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h2 className="text-2xl font-bold text-blue-400 mb-4">Our Mission</h2>
            <p className="text-gray-300">
              VolUnify aims to connect passionate individuals and dedicated organizations within Texas to promote personal growth within individuals, as 
              well as extending the positive impact an organization can have. 
              We serve to expand the opportunities within multiple counties for both volunteers and organizations/groups to find local help and benefit!
              <br /> 
              <br />
              Created By: Marco Bacares, Krish Bhalani, Vivaan Pai
            </p>
          </div>
        </div>

        {/* Right stars - descending to the left */}
        <div className="hidden lg:flex flex-col w-1/6 h-full justify-start items-end pt-16 space-y-16">
          <img 
            src={starDesign} 
            alt="Decorative star" 
            className="w-32 opacity-70" 
          />
          <img 
            src={starDesign} 
            alt="Decorative star" 
            className="w-28 opacity-70 mr-8" 
          />
          <img 
            src={starDesign} 
            alt="Decorative star" 
            className="w-24 opacity-70 mr-16" 
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-6 bg-indigo-900 text-white mt-auto">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-2">VolUnify</h2>
          <p className="text-indigo-200">
            Contact us at:{" "}
            <a href="mailto:volunifyteam@gmail.com" className="text-indigo-300 hover:text-white underline">
              volunifyteam@gmail.com
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;