import { createContext, useReducer, useState } from "react";

export const CartContext = createContext({
  cartItems: [],
  count: 0,
  setCount: () => {},
  dispatch: () => {},
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
  const [state, dispatch] = useReducer(cartReducer, { cartItems: [] });
  const [count, setCount] = useState(0);

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        count,
        setCount,
        dispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
