import { Outlet } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';
import './Dashboard.css';
import { Helmet } from 'react-helmet-async';

const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard - PDFConnect</title>
        <meta name="description" content="Access your PDFConnect dashboard to manage your PDFs, settings, and more." />
        <meta name="keywords" content="Dashboard, PDFConnect, manage PDFs, document tools" />
      </Helmet>
      <div className="container">
        <SideBar />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;