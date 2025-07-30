"use client";

import { useState } from "react";

function ProductDetails({ description }) {
  return (
    <>
      <div className="flex gap-5   ">
        <span className="text-sm text-grey-0 font-semibold ">Description</span>
      </div>
      <div className="flex gap-5  ">
        <span className="text-sm text-grey-0 font-semibold ">
          Specifications
        </span>
      </div>
    </>
  );
}

export default ProductDetails;
