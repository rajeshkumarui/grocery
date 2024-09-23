import React, { createContext, useState, useCallback } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [notification, setNotification] = useState(null);
  // Show notification for 1 seconds
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 1000);
  };

  const closeNotification = () => {
    setNotification(null);
  };

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        showNotification("Added to the cart");
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const decreaseQuantity = (productId, quantityChange) => {
    setCartItems(
      (prevItems) =>
        prevItems
          .map((item) => {
            if (item.id === productId) {
              const newQuantity = item.quantity + quantityChange;
              if (newQuantity <= 0) {
                return showNotification(
                  "You have removed an item from the cart"
                ); // Indicate that this item should be removed
              } else {
                showNotification("You have removed an item from the cart");
                return { ...item, quantity: newQuantity };
              }
            }
            return item;
          })
          .filter(Boolean) // Remove null values (items to be removed)
    );
  };

  // Increase product quantity
  const increaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === productId) {
          showNotification("Added again to the cart");
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    );
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
    showNotification('You have cleared your cart. Why don\'t you fill it up?');
  };

  // Calculate total price
  const calculateTotal = useCallback(()=>{
    return cartItems.reduce(
      (total, item) => total + item.quantity * item.discountPrice,
      0
    );
  }, [cartItems])

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        notification,
        calculateTotal,
        removeFromCart,
        closeNotification,
        setCartItems,
        showNotification
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
