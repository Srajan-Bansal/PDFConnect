import { Outlet } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NavBar from './components/Navbar';
import DragNdropParent from './components/DragNdrop/DragNdropParent';

export default function Layout() {


    return (
        <>
            <NavBar />
            <DragNdropParent />
            <Outlet />
            <ToastContainer />
        </>
    )
}
