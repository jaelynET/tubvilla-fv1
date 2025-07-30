"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useTransition,
} from "react";

const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const [showCart, setShowCart] = useState(false);

  const [isPending, startTransition] = useTransition();
  // 1. load local storage on mount
  useEffect(function () {
    const avaiableCart = localStorage.getItem("cart");
    if (avaiableCart) {
      setCart(JSON.parse(avaiableCart));
    }
  }, []);

  useEffect(
    function () {
      localStorage.setItem("cart", JSON.stringify(cart));
    },
    [cart]
  );

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product }];
    });
  };

  const updateQuantity = (id, quantity) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  function deleteProduct(id) {
    setCart((items) => items.filter((item) => item.id !== id));
  }

  const clearCart = () => {
    setCart(() => []);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        showCart,
        setShowCart,
        deleteProduct,
        isPending,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);
  if (context === undefined)
    throw new Error("Context is used outside provider");
  return context;
}

export { CartProvider, useCart };
