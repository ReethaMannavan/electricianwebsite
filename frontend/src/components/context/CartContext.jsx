// // src/context/CartContext.jsx
// import React, { createContext, useContext, useState, useEffect } from "react";
// import axios from "../../api/api";

// const CartContext = createContext();

// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);

//   const fetchCart = async () => {
//     try {
//       const res = await axios.get("/cart/");
//       setCart(res.data);
//     } catch (err) {
//       console.error("Failed to fetch cart", err);
//     }
//   };

//   const addToCart = async (serviceEntryId, quantity = 1) => {
//     try {
//       const res = await axios.post("/cart/add/", { service_entry: serviceEntryId, quantity });
//       setCart(res.data);
//     } catch (err) {
//       console.error("Failed to add to cart", err);
//     }
//   };

//   const updateCartItem = async (itemId, quantity) => {
//     try {
//       const res = await axios.patch(`/cart/update/${itemId}/`, { quantity });
//       fetchCart(); // refresh cart
//     } catch (err) {
//       console.error("Failed to update cart item", err);
//     }
//   };

//   const removeCartItem = async (itemId) => {
//     try {
//       await axios.delete(`/cart/remove/${itemId}/`);
//       fetchCart();
//     } catch (err) {
//       console.error("Failed to remove cart item", err);
//     }
//   };

//   useEffect(() => {
//     if (isOpen) fetchCart();
//   }, [isOpen]);

//   return (
//     <CartContext.Provider
//       value={{ cart, isOpen, setIsOpen, addToCart, updateCartItem, removeCartItem }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };


// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../../api/api";
import { toast } from "react-hot-toast";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // Fetch cart from backend
  const fetchCart = async () => {
    try {
      const res = await axios.get("/cart/");
      setCart(res.data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        toast.error("Please log in to view your cart!");
      } else {
        console.error("Failed to fetch cart", err);
      }
    }
  };

  // Add item to cart
  const addToCart = async (serviceEntryId, quantity = 1) => {
    try {
      const res = await axios.post("/cart/add/", { service_entry: serviceEntryId, quantity });
      setCart(res.data);
      toast.success("Added to cart!");
    } catch (err) {
      if (err.response && err.response.status === 401) {
        toast.error("Please log in to add items to cart!");
        throw new Error("Unauthorized");
      } else {
        console.error("Failed to add to cart", err);
      }
    }
  };

  // Update quantity of cart item
  const updateCartItem = async (itemId, quantity) => {
    try {
      await axios.patch(`/cart/update/${itemId}/`, { quantity });
      fetchCart();
    } catch (err) {
      if (err.response && err.response.status === 401) {
        toast.error("Please log in to update cart items!");
      } else {
        console.error("Failed to update cart item", err);
      }
    }
  };

  // Remove item from cart
  const removeCartItem = async (itemId) => {
    try {
      await axios.delete(`/cart/remove/${itemId}/`);
      fetchCart();
    } catch (err) {
      if (err.response && err.response.status === 401) {
        toast.error("Please log in to remove items from cart!");
      } else {
        console.error("Failed to remove cart item", err);
      }
    }
  };

  useEffect(() => {
    if (isOpen) fetchCart();
  }, [isOpen]);

  return (
    <CartContext.Provider
      value={{ cart, isOpen, setIsOpen, addToCart, updateCartItem, removeCartItem }}
    >
      {children}
    </CartContext.Provider>
  );
};
