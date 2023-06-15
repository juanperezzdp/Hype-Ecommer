import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login/Login";
import Home from "../pages/Home";
import Register from "../components/Login/Register";
import { ProtectedRoute } from "../components/Login/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
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
