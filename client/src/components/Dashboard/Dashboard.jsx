import Sidebar from './Sidebar';
import UserDetails from './UserDetails';

const Dashboard = () => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <UserDetails />
        </div>
    );
};

export default Dashboard;
