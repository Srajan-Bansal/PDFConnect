import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { useContextAPI } from './context/ContextAPI';
import { lazy, Suspense, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import ReactGA from 'react-ga4';

const Layout = lazy(() => import('./Layout'));
const Home = lazy(() => import('./components/Home/Home'));
const Docs = lazy(() => import('./components/Docs/Docs'));
const DocsId = lazy(() => import('./components/Docs/DocsId/DocsId'));
const Signup = lazy(() => import('./components/Auth/Signup'));
const Login = lazy(() => import('./components/Auth/Login'));
const Dashboard = lazy(() => import('./components/Dashboard/Dashboard/Dashboard'));
const UserDetails = lazy(() => import('./components/Dashboard/UserDetails/UserDetails'));
const UpdatePass = lazy(() => import("./components/Dashboard/UpdatePass/UpdatePass"));
const Logout = lazy(() => import("./components/Dashboard/Logout/Logout"));
const Delete = lazy(() => import("./components/Dashboard/Delete/Delete"));
const ErrorBoundary = lazy(() => import('./ErrorBoundary'));
const Spinner = lazy(() => import('./Spinner'));

const PrivateRoute = ({ element, redirectTo }) => {
  const { authUser } = useContextAPI();
  return authUser ? element : <Navigate to={redirectTo} />;
};

const App = () => {
  const { authUser } = useContextAPI();

  useEffect(() => {
    const TRACKING_ID = 'G-770PN7LTCC';
    const NODE_ENV = import.meta.env.VITE_ENVIRONMENT;

    ReactGA.initialize(TRACKING_ID, {
      gaOptions: {
        debug_mode: NODE_ENV === 'development'
      }
    });

  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route path='/' index element={
          <Suspense fallback={<Spinner />}>
            <Home />
          </Suspense>
        } />

        <Route path='docs' element={
          <PrivateRoute element={
            <Suspense fallback={<Spinner />}>
              <Docs />
            </Suspense>
          } redirectTo='/login' />
        } />

        <Route path='docs/:id' element={
          <PrivateRoute element={
            <Suspense fallback={<Spinner />}>
              <DocsId />
            </Suspense>
          } redirectTo='/login' />
        } />

        <Route path='user/dashboard' element={
          <PrivateRoute element={<Suspense fallback={<Spinner />}><Dashboard /></Suspense>} redirectTo='/login' />
        }>
          <Route index element={<Navigate to='userDetails' />} />
          <Route path='userDetails' element={<UserDetails />} />
          <Route path='updatePassword' element={<UpdatePass />} />
          <Route path='logout' element={<Logout />} />
          <Route path='deleteAccount' element={<Delete />} />
        </Route>


        <Route path='login' element={
          authUser ? <Navigate to='/' /> :
            <Suspense fallback={<Spinner />}>
              <Login />
            </Suspense>
        } />

        <Route path='signup' element={
          authUser ? <Navigate to='/' /> :
            <Suspense fallback={<Spinner />}>
              <Signup />
            </Suspense>
        } />

        <Route path='*' element={<ErrorBoundary />} />
      </Route>
    )
  );

  return <>
    <Helmet>
      <title>PDFConnect</title>
      <meta name="description" content="PDFConnect - Your comprehensive tool for editing, managing, and sharing PDF documents." />
      <meta name="keywords" content="PDFConnect, PDF editor, document management, file sharing" />
    </Helmet>
    <RouterProvider router={router} />
  </>
};

export default App;