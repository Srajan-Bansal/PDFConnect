import './SideBar.css'
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faKey, faRightFromBracket, faTrash } from '@fortawesome/free-solid-svg-icons';

function SideBar() {

  return (
    <>
      <Helmet>
        <title>Dashboard Sidebar - PDFConnect</title>
        <meta name="description" content="Access all tools and features from the PDFConnect dashboard sidebar." />
        <meta name="keywords" content="Sidebar, PDFConnect, dashboard, document tools" />
      </Helmet>
      <div className="left">
        <Link to="userDetails" className="s1">
          <FontAwesomeIcon className='img' icon={faCircleInfo} />
          <span className='para'>User Details</span>
        </Link>
        <Link to="updatePassword" className="s1">
          <FontAwesomeIcon className='img' icon={faKey} />
          <span className='para'>Update Password</span>
        </Link>
        <Link to="logout" className="s1">
          <FontAwesomeIcon className='img' icon={faRightFromBracket} />
          <span className='para'>Logout</span>
        </Link>
        <Link to="deleteAccount" className="s1">
          <FontAwesomeIcon className='img' icon={faTrash} />
          <span className='para'>Delete Account</span>
        </Link>
      </div>
    </>
  )
}

export default SideBar;