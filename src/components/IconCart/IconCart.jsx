import { useNavigate } from "react-router-dom";
import { BsCartCheck, BsCartDash } from "react-icons/bs";
import "./IconCart.scss";
import { useContext } from "react";
import { CartContext } from "../../context/cartContext";

function IconCart() {
  const { contador } = useContext(CartContext);
  const navigate = useNavigate();

  const handleNavigateShopping = () => {
    navigate("/shoppingcart");
  };

  console.log("Valor de contador:", contador);

  return (
    <div className="container-btn-pt">
      <div
        style={{
          backgroundColor: contador === 0 ? "#000000a6" : "#2e8b56",
        }}
        className="container-btn-cart"
        onClick={handleNavigateShopping}
      >
        <div className="btn-cart">
          {contador === 0 ? (
            <BsCartDash className="icon-btn" />
          ) : (
            <BsCartCheck className="icon-btn" />
          )}
          {contador && <p>{contador}</p>}
        </div>
      </div>
    </div>
  );
}

export default IconCart;
