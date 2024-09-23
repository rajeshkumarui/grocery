// Wishlist.js
import React, { useContext } from "react";
import { WishlistContext } from "../../contexts/WishlistContext";
import { CartContext } from "../../contexts/CartContext";

const Wishlist = () => {
  const { wishlist, removeFromWishlist, clearWishlist } =
    useContext(WishlistContext);
  const { cartItems, addToCart, increaseQuantity, decreaseQuantity } =
    useContext(CartContext);

  if (wishlist.length === 0) {
    return <div className="wishlist-empty"><h2>Your wishlist is empty!</h2></div>;
  }

  return (
    <div className="wishlist-container products-home">
      <h2>Your Wishlist</h2>
      <ul className="wishlist-list">
        {wishlist.map((product) => {
          const cartItem = cartItems.find((item) => item.id === product.id);
            return (
                <li key={product.id}>
                <img src={product.image} alt={product.name} />
                <div>
                  <h3>{product.name}</h3>
                  <div className="weight-price">
                    <div className="price-wrapper">
                      <p className="price">₹{product.discountPrice}.00</p>
                      <p className="discount-price">₹{product.price}</p>
                    </div>
                    <p className="weight">{product.weight}</p>
                  </div>
                  {!cartItem ? (
                    <button
                      className="addtocart"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <div className="quantity-controls">
                      <button onClick={() => decreaseQuantity(product.id, -1)}>
                        -
                      </button>
                      <span>{cartItem.quantity}</span>
                      <button onClick={() => increaseQuantity(product.id)}>
                        +
                      </button>
                    </div>
                  )}
                  <button onClick={() => removeFromWishlist(product)}>
                    Remove
                  </button>
                </div>
              </li>
            )
        })}
      </ul>
      <button className="clear-wishlist" onClick={clearWishlist}>
        Clear Wishlist
      </button>
    </div>
  );
};

export default Wishlist;
