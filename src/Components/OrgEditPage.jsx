import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { UserAuth } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';

// List of all US states
const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 
  'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 
  'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 
  'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 
  'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 
  'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 
  'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

const OrgEditPage = () => {
  const { session } = UserAuth();
  const navigate = useNavigate();
  const { activityId } = useParams();
  
  const [formData, setFormData] = useState(null);
  const [formError, setFormError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  // Map of field IDs to their display names
  const fieldDisplayNames = {
    aname: 'Organization Name',
    alink: 'Activity Link',
    atype: 'Activity Type',
    alocstate: 'State',
    aloccity: 'City',
    alocation: 'Specific Location',
    adate: 'Date',
    adesc: 'Description',
    areq: 'Requirements'
  };

  useEffect(() => {
    if (!activityId) {
      setFormError('No activity specified in URL. Please go back and select an activity to edit.');
      setLoading(false);
      return;
    }

    const fetchActivity = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('activities')
          .select('*')
          .eq('aid', activityId)
          .single();

        if (error) throw error;
        if (!data) throw new Error('Activity not found in database');

        // Verify ownership
        if (data.Org_Info !== session?.user?.id) {
          throw new Error('You are not authorized to edit this activity');
        }

        setFormData(data);
        setFormError(null);
      } catch (error) {
        console.error('Error fetching activity:', error);
        setFormError(error.message);
        navigate('/dashboard', { state: { error: error.message } });
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [activityId, session, navigate]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData) return;

    setIsSubmitting(true);
    setFormError(null);

    const requiredFields = ['aname', 'atype', 'aemail', 'adate', 'alocstate', 'aloccity', 'adesc'];
    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      // Convert field IDs to display names for the error message
      const missingFieldNames = missingFields.map(field => fieldDisplayNames[field] || field);
      setFormError(`Please fill out these required fields: ${missingFieldNames.join(', ')}`);
      setIsSubmitting(false);
      
      // Scroll to the error message
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('activities')
        .update(formData)
        .eq('aid', activityId)
        .select();

      if (error) throw error;
      
      navigate('/dashboard', { state: { success: true } });
    } catch (error) {
      console.error('Error updating activity:', error);
      setFormError(error.message || "Error submitting form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 p-4 md:p-8 flex items-center justify-center">
        <div className="text-white text-lg">Loading activity details...</div>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="min-h-screen bg-gray-900 p-4 md:p-8 flex items-center justify-center">
        <div className="text-red-400 text-lg">
          {formError || 'Could not load activity data'}
          <button 
            onClick={() => navigate('/dashboard')}
            className="ml-4 px-3 py-1 bg-gray-700 rounded"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl font-bold">Edit Activity</h1>
            <p className="text-sm text-gray-400 mt-1">
              Editing: <span className="text-blue-300">{formData.aname}</span> 
            </p>
          </div>
        </div>

        {formError && (
          <div className="mb-4 p-3 bg-red-900 text-red-100 rounded">
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Activity Name */}
            <div className="space-y-1">
              <label htmlFor="aname" className="block text-sm font-medium">
                Organization Name*
              </label>
              <input
                type="text"
                id="aname"
                name="aname"
                value={formData.aname || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            {/* Activity Link */}
            <div className="space-y-1">
              <label htmlFor="alink" className="block text-sm font-medium">
                Activity Link
              </label>
              <input
                type="url"
                id="alink"
                name="alink"
                value={formData.alink || ''}
                onChange={handleChange}
                placeholder="https://example.com"
                className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            {/* Activity Type */}
            <div className="space-y-1">
              <label htmlFor="atype" className="block text-sm font-medium">
                Activity Type*
              </label>
              <select
                id="atype"
                name="atype"
                value={formData.atype || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              >
                <option value="">Select type</option>
                <option value="volunteer">Volunteer</option>
                <option value="workshop">Workshop</option>
                <option value="fundraiser">Fundraiser</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Location - State */}
            <div className="space-y-1">
              <label htmlFor="alocstate" className="block text-sm font-medium">
                State*
              </label>
              <select
                id="alocstate"
                name="alocstate"
                value={formData.alocstate || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              >
                <option value="">Select state</option>
                {US_STATES.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            {/* Location - City */}
            <div className="space-y-1">
              <label htmlFor="aloccity" className="block text-sm font-medium">
                City*
              </label>
              <input
                type="text"
                id="aloccity"
                name="aloccity"
                value={formData.aloccity || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            {/* Specific Location */}
            <div className="space-y-1">
              <label htmlFor="alocation" className="block text-sm font-medium">
                Specific Location
              </label>
              <input
                type="text"
                id="alocation"
                name="alocation"
                value={formData.alocation || ''}
                onChange={handleChange}
                placeholder="Address, building name, or room number"
                className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
             />
            </div>

            {/* Activity Date */}
            <div className="space-y-1">
              <label htmlFor="adate" className="block text-sm font-medium">
                Date*
              </label>
              <input
                type="date"
                id="adate"
                name="adate"
                value={formData.adate || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            {/* Activity Duration */}
            <div className="space-y-1">
              <label htmlFor="aduration" className="block text-sm font-medium">
                Duration
              </label>
              <input
                type="text"
                id="aduration"
                name="aduration"
                value={formData.aduration || ''}
                onChange={handleChange}
                placeholder="e.g., 2 hours"
                className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
             />
            </div>

            {/* Contact Phone */}
            <div className="space-y-1">
              <label htmlFor="aphonenum" className="block text-sm font-medium">
                Phone Number
              </label>
              <input
                type="tel"
                id="aphonenum"
                name="aphonenum"
                value={formData.aphonenum || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Activity Description */}
          <div className="space-y-1">
            <label htmlFor="adesc" className="block text-sm font-medium">
              Description*
            </label>
            <textarea
              id="adesc"
              name="adesc"
              value={formData.adesc || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
              rows={4}
            />
          </div>

          {/* Requirements (now a textarea like Description) */}
          <div className="space-y-1">
            <label htmlFor="areq" className="block text-sm font-medium">
              Requirements
            </label>
            <textarea
              id="areq"
              name="areq"
              value={formData.areq || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
              rows={4}
              placeholder="e.g., Bring laptop, wear comfortable shoes"
              required
            />
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded text-blue-400 font-medium"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-blue-400 font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Updating...' : 'Update Activity'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrgEditPage;