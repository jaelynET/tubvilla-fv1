import dropin from "@/public/dropin.jpg";
import copper from "@/public/copper.jpg";
import plain from "@/public/plain.jpg";
import arcylic from "@/public/arcylic.jpg";
import japanese from "@/public/japanesetub.webp";
import classic from "@/public/classictub.webp";
import botanical from "@/public/botanicaltub.webp";
import blacktub from "@/public/blacktub.webp";
import greenery from "@/public/tub-greenry.jpg";
import hero1 from "@/public/hero1.png";

// import aclove from "@/public/classictub.webp";

import Image from "next/image";
import Feature from "./Feature";

function MostPopMd() {
  return (
    <div className="hidden md:flex md:justify-center gap-10 md:mx-auto md:mt-10 w-full">
      <div>
        <div className="md:relative md:w-75 md:h-130">
          <Image
            src={blacktub}
            fill
            className="object-cover"
            alt="White freestanding  tub"
          />
        </div>

        <p className="md:text-center font-bold  text-base md:mt-2">
          Freestanding
        </p>
      </div>
      <div>
        <div className="md:relative md:w-75 md:h-130">
          <Image
            src={botanical}
            fill
            className="object-cover"
            alt="Copper freestanding tub"
          />
        </div>

        <p className="md:text-center font-bold text-base md:mt-2">Japanese</p>
      </div>
    </div>
  );
}

export default MostPopMd;
/*
 <div className="hidden md:flex md:justify-center gap-10 md:mx-auto md:mt-10 w-full">
      <div>
        <div className="md:relative md:w-75 md:h-130">
          <Image
            src={greenery}
            fill
            className="object-cover"
            alt="White freestanding  tub"
          />
        </div>

        <p className="md:text-center">Freestanding</p>
      </div>
      <div>
        <div className="md:relative md:w-75 md:h-130  ">
          <Image
            src={blacktub}
            fill
            className="object-cover"
            alt="Copper freestanding tub"
          />
        </div>
        <p className="md:text-center">Copper</p>
      </div>
      <div>
        <div className="md:relative md:w-75 md:h-130">
          <Image
            src={botanical}
            fill
            className="object-cover"
            alt="Copper freestanding tub"
          />
        </div>

        <p className="md:text-center">Japanese</p>
      </div>
    </div>
    */
