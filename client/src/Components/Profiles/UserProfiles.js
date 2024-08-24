import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import './userprofiles.css';
import { TutorContext } from '../Context/Context'; // Adjust the path if needed

const UserProfiles = ({ email, onClose }) => {
  const { userToken, setUserEmail, setUserName, userEmail, userName, userLocation, setUserLocation } = useContext(TutorContext);

  // Initialize state with userName, email, and location
  const [updatedName, setUpdatedName] = useState(userName || '');
  const [updatedEmail, setUpdatedEmail] = useState(email || userEmail);
  const [location, setLocation] = useState(userLocation || '');

  useEffect(() => {
    // Sync state with context values
    setUpdatedName(userName || '');
    setUpdatedEmail(userEmail || email);
    setLocation(userLocation || '');
  }, [userName, userEmail, userLocation, email]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      };

      const body = {
        name: updatedName,
        email: updatedEmail,
        location: location
      };

      const res = await axios.patch('http://localhost:5000/api/users/profile', body, config);

      if (res.data) {
        alert('Profile updated successfully');
        setUserEmail(updatedEmail); // Update the email in context
        setUserName(updatedName); // Update the name in context
        setUserLocation(location); // Update the location in context
        localStorage.setItem('userName', updatedName);
        localStorage.setItem('userEmail', updatedEmail);
        localStorage.setItem('userLocation', location);
        onClose(); // Close the profile box after saving
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Error updating profile');
    }
  };

  return (
    <div className="profile-box">
      <h3>User Profile</h3>
      <label>User Name</label>
      <input
        type="text"
        placeholder="UserName"
        value={updatedName}
        onChange={(e) => setUpdatedName(e.target.value)}
      />
      <label>Email</label>
      <input
        type="email"
        placeholder="Email"
        value={updatedEmail}
        onChange={(e) => setUpdatedEmail(e.target.value)}
      />
      <label>Location</label>
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={handleSave} className="save-button">Save</button>
      <button onClick={onClose} className="close-button">Close</button>
    </div>
  );
};

export default UserProfiles;