import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { useContextAPI } from './context/ContextAPI';
import { lazy, Suspense } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Helmet } from 'react-helmet-async';

const Layout = lazy(() => import('./Layout'));
const Home = lazy(() => import('./components/Home/Home'));
const Docs = lazy(() => import('./components/Docs/Docs'));
const DragNdropParent = lazy(() => import('./components/DragNdrop/DragNdropParent'));
const Signup = lazy(() => import('./components/Signup/Signup'));
const Login = lazy(() => import('./components/Signup/Login'));
const Dashboard = lazy(() => import('./components/Dashboard/Dashboard/Dashboard'));
const UserDetails = lazy(() => import('./components/Dashboard/UserDetails/UserDetails'));
const UpdatePass = lazy(() => import("./components/Dashboard/UpdatePass/UpdatePass"));
const Logout = lazy(() => import("./components/Dashboard/Logout/Logout"));
const Delete = lazy(() => import("./components/Dashboard/Delete/Delete"));

const PrivateRoute = ({ element, redirectTo }) => {
  const { authUser } = useContextAPI();
  return authUser ? element : <Navigate to={redirectTo} />;
};

const App = () => {
  const { authUser } = useContextAPI();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route path='/' index element={
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        } />

        <Route path='docs' element={<Navigate to={`../docs/${uuidv4()}`} replace />} />

        <Route path='docs/:id' element={
          <PrivateRoute element={
            <Suspense fallback={<div>Loading...</div>}>
              <DragNdropParent />
              <Docs />
            </Suspense>
          } redirectTo='/login' />
        } />

        <Route path='user/dashboard' element={
          <PrivateRoute element={<Suspense fallback={<div>Loading...</div>}><Dashboard /></Suspense>} redirectTo='/login' />
        }>
          <Route index element={<Navigate to='userDetails' />} />
          <Route path='userDetails' element={<UserDetails />} />
          <Route path='updatePassword' element={<UpdatePass />} />
          <Route path='logout' element={<Logout />} />
          <Route path='deleteAccount' element={<Delete />} />
        </Route>


        <Route path='login' element={
          authUser ? <Navigate to='/' /> :
            <Suspense fallback={<div>Loading...</div>}>
              <Login />
            </Suspense>
        } />

        <Route path='signup' element={
          authUser ? <Navigate to='/' /> :
            <Suspense fallback={<div>Loading...</div>}>
              <Signup />
            </Suspense>
        } />

        <Route path='*' element={<div>404 - Not Found</div>} />
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