"use client";

import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useCart } from "./CartContext";
import { useState } from "react";

function Quantity({ product }) {
  // const { id } = product;
  const [quantity, setQuantity] = useState(1);
  return (
    <div>
      <input
        type="number"
        min={1}
        className=" border border-primary-400 rounded-sm py-3 px-3"
        defaultValue={product.quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
    </div>
  );
}

export default Quantity;
