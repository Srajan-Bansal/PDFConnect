import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import Layout from './Layout';
import Signup from "./components/Signup";
// import Navbar from './components/Navbar';
import Login from "./components/Login";

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout />}>
    <Route path='/login' element={<Login />} />
    <Route path='/signup' element={<Signup />} />
  </Route>
));

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}
