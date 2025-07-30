import hero1 from "@/public/hero1.png";
import Image from "next/image";
import Link from "next/link";
// import tub1 from "@/public/bg.png";

function Banner() {
  return (
    <div className="bg-gradient-to-r from-main-100 via-main-300 to-main-500 h-60 md:h-125   ">
      <div className="grid grid-cols-2 justify-center md:ml-30">
        <div className="md:ml-30 md:w-[70%] justify-self-end md:mt-10  ">
          <h1 className="text-base font-bold md:text-3xl text-grey-0   mx-4 mb-2 md:pt-20 text-shadow-sm    ">
            <span className=" ">Transform</span> your bathroom into a{" "}
            <span className=" ">soothing spa</span>
            -with the perfect tub!
          </h1>
          {/* <p className="md:text-sm md:mb-5 pl-5">
            Explore our most stunning top-rated bathubs that will transform your
            bathroom to an extrandorany luxury getaway.
          </p> */}
          <button className="rounded-md bg-main px-2 py-2 ml-3 md:mx-4 md:mt-5">
            <Link href={"/bathtubs"}>
              <p className="text-white font-bold">Shop now</p>
            </Link>
          </button>
        </div>

        <div className="relative  h-60 md:w-79 md:mt-10 md:h-97 md:ml-10  ">
          <Image
            src={hero1}
            fill
            className="object-cover"
            alt="Copper freestanding tub"
          />
        </div>
      </div>
    </div>
  );
}

export default Banner;
