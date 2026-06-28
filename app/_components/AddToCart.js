"use client";

import { useCart } from "@/app/_components/CartContext";
import { sendGtagEvent, ADS_TRACKING_ID } from "../utils/gtag";
import { Suspense, useState, useTransition } from "react";
import CartItems from "./CartItems";
import { XMarkIcon } from "@heroicons/react/24/solid";
import SpinnerMini from "./SpinnerMini";

function AddToCart({ product, selectedVariant }) {
  const { addToCart, setShowCart } = useCart();

  const [quantity, setQuantity] = useState(1);

  const { id, name, image, regularPrice, priceId } = product;

  const productData = {
    id: selectedVariant.id, // ID of the variant
    name: product.short_name || product.name,
    // Add these for the sub-labels
    size: selectedVariant.nominal_size,
    finish: selectedVariant.colorFinish,
    image: product.image || selectedVariant.image,
    regularPrice: selectedVariant.regularPrice,
    sku: selectedVariant.manufacturer_part_number,
    quantity,
  };

  const handleAddToCartClick = () => {
    addToCart(productData);

    const unitPriceNumeric = Number(productData.regularPrice) / 100;
    const totalValueNumeric = unitPriceNumeric * productData.quantity;

    console.log("ATC clicked");

    if (typeof window !== "undefined" && window.gtag) {
      console.log("Sending ATC event");

      window.gtag("event", "conversion", {
        send_to: "AW-18204020684/NaIACLrR9cYcEMyfrehD",
        value: totalValueNumeric,
        currency: "USD",
        items: [
          {
            item_id: productData.manufacturer_part_number,
            item_name: productData.name,
            price: unitPriceNumeric,
            quantity: productData.quantity,
          },
        ],
      });
    } else {
      console.log("gtag missing");
    }
  };

  return (
    <div className="relative ">
      <div className="flex gap-2 mx-4 ">
        <span className="text-grey-0 text-xs px-1 py-1 rounded-md   self-center min-[375px]:mx-5 min-[425px]:mx-7 ">
          Quantity:
        </span>
        <input
          type="number"
          min={1}
          className=" border border-grey-50 text-center  w-40 h-5 border-primary-400 rounded-sm py-3 px-3 mb-1"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
        />
      </div>
      <button
        type="button"
        disabled={!selectedVariant}
        onClick={handleAddToCartClick}
        className="w-full max-w-md mx-auto block mt-4 py-3.5 px-6 font-bold text-base text-white text-center rounded-full bg-button hover:bg-[#4d4238] active:scale-[0.99] transition-all cursor-pointer uppercase"
      >
        Add to Cart
      </button>
      <p className="text-xs text-stone-900 font-md mt-2 text-center">
        ✓ 1-year manufacturer warranty included for added protection
      </p>
    </div>
  );
}

export default AddToCart;
