"use client";
import FilterLength from "./FilterLength";
import FilterWidth from "./FilterWidth";
import FilterHeight from "./FilterHeight";
import FilterMaterial from "./FilterMaterial";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter({ lengths, widths, heights, materials }) {
  // const searchParams = useSearchParams();
  const router = useRouter();
  // const pathname = usePathname();
  function handleFilter(filter, filterKey) {
    const searchParams2 = new URLSearchParams(window.location.search);
    console.log(searchParams2);
    searchParams2.append(filter, filterKey);
    const newUrl = `${window.location.pathname}?${searchParams2.toString()}`;
    router.push(newUrl, {
      scroll: false,
    });
  }

  return (
    <>
      <div>
        <FilterLength lengths={lengths} handleFilter={handleFilter} />
      </div>
      <div>
        <FilterWidth widths={widths} handleFilter={handleFilter} />
      </div>
      <div>
        <FilterHeight heights={heights} handleFilter={handleFilter} />
      </div>
      <div>
        <FilterMaterial materials={materials} handleFilter={handleFilter} />
      </div>
    </>
  );
}

export default Filter;
