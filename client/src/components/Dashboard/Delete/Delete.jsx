import { useState } from 'react';
import './Delete.css';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import useDeleteAccount from '../../../hooks/useDeleteAccount';
import { useContextAPI } from '../../../context/ContextAPI';

function Delete() {
  const [enteredUsername, setEnteredUsername] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState('');
  const { deleteAccount } = useDeleteAccount();
  const { authUser } = useContextAPI();

  const handleDeleteClick = () => {
    if (enteredUsername.trim() !== '' && enteredUsername === authUser.name) {
      setShowConfirmation(true);
      setError('');
    } else {
      setError('Please enter the correct username.');
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteAccount();
      toast.success('Account deleted successfully!');
      setShowConfirmation(false);
      setEnteredUsername('');
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Error deleting account.';
      toast.error(errorMessage);
      console.error('Error deleting account:', errorMessage);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <Helmet>
        <title>Delete Account - PDFConnect</title>
        <meta name="description" content="Permanently delete your PDFConnect account and remove all data." />
        <meta name="keywords" content="Delete account, remove account, PDFConnect, account deletion" />
      </Helmet>
      <div className="delete-container">
        <h2 className="delete-head">Delete Account</h2>
        {!showConfirmation ? (
          <div className="delete-input">
            <p className="delete-text">Please enter your username to delete your account:</p>
            <input type="text" value={enteredUsername} onChange={(e) => setEnteredUsername(e.target.value)} placeholder="Enter your username" className="inputt" />
            {error && <p className="delete-error">{error}</p>}
            <button className="delete-button" onClick={handleDeleteClick}>Delete Account</button>
          </div>
        ) : (
          <div className="delete-confirm">
            <p className="delete-confirm-text">Are you sure you want to delete your account?</p>
            <div className="delete-buttons">
              <button onClick={handleConfirmDelete} className="delete-confirm-yes">Yes</button>
              <button onClick={handleCancelDelete} className="delete-confirm-no">No</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Delete;
