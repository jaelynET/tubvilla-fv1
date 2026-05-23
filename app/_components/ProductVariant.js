"use client";
import React from "react";

function ProductVariant({ product, selectedVariant, setSelectedVariant }) {
  const variants = product.product_variants || [];

  const checkStock = (variant) => {
    if (!variant) {
      return {
        exists: false,
        inStock: false,
        discontinued: false,
        hasInventory: false,
      };
    }

    const inventory = variant.inventory || [];

    // No inventory rows attached
    if (inventory.length === 0) {
      return {
        exists: true,
        inStock: false,
        discontinued: false,
        hasInventory: false,
      };
    }

    const discontinued = inventory.some((i) => i.discontinued);

    const inStock = inventory.some((i) => i.in_stock && i.quantity > 0);

    return {
      exists: true,
      inStock: inStock && !discontinued,
      discontinued,
      hasInventory: true,
    };
  };

  const sortedVariants = [...variants].sort((a, b) => {
    const aStock = checkStock(a).inStock ? 0 : 1;
    const bStock = checkStock(b).inStock ? 0 : 1;
    return aStock - bStock;
  });

  const activeFinish = selectedVariant?.colorFinish;
  const activeDrainFinish = selectedVariant?.drainFinish;
  const activeSize = selectedVariant?.nominal_size;

  const finishes = [
    ...new Set(sortedVariants.map((v) => v.colorFinish)),
  ].filter(Boolean);

  const drainFinishes = [
    ...new Set(sortedVariants.map((v) => v.drainFinish)),
  ].filter(Boolean);

  const sizes = [...new Set(sortedVariants.map((v) => v.nominal_size))].filter(
    Boolean,
  );
  const renderStatus = ({ discontinued, exists, inStock, hasInventory }) => {
    if (!hasInventory) return "(Unavailable)";
    if (discontinued) return "(Discontinued)";
    if (exists && !inStock) return "(OOS)";
    return "";
  };

  return (
    <div className="flex flex-col gap-6">
      {/* FINISH */}
      <div>
        <h3 className="text-sm font-bold mb-2">Finish: {activeFinish}</h3>

        <div className="flex gap-2 flex-wrap">
          {finishes.map((f) => {
            const match = variants.find(
              (v) =>
                v.colorFinish === f &&
                v.drainFinish === activeDrainFinish &&
                v.nominal_size === activeSize,
            );

            const stock = checkStock(match);

            return (
              <button
                key={f}
                disabled={!stock.exists || stock.discontinued}
                onClick={() => match && setSelectedVariant(match)}
                className={`px-3 py-2 border text-sm transition
                  ${
                    activeFinish === f
                      ? "bg-black text-white border-black"
                      : "bg-white border-stone-200"
                  }
                  ${
                    !stock.exists
                      ? "opacity-25 line-through cursor-not-allowed"
                      : ""
                  }
                  ${
                    stock.discontinued
                      ? "opacity-40 line-through cursor-not-allowed"
                      : ""
                  }
                  ${
                    stock.exists && !stock.inStock && !stock.discontinued
                      ? "border-dashed text-stone-400"
                      : ""
                  }
                `}
              >
                {f} {renderStatus(stock)}
              </button>
            );
          })}
        </div>
      </div>

      {/* DRAIN FINISH */}
      <div>
        <h3 className="text-sm font-bold mb-2">
          Drain Finish: {activeDrainFinish}
        </h3>

        <div className="flex gap-2 flex-wrap">
          {drainFinishes.map((d) => {
            const match = variants.find(
              (v) =>
                v.drainFinish === d &&
                v.colorFinish === activeFinish &&
                v.nominal_size === activeSize,
            );

            const stock = checkStock(match);

            return (
              <button
                key={d}
                disabled={!stock.exists || stock.discontinued}
                onClick={() => match && setSelectedVariant(match)}
                className={`px-3 py-2 border text-sm transition
                  ${
                    activeDrainFinish === d
                      ? "bg-black text-white border-black"
                      : "bg-white border-stone-200"
                  }
                  ${
                    !stock.exists
                      ? "opacity-25 line-through cursor-not-allowed"
                      : ""
                  }
                  ${
                    stock.discontinued
                      ? "opacity-40 line-through cursor-not-allowed"
                      : ""
                  }
                  ${
                    stock.exists && !stock.inStock && !stock.discontinued
                      ? "border-dashed text-stone-400"
                      : ""
                  }
                `}
              >
                {d} {renderStatus(stock)}
              </button>
            );
          })}
        </div>
      </div>

      {/* SIZE */}
      <div>
        <h3 className="text-sm font-bold mb-2">Size: {activeSize}</h3>

        <div className="flex gap-2 flex-wrap">
          {sizes.map((s) => {
            const match = variants.find(
              (v) =>
                v.nominal_size === s &&
                v.colorFinish === activeFinish &&
                v.drainFinish === activeDrainFinish,
            );

            const stock = checkStock(match);

            return (
              <button
                key={s}
                disabled={!stock.exists || stock.discontinued}
                onClick={() => match && setSelectedVariant(match)}
                className={`px-4 py-2 border text-sm transition
                  ${
                    activeSize === s
                      ? "bg-amber-500 text-white border-amber-500"
                      : "bg-white border-stone-200"
                  }
                  ${
                    !stock.exists
                      ? "opacity-25 line-through cursor-not-allowed"
                      : ""
                  }
                  ${
                    stock.discontinued
                      ? "opacity-40 line-through cursor-not-allowed"
                      : ""
                  }
                  ${
                    stock.exists && !stock.inStock && !stock.discontinued
                      ? "border-dashed text-stone-400"
                      : ""
                  }
                `}
              >
                {s} {renderStatus(stock)}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProductVariant;
