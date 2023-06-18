import { createContext, useReducer, useState } from "react";

export const CartContext = createContext({
  cartItems: [],
  contador: 0,
  dispatch: () => {},
  setContador: () => {},
});

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    case "SET_CART_ITEMS":
      return {
        ...state,
        cartItems: action.payload,
      };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [contador, setContador] = useState(0);
  const [state, dispatch] = useReducer(cartReducer, { cartItems: [] });

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        contador,
        dispatch,
        setContador,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
