import { useEffect, useContext } from "react";
import "../../components/Products/CartStyle.scss";
import IconCart from "../IconCart/IconCart";
import { CartContext } from "../../context/cartContext";
import NoHayProductos from "../../img/NoHayProductos.png";
import "./ShoppingStyle.scss";

function ShoppingCart() {
  const { cartItems, dispatch, count, setCount } = useContext(CartContext);

  const removeFromCart = (productId) => {
    const index = cartItems.findIndex((product) => product.id === productId);
    if (index !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems.splice(index, 1);

      dispatch({ type: "SET_CART_ITEMS", payload: updatedCartItems });
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

      const newCount = count - 1; // Calculate the new count
      setCount(newCount);
      localStorage.setItem("count", newCount);
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

  const getUniqueProducts = () => {
    const uniqueProducts = [];
    cartItems.forEach((product) => {
      const index = uniqueProducts.findIndex((item) => item.id === product.id);
      if (index === -1) {
        uniqueProducts.push({ ...product, quantity: 1 });
      } else {
        uniqueProducts[index].quantity++;
      }
    });
    return uniqueProducts;
  };

  const getTotalPrice = (productId) => {
    const totalPrice = cartItems
      .filter((product) => product.id === productId)
      .reduce((acc, product) => acc + parseFloat(product.price), 0);
    return totalPrice;
  };

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });

    // Save cart data to localStorage
    const updatedCartItems = [...cartItems, product];
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    setCount(count + 1);
    localStorage.setItem("count", count + 1);
  };

  return (
    <>
      <IconCart />
      {cartItems && cartItems.length ? (
        <div className="container-shopping-wrap">
          {getUniqueProducts().map((product) => (
            <div className="container-shopping-pruducts" key={product.id}>
              <div>
                <img
                  style={{ width: "10rem" }}
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
                      ${getTotalPrice(product.id).toLocaleString("es-CO")}
                    </p>
                  </div>
                  <p className="stock">-{product.stock}%</p>
                  <p className="quantity">Quantity: {product.quantity}</p>
                </div>
              </div>
              <div className="container-btn-shopping">
                <button
                  className="btn-shopping"
                  onClick={() => addToCart(product)}
                >
                  Añadir mas
                </button>
                <button
                  onClick={() => {
                    removeFromCart(product.id);
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
