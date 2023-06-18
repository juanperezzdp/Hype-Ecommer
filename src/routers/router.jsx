import { createBrowserRouter } from "react-router-dom";
import IndexHome from "../pages/IndexHome";
import CreateProducts from "../pages/CreateProducts/CreateProducts";
import LoginPage from "../pages/LoginPage/LoginPage";
import { ProtectedRoute } from "../components/Login/ProtectedRoute";
import ShoppingCart from "../components/ShoppingCart/ShoppingCart";
import { CartProvider } from "../context/cartContext";

const router = createBrowserRouter([
  {
    path: "/loginpage",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <CartProvider>
          <IndexHome />
        </CartProvider>
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
  {
    path: "/shoppingcart",
    element: (
      <ProtectedRoute>
        <CartProvider>
          <ShoppingCart />
        </CartProvider>
      </ProtectedRoute>
    ),
  },
]);

export default router;
