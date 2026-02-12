// src/contexts/WishlistContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_APIURL || 'http://localhost:8000/v1';

export const WishlistContext = createContext({
  wishlistItems: [],
  addToWishlist: () => {},
  removeFromWishlist: () => {},
  toggleWishlist: () => {},
  syncWithDatabase: () => {},
  loadFromDatabase: () => {},
});

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  // Load from localStorage on mount (for guest users)
  useEffect(() => {
    try {
      const stored = localStorage.getItem('guestWishlist');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setWishlistItems(parsed);
        }
      }
    } catch (err) {
      console.error('Error reading wishlist from storage', err);
    }
  }, []);

  // Save to localStorage whenever wishlist changes (for guest users)
  useEffect(() => {
    try {
      localStorage.setItem('guestWishlist', JSON.stringify(wishlistItems));
    } catch (err) {
      console.error('Error saving wishlist to storage', err);
    }
  }, [wishlistItems]);

  //Load wishlist from database (called after login)
  const loadFromDatabase = async () => {
    try {
      const token =
        localStorage.getItem('authToken') ||
        sessionStorage.getItem('authToken');

      if (!token) {
        console.log('No token, skipping DB load');
        return;
      }

      const res = await axios.get(`${baseUrl}/wishlist`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        const dbWishlist = res.data.wishlist || [];
        setWishlistItems(dbWishlist);
        console.log('Wishlist loaded from database:', dbWishlist);
      }
    } catch (err) {
      console.error('Error loading wishlist from database:', err);
    }
  };

  //Sync guest wishlist with database (called on login)
  const syncWithDatabase = async () => {
    try {
      const token =
        localStorage.getItem('authToken') ||
        sessionStorage.getItem('authToken');

      if (!token) {
        console.log('No token, skipping sync');
        return;
      }

      // Get current guest wishlist from localStorage
      const guestWishlist = JSON.parse(
        localStorage.getItem('guestWishlist') || '[]',
      );

      // Sync with backend
      const res = await axios.post(
        `${baseUrl}/wishlist/sync`,
        { guestWishlist },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (res.data.success) {
        const mergedWishlist = res.data.wishlist || [];
        setWishlistItems(mergedWishlist);
        console.log('Wishlist synced with database:', mergedWishlist);
      }
    } catch (err) {
      console.error('Error syncing wishlist:', err);
    }
  };

  // Add to wishlist
  const addToWishlist = async (productId) => {
    try {
      const token =
        localStorage.getItem('authToken') ||
        sessionStorage.getItem('authToken');

      if (token) {
        // User is logged in - add to database
        const res = await axios.post(
          `${baseUrl}/wishlist`,
          { productId },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (res.data.success) {
          setWishlistItems(res.data.wishlist || []);
        }
      } else {
        // Guest user - add to localStorage
        setWishlistItems((prev) =>
          prev.includes(productId) ? prev : [...prev, productId],
        );
      }
    } catch (err) {
      console.error('Error adding to wishlist:', err);
      // Fallback to localStorage
      setWishlistItems((prev) =>
        prev.includes(productId) ? prev : [...prev, productId],
      );
    }
  };

  // Remove from wishlist
  const removeFromWishlist = async (productId) => {
    try {
      const token =
        localStorage.getItem('authToken') ||
        sessionStorage.getItem('authToken');

      if (token) {
        // User is logged in - remove from database
        const res = await axios.delete(`${baseUrl}/wishlist/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          setWishlistItems(res.data.wishlist || []);
        }
      } else {
        // Guest user - remove from localStorage
        setWishlistItems((prev) => prev.filter((id) => id !== productId));
      }
    } catch (err) {
      console.error('Error removing from wishlist:', err);
      // Fallback to localStorage
      setWishlistItems((prev) => prev.filter((id) => id !== productId));
    }
  };

  // Toggle wishlist
  const toggleWishlist = async (productId) => {
    if (wishlistItems.includes(productId)) {
      await removeFromWishlist(productId);
    } else {
      await addToWishlist(productId);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        syncWithDatabase,
        loadFromDatabase,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
