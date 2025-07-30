"use client";

import { handleCheckout } from "../_lib/actions";
import { useCart } from "./CartContext";

function CheckoutBtn({}) {
  const { cart } = useCart();

  return (
    // <form action={() => handleCheckout(product)}>
    <form action="/api/checkout_sessions" method="POST">
      <input type="hidden" name="cart" value={JSON.stringify(cart)} />
      <button
        className="w-full rounded-md bg-main py-3 px-3 cursor-pointer"
        type="submit"
        role="link"
      >
        <p className="text-white font-bold text-base">Check out</p>
      </button>
    </form>
  );
}
export default CheckoutBtn;
