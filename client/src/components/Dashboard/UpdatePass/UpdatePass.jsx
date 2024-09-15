import './UpdatePass.css';
import { useState } from 'react';
import useUpdatePassword from '../../../hooks/useUpdatePassword';
import { Helmet } from 'react-helmet-async';
import useLogout from '../../../hooks/useLogout';

const UpdatePass = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { updatePassword } = useUpdatePassword();
  const { logout } = useLogout();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentPassword && newPassword === confirmPassword) {
      try {
        await updatePassword(currentPassword, newPassword);
        await logout();
        console.log('Password changed successfully');
      } catch (error) {
        console.error('Error changing password:', error);
      }
    } else {
      console.error("Passwords do not match");
    }
  };

  return (
    <>
      <Helmet>
        <title>Update Password - PDFConnect</title>
        <meta name="description" content="Update your PDFConnect account password for enhanced security." />
        <meta name="keywords" content="Update password, security, PDFConnect, change password" />
      </Helmet>
      <div className="update-form-container">
        <h2>Update Password</h2>
        <form onSubmit={handleSubmit} className="update-form">
          <div className="form-group">
            <label htmlFor="currentPassword">Current Password:</label>
            <input
              type="password"
              id="currentPassword"
              placeholder='Enter your current password'
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">New Password:</label>
            <input
              type="password"
              id="newPassword"
              placeholder='Enter new password'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm New Password:</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder='Confirm new password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className='submit-button'>Update</button>
        </form>
      </div>
    </>
  );
};

export default UpdatePass;
