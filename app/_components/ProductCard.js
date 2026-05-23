import Image from "next/image";
import Link from "next/link";
import { ADDED_DISCOUNT } from "@/app/constants";
import { formatPrice } from "../utils/format";
import getProductStockStatus from "../utils/getProductStatus";

function ProductCard({ product }) {
  const { slug, image, name, discount, product_variants } = product;
  const basePrice = product_variants?.[0]?.regularPrice || 0;
  const stock = getProductStockStatus(product);
  const inStock = stock.inStock;
  const isDiscontinued = stock.discontinued;
  // const formattedPrice = (regularPrice / 100).toLocaleString("en-US", {
  //   minimumFractionDigits: 2,
  //   maximumFractionDigits: 2,
  //   style: "currency",
  //   currency: "USD",
  // });

  return (
    <div className="group relative flex flex-col w-full">
      {/* Unified Link makes the entire card surface click-interactive */}
      <Link
        href={`/products/${slug}`}
        className="flex flex-col h-full focus:outline-none"
      >
        {/* --- IMAGE CONTAINER --- */}
        {/* Aspect-square behaves predictably on fluid grids; replaces problematic fixed sizes like h-35 */}
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-stone-100 border border-stone-200/40">
          <Image
            src={image}
            alt={name}
            className={`object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105 ${
              !inStock ? "opacity-70" : ""
            }`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>

        {/* --- TEXT CONTENT BLOCK --- */}
        <div className="mt-3 flex flex-1 flex-col justify-between">
          <div>
            {isDiscontinued ? (
              <p className="text-xs uppercase text-stone-400">Discontinued</p>
            ) : !inStock ? (
              <p className="text-xs uppercase text-neutral-500">Out of Stock</p>
            ) : null}
            {/* line-clamp prevents uneven name text from layout-breaking your grid rows */}
            <h4 className="text-xs font-medium text-stone-700 tracking-tight uppercase line-clamp-2 min-h-8 leading-snug">
              {name}
            </h4>
          </div>

          {/* --- PRICING ROW --- */}
          <div className="mt-2 flex items-baseline gap-2">
            {discount > 0 ? (
              <>
                <span className="text-sm font-bold text-button">
                  {formatPrice(discount)}
                </span>
                <span className="text-xs text-stone-400 line-through font-medium">
                  {formatPrice(basePrice)}
                </span>
                {/* Visual discount badge highlight */}
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1 rounded">
                  Sale
                </span>
              </>
            ) : (
              <span className="text-sm font-semibold text-stone-900">
                {formatPrice(basePrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
