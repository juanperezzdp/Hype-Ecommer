import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login/Login";
import Home from "../pages/Home";
import Register from "../pages/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
