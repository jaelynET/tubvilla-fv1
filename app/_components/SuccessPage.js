"use client";
import { Suspense, useEffect } from "react";
import { useCart } from "./CartContext";
import Link from "next/link";

function SuccessPage({ customerEmail }) {
  useEffect(function () {
    // 1. Grab the cart data before it gets wiped out
    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart);

        // 2. Calculate the total value dynamically
        // Adjust 'item.price' and 'item.quantity' to match your cart's exact object keys
        const totalValue = cartItems.reduce(
          (sum, item) => sum + item.regularPrice * item.quantity,
          0,
        );

        // 3. Generate a random or timestamped order ID if you don't have one from a backend
        const orderId = "ORD-" + Date.now();
        const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
        const conversionLabel = process.env.NEXT_PUBLIC_GOOGLE_CONVERSION_LABEL;

        // 4. Safely verify that gtag exists before running
        if (
          typeof window !== "undefined" &&
          typeof window.gtag !== "undefined"
        ) {
          window.gtag("event", "purchase", {
            // Links the event to your Google Ads configuration
            send_to: `AW-${adsId}/${conversionLabel}`,
            transaction_id: orderId,
            value: totalValue,
            currency: "USD", // Change to your local currency code if needed

            // Required parameters for Dynamic Remarketing Retail feeds
            google_business_vertical: "retail",
            items: cartItems.map((item) => ({
              id: item.id, // MUST match your Google Merchant Center Feed ID exactly
              price: item.regularPrice,
              quantity: item.quantity,
            })),
          });
        }
      } catch (error) {
        console.error("Failed to parse cart data for Google tracking:", error);
      }
    }

    // 5. Now that the tracking has fired, safely clear the cart
    localStorage.removeItem("cart");
  }, []);

  return (
    <div className=" flex flex-col gap-3">
      <p>
        We appreciate your business! A confirmation email will be sent to{" "}
        {customerEmail}. If you have any questions, please email{" "}
      </p>
      <a href="mailto:sales@tubvilla.com">sales@tubvilla.com</a>
      <Link
        href="/"
        className="w-xs rounded-md bg-button py-3 px-3 cursor-pointer block mt-4 "
      >
        Continue shopping
      </Link>
    </div>
  );
}

export default SuccessPage;
