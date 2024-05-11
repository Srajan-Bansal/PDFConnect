import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

import Layout from './Layout';
import Signup from "./components/Signup";
import UploadPage from './components/UploadPage';
import Login from "./components/Login";
import { useContextAPI } from './context/ContextAPI';

const App = () => {
  const { authUser } = useContextAPI();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route index element={<UploadPage />} />
        <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
        <Route
          path='/signup'
          element={authUser ? <Navigate to='/' /> : <Signup />}
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
