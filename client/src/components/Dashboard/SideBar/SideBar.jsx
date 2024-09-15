import './SideBar.css';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faKey, faRightFromBracket, faTrash } from '@fortawesome/free-solid-svg-icons';

const SideBar = () => (
  <>
    <Helmet>
      <title>Dashboard Sidebar - PDFConnect</title>
      <meta name="description" content="Access all tools and features from the PDFConnect dashboard sidebar." />
      <meta name="keywords" content="Sidebar, PDFConnect, dashboard, document tools" />
    </Helmet>
    <div className="sidebar">
      <Link to="userDetails" className="sidebar-item">
        <FontAwesomeIcon className='icon' icon={faCircleInfo} />
        <span className='label'>User Details</span>
      </Link>
      <Link to="updatePassword" className="sidebar-item">
        <FontAwesomeIcon className='icon' icon={faKey} />
        <span className='label'>Update Password</span>
      </Link>
      <Link to="logout" className="sidebar-item">
        <FontAwesomeIcon className='icon' icon={faRightFromBracket} />
        <span className='label'>Logout</span>
      </Link>
      <Link to="deleteAccount" className="sidebar-item">
        <FontAwesomeIcon className='icon' icon={faTrash} />
        <span className='label'>Delete Account</span>
      </Link>
    </div>
  </>
);

export default SideBar;
