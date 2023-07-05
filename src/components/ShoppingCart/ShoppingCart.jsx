import { useEffect, useContext } from "react";
import "../../components/Products/CartStyle.scss";
import IconCart from "../IconCart/IconCart";
import { CartContext } from "../../context/cartContext";
import NoHayProductos from "../../img/NoHayProductos.png";

function ShoppingCart() {
  const { cartItems, dispatch, count, setCount } = useContext(CartContext);

  const removeFromCart = (product) => {
    const index = cartItems.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems.splice(index, 1);
      dispatch({ type: "SET_CART_ITEMS", payload: updatedCartItems });
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      setCount(count - 1);
      localStorage.setItem("count", count - 1);
    }
  };

  useEffect(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    const savedCount = localStorage.getItem("count");
    if (savedCartItems) {
      const parsedCartItems = JSON.parse(savedCartItems);
      dispatch({ type: "SET_CART_ITEMS", payload: parsedCartItems });
    }
    if (savedCount) {
      setCount(Number(savedCount));
    }
  }, [dispatch, setCount]);

  console.log(cartItems);

  return (
    <>
      <IconCart />
      {cartItems && cartItems.length ? (
        <div className="container-wrap">
          {cartItems.map((product, index) => (
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
                  onClick={() => {
                    removeFromCart(product);
                  }}
                  className="btn-add"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <img
          style={{ width: "30%", height: "90vh" }}
          src={NoHayProductos}
          alt="img"
        />
      )}
    </>
  );
}

export default ShoppingCart;
