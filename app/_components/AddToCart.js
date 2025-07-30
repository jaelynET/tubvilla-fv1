"use client";

import { useCart } from "@/app/_components/CartContext";
import { Suspense, useState, useTransition } from "react";
import CartItems from "./CartItems";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Loading from "../laoding";

function AddToCart({ product }) {
  const { addToCart, setShowCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [isPending, startTransition] = useTransition();
  const { id, name, image, regularPrice, priceId } = product;

  const productData = {
    id,
    name,
    image,
    regularPrice,
    quantity,
    priceId,
  };
  return (
    <div className="relative ">
      <div className="flex gap-2 mx-4 ">
        <span className="text-grey-0 text-xs px-1 py-1 rounded-md  bg-grey-100 self-center min-[375px]:mx-5 min-[425px]:mx-7 ">
          Quantity:
        </span>
        <input
          type="number"
          min={1}
          className=" border border-grey-50 text-center  w-40 h-5 border-primary-400 rounded-sm py-3 px-3 mb-1"
          defaultValue={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <button
        className="w-70  bg-main py-3 px-3 cursor-pointer block mt-2  mx-4 rounded-full min-[375px]:mx-7 min-[375px]:w-75 min-[425px]:mx-9 min-[425px]:w-80  "
        //onClick={addToCart(product)}
        disabled={isPending}
        onClick={() => {
          startTransition(async () => {
            await addToCart(productData);
            setShowCart((show) => !show);
          });
        }}
      >
        <p className="text-white font-bold">
          {isPending ? "Adding" : "Add to Cart"}
        </p>
      </button>
      <div>
        <CartItems />
      </div>
    </div>
  );
}

export default AddToCart;
