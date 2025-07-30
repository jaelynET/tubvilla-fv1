// import { use } from "react";

import {
  getAllFeatures,
  getBathtubHeights,
  getBathtubLengths,
  getBathtubMaterial,
  getBathtubWidths,
} from "../_lib/data-service";
import FilterLength from "./FilterLength";
import Filter from "./Fliter";

async function FilterItems() {
  const [lengths, widths, heights, materials] = await Promise.all([
    getBathtubLengths(),
    getBathtubWidths(),
    getBathtubHeights(),
    getBathtubMaterial(),
  ]);
  // const { length, width, height, material } = await getAllFeatures();
  // console.log(length);

  return (
    <div>
      <Filter
        lengths={lengths}
        widths={widths}
        heights={heights}
        materials={materials}
      />
    </div>
  );
}

export default FilterItems;
