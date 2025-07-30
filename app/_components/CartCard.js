"use client";
import { useState } from "react";
import { useCart } from "./CartContext";
import Quantity from "./Quantity";
import Image from "next/image";
import { TrashIcon } from "@heroicons/react/24/outline";

function CartCard({ product }) {
  const { updateQuantity, deleteProduct } = useCart();
  const { id, name, image, regularPrice, quantity } = product;
  // const [quantity, setQuantity] = useState(product.quantity);
  return (
    <div className="max-h-full w-full">
      <div className="flex gap-3 ">
        <div className="relative w-20 h-20 mx-3 mb-3 ">
          <Image
            src={image}
            className="object-cover rounded-md"
            fill
            alt={name}
          />
        </div>
        <div>
          <p className="text-sm text-grey-0 font-semibold">{name}</p>

          <p>${regularPrice * quantity} </p>
          <input
            type="number"
            value={quantity}
            className=" border border-primary-400 rounded-sm w-10 h-5 py-3 px-3 md:ml-2"
            onChange={(e) => updateQuantity(id, parseInt(e.target.value))}
          />
        </div>
        <div className="cursor-pointer flex justify-end ml-47 w-15">
          <TrashIcon
            className="text-grey-0 h-5 w-4"
            onClick={() => deleteProduct(id)}
          />
        </div>
      </div>
    </div>
  );
}
export default CartCard;
