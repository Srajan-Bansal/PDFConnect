import { Outlet } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';
import './Dashboard.css';
import { Suspense } from 'react';

const Dashboard = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="container">
        <SideBar />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </Suspense>
  );
};

export default Dashboard;
