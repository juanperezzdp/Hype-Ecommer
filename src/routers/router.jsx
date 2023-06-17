// src/routers/Router.jsx

import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import CreateProducts from "../pages/CreateProducts/CreateProducts";
import LoginPage from "../pages/LoginPage/LoginPage";
import { ProtectedRoute } from "../components/Login/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/loginpage",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/createproducts",
    element: (
      <ProtectedRoute>
        <CreateProducts />
      </ProtectedRoute>
    ),
  },
]);

export default router;
