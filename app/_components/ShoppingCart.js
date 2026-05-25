// app/_components/ShoppingCart.js
import { useState, useEffect } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useCart } from "./CartContext";
import CartItems from "./CartItems";

export default function ShoppingCart() {
  const { cart, setShowCart } = useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
  <div className="relative inline-block">
    <ShoppingCartIcon
      className="w-6 h-6 hover:text-main cursor-pointer transition-colors mr-2 sm:mr-3 text-icon"
      onClick={() => setShowCart((show) => !show)}
    />

    {/* Perfectly aligned responsive notification badge */}
    {isClient && cart.length > 0 && (
      <span className="absolute top-0 right-2 sm:right-3 flex h-2 w-2 sm:h-2.5 sm:w-2.5">
        <span className="relative inline-flex rounded-full bg-red-500 h-full w-full"></span>
      </span>
    )}

    {/* Outer structural container renders on the server */}
    <CartItems />
  </div>
);

}
