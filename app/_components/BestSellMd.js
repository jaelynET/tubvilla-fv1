import Image from "next/image";

import plain from "@/public/plain.jpg";
import Link from "next/link";
import dropin from "@/public/dropin.jpg";
import copper from "@/public/copper.jpg";

import arcylic from "@/public/arcylic.jpg";

function BestSellMd() {
  return (
    <div className="hidden md:grid md:grid-cols-3 md:gap-1 md:place-items-center md:mb-3 md:mx-auto md:mt-10 ">
      <div>
        <div className="md:relative md:w-50 md:h-50">
          <Image
            src={arcylic}
            fill
            className="md:object-cover"
            alt="White freestanding  tub"
          />
        </div>

        <p className="md:text-center md:text-base text-shadow-main-800">
          Arcylic
        </p>
      </div>
      <div>
        <div className="md:relative md:w-50 md:h-50">
          <Image
            src={copper}
            fill
            className="md:object-cover"
            alt="Copper freestanding tub"
          />
        </div>

        <p className="md:text-center md:text-base">Copper</p>
      </div>
      {/*
      <div>
        <div className="md:relative md:w-36 md:h-40  ">
          <Image
            src={dropin}
            fill
            className="md:object-cover"
            alt="White dropin tub"
          />
        </div>
        <p className="md:text-center md:text-base">Drop-in</p>
      </div>
      */}
      <div>
        <div className="md:relative md:w-50 md:h-50  ">
          <Image
            src={plain}
            fill
            className="object-cover"
            alt="White dropin tub"
          />
        </div>
        <p className="md:text-center md:text-base">Freestanding</p>
      </div>
    </div>
  );
}

export default BestSellMd;
