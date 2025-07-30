// font-weight: 700;
// color: #333;
// letter-spacing: -0.5px;

import Image from "next/image";
import dropin from "@/public/dropin.jpg";
import copper from "@/public/copper.jpg";
import plain from "@/public/plain.jpg";
import arcylic from "@/public/arcylic.jpg";

import MostPopMd from "./MostPopMd";
// .intro-text::after {
//   content: "";
//   display: block;
//   border-bottom: 1px orangered solid;
//   position: absolute;

//   width: 10%;
//   height: 50%;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, 50%);
// }
//  <Image
//             // src="/hero1.png"
//             src={hero1}
//             style={{
//               width: "75%",
//               height: "auto",
//             }}
//             // className="object-cover"
//             // quality={80}
//             alt="White tub"
//           />

export default function MostPopular() {
  return (
    <div className="m-auto">
      <div className="">
        <h3
          className="font-semibold text-center mt-3 md:text-xl 
         relative md:text-center  "
        >
          Popular Categories
        </h3>
        <div className="border-b-2 border-solid absolute left-[45%]   border-accent-50 w-[10%] top-[58%] border-main-600 md:top-[83%] md:w-[8%] md:border-b-7 md:border-main md:left-[46%]"></div>
      </div>
      {/* 
      <div className="border-b-4 border-solid absolute left-[55%] -translate-x-10   border-accent-50 w-[10%] "></div>
      </div> */}

      <div className="grid grid-cols-2 gap-1 place-items-center mb-3 mx-auto md:hidden ">
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
          <div className="relative w-36 h-40  ">
            <Image
              src={copper}
              fill
              className="object-cover"
              alt="White dropin tub"
            />
          </div>
          <p className="text-center text-base ">Copper</p>
        </div>
        <div>
          <div className="relative w-36 h-40">
            <Image
              src={arcylic}
              fill
              className="object-cover"
              alt="Copper freestanding tub"
            />
          </div>

          <p className="text-center  text-base">Arcylic</p>
        </div>
        {/* <div>
          <div className="relative w-36 h-40  ">
            <Image
              src={faucet}
              fill
              className="object-cover"
              alt="White dropin tub"
            />
          </div>
          <p className="text-center text-sm">Faucet</p>
        </div>
        */}

        <div>
          <div className="relative w-36 h-40  ">
            <Image
              src={dropin}
              fill
              className="object-cover"
              alt="White dropin tub"
            />
          </div>
          <p className="text-center text-bas">Drop-in</p>
        </div>
      </div>
      <div>
        <MostPopMd />
      </div>
    </div>
  );
}

{
  /* <div className="m-auto"> 
      <div className="">
        <h3
          className="font-semibold text-center  mb-4 mt-2 text-lg
            "
        >
          Best Sellers
        </h3>

         <div className="border-b-4 border-solid absolute left-[55%] -translate-x-35   border-accent-50 w-[10%] "></div>
      </div>

      <div className="grid grid-cols-3  place-items-center  mx-auto ">
        <div>
          <div className="relative w-80 h-50">
            <Image
              src={plain}
              fill
              className="object-cover"
              alt="White freestanding  tub"
            />
          </div>

          <p className="text-center">Freestanding</p>
        </div>
        <div>
          <div className="relative w-80 h-50">
            <Image
              src={copper}
              fill
              className="object-cover"
              alt="Copper freestanding tub"
            />
          </div>

          <p className="text-center">Copper</p>
        </div>
        <div>
          <div className="relative w-80 h-50  ">
            <Image
              src={dropin}
              fill
              className="object-cover"
              alt="White dropin tub"
            />
          </div>
          <p className="text-center">Drop-in</p>
        </div>
      </div> 
    </div>
    */
}
