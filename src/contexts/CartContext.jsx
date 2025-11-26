// src/contexts/CartContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Load from localStorage (optional, for persistence)
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('cartItems');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error reading cart from storage', e);
      return [];
    }
  });

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Error saving cart to storage', e);
    }
  }, [cartItems]);

  // 👉 how many TOTAL items in bag (sum of qty)
  const cartCount = cartItems.reduce((sum, item) => sum + (item.qty || 0), 0);

  // ✅ add / update cart
  const addToCart = (newItem) => {
    setCartItems((prev) => {
      const idx = prev.findIndex(
        (item) =>
          item.productId === newItem.productId &&
          item.size === newItem.size &&
          item.color === newItem.color
      );

      // if same product+size+color already exists → just increase qty
      if (idx !== -1) {
        const updated = [...prev];
        const currentQty = updated[idx].qty || 0;
        updated[idx] = {
          ...updated[idx],
          qty: currentQty + newItem.qty,
        };
        return updated;
      }

      // otherwise push as new line item
      return [...prev, newItem];
    });
  };

  const removeFromCart = (productId, size, color) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.productId === productId &&
            item.size === size &&
            item.color === color
          )
      )
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{ cartItems, cartCount, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
