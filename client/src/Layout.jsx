import { Outlet } from 'react-router-dom';
import TinyMCE from './TinyMCE/TinyMCE';

import useDownloadPdf from './hooks/useDownloadPdf';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NavBar from './components/Navbar';

export default function Layout() {
    const { handleDownload } = useDownloadPdf();
    return (
        <>
            <NavBar />
            <TinyMCE />
            <button onClick={handleDownload}>Download pdf</button>
            <Outlet />
            <ToastContainer />
        </>
    )
}
