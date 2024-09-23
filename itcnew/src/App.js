import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/homepage/Home";
import Cart from "./components/Cart";
import CartProvider from "./contexts/CartContext"; // Import the Cart Context Provider
import UserProvider from "./contexts/UserContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import { PopupProvider } from "./contexts/PopupContext";
import Notification from "./components/Notification"; // Import the Notification component
import Wishlist from "./components/wishlist/Wishlist";
import NotFound from "./NotFound";
import { LocationProvider } from "./contexts/LocationContext";
import ApiCall from "./components/Hooks/ApiCall";
import "./App.css";

const App = () => {
  return (
    <LocationProvider>
      <CartProvider>
        <UserProvider>
          <PopupProvider>
            <WishlistProvider>
              <Router>
                <div className="App">
                  <Header />
                  <Notification />
                  <Routes>
                    <Route exact path="/" element={<Home />}></Route>
                    <Route path="/cart" element={<Cart />}></Route>
                    <Route path="/wishlist" element={<Wishlist />}></Route>
                    <Route path="/api" element={<ApiCall />}></Route>
                    <Route path="*" element={<NotFound />} />{" "}
                    {/* Wildcard route for 404 page */}
                  </Routes>
                </div>
              </Router>
            </WishlistProvider>
          </PopupProvider>
        </UserProvider>
      </CartProvider>
    </LocationProvider>
  );
};

export default App;
