import Image from "next/image";
import Link from "next/link";
import copper from "@/public/copperfeature.jpg";
import copperfeature from "@/public/copperfeature.jpg";
import blacktub from "@/public/blacktub.webp";

function Feature() {
  return (
    <div className=" bg-main-500  w-70 mx-5 pb-5  md:w-[75%] md:h-85 md:ml-43">
      <div>
        <span className="text-sm block font-semibold text-center pt-4 pb-2 md:hidden">
          50% off on all <span className="text-xl text-amber-900">Copper</span>{" "}
          tubs!
        </span>
        <div className="hidden md:grid md:grid-cols-[2fr_1fr] md:h-100 md:justify-center ">
          <div className="relative md:h-full ">
            <Image
              src={blacktub}
              alt="Copper tub"
              className="md:object-cover"
              fill
            />
          </div>
          <div className=" md:pt-15 md:pl-15">
            <h3 className="md:text-4xl md:font-semibold md:pb-5">
              Soak in Copper
            </h3>
            <p className="md:pb-7">
              The amazing benefits of a copper tub are absolutely incredible!
              With long-lasting material and maximum heat hold, this one of a
              kind tub is the perfect option for you and your bathroom.
            </p>

            <Link
              href="#"
              className=" bg-main text-sm font-semibold px-2 py-2 rounded-md  "
            >
              Shop now
            </Link>
          </div>
        </div>
        <div className="flex justify-center mr-10 md:hidden">
          <Link
            href="#"
            className=" bg-main text-xs font-semibold px-2 py-1 rounded-md ml-10 "
          >
            Shop now
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Feature;

// <div className="grid grid-cols-[2fr_1fr] gap-4 max-w-[1000] bg-primary-300 mx-20 ">
//   <div className=" p-23 m-auto ">
//     <h2 className="text-6xl pb-10">Soak in Copper</h2>
//     <p className="pb-10">
//       {" "}
//       The amazing benefits of a copper tub are absolutely incredible! With
//       long-lasting material and maximum heat hold, this one of a kind tub is
//       the perfect option for you and your bathroom.
//     </p>
//     <Link
//       href="#"
//       className="inline-block bg-orange-400 text-lg font-semibold px-6 py-4 mt-4 rounded-2xl"
//     >
//       Learn more
//     </Link>
//   </div>
//   <div className="relative">
//     <Image
//       src={copper}
//       fill
//       className="object-cover"
//       alt="Shiny Copper tub"
//     />
//   </div>
// </div>
