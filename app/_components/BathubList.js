import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import { PAGE_SIZE } from "../constants";
import { getB } from "../_lib/data-service";

async function BathtubList({ productType, slug, filters, page }) {
  const { data: products, count } = await getB(
    productType,
    filters,
    page,
    PAGE_SIZE,
  );
  const totalPages = Math.ceil(count / PAGE_SIZE);

  const sortedProducts = [...products].sort((a, b) => {
    const aInStock = a.product_variants?.some((v) =>
      v.inventory?.some((i) => i.in_stock),
    );

    const bInStock = b.product_variants?.some((v) =>
      v.inventory?.some((i) => i.in_stock),
    );

    return Number(bInStock) - Number(aInStock);
  });

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 md:gap-x-8">
        {sortedProducts.map((bathtub) => (
          <ProductCard product={bathtub} slug={slug} key={bathtub.id} />
        ))}
      </div>
      <div className="mt-12">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}

export default BathtubList;
