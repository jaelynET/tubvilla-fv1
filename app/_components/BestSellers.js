import Image from "next/image";
import hero from "@/public/hero1.png";

import plain from "@/public/plain.jpg";
import Link from "next/link";
import dropin from "@/public/dropin.jpg";
import copper from "@/public/copper.jpg";

import arcylic from "@/public/arcylic.jpg";
import BestSellMd from "./BestSellMd";

function BestSellers() {
  return (
    <div className="m-auto">
      {/* <div>
        <h3
          className="font-semibold text-center  mb-4 mt-3 text-lg
           relative md:text-xl "
        >
          Trending
        </h3>
        {/* <div className="border-b-2 border-solid absolute left-[45%]   border-accent-50 w-[10%] top-[50%] translate-y-85 md:translate-y-55 translate-x-1 Extensions bottom-5 border-main-600 md:w-28 md:border-main md:border-b-7 md:left-[46%] "></div> 
      </div> */}

      {/* <div className="border-b-4 border-solid absolute left-[55%] -translate-x-10   border-accent-50 w-[10%] "></div> */}

      <div className="grid grid-cols-2 gap-1 place-items-center mb-3 mx-auto md:hidden">
        <div>
          <div className="relative w-36 h-40">
            <Image
              src={plain}
              fill
              className="object-cover"
              alt="White freestanding  tub"
            />
          </div>

          <p className="text-center text-base text-shadow-main-800">
            Freestanding
          </p>
        </div>
        <div>
          <div className="relative w-36 h-40">
            <Image
              src={copper}
              fill
              className="object-cover"
              alt="Copper freestanding tub"
            />
          </div>

          <p className="text-center text-base">Copper</p>
        </div>
        <div>
          <div className="relative w-36 h-40  ">
            <Image
              src={dropin}
              fill
              className="object-cover"
              alt="White dropin tub"
            />
          </div>
          <p className="text-center text-base">Drop-in</p>
        </div>
        <div>
          <div className="relative w-36 h-40  ">
            <Image
              src={arcylic}
              fill
              className="object-cover"
              alt="White dropin tub"
            />
          </div>
          <p className="text-center text-base">Arcylic</p>
        </div>
      </div>
      <div>
        <BestSellMd />
      </div>
    </div>
  );
}

export default BestSellers;
