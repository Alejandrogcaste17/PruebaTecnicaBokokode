// components/cartContext.tsx
import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const addItemToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
    setShowCart(true);
  };

  const clearCart = () => {
    setCartItems([]);
    setShowCart(false);
  };

  const toggleCartVisibility = () => {
    setShowCart((prev) => !prev);
  };

  return (
    <CartContext.Provider value={{ cartItems, addItemToCart, clearCart, showCart, toggleCartVisibility }}>
      {children}
    </CartContext.Provider>
  );
};
