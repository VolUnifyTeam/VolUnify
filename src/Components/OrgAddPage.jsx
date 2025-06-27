import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// List of all US states
const US_STATES = [
  'Any County', 'Anderson', 'Andrews', 'Angelina', 'Aransas', 'Archer', 
'Armstrong', 'Atascosa', 'Austin', 'Bailey', 'Bandera', 'Bastrop', 
'Baylor', 'Bee', 'Bell', 'Bexar', 'Blanco', 'Borden', 'Bosque', 
'Bowie', 'Brazoria', 'Brazos', 'Brewster', 'Briscoe', 'Brooks', 
'Brown', 'Burleson', 'Burnet', 'Caldwell', 'Calhoun', 'Callahan', 
'Cameron', 'Camp', 'Carson', 'Cass', 'Castro', 'Chambers', 
'Cherokee', 'Childress', 'Clay', 'Cochran', 'Coke', 'Coleman', 
'Collin', 'Collingsworth', 'Colorado', 'Comal', 'Comanche', 
'Concho', 'Cooke', 'Coryell', 'Cottle', 'Crane', 'Crockett', 
'Crosby', 'Culberson', 'Dallam', 'Dallas', 'Dawson', 'Deaf Smith', 
'Delta', 'Denton', 'DeWitt', 'Dickens', 'Dimmit', 'Donley', 
'Duval', 'Eastland', 'Ector', 'Edwards', 'Ellis', 'El Paso', 
'Erath', 'Falls', 'Fannin', 'Fayette', 'Fisher', 'Floyd', 
'Foard', 'Fort Bend', 'Franklin', 'Freestone', 'Frio', 'Gaines', 
'Galveston', 'Garza', 'Gillespie', 'Glasscock', 'Goliad', 
'Gonzales', 'Gray', 'Grayson', 'Gregg', 'Grimes', 'Guadalupe', 
'Hale', 'Hall', 'Hamilton', 'Hansford', 'Hardeman', 'Hardin', 
'Harris', 'Harrison', 'Hartley', 'Haskell', 'Hays', 'Hemphill', 
'Henderson', 'Hidalgo', 'Hill', 'Hockley', 'Hood', 'Hopkins', 
'Houston', 'Howard', 'Hudspeth', 'Hunt', 'Hutchinson', 'Irion', 
'Jack', 'Jackson', 'Jasper', 'Jeff Davis', 'Jefferson', 'Jim Hogg', 
'Jim Wells', 'Johnson', 'Jones', 'Karnes', 'Kaufman', 'Kendall', 
'Kenedy', 'Kent', 'Kerr', 'Kimble', 'King', 'Kinney', 'Kleberg', 
'Knox', 'Lamar', 'Lamb', 'Lampasas', 'La Salle', 'Lavaca', 'Lee', 
'Leon', 'Liberty', 'Limestone', 'Lipscomb', 'Live Oak', 'Llano', 
'Loving', 'Lubbock', 'Lynn', 'McCulloch', 'McLennan', 'McMullen', 
'Madison', 'Marion', 'Martin', 'Mason', 'Matagorda', 'Maverick', 
'Medina', 'Menard', 'Midland', 'Milam', 'Mills', 'Mitchell', 
'Montague', 'Montgomery', 'Moore', 'Morris', 'Motley', 'Nacogdoches', 
'Navarro', 'Newton', 'Nolan', 'Nueces', 'Ochiltree', 'Oldham', 
'Orange', 'Palo Pinto', 'Panola', 'Parker', 'Parmer', 'Pecos', 
'Polk', 'Potter', 'Presidio', 'Rains', 'Randall', 'Reagan', 
'Real', 'Red River', 'Reeves', 'Refugio', 'Roberts', 'Robertson', 
'Rockwall', 'Runnels', 'Rusk', 'Sabine', 'San Augustine', 
'San Jacinto', 'San Patricio', 'San Saba', 'Schleicher', 
'Scurry', 'Shackelford', 'Shelby', 'Sherman', 'Smith', 'Somervell', 
'Starr', 'Stephens', 'Sterling', 'Stonewall', 'Sutton', 'Swisher', 
'Tarrant', 'Taylor', 'Terrell', 'Terry', 'Throckmorton', 'Titus', 
'Tom Green', 'Travis', 'Trinity', 'Tyler', 'Upshur', 'Upton', 
'Uvalde', 'Val Verde', 'Van Zandt', 'Victoria', 'Walker', 
'Waller', 'Ward', 'Washington', 'Webb', 'Wharton', 'Wheeler', 
'Wichita', 'Wilbarger', 'Willacy', 'Williamson', 'Wilson', 
'Winkler', 'Wise', 'Wood', 'Yoakum', 'Young', 'Zapata', 'Zavala'
];

// Activity field options
const ACTIVITY_FIELDS = [
  'Medical',
  'Tech',
  'Education', 
  'Social',
  'Animal-Related',
  'Environmental',
  'Other'
];

