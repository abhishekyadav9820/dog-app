import React, { createContext, useContext, useState } from "react";
const CartContext = createContext();

export const useCartData = () => useContext(CartContext);

const CartDataProvider = ({ children }) => {

  const [cart, setCart] = useState([]);
  const [history, setHistory] = useState([]);

  // Value that will be provided to the components consuming this context
  const contextValue = {
    cart,
    setCart,
    history,
    setHistory
  };


  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export default CartDataProvider;