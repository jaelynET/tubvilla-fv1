"use client";

import ProductCard from "./ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/app/swiper.css";
import AddToCartMini from "./AddToCartMini";
import ProductGridSkeleton from "./ProductGridSkeleton";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "../utils/format";

// if (!similarProducts?.length) {
//   return <ProductGridSkeleton count={5} isCarousel />;
// }
function SimilarProductCard({ similarProducts, slug }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !similarProducts?.length) {
    return <ProductGridSkeleton count={5} isCarousel />;
  }

  return (
    <Swiper
      key={similarProducts.length}
      modules={[Navigation, Pagination]}
      spaceBetween={16}
      slidesPerView={1.5}
      breakpoints={{
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 5 },
      }}
    >
      {similarProducts.map((product) => (
        <SwiperSlide key={product.id}>
          <Link
            // href={`/collections/bathtubs/${slug}/${id}`}
            href={`/products/${product.slug}`}
            className="group flex flex-col h-full focus:outline-none select-none"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-stone-50 border border-stone-200/40">
              <Image
                src={product.image}
                alt={product.name}
                className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                fill
                sizes="(max-width: 640px) 70vw, (max-width: 1024px) 33vw, 20vw"
                loading="lazy"
              />
            </div>
            <div className="mt-3 flex flex-1 flex-col justify-between px-1">
              {/* font-medium creates a lighter, clean editorial listing balance */}
              <h4 className="text-xs font-medium text-stone-700 tracking-tight uppercase line-clamp-2 min-h-8 leading-snug">
                {product.name}
              </h4>
            </div>
            <span className="text-sm font-bold text-stone-900">
              {formatPrice(product.regularPrice)}
            </span>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default SimilarProductCard;
