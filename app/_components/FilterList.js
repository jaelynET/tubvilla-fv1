"use client";
import { useSearchParams } from "next/navigation";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { getBathtubs } from "../_lib/data-service";

function FilterList({}) {
  return (
    <ul className="pl-5 mb-8">
      <li>
        <Button>length</Button>
      </li>
      <li>
        <Button>width</Button>
      </li>
      <li>
        <Button>height</Button>
      </li>
      <Button>material</Button>
    </ul>
  );
}

export function Button({ children, filter, handleFilter }) {
  return <button onClick={() => handleFilter(filter)}>{children}</button>;
}

export default FilterList;
