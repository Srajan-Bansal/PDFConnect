import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

import { useContextAPI } from './context/ContextAPI';
import { v4 as uuidv4 } from 'uuid';

import Layout from './Layout';
import Signup from "./components/Signup";
import Login from "./components/Login";
import Docs from './components/Docs/Docs';
import Video from './components/Video/Video';
import DragNdropParent from './components/DragNdrop/DragNdropParent';

const App = () => {
  const { authUser } = useContextAPI();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>

        <Route path='docs' element={<Navigate to={`../docs/${uuidv4()}`} replace />} />
        <Route path='docs/:id' element={authUser ?
          <>
            <DragNdropParent />
            <Docs />
          </>
          : <Navigate to='/login' />}
        />

        <Route
          path='/video'
          element={authUser ? <Video /> : <Navigate to="/login" />}
        />

        <Route
          path='/login'
          element={authUser ? <Navigate to='/' /> : <Login />}
        />

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
