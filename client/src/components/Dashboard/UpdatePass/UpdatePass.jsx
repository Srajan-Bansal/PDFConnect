import { useState } from 'react';
import useUpdatePassword from '../../../hooks/useUpdatePassword';
import { Helmet } from 'react-helmet-async';
import useLogout from '../../../hooks/useLogout';
import './UpdatePass.css';

const UpdatePass = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { updatePassword } = useUpdatePassword();
  const { logout } = useLogout();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentPassword !== '' && newPassword === confirmPassword) {
      try {
        await updatePassword(currentPassword, newPassword, confirmPassword);
        await logout();
        console.log('Password changed successfully');
      } catch (error) {
        console.log('Error changing Password');
      }
    } else {
      console.error("Password doesn't match");
    }
  };

  return (
    <>
      <Helmet>
        <title>Update Password - PDFConnect</title>
        <meta name="description" content="Update your PDFConnect account password for enhanced security." />
        <meta name="keywords" content="Update password, security, PDFConnect, change password" />
      </Helmet>
      <div className="form">
        <h2>Update Password</h2>
        <form onSubmit={handleSubmit} className="update-form">
          <div className="form-div">
            <label htmlFor="currentPassword">Current Password:</label>
            <input type="password" id="currentPassword" placeholder='Enter your password' value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
          </div>
          <div className="form-div">
            <label htmlFor="newPassword">New Password:</label>
            <input type="password" id="newPassword" placeholder='Enter new password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
          </div>
          <div className="form-div">
            <label htmlFor="confirmPassword">Confirm New Password:</label>
            <input type="password" id="confirmPassword" placeholder='Confirm new password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>
          <button type="submit" className='btns'>Update</button>
        </form>
      </div>
    </>
  );
};

export default UpdatePass;
