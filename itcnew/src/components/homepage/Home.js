import React, { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { UserContext } from "../../contexts/UserContext";
import { WishlistContext } from "../../contexts/WishlistContext";
import { PopupContext } from "../../contexts/PopupContext";
import products from "../../productsData";
///import Carousel from "../Carousel";
import { LocationContext } from "../../contexts/LocationContext";
import "./Home.css";
import useFetch from "../Hooks/useFetch";
const LazyCarousel = React.lazy(() => import("../Carousel"));

const Home = () => {
  const { cartItems, addToCart, increaseQuantity, decreaseQuantity } =
    useContext(CartContext);
  const { isUserLoggedIn } = useContext(UserContext);
  const { wishlist, addToWishlist, removeFromWishlist } =
    useContext(WishlistContext);
  const { showPopup } = useContext(PopupContext);
  const { location } = useContext(LocationContext);

  const filteredProducts = location
    ? products.filter((product) => product.locations.includes(location))
    : products; // If no location is set, show all products
    const {error, data, loading} = useFetch('https://jsonplaceholder.typicode.com/users');
  return (
    <div className="products-home">
      <LazyCarousel />
      <div className="datalen">Using custom hook fetching data from api data length <span className="textlen"> ({data.length}) </span> </div>
      {filteredProducts.length > 0 ? (
        <ul>
          {filteredProducts.map((product) => {
            const cartItem = cartItems.find((item) => item.id === product.id);
            const isInWishlist = wishlist.some(
              (item) => item.id === product.id
            );
            return (
              <li key={product.id}>
                <span
                  style={{
                    fontSize: "10px",
                    color: "#393235",
                    fontWeight: "bold",
                    display: "inline-block",
                    lineHeight: "15px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#2e396a",
                      fontWeight: "bold",
                      marginRight: "10px",
                    }}
                  >
                    Locations-
                  </span>
                  {product.locations.map((loc) => {
                    return <span className="location-city" key={loc}>{loc}</span>;
                  })}
                </span>
                
                <img src={product.image} alt={product.name} />
                <div className="wishlist-btn-content">
                  <button
                    className="wishlist-btn"
                    onClick={() => {
                      isUserLoggedIn
                        ? isInWishlist
                          ? removeFromWishlist(product)
                          : addToWishlist(product)
                        : showPopup("login");
                    }}
                  >
                    {isInWishlist ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <defs>
                          <clipPath id="clip-path">
                            <rect
                              id="Rectangle_802"
                              data-name="Rectangle 802"
                              width="24"
                              height="24"
                              transform="translate(3977)"
                              fill="#fff"
                            ></rect>
                          </clipPath>
                        </defs>
                        <g id="Heart" transform="translate(-3977)">
                          <path
                            id="Path_3451"
                            data-name="Path 3451"
                            d="M12.063,16.286a8.086,8.086,0,0,1,4.089-2.562,6.541,6.541,0,0,1,6.662,2.463,6.028,6.028,0,0,1,.26,6.8,9.327,9.327,0,0,1-1.3,1.532q-4.322,4.2-8.678,8.361c-.934.9-1.187.9-2.118,0C7.883,29.891,4.744,26.945,1.714,23.9a5.8,5.8,0,0,1-.564-7.585,6.581,6.581,0,0,1,9.737-1.1c.377.324.734.668,1.176,1.072"
                            transform="translate(3977 -11.551)"
                            fill="#FF715B"
                          ></path>
                        </g>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <defs>
                          <clipPath id="clip-path">
                            <rect
                              id="Rectangle_802"
                              data-name="Rectangle 802"
                              width="24"
                              height="24"
                              transform="translate(3977)"
                              fill="#fff"
                            ></rect>
                          </clipPath>
                        </defs>
                        <g id="Heart" transform="translate(-3977)">
                          <path
                            id="Path_3451"
                            data-name="Path 3451"
                            d="M12.063,16.286a8.086,8.086,0,0,1,4.089-2.562,6.541,6.541,0,0,1,6.662,2.463,6.028,6.028,0,0,1,.26,6.8,9.327,9.327,0,0,1-1.3,1.532q-4.322,4.2-8.678,8.361c-.934.9-1.187.9-2.118,0C7.883,29.891,4.744,26.945,1.714,23.9a5.8,5.8,0,0,1-.564-7.585,6.581,6.581,0,0,1,9.737-1.1c.377.324.734.668,1.176,1.072"
                            transform="translate(3977 -11.551)"
                            fill="#c1d8ef"
                          ></path>
                        </g>
                      </svg>
                    )}
                  </button>
                </div>
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
              </li>
            );
          })}
        </ul>
      ) : (
        <h2>No products available for your location.</h2>
      )}
    </div>
  );
};

export default Home;
