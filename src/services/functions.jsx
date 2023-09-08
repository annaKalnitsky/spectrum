import React, { createContext, useState, useContext } from 'react';

export const imager = (url) => {
  return `https://fedtest.bylith.com/api/imager.php?url=${url}&type=fit&width=598&height=824&quality=70`;
};

export const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const increaseItemQuantity = (variant_id) => {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      const itemIndex = newCart.findIndex((item) => item.variant_id === variant_id);
      if (itemIndex > -1) {
        newCart[itemIndex].quantity += 1;
      }
      return newCart;
    });
  };

  const decreaseItemQuantity = (variant_id) => {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      const itemIndex = newCart.findIndex((item) => item.variant_id === variant_id);
      if (itemIndex > -1 && newCart[itemIndex].quantity > 1) {
        newCart[itemIndex].quantity -= 1;
      }
      return newCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, increaseItemQuantity, decreaseItemQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
