import './Dashboard.css';

import { Outlet } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';
import { Helmet } from 'react-helmet-async';

const Dashboard = () => (
  <>
    <Helmet>
      <title>Dashboard - PDFConnect</title>
      <meta name="description" content="Manage your PDFs and settings in the PDFConnect dashboard." />
      <meta name="keywords" content="Dashboard, PDFConnect, PDFs, document tools" />
    </Helmet>
    <div className="dashboard-container">
      <SideBar />
      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  </>
);

export default Dashboard;
