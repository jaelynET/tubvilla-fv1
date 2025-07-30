"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/app/swiper.css";

function ProductImages({ mainImage, productImages }) {
  const firstPic = productImages.find((product) => product.position === 1);

  const { id, image, position } = firstPic;

  const [displayImage, setDisplayImage] = useState(productImages);

  const [slides, setslides] = useState(productImages);
  const [current, setCurrent] = useState(0);
  const paginationRef = useRef(null);

  function nextSlide() {
    setCurrent((prev) => (prev + 1) % slides.length);
  }
  function prevSlide() {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }
  return (
    <>
      <div className="">
        <Swiper
          modules={[Navigation, Pagination]}
          // spaceBetween={10}
          slidesPerView={1}
          // navigation
          pagination={{ el: paginationRef.current, clickable: true }}
          loop={true}
        >
          {productImages.map((product, i) => (
            <SwiperSlide key={product.id}>
              <div className="relative h-64 mt-3 mb-3 w-full md:ml-4 md:h-130 ">
                <Image
                  src={product.image}
                  alt="Product"
                  fill
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="text-center" ref={paginationRef}></div>
      </div>
      {/* 

      <div className="relative h-100 w-full mt-8">
        <Image
          // src={slides}
          src={slides[current].image}
          className="object-cover "
          fill
          alt={"Product"}
        />
        {current < 5 && (
          <div className="absolute top-0 left-[90%] transform translate-y-[600%] cursor-pointer">
            <ChevronRightIcon
              width={40}
              height={40}
              className="text-red-600 "
              onClick={nextSlide}
            />
          </div>
        )}

        {current > 0 && (
          <div className="absolute top-0 right-[90%] transform translate-y-[600%] cursor-pointer">
            <ChevronLeftIcon
              width={40}
              height={40}
              className="text-red-600 "
              onClick={prevSlide}
            />
          </div>
        )}
      </div>

      <div className=" flex gap-2 justify-center  mt-5 ">
        {productImages.map((product, i) => (
          <>
            {/* <div
              className={`rounded-full w-3  h-3 bg-main ${
                product.image === slides[current].image
                  ? "border-2 border-red-400"
                  : ""
              }`}
              key={product.id}
            ></div> 

            <div
              key={product.id}
              onClick={() => setCurrent(i)}
              className={`cursor-pointer ${
                product.image === slides[current].image
                  ? "border-8 border-main"
                  : ""
              }`}
            >
              <Image
                src={product.image}
                width={70}
                height={70}
                alt="Product"
                // className="rounded-sm"
              />
            </div>
          </>
        ))}
      </div>
*/}
    </>
  );
}

export default ProductImages;

/*
function nextSlide(){

}
*/
