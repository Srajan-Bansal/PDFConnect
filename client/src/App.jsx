import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

import { useContextAPI } from './context/ContextAPI';
import { v4 as uuidv4 } from 'uuid';

import QuillRTC from './Quill/QuillRTC';
import Layout from './Layout';
import Signup from "./components/Signup";
import Login from "./components/Login";

const App = () => {
  const { authUser } = useContextAPI();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>

        <Route path='docs' element={<Navigate to={`../docs/${uuidv4()}`} replace />} />
        <Route path='docs/:id' element={authUser ? <QuillRTC /> : <Navigate to='/login' />} />

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
