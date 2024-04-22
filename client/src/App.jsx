import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Signup from "./components/Signup";
import Login from "./components/Login";

const router = createBrowserRouter([
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: '/login',
    element: <Login />
  }
])

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}
