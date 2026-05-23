"use client";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useCart } from "./CartContext";
import CartCard from "./CartCard";
import CheckoutBtn from "./CheckoutBtn";
import SignOutButton from "./SignOutButton";
import { logoutAction } from "../_lib/actions";
import Overlay from "./Overlay";
import Link from "next/link";

// app/_components/CartItems.js
import { useState, useEffect } from "react";

function CartItems() {
  const { cart, isOpen, showCart, setShowCart } = useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const subTotal = isClient
    ? cart.reduce((acc, curr) => acc + curr.regularPrice * curr.quantity, 0)
    : 0;

  const formattedPrice = (subTotal / 100).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    style: "currency",
    currency: "USD",
  });

  return (
    <>
      {/* Structural layout remains identical on server and client */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-110 bg-white shadow-lg transform transition-transform duration-500 ease-in-out z-[999] ${
          showCart ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between mt-3 mx-3">
          <h3 className="mb-5 font-bold text-grey-0 text-xl ">
            {/* Safe string toggle: server prints "Cart", client prints custom array items count */}
            {isClient && cart.length >= 1 ? `Cart (${cart.length})` : "Cart"}
          </h3>
          <button
            onClick={() => setShowCart((show) => !show)}
            className="cursor-pointer self-start"
          >
            <XMarkIcon className="h-5 w-5 " />
          </button>
        </div>

        {/* Safe body toggle: fallback to empty layout on server, map arrays only on client */}
        {!isClient || !cart.length ? (
          <div>
            <p className="mb-5 font-bold text-0 text-center text-grey-0">
              Your cart is empty
            </p>
            <button
              className="w-md rounded-md bg-button py-3 px-3 cursor-pointer"
              type="button"
            >
              <div onClick={() => setShowCart((show) => !show)}>
                <Link href={"/collections/bathtubs/freestanding"}>
                  <p className="text-white font-bold">Shop Bestsellers</p>
                </Link>
              </div>
            </button>
          </div>
        ) : (
          <>
            <div className="mb-10">
              {cart.map((item) => (
                <CartCard product={item} key={item.id} />
              ))}
            </div>
            <div className="w-full border-t border-stone-200 pt-5 mt-6 px-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-stone-600">Shipping</span>
                  <span className="font-semibold text-emerald-600 uppercase tracking-wide text-xs bg-emerald-50 px-2 py-0.5 rounded">
                    Free
                  </span>
                </div>

                <div className="flex items-baseline justify-between border-t border-stone-100 pt-3">
                  <h3 className="text-base font-semibold text-stone-900 tracking-tight">
                    Subtotal
                  </h3>
                  <div className="text-right">
                    <span className="text-xl font-bold text-stone-900 tracking-tight">
                      {formattedPrice}
                    </span>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Taxes calculated at checkout
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <CheckoutBtn />
          </>
        )}
      </div>
      {showCart && <Overlay />}
    </>
  );
}
export default CartItems;
