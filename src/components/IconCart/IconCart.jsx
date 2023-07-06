import { useContext } from "react";
import { BsCartCheck, BsCartDash } from "react-icons/bs";
import "./IconCart.scss";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/cartContext";

function IconCart() {
  const navigate = useNavigate();
  const { count } = useContext(CartContext);
  const handleNavigateShopping = () => {
    navigate("/shoppingcart");
  };

  return (
    <div className="container-btn-pt">
      <div
        style={{
          backgroundColor: count >= 1 ? "rgb(46, 139, 125)" : "#000000a6",
        }}
        className="container-btn-cart"
        onClick={handleNavigateShopping}
      >
        <div className="btn-cart">
          {count === 0 ? (
            <BsCartDash className="icon-btn" />
          ) : (
            <BsCartCheck className="icon-btn" />
          )}
          {count}
        </div>
      </div>
    </div>
  );
}

export default IconCart;
