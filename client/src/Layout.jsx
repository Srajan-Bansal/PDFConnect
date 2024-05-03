// import { Outlet } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NavBar from './components/Navbar';
import UploadPage from './components/UploadPage';

export default function Layout() {
    return (
        <>
            <NavBar />
            <UploadPage />
            <ToastContainer />
        </>
    )
}
