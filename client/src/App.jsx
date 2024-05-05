import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

import Layout from './Layout';
import Signup from "./components/Signup";
import UploadPage from './components/UploadPage';
import Login from "./components/Login";

import './App.css';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout />}>
    <Route index element={<UploadPage />} />
    <Route path='/login' element={<Login />} />
    <Route path='/signup' element={<Signup />} />
  </Route>
));

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}
