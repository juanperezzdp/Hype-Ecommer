import { useContext, useEffect } from "react";
import "../../components/Products/CartStyle.scss";
import IconCart from "../IconCart/IconCart";
import { CartContext } from "../../context/cartContext";

function ShoppingCart() {
  const { cartItems, dispatch } = useContext(CartContext);

  const removeFromCart = (product) => {
    const index = cartItems.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems.splice(index, 1);
      dispatch({ type: "SET_CART_ITEMS", payload: updatedCartItems });
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    }
  };

  useEffect(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {
      const parsedCartItems = JSON.parse(savedCartItems);
      dispatch({ type: "SET_CART_ITEMS", payload: parsedCartItems });
    }
  }, [dispatch]);

  return (
    <>
      <h1>Productos:</h1>
      <div className="container-wrap">
        {cartItems.map((product, index) => (
          <>
            <div className="container-pruducts" key={index}>
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
                <button className="btn-shopping">Añadir al carrito</button>
                <button
                  onClick={() => removeFromCart(product)}
                  className="btn-add"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </>
        ))}
        <IconCart />
      </div>
    </>
  );
}

export default ShoppingCart;
