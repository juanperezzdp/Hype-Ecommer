import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "../components/Login/ProtectedRoute";
import { CartProvider } from "../context/cartContext";
import IndexHome from "../pages/Home/IndexHome";
import CreateProducts from "../pages/CreateProducts/CreateProducts";
import LoginPage from "../pages/LoginPage/LoginPage";
import ShoppingCart from "../components/ShoppingCart/ShoppingCart";
import IndexCamas from "../pages/Camas/IndexCamas";
import DetailsProducts from "../components/DetailsProducts/DetailsProducts";

function Routers() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<IndexHome />} />
          <Route path="/loginpage" element={<LoginPage />} />
          <Route path="/createproducts" element={<CreateProducts />} />
          <Route
            path="/shoppingcart"
            element={
              <ProtectedRoute>
                <ShoppingCart />
              </ProtectedRoute>
            }
          />
          <Route path="/indexcamas" element={<IndexCamas />} />
          <Route
            path="/detailsproducts/:productId"
            element={<DetailsProducts />}
          />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default Routers;
