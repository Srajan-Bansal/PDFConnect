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

            <header>
                <NavBar />
            </header>
            <main>
                <Outlet />
            </main>
            <ToastContainer />
        </>
    )
}
