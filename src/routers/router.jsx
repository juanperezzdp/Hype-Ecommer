import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IndexHome from "../pages/Home/IndexHome";
import CreateProducts from "../pages/CreateProducts/CreateProducts";
import LoginPage from "../pages/LoginPage/LoginPage";
import { ProtectedRoute } from "../components/Login/ProtectedRoute";
import ShoppingCart from "../components/ShoppingCart/ShoppingCart";
import { CartProvider } from "../context/cartContext";
import IndexCamas from "../pages/Camas/IndexCamas";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/loginpage" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <IndexHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/createproducts"
            element={
              <ProtectedRoute>
                <CreateProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shoppingcart"
            element={
              <ProtectedRoute>
                <ShoppingCart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/indexcamas"
            element={
              <ProtectedRoute>
                <IndexCamas />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
