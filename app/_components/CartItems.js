"use client";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useCart } from "./CartContext";
import CartCard from "./CartCard";
import CheckoutBtn from "./CheckoutBtn";
import SignOutButton from "./SignOutButton";
import { logoutAction } from "../_lib/actions";
import Overlay from "./Overlay";
import Link from "next/link";

function CartItems() {
  const { cart, isOpen, showCart, setShowCart } = useCart();
  // console.log(cart);
  const subTotal = cart.reduce(
    (acc, curr) => acc + curr.regularPrice * curr.quantity,
    0
  );

  return (
    <>
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-110 bg-white shadow-lg transform transition-transform duration-500 ease-in-out z-10 ${
          showCart ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between mt-3 mx-3">
          <h3 className="mb-5 font-bold text-grey-0 text-xl ">
            {cart.length >= 1 ? `Cart (${cart.length})` : "Cart"}
          </h3>
          <button
            onClick={() => setShowCart((show) => !show)}
            className="cursor-pointer self-start  "
          >
            <XMarkIcon className="h-5 w-5 " />
          </button>
        </div>
        {/* <form action={logoutAction}>
        <button className=" w-xs">
          <h3 className="cursor-pointer  bg-amber-50">Sign Out</h3>
        </button>
      </form> */}
        {!cart.length ? (
          <div>
            <p className="mb-5 font-bold text-0 text-center text-grey-0">
              Your cart is empty
            </p>
            <button
              className="w-md rounded-md bg-main py-3 px-3 cursor-pointer"
              type="submit"
              role="link"
            >
              <Link href={"/bathtubs"}>
                <p className="text-white font-bold">Shop Bestsellers</p>
              </Link>
            </button>
          </div>
        ) : (
          <>
            <div className="mb-10">
              {cart.map((item) => (
                <CartCard product={item} key={item.id} />
              ))}
            </div>
            <div className="w-full flex justify-between">
              <h3 className="mx-3 text-grey-0 font-bold">Subtotal:</h3>
              <span className="text-grey-0">${subTotal.toLocaleString()}</span>
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
