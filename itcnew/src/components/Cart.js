import React, { useContext, useState, useRef, useMemo } from "react";
import { CartContext } from "../contexts/CartContext";
import { UserContext } from "../contexts/UserContext";
import { PopupContext } from "../contexts/PopupContext";
import { Link } from "react-router-dom";

import "./Cart.css";
import "./Popup.css";
import "./register/register.css";

const Cart = () => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    calculateTotal,
  } = useContext(CartContext);
  const { isUserLoggedIn } = useContext(UserContext);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const popupRef = useRef();
  const { showPopup } = useContext(PopupContext);

  const handleProceed = () => {
    if (isUserLoggedIn) {
      setOrderPlaced(true);
      clearCart();
    } else {
      showPopup('login');
    }
  };

  const closePopup = () => {
    setOrderPlaced(false);
  };

  const cartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);
  // const cartCount =  cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cartpage">
          <ul className="cart-list">
            <div className="total-itmes-clearcart">
              <span className="total-items">
                Total {cartCount} itmes - ₹{calculateTotal()}
              </span>
              <span className="clear-cart" onClick={clearCart}>
                Clear
              </span>
            </div>
            {cartItems.map((item) => (
              <li key={item.id}>
                <div className="cart-img">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <div className="weight-qty">
                    <div className="weight-price">
                      <p className="weight">{item.weight}</p>
                      {item.quantity > 1 ? (
                        <div className="price-wrapper">
                          <p className="price">
                            <span className="qty-into">
                              {item.quantity} X {item.discountPrice} ={" "}
                              <span className="qty-total">
                                ₹{item.quantity * item.discountPrice}.00{" "}
                              </span>
                            </span>
                          </p>
                          <p className="discount-price">
                            ₹{item.quantity * item.price}.00
                          </p>
                        </div>
                      ) : (
                        <div className="price-wrapper price-container">
                          <p className="price">
                            <span>₹{item.discountPrice}.00</span>
                          </p>
                          <p className="discount-price">₹{item.price}</p>
                        </div>
                      )}
                    </div>
                    <div className="quantity-controls">
                      <button onClick={() => decreaseQuantity(item.id, -1)}>
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increaseQuantity(item.id)}>
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <h1>Payment Details</h1>
            <ul>
              <li className="cart-total">
                <span>Cart Items Total</span>
                <span>₹{calculateTotal()}</span>
              </li>
              <li className="grand-total">
                <span>Grand Total</span>
                <span>₹{calculateTotal()}</span>
              </li>
            </ul>
            <button className="proceed-button" onClick={handleProceed}>
              {isUserLoggedIn ? "Proceed" : "Login to proceed"}
            </button>
          </div>
        </div>
      )}
      {orderPlaced && (
        <div className="popup order-success">
          <div className="popup-content" ref={popupRef}>
            <div className="order-popup">
              <button className="close-btn" onClick={closePopup}>
                <span></span>
              </button>
              <h3>Your order has been placed successfully!</h3>
              <h4>It will be delivered to your place soon!!!!</h4>
              <Link to="/">
                <h3>Home</h3>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
