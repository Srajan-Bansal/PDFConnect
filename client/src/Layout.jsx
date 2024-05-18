import { Outlet } from 'react-router-dom';
// import TinyMCE from './TinyMCE/TinyMCE';
// import JoditRTC from './Jodit/JoditRTC';
// import QuillRTC from './Quill/QuillRTC';

import useDownloadPdf from './hooks/useDownloadPdf';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NavBar from './components/Navbar';

export default function Layout() {
    const { handleDownload } = useDownloadPdf();
    return (
        <>
            <NavBar />
            {/* <QuillRTC /> */}
            {/* <TinyMCE /> */}
            {/* <JoditRTC /> */}
            <button onClick={handleDownload}>Download pdf</button>
            <Outlet />
            <ToastContainer />
        </>
    )
}
