import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "../components/Login/ProtectedRoute";
import { CartProvider } from "../context/cartContext";
import IndexHome from "../pages/Home/IndexHome";
import CreateProducts from "../pages/CreateProducts/CreateProducts";
import LoginPage from "../pages/LoginPage/LoginPage";
import ShoppingCart from "../components/ShoppingCart/ShoppingCart";
import IndexCamas from "../pages/Camas/IndexCamas";
import DetailsProducts from "../components/DetailsProducts/DetailsProducts";

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
          <Route
            path="/detailsproducts/:productId"
            element={
              <ProtectedRoute>
                <DetailsProducts />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
