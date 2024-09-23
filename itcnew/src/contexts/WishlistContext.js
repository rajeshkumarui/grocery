// WishlistContext.js
import React, { createContext, useContext, useReducer } from "react";
import { CartContext } from "./CartContext";

// Create the context
export const WishlistContext = createContext();

// Define actions for the reducer
const ADD_TO_WISHLIST = "ADD_TO_WISHLIST";
const REMOVE_FROM_WISHLIST = "REMOVE_FROM_WISHLIST";
const CLEAR_WISHLIST = "CLEAR_WISHLIST";

// Wishlist reducer
const wishlistReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      if (state.find((item) => item.id === action.payload.id)) {
        return state; // If item is already in wishlist, don't add it again
      }
      return [...state, action.payload];

    case REMOVE_FROM_WISHLIST:
      return state.filter((item) => item.id !== action.payload.id);

    case CLEAR_WISHLIST:
      return [];

    default:
      return state;
  }
};

// Create the provider component
export const WishlistProvider = ({ children }) => {
  const [wishlist, dispatch] = useReducer(wishlistReducer, []);
  const { showNotification } = useContext(CartContext);

  // Helper functions to dispatch actions
  const addToWishlist = (product) => {
    dispatch({ type: ADD_TO_WISHLIST, payload: product });
    showNotification("Added to the wishlist");
  };

  const removeFromWishlist = (product) => {
    dispatch({ type: REMOVE_FROM_WISHLIST, payload: product });
    showNotification("Removed from the wishlist");
  };

  const clearWishlist = () => {
    dispatch({ type: CLEAR_WISHLIST });
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, clearWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
