import { useState } from 'react';
import useLogout from '../../../hooks/useLogout';
import './Logout.css';

function Logout() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { logout } = useLogout();

  const handleLogoutClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log('Error loging out');
    }
  };

  const handleCancelLogout = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="logout">
      <h2>Logout</h2>
      {!showConfirmation ? (<button className='bt' onClick={handleLogoutClick}>Logout</button>) : (
        <div className="confirm">
          <p>Are you sure you want to logout?</p>
          <div className="buttons">
            <button onClick={handleConfirmLogout} className="bt button1">Yes</button>
            <button onClick={handleCancelLogout} className="bt button2">No</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Logout;
