"use client";
import { Suspense, useEffect } from "react";
import { useCart } from "./CartContext";
import Link from "next/link";
import Loading from "../laoding";

function SuccessPage({ customerEmail }) {
  useEffect(function () {
    localStorage.removeItem("cart");
  }, []);

  return (
    <div>
      <p>
        We appreciate your business! A confirmation email will be sent to{" "}
        {customerEmail}. If you have any questions, please email{" "}
      </p>
      <a href="mailto:orders@example.com">orders@example.com</a>
      <Link
        href="/"
        className="w-xs rounded-md bg-main py-3 px-3 cursor-pointer block mt-4 "
      >
        Continue shopping
      </Link>
    </div>
  );
}

export default SuccessPage;