const OrgAddPage = () => {
  const { session } = UserAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(() => ({
    aname: '',
    alink: '',
    atype: '',
    afield: '',
    alocation: '',
    areq: '',
    Org_Info: session?.user?.id || '',
    adesc: '',
    aemail: session?.user?.email || '',
    aphonenum: '',
    aduration: '',
    adate: '',
    alocstate: '',
    aloccity: '',
  }));

  const [formError, setFormError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!session) {
      navigate('/login');
    }
    
    setFormData(prev => ({
      ...prev,
      Org_Info: session?.user?.id,
      aemail: session?.user?.email || prev.aemail
    }));
  }, [session, navigate]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Map of field IDs to their display names
  const fieldDisplayNames = {
    aname: 'Organization Name',
    alink: 'Activity Link',
    atype: 'Activity Type',
    afield: 'Activity Field',
    alocstate: 'State',
    aloccity: 'City',
    alocation: 'Address',
    adate: 'Date',
    adesc: 'Description',
    areq: 'Requirements'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsSubmitting(true);
    setFormError(null);

    const requiredFields = ['aname', 'atype', 'afield', 'aemail', , 'alocstate', 'aloccity', 'adesc', 'aphonenum', 'areq', , 'alocation'];
    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      const missingFieldNames = missingFields.map(field => fieldDisplayNames[field] || field);
      setFormError(`Please fill out these required fields: ${missingFieldNames.join(', ')}`);
      setIsSubmitting(false);
      
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('activities')
        .insert([formData])
        .select();

      if (error) throw error;

      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating activity:', error);
      setFormError(error.message || "Error submitting form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">Create New Activity</h1>
        </div>

        {formError && (
          <div className="mb-4 p-3 bg-red-900 text-red-100 rounded">
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
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
                value={formData.aname}
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
                value={formData.alink}
                onChange={handleChange}
                placeholder="https://example.com"
                className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                value={formData.atype}
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

            {/* Activity Field */}
            <div className="space-y-1">
              <label htmlFor="afield" className="block text-sm font-medium">
                Activity Field*
              </label>
              <select
                id="afield"
                name="afield"
                value={formData.afield}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              >
                <option value="">Select field</option>
                {ACTIVITY_FIELDS.map(field => (
                  <option key={field} value={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</option>
                ))}
              </select>
            </div>

            {/* Location - State */}
            <div className="space-y-1">
              <label htmlFor="alocstate" className="block text-sm font-medium">
                County*
              </label>
              <select
                id="alocstate"
                name="alocstate"
                value={formData.alocstate}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              >
                <option value="">Select County</option>
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
                value={formData.aloccity}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            {/* Specific Location */}
            <div className="space-y-1">
              <label htmlFor="alocation" className="block text-sm font-medium">
                Address
              </label>
              <input
                type="text"
                id="alocation"
                name="alocation"
                value={formData.alocation}
                onChange={handleChange}
                placeholder="Address, building name, or room number"
                className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            

{/* Activity Date */}
<div className="space-y-1">
  <label htmlFor="dateOption" className="block text-sm font-medium">
    Application Deadline
  </label>
  <select
    id="dateOption"
    value={formData.adate === null ? 'none' : 'addDate'}
    onChange={(e) => {
      if (e.target.value === 'none') {
        setFormData(prev => ({...prev, adate: null}));
      } else {
        setFormData(prev => ({...prev, adate: ''})); // Set to empty string to show date input
      }
    }}
    className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
  >
    <option value="none">None</option>
    <option value="addDate">Add Date</option>
  </select>
  
  {formData.adate !== null && (
    <div className="mt-2 flex items-center">
      <input
        type="date"
        id="adate"
        name="adate"
        value={formData.adate || ''}
        onChange={handleChange}
        className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <button
        type="button"
        onClick={() => setFormData(prev => ({...prev, adate: null}))}
        className="ml-2 px-3 py-2 bg-gray-600 hover:bg-gray-700 rounded text-sm"
      >
        No Deadline
      </button>
    </div>
  )}
</div>

            {/* Activity Duration */}
            <div className="space-y-1">
              <label htmlFor="aduration" className="block text-sm font-medium">
                Weekly Times
              </label>
              <input
                type="text"
                id="aduration"
                name="aduration"
                value={formData.aduration}
                onChange={handleChange}
                placeholder="e.g., Mon-Fri: 9 AM - 5 PM"
                className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                value={formData.aphonenum}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
              value={formData.adesc}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
              rows={4}
            />
          </div>

          {/* Requirements */}
          <div className="space-y-1">
            <label htmlFor="areq" className="block text-sm font-medium">
              Requirements
            </label>
            <textarea
              id="areq"
              name="areq"
              value={formData.areq}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
              rows={4}
              placeholder="e.g., Bring laptop, wear comfortable shoes"
            />
          </div>

          <input type="hidden" id="Org_Info" name="Org_Info" value={formData.Org_Info} />

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
              {isSubmitting ? 'Creating...' : 'Create Activity'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrgAddPage;