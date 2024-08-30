import { useState } from 'react';
import useUpdateMe from '../../../hooks/useUpdateMe';
import useUploadPhoto from '../../../hooks/useUploadPhoto';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './UserDetails.css';

function UserDetails() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState(null);
  const { updateMe } = useUpdateMe();
  const { uploadPhoto } = useUploadPhoto();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (name || email) {
        await updateMe(name, email);
      }

      if (photo) {
        await uploadPhoto(photo);
      }

      navigate('/');
    } catch (error) {
      toast.error('Error updating profile. Please try again later.');
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
      <div className="right">
        <h2>User Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-child">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
          <div className="form-child">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-child">
            <label htmlFor="photo">Upload Photo:</label>
            <input
              type="file"
              id="photo"
              accept="image/*"
              onChange={handlePhotoChange}
            />
          </div>
          <button type="submit" className="btbt">Submit</button>
        </form>
      </div>
    </>
  );
}

export default UserDetails;
