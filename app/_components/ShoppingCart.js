"use client";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useCart } from "./CartContext";
import CartItems from "./CartItems";

function ShoppingCart() {
  const { cart, showCart, setShowCart } = useCart();
  console.log(cart);
  return (
    <div className="relative">
      <ShoppingCartIcon
        height={24}
        width={24}
        className=" hover:text-main cursor-pointer transition-colors"
        onClick={() => setShowCart((show) => !show)}
      />
      {cart.length > 0 && (
        <span className="rounded-full bg-red-500 w-[0.675rem] h-[0.675rem]  z-10 absolute top-0 right-0 "></span>
      )}
      <CartItems />
    </div>
  );
}

export default ShoppingCart;
