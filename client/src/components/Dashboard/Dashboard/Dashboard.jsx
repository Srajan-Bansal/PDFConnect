import { Outlet } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="container">
      <SideBar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
