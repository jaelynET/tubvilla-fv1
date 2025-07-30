import BathubList from "@/app/_components/BathubList";

import FilterItems from "@/app/_components/FilterItems";
import { getBathtubs } from "@/app/_lib/data-service";
import { Suspense, use } from "react";
import Loading from "@/app/laoding";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";

export const metadata = {
  title: `Bath Tubs`,
};

export default function Page(props) {
  const {
    length = "",
    width = "",
    height = "",
    material = "",
  } = use(props.searchParams);

  return (
    <>
      {/* <div className="mt-5 flex ml-5 ">
        <ChevronDoubleRightIcon className="h-5 w-4 text-gray-950" />
        <h1 className="">bathtubs</h1>
      </div> */}
      {/* <div className="flex justify-end mr-8  ">
        <select className=" bg-primary-50 rounded-sm hover:bg-primary-100 cursor-pointer transition-colors px-1 py-2">
          <option>Best sellers</option>
        </select>
      </div> */}
      <div className="grid grid-cols-[auto_1fr] gap-10 mt-5">
        {/* <Filter /> */}
        <Suspense fallback={<Loading />} key={length}>
          {/* <FilterItems /> */}
          <BathubList
            filter={length}
            width={width}
            height={height}
            material={material}
          />
        </Suspense>
      </div>
    </>
  );
}
