import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-grow flex flex-col items-center justify-center p-8">
        {/* Hero Section */}
        





        {/*Make the volunteer button appear in the top center of the landing page, make it */}







        {/* Action Buttons - Updated with white text and no link styling */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mx-auto">
          {/* Sign Up Button */}
          <div className="border border-gray-600 rounded-lg p-6 bg-gray-800 hover:border-blue-400 transition-colors shadow-lg">
            <h2 className="text-xl font-bold text-blue-400 mb-4">Organizations: Sign Up</h2>
            <p className="text-gray-300 mb-6">
              Create an account to post volunteer opportunities and manage your activities.
            </p>
            <Link to="/signup" className="no-underline">
  <button className="w-full border border-blue-500 bg-blue-600 hover:bg-blue-700 text-white text-center py-3 px-4 rounded-lg transition-colors duration-200">
    Sign Up
  </button>
</Link>
          </div>

          {/* Sign In Button */}
          <div className="border border-gray-600 rounded-lg p-6 bg-gray-800 hover:border-blue-400 transition-colors shadow-lg">
            <h2 className="text-xl font-bold text-blue-400 mb-4">Organizations: Sign In</h2>
            <p className="text-gray-300 mb-6">
              Access your dashboard to manage your existing volunteer opportunities.
            </p>
           <Link to="/signin" className="no-underline">
  <button className="w-full border border-blue-500 bg-blue-600 hover:bg-blue-700 text-white text-center py-3 px-4 rounded-lg transition-colors duration-200">
    Sign In
  </button>
</Link>
          </div>

          {/* Volunteer Button */}
          <div className="border border-gray-600 rounded-lg p-6 bg-gray-800 hover:border-blue-400 transition-colors shadow-lg">
            <h2 className="text-xl font-bold text-blue-400 mb-4">Find Opportunities</h2>
            <p className="text-gray-300 mb-6">
              Browse and sign up for volunteer opportunities in your area.
            </p>
            <Link to="/OrgSearch" className="no-underline">
  <button className="w-full border border-blue-500 bg-blue-600 hover:bg-blue-700 text-white text-center py-3 px-4 rounded-lg transition-colors duration-200">
    Volunteer Now!
  </button>
</Link>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h2 className="text-2xl font-bold text-blue-400 mb-4">VolUnify - Our Mission Statement</h2>
          <p className="text-gray-300">
            VolUnify aims to connect passionate individuals and dedicated organizations to promote personal growth within individuals, as 
            well as extending the positive impact an organization can have. 
            We serve to expand the opportunities a volunteer can immerse themselves in, as well as growing existing volunteer organizations!
          </p>
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

export default LandingPage;