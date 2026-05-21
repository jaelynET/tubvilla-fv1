"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import { useRef, useState } from "react";
import Image from "next/image";
import MobileFullscreenGallery from "./MobileFullscreenGallery";
import Skeleton from "./Skeleton";

function MobileGallery({ productImages }) {
  const paginationRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);

  return (
    <>
      <div className="relative">
        {!isReady && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            <Skeleton className="h-2 w-2 rounded-full" />
            <Skeleton className="h-2 w-2 rounded-full" />
            <Skeleton className="h-2 w-2 rounded-full" />
          </div>
        )}
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={1}
          onInit={() => setIsReady(true)}
          className={isReady ? "opacity-100" : "opacity-0"}
          pagination={{
            el: paginationRef.current,
            clickable: true,
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        >
          {productImages.map((product, i) => (
            <SwiperSlide key={product.id || i}>
              {/* 
      1. FIXED: Swapped problematic fixed h-64 to fluid aspect-square or aspect-[4/3]
      2. FIXED: Removed mb-3 to prevent Swiper framework calculation crashes
      3. ADDED: Premium rounded-xl boundaries to match the bathtub design aesthetic
    */}
              <div className="w-full aspect-square sm:aspect-4/3 overflow-hidden rounded-xl bg-stone-50 border border-stone-200/40">
                <button
                  type="button"
                  onClick={() => setIsOpen(true)}
                  className="relative w-full h-full cursor-zoom-in block outline-none transition-transform duration-300 active:scale-[0.99]"
                  aria-label={`View enlarged image ${i + 1} of ${product.name}`}
                >
                  <Image
                    src={product.image || product} // Fallback support if mapping directly over a string array
                    alt={`${product.name || "Product Image"} - View ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover object-center"
                    priority={i === 0} // Optimizes LCP performance by preloading the very first main slide
                  />
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="text-center lg:hidden" ref={paginationRef}></div>
      </div>
      {isOpen && (
        <MobileFullscreenGallery
          images={productImages}
          startIndex={activeIndex}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

export default MobileGallery;
