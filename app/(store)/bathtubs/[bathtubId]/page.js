import {
  getBathtub,
  getBathtubs,
  getProductImages,
} from "@/app/_lib/data-service";
import Image from "next/image";
import CheckoutBtn from "@/app/_components/CheckoutBtn";
import AddToCart from "@/app/_components/AddToCart";
import Quantity from "@/app/_components/Quantity";
import ProductImages from "@/app/_components/ProductImages";
import SoldPopup from "@/app/_components/SoldPopup";
import ProductDetails from "@/app/_components/ProductDetails";
import Klarna from "@/public/Klarna.png";
import Cart from "@/app/_components/CartItems";
import FeatureBox from "@/app/_components/FeatureBox";

export async function generateStaticParams() {
  const bathtubs = await getBathtubs();
  const ids = bathtubs.map((bathtub) => ({
    bathtubId: String(bathtub.id),
  }));
  return ids;
}

export default async function Page({ params }) {
  const { bathtubId } = await params;

  const bathtub = await getBathtub(bathtubId);
  const productImages = await getProductImages(bathtubId);
  const { image, name, regularPrice, description, priceId } = bathtub;

  return (
    //   <div className="grid grid-cols-2  mt-8  ">
    <div className="md:grid md:grid-cols-2 md:mt-8 md:ml-30 ">
      <h1
        className={`text-xl mt-1 min-[375px]:mx-4 text-grey-0 font-semibold mx-3 md:hidden`}
      >
        {name}
      </h1>
      <ProductImages mainImage={image} productImages={productImages} />
      <div>
        <h1 className="md:text-2xl mt-1  md:text-grey-0 md:font-semibold md:mx-11 md:mb-4 max-sm:hidden ">
          {name}
        </h1>
        <span className="text-[17px] min-[375px]:mx-4 min-[425px]:mx-8 font-semibold text-grey-0 pl-3">
          ${regularPrice.toLocaleString()}
        </span>
        <div className="flex mb-4  ">
          <span className="pl-4  text-[10px] min-[375px]:mx-4 min-[425px]:mx-8 md:relative  ">
            Buy now, pay later with
          </span>
          <Image
            src={Klarna}
            height={20}
            width={40}
            alt="Klarna"
            className="md:absolute md:translate-x-39 md:-translate-y-[10%] "
          />
        </div>
        <div className="mb-4">
          <h3 className="text-grey-0 text-[16px] min-[375px]:mx-8  font-semibold mx-4 mb-1 min-[425px]:mx-11">
            Features
          </h3>
          <FeatureBox />
        </div>
        <div className="mx-4 mb-5 min-[375px]:mx-8 min-[425px]:mx-11 ">
          <ProductDetails />
        </div>
        <AddToCart product={bathtub} />
      </div>
    </div>

    //     <div>
    //       <h1 className={`text-3xl  text-grey-0 font-semibold mb-10 `}>{name}</h1>
    //       {/* <div className="mb-5">
    //         <SoldPopup />
    //       </div> */}
    //       <div className="flex flex-col mb-10">
    //         <span className="text-2xl font-semibold text-red-500">
    //           ${regularPrice.toLocaleString()}
    //         </span>
    //         <div className="flex  ">
    //           <span className="pt-1 text-sm ">Buy now, pay later with</span>
    //           <div>
    //             <Image src={Klarna} height={20} width={65} alt="Klarna" />
    //           </div>
    //         </div>
    //       </div>
    //       <div className="mb-10">
    //         <ProductDetails description={description} />
    //       </div>
    //       {/* <p className="pb-8">{description}</p> */}
    //       <div className="flex flex-col gap-5">
    //         {/* <Quantity product={bathtub} /> */}
    //         <AddToCart product={bathtub} />
    //         {/* <CheckoutBtn product={bathtub} /> */}
    //       </div>
    //     </div>
    //   </div>
  );
}
