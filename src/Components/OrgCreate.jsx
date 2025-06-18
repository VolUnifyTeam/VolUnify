import React, { useState } from 'react';
import {UserAuth} from "../context/AuthContext";
import { supabase } from '../supabaseClient';
import {useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


import OrgCreateTile from './OrgCreateTile';

const OrgCreate = () => {



 const [fetchError, setFetchError] = useState(null)
 const [ activities, setActivities] = useState(null)

  useEffect (() => {
    const fetchActivities = async () => {

      const {data, error} = await supabase
        .from('activities')
        .select('*')

        if (error) {
          setFetchError("Could Not Retrieve Activty Error")
          setActivities(null)

        }
        if (data){

          setActivities(data)
          setFetchError(null)

        }
    }


fetchActivities()

}, [])



{/*
  const handleSubmit = async (e) => {
    e.preventDefault();

    const {data, error} = await supabase
      .from ('Activties')
      .update({activity_name, activity_type, activity_desc, activity_req, activity_location, activity_link})
      .eq('id', id)

  }

*/}



{/*

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    requirements: '',
    location: '',
    applyLink: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };




     




    try {
      const res = await fetch('/add-activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('Activity posted successfully!');
        setFormData({
          name: '',
          type: '',
          description: '',
          requirements: '',
          location: '',
          applyLink: '',
        });
      } else {
        alert('Failed to post activity.');
      }
    } catch (err) {
      alert('Server error.');
    }
  };

  */}

  return (

  
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8" background-color= "rgb(36, 36, 36)">

    
{/*
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8" background-color= "rgb(36, 36, 36)"  >


        {fetchError && (<p>{fetchError}</p>)}

          {activities && (

            <div className="grid grid-cols-3 gap-6 mt-10">

              
              <div >
                  {activities.map(activity => (

                        <OrgCreateTile key ={activity.aid} activity = {activity}/>
                        
                ))}
              
              </div>
            </div>
          )
        }
          
      </div>
  */}



      <div className="max-w-3xl mx-auto rounded-lg shadow" background-color= "rgb(36, 36, 36)">
        <h2 className="text-2xl font-semibold text-white mb-6"> Organization - Post Volunteer Activity</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            id="name"
            placeholder="Activity Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            id="type"
            placeholder="Volunteer Type"
            value={formData.type}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <textarea
            id="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md h-32 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            id="requirements"
            placeholder="Requirements"
            value={formData.requirements}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            id="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="url"
            id="applyLink"
            placeholder="Application Link"
            value={formData.applyLink}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition duration-300"
          >
            Post Activity
          </button>
        </form>
      </div>



    </div>
  );
};

export default OrgCreate;
