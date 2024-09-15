import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NavBar from './components/Navbar/Navbar';

export default function Layout() {

    return (
        <>
            <Helmet>
                <title>PDFConnect - Layout</title>
                <meta name="description" content="PDFConnect layout with navigation and content area for managing your documents." />
                <meta name="keywords" content="PDFConnect, layout, navigation, document management" />
            </Helmet>

            <header className="bg-gray-800 text-white">
                <NavBar />
            </header>

            <main className="p-4">
                <Outlet />
            </main>

            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
}
