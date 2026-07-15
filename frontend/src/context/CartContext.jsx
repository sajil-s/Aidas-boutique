import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import {
  getCart,
  addToCart as addToCartService,
  updateCartItem as updateCartItemService,
  removeCartItem as removeCartItemService,
} from "../services/cartService.js";

import { useAuth } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { isAuthenticated } = useAuth();

  const [cartItems, setCartItems] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);

  const fetchCart = async () => {
    if (!isAuthenticated) {
      setCartItems([]);
      return;
    }

    try {
      setCartLoading(true);
      const data = await getCart();

      setCartItems(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch cart failed:", error);
      setCartItems([]);
    } finally {
      setCartLoading(false);
    }
  };

  const addItemToCart = async (cartData) => {
    try {
      setCartLoading(true);
      const data = await addToCartService(cartData);

      setCartItems(data?.cart || []);
      toast.success("Added to cart");
      return { success: true };
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to add to cart";

      toast.error(message);
      return { success: false, message };
    } finally {
      setCartLoading(false);
    }
  };

  const updateCartItemQuantity = async (itemId, quantity) => {
    try {
      setCartLoading(true);
      const data = await updateCartItemService(itemId, quantity);

      setCartItems(data?.cart || []);
      toast.success("Cart updated");
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to update cart";

      toast.error(message);
    } finally {
      setCartLoading(false);
    }
  };

  const removeItemFromCart = async (itemId) => {
    try {
      setCartLoading(true);
      const data = await removeCartItemService(itemId);

      setCartItems(data?.cart || []);
      toast.success("Item removed from cart");
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to remove item";

      toast.error(message);
    } finally {
      setCartLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [isAuthenticated]);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartLoading,
        cartCount,
        fetchCart,
        addItemToCart,
        updateCartItemQuantity,
        removeItemFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}