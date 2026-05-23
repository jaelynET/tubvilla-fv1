"use client";

import { useState } from "react";
import EstimateArrival from "./EstimateArrival";
import AddToCart from "./AddToCart";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import KlarnaMessage from "./KlarnaMessage";
import ExpandableSection from "./ExpandableSection";
import ProductSpecs from "./ProductSpecs";

import ProductDimensions from "./ProductDimensions";
import ProductInstallDocs from "./ProductInstallDocs";
import ProductVariant from "./ProductVariant";
import { formatPrice } from "../utils/format";

function ProductDetails({ product }) {
  const { name, description, product_variants } = product;
  // const [selectedVariant, setSelectedVariant] = useState(
  //   product.product_variants?.[0] || {},
  // );
  const firstAvailableVariant =
    product.product_variants?.find((v) =>
      v.inventory?.some((i) => i.in_stock && !i.discontinued),
    ) ||
    product.product_variants?.[0] ||
    {};

  const [selectedVariant, setSelectedVariant] = useState(firstAvailableVariant);

  const variants = product_variants || [];

  const allInventory = variants.flatMap((v) => v.inventory || []);

  // 🚨 DISCONTINUED = ALL items discontinued
  const isDiscontinued =
    allInventory.length > 0 &&
    allInventory.every((i) => i.discontinued === true);

  // 🚨 IN STOCK = at least one valid stock item
  const inStock = allInventory.some(
    (i) => i.in_stock === true && i.quantity > 0 && !i.discontinued,
  );

  // 🚨 OUT OF STOCK (explicit state)
  const outOfStock = !isDiscontinued && !inStock && allInventory.length > 0;

  // 🚨 NO INVENTORY AT ALL (important edge case)
  const noInventory = allInventory.length === 0;

  return (
    <>
      <div>
        {isDiscontinued ? (
          <p className="text-xs uppercase text-stone-400">Discontinued</p>
        ) : outOfStock || noInventory ? (
          <p className="text-xs uppercase text-neutral-500">Out of Stock</p>
        ) : null}
        <h1 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl md:text-4xl leading-tight">
          {name}
        </h1>

        {/* Price/Finacing */}
        <div className="mt-3 flex flex-col gap-1 ">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-stone-950 sm:text-3xl md:text-4xl tracking-tight">
              {formatPrice(selectedVariant.regularPrice)}
            </span>
          </div>
          <div className="min-h-[40px] w-full block clear-both my-2">
            <KlarnaMessage amount={selectedVariant.regularPrice} />
          </div>
        </div>
        <div className="mt-6 border-y border-stone-100 py-4">
          <ProductVariant
            product={product}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
          />
        </div>
        <div className="mt-6 flex flex-col gap-4">
          {/* The main call to action sits cleanly right under the variant selections */}
          {isDiscontinued || !inStock ? (
            ""
          ) : (
            <AddToCart product={product} selectedVariant={selectedVariant} />
          )}

          {/* Shipping/Arrival details directly support the purchase decision */}
          <div className="bg-stone-50 rounded-lg p-3.5 border border-stone-150">
            <EstimateArrival />
          </div>
        </div>
        {/* <EstimateArrival /> */}
        <div className="mt-8 border-t border-stone-200 pt-6">
          <ExpandableSection title="Description">
            <p className="text-stone-600 leading-relaxed">{description}</p>
          </ExpandableSection>
          <ExpandableSection title="Specifications">
            <ProductSpecs product={product} selectedVariant={selectedVariant} />
          </ExpandableSection>
          <ExpandableSection title="Dimensions">
            <ProductDimensions
              product={product}
              selectedVariant={selectedVariant}
            />
          </ExpandableSection>
          <ExpandableSection title="Installations & Documents">
            <ProductInstallDocs
              product={product}
              selectedVariant={selectedVariant}
            />
          </ExpandableSection>
        </div>
      </div>
      {/* <AddToCart product={product} selectedVariant={selectedVariant} /> */}
    </>
  );
}

export default ProductDetails;
