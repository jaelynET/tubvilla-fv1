import {
  getBathtub,
  getBathtubs,
  getBathtubWidth,
  getLength,
} from "../_lib/data-service";

import Filter from "./Fliter";
import ProductCard from "./ProductCard";

async function BathubList({ filter, width, height, material }) {
  const bathtubs = await getBathtubs();
  if (!bathtubs.length) return null;

  let displayTubs;
  if (filter === "") displayTubs = bathtubs;

  if (filter) {
    const tubs = await getLength(filter);
    displayTubs = tubs;
  }

  // if (width) {
  //   const tubsWidth = await getBathtubWidth(width);
  //   displayTubs = tubsWidth;
  // }

  return (
    <div className="">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 ml-4 md:justify-center md:ml-83 md:gap-10 ">
        {displayTubs.map((bathtub) => (
          <ProductCard product={bathtub} key={bathtub.id} />
        ))}
      </div>
    </div>
  );
}

export default BathubList;
