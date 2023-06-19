import { useEffect, useReducer, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase.config/FireBase";
import "./CartStyle.scss";
import { CartProvider, cartReducer } from "../../context/cartContext";

function Sofa() {
  const [state, dispatch] = useReducer(cartReducer, { cartItems: [] });
  const [products, setProducts] = useState([]);

  const productsCollection = collection(db, "products");

  useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(productsCollection);
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getProducts();
  }, [productsCollection]);

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });

    // Save cart data to localStorage
    const updatedCartItems = [...state.cartItems, product];
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  return (
    <>
      <CartProvider
        value={{
          cartItems: state.cartItems,
          contador: state.cartItems.length,
          dispatch,
        }}
      >
        <div className="container-wrap">
          {products.map((product) => (
            <>
              <div className="container-pruducts" key={product.title}>
                <div>
                  <img
                    className="container-img-products"
                    src={product.urls}
                    alt="Img"
                  />
                </div>
                <div>
                  <div className="container-title-products">
                    <div className="container-title-description">
                      <h3>{product.title.toString()}</h3>
                      <p className="price">
                        $
                        {typeof product.price === "string" &&
                          parseFloat(product.price).toLocaleString("es-CO")}
                      </p>
                    </div>

                    <p className="stock">-{product.stock}%</p>
                  </div>
                </div>
                <div className="container-btn-shopping">
                  <button
                    className="btn-shopping"
                    onClick={() => addToCart(product)}
                  >
                    Añadir al carrito
                  </button>
                  <button className="btn-add">Ver detalles</button>
                </div>
              </div>
            </>
          ))}
        </div>
      </CartProvider>
    </>
  );
}

export default Sofa;
