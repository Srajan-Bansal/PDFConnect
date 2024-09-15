import './UserDetails.css';
import { useState } from 'react';
import useUpdateProfile from '../../../hooks/useUpdateProfile';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { showError } from '../../Toast';

const UserDetails = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState(null);
  const { updateProfile } = useUpdateProfile();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateProfile(name, email, photo);
      navigate('/');
    } catch (error) {
      showError('Error updating profile. Please try again later.');
      console.error('Error:', error);
    }
  };

  const handlePhotoChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  return (
    <>
      <Helmet>
        <title>User Details - PDFConnect</title>
        <meta name="description" content="View and update your account details on PDFConnect." />
        <meta name="keywords" content="User details, account settings, PDFConnect, manage account" />
      </Helmet>
      <div className="user-details">
        <h2>User Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="photo">Upload Photo:</label>
            <input
              type="file"
              id="photo"
              accept="image/*"
              onChange={handlePhotoChange}
            />
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </>
  );
};

export default UserDetails;
